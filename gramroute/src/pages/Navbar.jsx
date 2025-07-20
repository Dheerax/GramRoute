import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">
                <span className="text-black">Gram</span>Route
              </h1>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-0">
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Report Issue
              </a>
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Map View
              </a>
              <a
                href="#dashboard"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Analytics
              </a>
            </div>
          </div>

					<div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
							<button className="rounded-full text-gray-400 hover:text-yellow-400">
								<span className="sr-only">View Notifications</span>
								<FontAwesomeIcon icon={faBell} className="h-5 w-5"></FontAwesomeIcon>
							</button>
							<div className="ml-3">
								<button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
									Profile
								</button>
							</div>
						</div>
					</div>

					<div className="md:hidden">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-gray-600 hover:text-blue-600 p-2">
								<FontAwesomeIcon icon={faBars} className="h-5 w-5"></FontAwesomeIcon>
							</button>
					</div>
        </div>
      </div>

			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb=3 space-y-1 sm:px-3 bg-gray-50">
						<a href="#dashboard" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
							Dashboard
						</a>
						<a href="#dashboard" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
							Report Issue
						</a>
						<a href="#dashboard" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
							Dashboard
						</a>
						<a href="#dashboard" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
							Analytics
						</a>
					</div>
				</div>
			)}
    </nav>
  );
}

export default Navbar;
