import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";
import MagneticButton from "./MagneticButtonProps";

const countries = [
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    code: "in",
    name: "India",
    flag: "🇮🇳",
  },
  {
    code: "us",
    name: "United States",
    flag: "🇺🇸",
  },
  {
    code: "ae",
    name: "UAE",
    flag: "🇦🇪",
  },
];

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const desktopCountryRef = useRef(null);
  const mobileCountryRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Hide top header when scrolled down
      if (window.scrollY > 50) {
        setShowTopHeader(false);
      } else {
        setShowTopHeader(true);
      }

      // Navbar shadow effect
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktop =
        desktopCountryRef.current &&
        desktopCountryRef.current.contains(event.target);

      const clickedMobile =
        mobileCountryRef.current &&
        mobileCountryRef.current.contains(event.target);

      if (!clickedDesktop && !clickedMobile) {
        setCountryOpen(false);
      }

      // other dropdowns
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links with updated colors
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    {
      id: "services",
      label: "Services",
      dropdown: [
        {
          id: "hrms_software",
          label: "HRMS Software",
          path: "/service/hrms-software",
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
        { id: "careers", label: "Careers", path: "/cms/careers" },
      ],
    },
    { id: "pricing", label: "Pricing", path: "/pricing" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contacts", path: "/contact" },
  ];

  // Contact info for top header
  const contactInfo = [
    { icon: <Phone className="w-4 h-4" />, text: "07467284718/02081291655" },
    // { icon: <Mail className="w-4 h-4" />, text: "info@example.com" },
    // { icon: <MapPin className="w-4 h-4" />, text: "123 Business St, City" },
  ];

  // Social icons for top header
  const socialIcons = [
    {
      icon: <Facebook className="w-4 h-4" />,
      url: "#",
      color: "hover:text-[#2EC5FF]",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      url: "#",
      color: "hover:text-[#2EC5FF]",
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      url: "#",
      color: "hover:text-[#FF4D8D]",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      url: "#",
      color: "hover:text-[#2EC5FF]",
    },
    {
      icon: <Youtube className="w-4 h-4" />,
      url: "#",
      color: "hover:text-[#FF1F1F]",
    },
  ];

  // Helper functions for dropdown management
  const getParentDropdownId = (dropdownId) => {
    if (dropdownId.includes("-sub-")) {
      const parts = dropdownId.split("-sub-");
      return parts[0];
    }
    return null;
  };

  const isChildDropdown = (childId, parentId) => {
    return childId.startsWith(parentId + "-sub-");
  };

  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      const newState = { ...prev };

      if (!dropdownId.includes("-sub-")) {
        Object.keys(newState).forEach((key) => {
          if (key !== dropdownId && !key.includes("-sub-")) {
            newState[key] = false;
            Object.keys(newState).forEach((subKey) => {
              if (isChildDropdown(subKey, key)) {
                newState[subKey] = false;
              }
            });
          }
        });
      } else {
        const parentId = getParentDropdownId(dropdownId);
        Object.keys(newState).forEach((key) => {
          if (key !== dropdownId && getParentDropdownId(key) === parentId) {
            newState[key] = false;
            Object.keys(newState).forEach((nestedKey) => {
              if (isChildDropdown(nestedKey, key)) {
                newState[nestedKey] = false;
              }
            });
          }
        });
      }

      newState[dropdownId] = !prev[dropdownId];
      return newState;
    });
  };

  const handleNavClick = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  // Render dropdown items recursively
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];

    return (
      <div key={item.id} className="relative group">
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-[#F2EEFF] cursor-pointer transition-colors ${
              level > 1 ? "pl-8" : ""
            } ${isOpen ? "text-[#9B3DFF]" : "text-[#333333]"}`}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <RouterLink
            to={item.path}
            className={`block px-4 py-2 text-sm hover:bg-[#F2EEFF] transition-colors ${
              level > 1 ? "pl-8" : ""
            } text-[#333333] hover:text-[#9B3DFF]`}
            onClick={() => setOpenDropdowns({})}
          >
            {item.label}
          </RouterLink>
        )}

        {hasSubDropdown && isOpen && (
          <div className="bg-[#FAFAFF] border-l-2 border-[#9B3DFF] ml-2">
            {item.dropdown.map((subItem) =>
              renderDropdownItem(subItem, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  // Render navigation item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = location.pathname === item.path;

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
      >
        {hasDropdown ? (
          <div
            className={`font-semibold hover:text-[#D00EFF] cursor-pointer transition-colors px-2 py-1 flex items-center space-x-1 ${
              isOpen
                ? "text-[#D00EFF]"
                : isActive
                  ? "text-[#D00EFF]"
                  : "text-[#333333]"
            }`}
            onClick={() => toggleDropdown(item.id)}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <RouterLink
            to={item.path}
            className={`font-semibold hover:text-[#D00EFF] transition-colors px-2 py-1 flex items-center space-x-1 ${
              isActive ? "text-[#D00EFF]" : "text-[#333333]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.label}
          </RouterLink>
        )}

        {hasDropdown && isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#F2EEFF] rounded-lg shadow-lg z-50">
            <div className="py-2">
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
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Header - Contact Info & Social Icons */}
      <div
        className={`bg-[#111111] text-white transition-all duration-300 ${
          showTopHeader ? "h-18 opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-8 h-full flex justify-between items-center">
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm text-white hover:text-white transition-colors cursor-pointer"
              >
                {info.icon}
                <span>{info.text}</span>
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`text-[#777777] ${social.color} transition-colors duration-200`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "shadow-lg " : ""
        }`}
        style={{
          backgroundImage: "linear-gradient(to right, #f7dbff, #e4f8fb)",
        }}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/image/swch_logo.png"
                alt="Logo"
                className="w-30 h-20 object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => renderNavItem(item))}

            {/* Country Selector - Updated */}
            <div className="relative" ref={desktopCountryRef}>
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    countryOpen
                      ? "bg-white/90 shadow-md border border-[#F2EEFF]"
                      : "hover:bg-white/80 hover:shadow-sm border border-transparent hover:border-[#E6E0FF]"
                  }
                  backdrop-blur-sm
                `}
              >
                <span className="text-xl">{selectedCountry.flag}</span>
                <span className="text-sm font-semibold text-gray-800 hidden lg:inline">
                  {selectedCountry.name}
                </span>
                <ChevronDown
                  size={16}
                  className={`
                    transition-transform duration-200 text-gray-600
                    ${countryOpen ? "rotate-180 text-[#9B3DFF]" : ""}
                  `}
                />
              </button>

              {countryOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-[#F2EEFF] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 px-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Select Country
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setCountryOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left
                          ${
                            selectedCountry.code === country.code
                              ? "bg-[#F8F5FF] text-[#9B3DFF]"
                              : "hover:bg-[#F2EEFF] text-gray-800 hover:text-[#9B3DFF]"
                          }
                        `}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="font-medium flex-1">
                          {country.name}
                        </span>
                        {selectedCountry.code === country.code && (
                          <div className="w-2 h-2 rounded-full bg-[#9B3DFF]"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="
    bg-gradient-to-r from-[#E60023] to-[#B8001B]
    text-white
    px-4 py-2
    rounded-lg
    font-bold
    text-lg
    transition-all duration-300
    hover:shadow-xl hover:shadow-red-200
    hover:-translate-y-1
    focus:outline-none
  "
            >
              Explore SponicHR Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Country Selector */}
            <div className="relative" ref={mobileCountryRef}>
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className="flex items-center gap-1 p-2 rounded-lg bg-white/50 backdrop-blur-sm"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    countryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {countryOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setCountryOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium">
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="text-[#333333] focus:outline-none cursor-pointer hover:text-[#9B3DFF] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="announcement-bar shadow-md">
        <div className="container mx-auto px-8 h-full flex justify-between items-center ">
          <div className="announcement-note">NOTE:</div>

          <div className="announcement-marquee">
            <div className="announcement-track">
              Specialised Cloud-Based HR And Recruitment Systems. Comply with HR
              rules and develop your business infrastructure — try our
              cutting-edge software for a month free trial. To register your
              company click on&nbsp;
              <a
                href="http://www.skilledworkerscloud.co.uk/hrms/"
                target="_blank"
                rel="noopener noreferrer"
                className="announcement-link"
              >
                SWC HRMS Software
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
