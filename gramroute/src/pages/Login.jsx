import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginForm } from '../hooks/useLoginForm';
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
  const {
    isLogin,
    setIsLogin,
    formData,
    error,
    loading,
    success,
    focusedField,
    setFocusedField,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordStrength,
    handleSubmit,
    handleChange,
    getPasswordStrengthColor,
    getPasswordStrengthText
  } = useLoginForm();

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

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background with Floating Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Premium Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-8 h-8 text-yellow-400" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GramRoute
            </span>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-300 text-lg font-medium"
          >
            {isLogin ? 'Welcome Back to Premium' : 'Join the Elite Community'}
          </motion.p>
        </motion.div>

        {/* Premium Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {/* Toggle Buttons */}
          <div className="flex mb-8 p-1 bg-gray-800/50 rounded-2xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center rounded-xl font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center rounded-xl font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error.general && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center flex items-center justify-center space-x-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error.general}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <AnimatePresence>
                {!isLogin && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Strength:</span>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
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
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {getButtonContent()}
            </motion.button>
          </form>

          {/* Forgot Password / Extra Options */}
          {isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                Forgot your password?
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Premium Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>© 2024 GramRoute Premium. Elevating community infrastructure.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
