import { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Shield,
  Crown,
  Loader
} from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPass: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  // Floating particles effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateUsername = (username) => {
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    return "";
  };

  const validateForm = () => {
    const newError = {};
    
    newError.email = validateEmail(formData.email);
    newError.password = validatePassword(formData.password);

    if (!isLogin) {
      newError.username = validateUsername(formData.username);
      if (formData.password !== formData.confirmPass) {
        newError.confirmPass = "Passwords do not match";
      }
    }

    // Remove empty error messages
    Object.keys(newError).forEach(key => {
      if (!newError[key]) delete newError[key];
    });

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password) && /[!@#$%^&*]/.test(password)) strength += 25;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleLogin = async () => {
    const data = { email: formData.email, password: formData.password };
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      login(result.user, result.token);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError({ general: result.message || 'Login failed' });
    }
  };

  const handleRegister = async () => {
    const data = {
      email: formData.email,
      username: formData.username,
      password: formData.password
    };
    
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsLogin(true);
        setSuccess(false);
      }, 2000);
    } else {
      setError({ general: result.message || 'Registration failed' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
        </>
      );
    }
    
    if (success) {
      return (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>Success!</span>
        </>
      );
    }
    
    return (
      <>
        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
        <ArrowRight className="w-5 h-5" />
      </>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear specific field error when user starts typing
    if (error[name]) {
      setError({ ...error, [name]: '' });
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'from-red-500 to-red-600';
    if (passwordStrength < 50) return 'from-orange-500 to-yellow-500';
    if (passwordStrength < 75) return 'from-yellow-500 to-blue-500';
    return 'from-green-500 to-emerald-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-2xl"
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gram Route
            </h1>
            <p className="text-blue-200 mt-2">Infrastructure Excellence Platform</p>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Tab Switcher */}
            <div className="flex p-2">
              <motion.button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="w-4 h-4 inline mr-2" />
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Sign Up
              </motion.button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'register'}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                    </h2>
                    <p className="text-blue-200">
                      {isLogin 
                        ? 'Sign in to access your dashboard' 
                        : 'Create your account to get started'
                      }
                    </p>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-500/20 border border-green-500/50 rounded-2xl p-4 mb-6 flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-medium">
                          {isLogin ? 'Login successful! Redirecting...' : 'Account created! Please sign in.'}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error.general && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 mb-6 flex items-center space-x-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300 font-medium">{error.general}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === 'email' ? 'text-blue-400' : 'text-gray-400'
                        }`} />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            error.email ? 'border-red-500' : 'border-white/20 hover:border-white/40'
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      <AnimatePresence>
                        {error.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{error.email}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Username Field (Register only) */}
                    <AnimatePresence>
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <label htmlFor="username" className="block text-sm font-medium text-blue-200 mb-2">
                            Username
                          </label>
                          <div className="relative">
                            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                              focusedField === 'username' ? 'text-blue-400' : 'text-gray-400'
                            }`} />
                            <input
                              id="username"
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('username')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                error.username ? 'border-red-500' : 'border-white/20 hover:border-white/40'
                              }`}
                              placeholder="Choose a username"
                            />
                          </div>
                          <AnimatePresence>
                            {error.username && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                              >
                                <AlertCircle className="w-4 h-4" />
                                <span>{error.username}</span>
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Password Field */}
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === 'password' ? 'text-blue-400' : 'text-gray-400'
                        }`} />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            error.password ? 'border-red-500' : 'border-white/20 hover:border-white/40'
                          }`}
                          placeholder="Enter your password"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </motion.button>
                      </div>
                      
                      {/* Password Strength Indicator (Register only) */}
                      {!isLogin && formData.password && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3"
                        >
                          <div className="flex justify-between text-xs text-blue-200 mb-1">
                            <span>Password Strength</span>
                            <span className="font-medium">{getPasswordStrengthText()}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength}%` }}
                              className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()}`}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      )}

                      <AnimatePresence>
                        {error.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{error.password}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Confirm Password Field (Register only) */}
                    <AnimatePresence>
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <label htmlFor="confirmPass" className="block text-sm font-medium text-blue-200 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                              focusedField === 'confirmPass' ? 'text-blue-400' : 'text-gray-400'
                            }`} />
                            <input
                              id="confirmPass"
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPass"
                              value={formData.confirmPass}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('confirmPass')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                error.confirmPass ? 'border-red-500' : 'border-white/20 hover:border-white/40'
                              }`}
                              placeholder="Confirm your password"
                            />
                            <motion.button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </motion.button>
                          </div>
                          <AnimatePresence>
                            {error.confirmPass && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                              >
                                <AlertCircle className="w-4 h-4" />
                                <span>{error.confirmPass}</span>
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading || success}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      {getButtonContent()}
                    </motion.button>
                  </form>

                  {/* Forgot Password / Extra Options */}
                  {isLogin && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center mt-6"
                    >
                      <motion.button
                        className="text-blue-300 hover:text-blue-200 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Forgot your password?
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-blue-200">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Github, label: 'GitHub', color: 'from-gray-700 to-gray-800' },
                { icon: Chrome, label: 'Google', color: 'from-red-500 to-pink-500' },
                { icon: Smartphone, label: 'Phone', color: 'from-green-500 to-emerald-500' },
              ].map((social, index) => (
                <motion.button
                  key={social.label}
                  className={`flex items-center justify-center py-3 px-4 bg-gradient-to-r ${social.color} rounded-2xl text-white hover:opacity-90 transition-all duration-300 shadow-lg`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-blue-300 text-sm"
          >
            <p>© 2024 Gram Route. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <motion.a href="#" className="hover:text-blue-200 transition-colors" whileHover={{ scale: 1.05 }}>
                Privacy Policy
              </motion.a>
              <motion.a href="#" className="hover:text-blue-200 transition-colors" whileHover={{ scale: 1.05 }}>
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
