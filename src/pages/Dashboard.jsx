import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Plus,
  Eye,
  Edit,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Users,
  Activity
} from 'lucide-react';

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authenticatedFetch, user } = useAuth();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState({
    totalReports: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch("http://localhost:5000/api/reports");
      const data = await response.json();

      if (response.ok) {
        const allReports = data.reports;
        setReports(allReports);
        
        const stats = {
          totalReports: allReports.length,
          pending: allReports.filter((r) => r.status === "pending").length,
          inProgress: allReports.filter((r) => r.status === "in-progress").length,
          resolved: allReports.filter((r) => r.status === "resolved").length,
        };

        setStats(stats);
        setError(null);
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to Connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: 'from-yellow-400 to-orange-500',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: Clock
      },
      'in-progress': {
        color: 'from-blue-400 to-purple-500',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: Activity
      },
      resolved: {
        color: 'from-green-400 to-emerald-500',
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: CheckCircle
      }
    };
    return configs[status] || configs.pending;
  };

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.totalReports,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-500',
      change: '+5%',
      changeType: 'neutral'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Activity,
      gradient: 'from-purple-500 to-pink-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
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
                Loading Dashboard...
              </h2>
              <p className="text-gray-500 mt-2">Fetching your latest data</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-red-200/50"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <motion.button
                onClick={fetchDashboardData}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Try Again
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back, {user?.username}! 👋
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Here's what's happening with your infrastructure reports
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/report')}
              >
                <Plus className="w-4 h-4" />
                <span>New Report</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden group"
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      card.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {card.change}
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {card.title}
                  </h3>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Reports</h2>
                <p className="text-gray-500">Monitor and manage your infrastructure reports</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/reports')}
                >
                  <Eye className="w-4 h-4" />
                  <span>View All</span>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wide text-sm">Title</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wide text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wide text-sm">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase tracking-wide text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {reports.slice(0, 10).map((report, index) => {
                    const statusConfig = getStatusConfig(report.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <motion.tr
                        key={report.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-200/50 hover:bg-blue-50/50 transition-all duration-200 group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                              <FileText className={`w-4 h-4 ${statusConfig.text}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {report.title}
                              </p>
                              <p className="text-sm text-gray-500">ID: #{report.id}</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            <span className="capitalize">{report.status.replace('-', ' ')}</span>
                          </motion.div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(report.created_at)}</span>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">No reports yet</h3>
              <p className="text-gray-400">Create your first report to get started</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
