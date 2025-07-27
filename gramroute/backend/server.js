import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

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
        console.error('Error connecting to database:', err)
    } else {
        console.log('Connected to PostgreSQL database');
        release();
    }
})

let reports = [
    {
        id: 1,
        title: "Test Report",
        description: "This is a test report",
        status: "pending",
        category: "road",
        date: "2025-07-26",
        reporter: "Test User"
    },
    {
        id: 2,
        title: "Another Report", 
        description: "Another test",
        status: "resolved",
        category: "safety",
        date: "2025-07-25",
        reporter: "Test User"
    }
];

    app.post('/api/reports', async (req, res) => {
        console.log('Recieved Data: ', req.body);

        const {title, description, category, location, fileName} = req.body;

        if(!title || !description || !category){
            return res.status(400).json({
                success: false,
                message: "Title, description and category are required"
            });
        }

        try {
            const result = await pool.query(
                `INSERT INTO reports (title, description, category, location, file_name)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [title.trim(), description.trim(), category, location, fileName]
            );

            const newReport = result.rows[0];

            res.json({
                success: true,
                message: "Report saved to database",
                report: newReport
            });
        } catch (error) {
            console.error('Database error: ', error);
            res.status(500).json({
                success: false,
                message: "Failed to save report"
            });
        }
    });

    app.get('/', (req, res) => {
        res.json({message: "GramRoute backend is working!"});
    })

    app.get('/api/reports', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
            res.json({reports: result.rows});
        } catch (error) {
            res.status(500).json({ message: 'Database error'});
        }
    })

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});