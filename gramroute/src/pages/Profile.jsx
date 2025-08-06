import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

function Profile() {
  const { user, authenticatedFetch, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
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

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await authenticatedFetch(
        "http://localhost:5000/api/user/stats"
      );
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
      const response = await authenticatedFetch(
        "http://localhost:5000/api/user/profile",
        {
          method: "PUT",
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                  📷
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {user?.username}
                    </h1>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-green-600 font-medium">
                      Community Score: {userStats.score} points
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                    <button
                      onClick={logout}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg-col-span-1">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Reports</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {userStats.totalReports}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending</span>
                  <span className="text-2xl font-semibold text-yellow-600">
                    {userStats.pendingReports}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Resolved</span>
                  <span className="text-2xl font-semibold text-green-600">
                    {userStats.resolvedReports}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Community Rank</span>
                    <span className="text-lg font-semibold text-purple-600">
                      #{Math.floor(userStats.score / 10) + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-9 mb-4">
                {isEditing ? "Edit Profile" : "Profile Information"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FirstName
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LastName
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="tel"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                
                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={(handleSaveProfile)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                  
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
