import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../pages/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  BarChart3, 
  FileText, 
  AlertTriangle,
  Bell,
  ChevronDown,
  Settings,
  Award,
  Shield,
  Crown,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Enhanced animation variants
  const navVariants = {
    hidden: { 
      y: -100, 
      opacity: 0
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const linkHover = {
    scale: 1.02,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  };

  const buttonHover = {
    scale: 1.02,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  };

  return (
    <>
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
            : 'bg-white/90 backdrop-blur-md shadow-lg'
        }`}
        style={{
          borderBottom: '1px solid rgba(229, 231, 235, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Crown className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Gram
                  </span>
                  <span className="text-gray-800">Route</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <motion.div whileHover={linkHover}>
                <Link
                  to="/"
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive('/') || isActive('/homepage')
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </motion.div>

              {isAuthenticated && (
                <>
                  <motion.div whileHover={linkHover}>
                    <Link
                      to="/dashboard"
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive('/dashboard')
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <BarChart3 size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={linkHover}>
                    <Link
                      to="/reports"
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive('/reports')
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <FileText size={16} />
                      <span>Reports</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={linkHover}>
                    <Link
                      to="/report"
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive('/report')
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <AlertTriangle size={16} />
                      <span>Report Issue</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Enhanced Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* Enhanced Notification Bell */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Bell size={18} />
                    {notifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs text-white font-bold">{notifications}</span>
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Enhanced Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <span className="text-sm">{user?.username || 'User'}</span>
                      <motion.div
                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                          style={{ backgroundColor: 'white' }}
                        >
                          {/* Profile Header */}
                          <motion.div 
                            variants={itemVariants}
                            className="px-4 py-3 border-b border-gray-100"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user?.username || 'User'}</h3>
                                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Stats */}
                          <motion.div 
                            variants={itemVariants}
                            className="px-4 py-2 grid grid-cols-3 gap-3 border-b border-gray-100"
                          >
                            <div className="text-center">
                              <div className="font-bold text-blue-600 text-sm">12</div>
                              <div className="text-xs text-gray-500">Reports</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-green-600 text-sm">8</div>
                              <div className="text-xs text-gray-500">Resolved</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-purple-600 text-sm">340</div>
                              <div className="text-xs text-gray-500">Points</div>
                            </div>
                          </motion.div>

                          {/* Menu Items */}
                          <div className="py-1">
                            <motion.div variants={itemVariants}>
                              <Link
                                to="/profile"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                              >
                                <User size={16} />
                                <span className="text-sm font-medium">My Profile</span>
                              </Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                              <Link
                                to="/settings"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                              >
                                <Settings size={16} />
                                <span className="text-sm font-medium">Settings</span>
                              </Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                              <Link
                                to="/achievements"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                              >
                                <Award size={16} />
                                <span className="text-sm font-medium">Achievements</span>
                                <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                  3
                                </span>
                              </Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                              <Link
                                to="/security"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                              >
                                <Shield size={16} />
                                <span className="text-sm font-medium">Security</span>
                              </Link>
                            </motion.div>

                            <motion.div variants={itemVariants} className="border-t border-gray-100 mt-1 pt-1">
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                              >
                                <LogOut size={16} />
                                <span className="text-sm font-medium">Sign Out</span>
                              </button>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <Sparkles size={16} />
                    <span>Get Started</span>
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                <motion.div variants={itemVariants}>
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive('/') || isActive('/homepage')
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                </motion.div>

                {isAuthenticated ? (
                  <>
                    <motion.div variants={itemVariants}>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/dashboard')
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <BarChart3 size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Link
                        to="/reports"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/reports')
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <FileText size={18} />
                        <span>Reports</span>
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Link
                        to="/report"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/report')
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <AlertTriangle size={18} />
                        <span>Report Issue</span>
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive('/profile')
                            ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <User size={18} />
                        <span>Profile</span>
                      </Link>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full"
                    >
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <Sparkles size={18} />
                        <span>Get Started</span>
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
