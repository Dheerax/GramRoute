import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard">
                <h1 className="text-xl font-bold text-gray-800">
                  <span className="text-blue-600">Gram</span>Route
                </h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard') || isActive('/')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/report')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Report Issue
              </Link>
              <Link
                to="/reports"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/reports')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Reports
              </Link>
              <Link
                to="/map"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/map')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Map View
              </Link>
              <Link
                to="/analytics"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/analytics')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Analytics
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
                <span className="sr-only">View Notifications</span>
                <FontAwesomeIcon icon={faBell} className="h-4 w-4" />
              </button>
              <div className="ml-3">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard') || isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/report" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/report')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Report Issue
            </Link>
            <Link 
              to="/reports" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/reports')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              All Reports
            </Link>
            <Link 
              to="/analytics" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/analytics')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analytics
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
