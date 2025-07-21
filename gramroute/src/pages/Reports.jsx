import { useState } from "react";

function Reports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Pothole on Main Street",
      description:
        "Large pothole causing traffic issues and potential vehicle damage. Located near the intersection with Oak Avenue.",
      status: "pending",
      date: "2025-07-20",
      location: { lat: 40.7128, lng: -74.006 },
      image: "",
      reporter: "John Doe",
      category: "Road Infrastructure",
    },
    {
      id: 2,
      title: "Broken Street Light",
      description:
        "Street light has been out for 3 days, making the area unsafe for pedestrians at night.",
      status: "in-progress",
      date: "2025-07-19",
      location: { lat: 40.7589, lng: -73.9851 },
      image: "https://via.placeholder.com/400x300?text=Street+Light",
      reporter: "Jane Smith",
      category: "Public Safety",
    },
    {
      id: 3,
      title: "Garbage Dump on Roadside",
      description:
        "Illegal dumping of construction waste blocking part of the sidewalk and creating health hazards.",
      status: "resolved",
      date: "2025-07-18",
      location: { lat: 40.7505, lng: -73.9934 },
      image: "https://via.placeholder.com/400x300?text=Garbage+Dump",
      reporter: "Mike Johnson",
      category: "Waste Management",
    },
    {
      id: 4,
      title: "Water Leak",
      description:
        "Water main leak causing flooding on the street and potential water damage to nearby properties.",
      status: "pending",
      date: "2025-07-17",
      location: { lat: 40.7282, lng: -74.0776 },
      image: "https://via.placeholder.com/400x300?text=Water+Leak",
      reporter: "Sarah Wilson",
      category: "Utilities",
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((report) => report.status === filterStatus)

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800"
  }
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
          <div
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-48 object-cover"
            />
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
                <span>{report.category}</span>
                <span>{report.date}</span>
              </div>
            </div>
          </div>
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
                <img
                  src={selectedReport.image}
                  alt={selectedReport.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />

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
                      {selectedReport.date}
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
                    Latitude: {selectedReport.location.lat},{" "}
                    {selectedReport.location.lng}
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
