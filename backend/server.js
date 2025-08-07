import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { Pool } = pg;
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to PostgreSQL database");
    release();
  }
});
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("🔍 Auth Debug - Header:", authHeader);
  console.log("🎫 Auth Debug - Token:", token);

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Not logged" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("🚨 JWT Error:", err.message);
      return res.status(403).json({ message: "Invalid login session!" });
    }
    console.log("✅ User authenticated:", user.username);
    req.user = user;
    next();
  });
};

app.post("/api/reports", authenticateToken ,async (req, res) => {
  console.log("Recieved Data: ", req.body);

  const { title, description, category, latitude, longitude } = req.body;
  const userId = req.user.userId;

  if (!title || !description || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, description and category are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO reports (user_id, title, description, category, latitude, longitude, status, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
                RETURNING *`,
      [userId, title.trim(), description.trim(), category, latitude, longitude, 'pending']
    );

    const newReport = result.rows[0];

    res.json({
      success: true,
      message: "Report saved to database",
      report: newReport,
    });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to save report",
    });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "GramRoute backend is working!" });
});

// REPORTS DISPLAY
app.get("/api/reports", authenticateToken,  async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching reports for user:", userId);
    const result = await pool.query(
      "SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at",
      [userId]
    );
    res.json({ reports: result.rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

// LOGIN ROUTE
app.get("/api/login", (req, res) => {
  res.json({ message: "Login Route is Working!" });
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Extracted - Email:", email, "Password:", password);

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.json({
        success: false,
        message: "Email and Password are required!",
      });
    }

    console.log("🔍 Searching for user with email:", email);
    const user = await pool.query(
      "SELECT id, username,  first_name, last_name, phone, address, score FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      console.log("❌ User not found in database");
      return res.json({ success: false, message: "User not Found!" });
    }

    const passwordQuery = await pool.query(
      "SELECT password_hash FROM users WHERE email = $1",
      [email]
    );

    if (password !== passwordQuery.rows[0].password_hash) {
      return res.json({ success: false, message: "Password incorrect" });
    }

    const token = jwt.sign(
      {
        userId: user.rows[0].id,
        email: user.rows[0].email,
        username: user.rows[0].username,
      },
      process.env.JWT_SECRET || "NONE",
      { expiresIn: "24h" }
    );

    return res.json({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        username: user.rows[0].username,
      },
    });
  } catch (error) {
    console.error("💥 Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ADMIN ROUTE
app.get("/api/admin/reports", authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required"});
    }

    const result = await pool.query(
      `SELECT r.*, u.username, u.email
      FROM reports r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC`
    );
    res.json({ reports: result.rows})
  } catch (error) {
    console.error('Database Error', error);
    res.status(500).json({ message: "Database error"});
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
