import { useState, useEffect } from "react";
import { useAuth } from './AuthContext'


function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {authenticatedFetch} = useAuth();
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

  if (loading) {
    return (
      <div className="min-h screen bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb--4">
            Loading Reports...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchReports}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((report) => report.status === filterStatus);

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Reports</h1>
        <p className="text-gray-600">View and manage community reports</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filterStatus === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Reports {reports.length}
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filterStatus === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Pending ({reports.filter((r) => r.status === "pending").length})
        </button>
        <button
          onClick={() => setFilterStatus("in-progress")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filterStatus === "in-progress"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          In Progress (
          {reports.filter((r) => r.status === "in-progress").length})
        </button>
        <button
          onClick={() => setFilterStatus("resolved")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filterStatus === "resolved"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Resolved ({reports.filter((r) => r.status === "resolved").length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 w-full text-left"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              {report.file_name ? (
                <img
                  src={`/uploads/${report.file_name}`}
                  alt={report.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300/gray/white?text=No+Image+Available";
                  }}
                />
              ) : (
                <div className="text-gray-500 text-center">
                  <span className="text-4xl">📷</span>
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {report.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {report.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="capitalize">{report.category}</span>
                <span>
                  {/* Fix this date too */}
                  {report.created_at
                    ? new Date(report.created_at).toLocaleDateString()
                    : report.date || "No date"}
                </span>
              </div>
            </div>
          </button>
        ))}

        {/* Pop Up report */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedReport.title}
                </h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  X
                </button>
              </div>
              <div className="p-6">
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {selectedReport.file_name ? (
                    <img
                      src={`/uploads/${selectedReport.file_name}`}
                      alt={selectedReport.title}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400/gray/white?text=Image+Not+Available";
                      }}
                    />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <span className="text-6xl">📷</span>
                      <p className="mt-2">No Image Available</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        selectedReport.status
                      )}`}
                    >
                      {selectedReport.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Category:
                    </span>
                    <span className="ml-2 text-sm text-gray-700">
                      {selectedReport.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Reporter:
                    </span>
                    <span className="ml-2 text-sm text-gray-700">
                      {selectedReport.reporter}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Date:
                    </span>
                    <span className="ml-2 text-sm text-gray-700">
                      {/* Fix the date display */}
                      {selectedReport.created_at
                        ? new Date(
                            selectedReport.created_at
                          ).toLocaleDateString()
                        : selectedReport.date || "No date"}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedReport.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Location
                  </h3>
                  <p className="text-gray-600">
                    {selectedReport.location || "Location not specified"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Update Status
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Mark as Resolved
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
