import { useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  MapPin,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  FileText,
  X,
  Edit,
  Trash2,
  ExternalLink,
  Image,
  ChevronDown,
  Grid,
  List
} from 'lucide-react';

function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");

  const { authenticatedFetch } = useAuth();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch("http://localhost:5000/api/reports");
      const data = await response.json();

      if (response.ok) {
        setReports(data.reports);
        setError(null);
      } else {
        setError("Failed to Load reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: 'from-yellow-400 to-orange-500',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: Clock,
        label: 'Pending'
      },
      'in-progress': {
        color: 'from-blue-400 to-purple-500',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: Activity,
        label: 'In Progress'
      },
      resolved: {
        color: 'from-green-400 to-emerald-500',
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'Resolved'
      }
    };
    return configs[status] || configs.pending;
  };

  const filteredReports = reports
    .filter(report => {
      const matchesStatus = filterStatus === "all" || report.status === filterStatus;
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const statusCounts = {
    all: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    'in-progress': reports.filter(r => r.status === "in-progress").length,
    resolved: reports.filter(r => r.status === "resolved").length
  };

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
                Loading Reports...
              </h2>
              <p className="text-gray-500 mt-2">Fetching community reports</p>
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
                onClick={fetchReports}
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
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Community Reports 📋
              </h1>
              <p className="text-xl text-blue-200">
                Monitor and manage infrastructure reports from the community
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-200">{reports.length} Total Reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-300" />
                  <span className="text-blue-200">{statusCounts['in-progress']} Active</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={fetchReports}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
              </select>

              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <motion.button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Object.entries(statusCounts).map(([status, count]) => {
              const config = getStatusConfig(status);
              const isActive = filterStatus === status;
              
              return (
                <motion.button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status !== 'all' && <config.icon className="w-4 h-4" />}
                  <span className="capitalize">
                    {status === 'all' ? 'All Reports' : config.label}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isActive ? 'bg-white/20' : 'bg-white'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Reports Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }
          >
            {filteredReports.map((report, index) => {
              const statusConfig = getStatusConfig(report.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedReport(report)}
                  className={`group cursor-pointer bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {/* Image Section */}
                  <div className={`relative ${viewMode === "list" ? "w-48 h-32" : "w-full h-48"} bg-gray-100 overflow-hidden`}>
                    {report.file_name ? (
                      <img
                        src={`/uploads/${report.file_name}`}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300/e5e7eb/9ca3af?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-gray-500 transition-colors">
                        <div className="text-center">
                          <Image className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Badge Overlay */}
                    <div className="absolute top-3 right-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${statusConfig.bg} ${statusConfig.text} border border-white/50`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{report.status.replace('-', ' ')}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {report.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {report.created_at 
                            ? new Date(report.created_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })
                            : 'No date'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="capitalize">{report.category || 'General'}</span>
                      </div>
                    </div>

                    {viewMode === "list" && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{report.location || 'Location not specified'}</span>
                        </div>
                        
                        <motion.button
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50"
          >
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 mb-2">No Reports Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'No reports match your current filters'}
            </p>
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm("")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Enhanced Report Detail Modal */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedReport(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedReport.title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {selectedReport.created_at 
                            ? new Date(selectedReport.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : 'No date'
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{selectedReport.reporter || 'Anonymous'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedReport(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Modal Body */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="p-6">
                    {/* Image Section */}
                    <div className="w-full h-80 bg-gray-100 rounded-2xl mb-6 overflow-hidden">
                      {selectedReport.file_name ? (
                        <img
                          src={`/uploads/${selectedReport.file_name}`}
                          alt={selectedReport.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Available";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <Image className="w-20 h-20 mx-auto mb-4" />
                            <p className="text-xl">No Image Available</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status and Category Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${getStatusConfig(selectedReport.status).color}`}>
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Status</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">
                              {selectedReport.status.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Category</p>
                            <p className="text-lg font-bold text-gray-900 capitalize">
                              {selectedReport.category || 'General'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Location</p>
                            <p className="text-lg font-bold text-gray-900">
                              {selectedReport.location || 'Not specified'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedReport.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit className="w-4 h-4" />
                        <span>Update Status</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark as Resolved</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span>View on Map</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Details</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Reports;
