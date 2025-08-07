import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  Camera,
  Trophy,
  Award,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  BarChart3,
  Target,
  Crown,
  Zap,
  Activity,
  Settings,
  Download,
  Share2,
  Heart,
  Plus
} from 'lucide-react';

function Profile() {
  const { user, authenticatedFetch } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [userStats, setUserStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    score: user?.score || 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await authenticatedFetch("http://localhost:5000/api/user/stats");
      const data = await response.json();
      if (response.ok) {
        setUserStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const response = await authenticatedFetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsEditing(false);
        // Add success animation here
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const getUserLevel = (score) => {
    if (score >= 1000) return { level: 'Diamond', color: 'from-cyan-400 to-blue-600', icon: Crown };
    if (score >= 500) return { level: 'Gold', color: 'from-yellow-400 to-orange-500', icon: Trophy };
    if (score >= 200) return { level: 'Silver', color: 'from-gray-300 to-gray-500', icon: Award };
    return { level: 'Bronze', color: 'from-orange-400 to-red-500', icon: Star };
  };

  const userLevel = getUserLevel(userStats.score);
  const progressToNext = ((userStats.score % 200) / 200) * 100;

  const achievements = [
    { name: 'First Report', description: 'Submitted your first report', earned: userStats.totalReports >= 1, icon: FileText },
    { name: 'Community Helper', description: 'Helped resolve 5 issues', earned: userStats.resolvedReports >= 5, icon: Heart },
    { name: 'Top Contributor', description: 'Scored 500+ points', earned: userStats.score >= 500, icon: Crown },
    { name: 'Problem Solver', description: 'Resolved 10+ reports', earned: userStats.resolvedReports >= 10, icon: Target },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-gradient-to-r from-blue-500 to-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading Profile...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section with Cover */}
      <div className="relative h-96 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 flex items-center justify-center min-h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            {/* Profile Picture */}
            <div className="relative mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white/20">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 -z-10" />
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 bg-white text-gray-700 rounded-full p-3 shadow-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>

            {/* User Info */}
            <div className="text-white mb-6">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {user?.username || 'User'}
              </h1>
              <p className="text-blue-200 text-lg mb-3">{user?.email}</p>
              
              {/* Level Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r ${userLevel.color} text-white shadow-2xl`}
              >
                <userLevel.icon className="w-5 h-5" />
                <span className="font-bold">{userLevel.level} Member</span>
                <Zap className="w-4 h-4" />
                <span>{userStats.score} pts</span>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Profile</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Reports', value: userStats.totalReports, icon: FileText, color: 'from-blue-500 to-cyan-500', change: '+12%' },
            { title: 'Resolved', value: userStats.resolvedReports, icon: CheckCircle, color: 'from-green-500 to-emerald-500', change: '+8%' },
            { title: 'Pending', value: userStats.pendingReports, icon: Clock, color: 'from-yellow-500 to-orange-500', change: '+3%' },
            { title: 'Community Rank', value: `#${Math.floor(userStats.score / 10) + 1}`, icon: Trophy, color: 'from-purple-500 to-pink-500', change: '+2' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200/50 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                {stat.title}
              </h3>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 mb-8"
        >
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Profile' : 'Profile Information'}
                      </h2>
                      {isEditing && (
                        <motion.button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {saving ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Username', key: 'username', icon: User, type: 'text' },
                        { label: 'Email', key: 'email', icon: Mail, type: 'email' },
                        { label: 'First Name', key: 'firstName', icon: User, type: 'text' },
                        { label: 'Last Name', key: 'lastName', icon: User, type: 'text' },
                        { label: 'Phone', key: 'phone', icon: Phone, type: 'tel', span: 2 },
                        { label: 'Address', key: 'address', icon: MapPin, type: 'text', span: 2 },
                      ].map((field) => (
                        <motion.div
                          key={field.key}
                          className={field.span === 2 ? 'md:col-span-2' : ''}
                          whileHover={isEditing ? { scale: 1.02 } : {}}
                        >
                          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                            <field.icon className="w-4 h-4 text-gray-500" />
                            <span>{field.label}</span>
                          </label>
                          <input
                            type={field.type}
                            value={profileData[field.key]}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                [field.key]: e.target.value,
                              })
                            }
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                              isEditing
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Level Progress & Recent Activity */}
                <div className="space-y-6">
                  {/* Level Progress */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Level Progress
                    </h3>
                    
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${userLevel.color} text-white`}>
                        <userLevel.icon className="w-4 h-4" />
                        <span className="font-bold">{userLevel.level}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress to next level</span>
                        <span>{Math.round(progressToNext)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressToNext}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        {200 - (userStats.score % 200)} more points to next level
                      </p>
                    </div>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-purple-600" />
                      Quick Actions
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { label: 'View My Reports', icon: FileText, color: 'from-blue-500 to-blue-600' },
                        { label: 'Submit New Report', icon: Plus, color: 'from-green-500 to-green-600' },
                        { label: 'Download Data', icon: Download, color: 'from-purple-500 to-purple-600' },
                        { label: 'Account Settings', icon: Settings, color: 'from-gray-500 to-gray-600' },
                      ].map((action, index) => (
                        <motion.button
                          key={action.label}
                          className={`w-full flex items-center space-x-3 p-3 bg-gradient-to-r ${action.color} text-white rounded-xl hover:shadow-lg transition-all duration-200`}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <action.icon className="w-4 h-4" />
                          <span className="font-medium">{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
                  Achievements & Badges
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`inline-flex p-4 rounded-full mb-4 ${
                          achievement.earned 
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          <achievement.icon className="w-8 h-8" />
                        </div>
                        
                        <h3 className={`font-bold text-lg mb-2 ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h3>
                        
                        <p className={`text-sm ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>

                        {achievement.earned && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="mt-4 inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Earned</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Profile;
