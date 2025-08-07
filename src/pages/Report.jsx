import { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  AlertTriangle,
  Camera,
  Video,
  Check,
  X,
  Star,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  User,
  Globe,
  Loader,
  MapPin,
  Navigation,
  RefreshCw
} from 'lucide-react';

function Report() {
  const { user, authenticatedFetch, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Helper functions
  const getTitleBorderClass = () => {
    if (errors.title) return 'border-red-500';
    if (focusedField === 'title') return 'border-blue-500';
    return 'border-gray-200 hover:border-gray-300';
  };

  const getDescriptionBorderClass = () => {
    if (errors.description) return 'border-red-500';
    if (focusedField === 'description') return 'border-green-500';
    return 'border-gray-200 hover:border-gray-300';
  };

  const getFileUploadClass = () => {
    if (isDragOver) return 'border-blue-500 bg-blue-50';
    if (errors.file) return 'border-red-500 bg-red-50';
    return 'border-gray-300 hover:border-gray-400';
  };

  // Floating particles effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
    }));
    setParticles(newParticles);
  }, []);

  // Location functions
  const fetchCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude: latitude,
          longitude: longitude,
          accuracy: position.coords.accuracy
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        // let errorMessage = "Unable to retrieve location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          // default:
          //   errorMessage = "An unknown error occurred";
          //   break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const clearLocation = () => {
    setLocation(null);
    setLocationError("");
  };

  const categories = [
    { value: "road", label: "Road Infrastructure", icon: "🛣️", color: "from-blue-500 to-cyan-500" },
    { value: "safety", label: "Public Safety", icon: "🚨", color: "from-red-500 to-pink-500" },
    { value: "waste", label: "Waste Management", icon: "♻️", color: "from-green-500 to-emerald-500" },
    { value: "utilities", label: "Utilities", icon: "⚡", color: "from-yellow-500 to-orange-500" },
    { value: "water", label: "Water System", icon: "💧", color: "from-cyan-500 to-blue-500" },
    { value: "lighting", label: "Street Lighting", icon: "💡", color: "from-amber-500 to-yellow-500" },
    { value: "transport", label: "Public Transport", icon: "🚌", color: "from-purple-500 to-violet-500" },
    { value: "other", label: "Other", icon: "📋", color: "from-gray-500 to-slate-500" },
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "from-green-500 to-emerald-500", icon: "🟢" },
    { value: "medium", label: "Medium Priority", color: "from-yellow-500 to-orange-500", icon: "🟡" },
    { value: "high", label: "High Priority", color: "from-orange-500 to-red-500", icon: "🟠" },
    { value: "urgent", label: "Urgent", color: "from-red-500 to-pink-500", icon: "🔴" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 text-center max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-6 shadow-2xl"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-blue-200 mb-8">Please sign in to submit infrastructure reports</p>
          
          <motion.button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5" />
            <span>Sign In Now</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!file) {
      newErrors.file = "Please upload an image or video";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setErrors({ ...errors, file: '' });
      
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        title: title.trim(),
        description: description.trim(),
        category: category,
        priority: priority,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null
      };

      const response = await authenticatedFetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: JSON.stringify(reportData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setTitle("");
          setDescription("");
          setCategory("");
          setPriority("medium");
          setFile(null);
          setFilePreview(null);
          setLocation(null);
          setLocationError("");
          setErrors({});
          setCurrentStep(1);
          setSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to submit the report");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ general: "Failed to submit report. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = () => {
    const totalSteps = 5;
    return (currentStep / totalSteps) * 100;
  };

  const renderFloatingParticles = () => (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-400/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        {renderFloatingParticles()}
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </motion.button>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200">Reporting as</p>
                <p className="font-semibold">{user?.username}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-green-200 text-center max-w-md mx-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h3>
                <p className="text-gray-600 mb-6">Your infrastructure report has been successfully submitted and will be reviewed by our team.</p>
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">+50 Community Points Earned!</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Submit Infrastructure Report
              </h1>
              <Sparkles className="w-8 h-8 text-purple-500" />
            </motion.div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Help improve your community by reporting infrastructure issues. Your reports make a difference!
            </p>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Report Progress</h3>
              <span className="text-sm text-gray-500">{Math.round(getStepProgress())}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              />
            </div>
          </motion.div>

          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Infrastructure Report Details</h2>
                  <p className="text-blue-100">Please provide comprehensive information about the issue</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"
                >
                  <AlertTriangle className="w-8 h-8" />
                </motion.div>
              </div>
            </div>

            {/* Error Messages */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border-l-4 border-red-500 p-4 m-6 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">{errors.general}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Title Field */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Report Title</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({ ...errors, title: '' });
                    setCurrentStep(Math.max(currentStep, 1));
                  }}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 bg-white border-2 rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${getTitleBorderClass()}`}
                  placeholder="e.g., Pothole on Main Street causing traffic issues"
                />
                <AnimatePresence>
                  {errors.title && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{errors.title}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Category Selection */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span>Category</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setCategory(cat.value);
                        if (errors.category) setErrors({ ...errors, category: '' });
                        setCurrentStep(Math.max(currentStep, 2));
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                        category === cat.value
                          ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-lg`
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2">{cat.icon}</div>
                      <div className="text-sm font-medium">{cat.label}</div>
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {errors.category && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{errors.category}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Priority Selection */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span>Priority Level</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {priorities.map((prio) => (
                    <motion.button
                      key={prio.value}
                      type="button"
                      onClick={() => setPriority(prio.value)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                        priority === prio.value
                          ? `bg-gradient-to-br ${prio.color} text-white border-transparent shadow-lg`
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2">{prio.icon}</div>
                      <div className="text-sm font-medium">{prio.label}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Location Section */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span>Location (Optional)</span>
                </label>
                
                <div className="space-y-4">
                  {!location ? (
                    <motion.button
                      type="button"
                      onClick={fetchCurrentLocation}
                      disabled={isLoadingLocation}
                      className={`w-full p-6 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                        isLoadingLocation 
                          ? 'border-blue-300 bg-blue-50 cursor-not-allowed'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      whileHover={!isLoadingLocation ? { scale: 1.02 } : {}}
                      whileTap={!isLoadingLocation ? { scale: 0.98 } : {}}
                    >
                      <div className="text-center">
                        {isLoadingLocation ? (
                          <>
                            <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                            <p className="text-blue-600 font-medium">Getting your location...</p>
                            <p className="text-sm text-gray-500 mt-2">Please allow location access</p>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-900 font-medium mb-2">Add Current Location</p>
                            <p className="text-sm text-gray-500">
                              Click to automatically detect your location and add GPS coordinates to your report
                            </p>
                          </>
                        )}
                      </div>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-green-900 mb-1">Location Added Successfully</h4>
                            <div className="text-sm text-green-700 space-y-1">
                              <p>Latitude: {location.latitude.toFixed(6)}</p>
                              <p>Longitude: {location.longitude.toFixed(6)}</p>
                              <p>Accuracy: ±{Math.round(location.accuracy)}m</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            type="button"
                            onClick={fetchCurrentLocation}
                            disabled={isLoadingLocation}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Refresh location"
                          >
                            <RefreshCw className={`w-4 h-4 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={clearLocation}
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Remove location"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* {locationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-2 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-medium">Location Error</span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">{locationError}</p>
                    </motion.div>
                  )} */}
                </div>
              </motion.div>

              {/* Description Field */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Detailed Description</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: '' });
                    setCurrentStep(Math.max(currentStep, 4));
                  }}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full px-6 py-4 bg-white border-2 rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/20 resize-none ${getDescriptionBorderClass()}`}
                  placeholder="Please provide a detailed description of the issue including location, severity, and any safety concerns..."
                />
                <div className="flex justify-between items-center mt-2">
                  <AnimatePresence>
                    {errors.description && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm flex items-center space-x-1"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>{errors.description}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <span className={`text-sm ${description.length < 20 ? 'text-red-500' : 'text-green-600'}`}>
                    {description.length}/500 characters
                  </span>
                </div>
              </motion.div>

              {/* File Upload */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3">
                  <Camera className="w-5 h-5 text-orange-600" />
                  <span>Upload Evidence</span>
                  <span className="text-red-500">*</span>
                </label>
                
                <button
                  type="button"
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 w-full ${getFileUploadClass()}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input').click()}
                  aria-label="Upload file by clicking or dragging and dropping"
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      handleFileChange(e.target.files[0]);
                      setCurrentStep(Math.max(currentStep, 5));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
                  />
                  
                  <div className="text-center">
                    {file ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                      >
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-2xl mx-auto shadow-lg"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <Video className="w-16 h-16 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setFilePreview(null);
                          }}
                          className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-4 h-4" />
                          <span>Remove</span>
                        </motion.button>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                        >
                          <Upload className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <p className="text-lg font-medium text-gray-900 mb-2">
                            Drop your file here or click to browse
                          </p>
                          <p className="text-gray-500">
                            Support for images and videos up to 10MB
                          </p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <ImageIcon className="w-4 h-4" />
                            <span>JPG, PNG, GIF</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="w-4 h-4" />
                            <span>MP4, MOV, AVI</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {errors.file && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{errors.file}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div className="pt-8">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Submitting Report...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>Submit Infrastructure Report</span>
                      <Sparkles className="w-6 h-6" />
                    </>
                  )}
                </motion.button>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-gray-500 mt-4 flex items-center justify-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Your report will be reviewed within 24-48 hours</span>
                </motion.p>
              </motion.div>
            </form>
          </motion.div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "Secure & Anonymous",
                description: "Your personal information is protected and reports can be submitted anonymously.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Real-time Tracking",
                description: "Track the status of your reports and get updates on resolution progress.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Star,
                title: "Community Impact",
                description: "Earn community points and badges for contributing to infrastructure improvements.",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Report;