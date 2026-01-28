import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Info,
  Briefcase,
  DollarSign,
  BookOpen,
  Mail,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar navigation links - Updated to match navbar structure
  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "about",
      label: "About Us",
      path: "/about",
      icon: <Info className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      dropdown: [
        {
          id: "hrms_software",
          label: "HRMS Software",
          path: "/cms/hrms-software",
        },
        {
          id: "hr_file_preparation",
          label: "HR File Preparation",
          path: "/cms/hr-file-preparation",
        },
        {
          id: "file_manager",
          label: "File Manager",
          path: "/cms/file-manager",
        },
        {
          id: "software_development",
          label: "Software Development",
          path: "/cms/software-development",
        },
        {
          id: "business_consultancy",
          label: "Business Consultancy",
          path: "/cms/business-consultancy",
        },
        {
          id: "web_profile_development",
          label: "Web Profile Development",
          path: "/cms/web-profile-development",
        },
        {
          id: "skilled_workers_industry",
          label: "Skilled Workers Industry",
          path: "/cms/skilled-workers-industry",
        },
        {
          id: "careers",
          label: "Careers",
          path: "/cms/careers",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      path: "/pricing",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "blog",
      label: "Blog",
      path: "/blog",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "contact",
      label: "Contacts",
      path: "/contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  // Auth state
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  // Toggle dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  // Handle navigation
  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
      toggleMenu();
    }
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    toggleMenu();
  };

  // Check if current path matches
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Render dropdown items recursively
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-8"
            } ${
              isOpen
                ? "bg-[#F2EEFF] text-[#9B3DFF] font-medium"
                : "text-[#333333] hover:bg-[#F2EEFF] hover:text-[#9B3DFF]"
            }`}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span>{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-8"
            } ${
              isActive
                ? "bg-[#9B3DFF] text-white font-medium"
                : "text-[#333333] hover:bg-[#F2EEFF] hover:text-[#9B3DFF]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            <span>{item.label}</span>
          </div>
        )}

        {/* Nested dropdown */}
        {hasSubDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#FAFAFF] border-l-2 border-[#9B3DFF] ml-4">
              {item.dropdown.map((subItem) =>
                renderDropdownItem(subItem, level + 1),
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render navigation item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isOpen
                ? "bg-[#F2EEFF] text-[#9B3DFF]"
                : "text-[#333333] hover:bg-[#F2EEFF] hover:text-[#D00EFF]"
            }`}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isActive
                ? "bg-[#9B3DFF] text-white font-semibold"
                : "text-[#333333] hover:bg-[#F2EEFF] hover:text-[#D00EFF]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </div>
        )}

        {/* Dropdown menu */}
        {hasDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1">
              {item.dropdown.map((dropdownItem) =>
                renderDropdownItem(dropdownItem),
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F2EEFF] bg-[#FAFAFF]">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <img
                src="/image/swch_logo.png"
                alt="Logo"
                className="w-24 h-12 object-contain"
              />
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-[#F2EEFF] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-[#333333]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-2 h-[calc(100vh-180px)]">
          {sidebarLinks.map((item) => renderNavItem(item))}

          {/* Auth Button in Sidebar Navigation */}
          <div className="mt-8 px-4">
            <button
              onClick={() => handleNavClick("/login")}
              className="w-full bg-[#E60023] text-white px-6 py-3 rounded-md hover:bg-[#B8001B] transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md"
            >
              <span>Explore SponicHR Now</span>
            </button>
          </div>
        </nav>

        {/* Auth Section - Keeping for dashboard/logout if needed */}
        {isAuthenticated && (
          <div className="border-t border-[#F2EEFF] p-4 bg-[#FAFAFF]">
            {userData?.user_type === 4 && (
              <button
                onClick={handleLogout}
                className="w-full bg-[#FF1F1F] text-white px-6 py-3 rounded-md hover:bg-[#B8001B] transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}

            {userData?.user_type !== 4 && (
              <button
                onClick={() => handleNavClick("/dashboard")}
                className="w-full bg-[#E60023] text-white px-6 py-3 rounded-md hover:bg-[#B8001B] transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBar;
