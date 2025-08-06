import { useState } from "react";
import { useAuth } from './AuthContext';

function Login() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPass: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newError = {}
    if (!formData.email.trim()) {
      newError.email = "Email is Required";
    }

    if(!formData.password.trim()) {
      newError.password = "Password is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    if(!validateForm()){
      console.log("VALIDATION FAILED");
      alert('Please fill stuff!')
      return;
    }
    console.log("Sending data!");
    const data = {email: formData.email, password: formData.password};
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.ok && result.success) {
      login(result.user, result.token);
      setSuccess(true);
      setLoading(false);

      alert('Login Successful!');
      window.location.href = '/Dashboard';
    } else {
      console.error(result.message);
      alert('Error Logging IN!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {isLogin ? (
        <div className="min-h-screen flex flex-col items-center mt-20">
          <h1 className="text-2xl font-bold text-center mb-6">
            Login to Gram Route
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Don't have an account? Sign In
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            Register
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">
                UserName
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Re-Enter Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Don't have an account? Sign In
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
