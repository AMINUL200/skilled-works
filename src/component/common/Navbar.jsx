import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
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
  Contact,
  ChevronRight,
} from "lucide-react";
import MagneticButton from "./MagneticButtonProps";
import { useCountry } from "../../context/CountryContext";

const countries = [
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    redirect: "https://skilledworkerscloud.co.uk/",
  },
  {
    code: "bd",
    name: "Bangladesh",
    flag: "🇧🇩",
    redirect: null,
  },
];

const Navbar = ({
  toggleMenu,
  noteData = {},
  serviceData = [],
  siteLogo = null,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [countryOpen, setCountryOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  
  const desktopCountryRef = useRef(null);
  const mobileCountryRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { country, updateCountry } = useCountry();

  const getUICountry = (countryName) => {
    return countries.find((c) => c.name === countryName);
  };

  const selectedCountry = getUICountry(country?.country) || countries[0];

  const handleCountrySelect = (item) => {
    if (item.redirect) {
      window.location.href = item.redirect;
    } else {
      updateCountry(item.name);
    }
    setCountryOpen(false);
    setMobileMenuOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTopHeader(false);
      } else {
        setShowTopHeader(true);
      }

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
      const clickedDesktop = desktopCountryRef.current?.contains(event.target);
      const clickedMobile = mobileCountryRef.current?.contains(event.target);
      const clickedServices = servicesDropdownRef.current?.contains(event.target);

      if (!clickedDesktop && !clickedMobile && !clickedServices) {
        setCountryOpen(false);
        setServicesHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Navigation links
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    {
      id: "services",
      label: "Services",
      path: "/services",
      dropdown: serviceData.map((service) => ({
        id: service.slug,
        label: service.name,
        path: `/service/${service.slug}`,
      })),
    },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Contact info for top header
  const contactInfo = [
    { icon: <Phone className="w-3 h-3 sm:w-4 sm:h-4" />, text: `${country?.phone}/${country?.landline}` },
    { icon: <Mail className="w-3 h-3 sm:w-4 sm:h-4" />, text: `${country?.email}` },
  ];

  // Social icons for top header
  const socialIcons = [
    { icon: <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />, url: country?.facebook, color: "hover:text-[#2EC5FF]" },
    { icon: <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />, url: country?.twitter, color: "hover:text-[#2EC5FF]" },
    { icon: <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />, url: country?.instagram, color: "hover:text-[#FF4D8D]" },
    { icon: <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />, url: country?.linkedin, color: "hover:text-[#2EC5FF]" },
  ];

  // Toggle mobile dropdown
  const toggleMobileDropdown = (id) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Services hover handlers for desktop
  const handleServicesMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setServicesHover(true);
  };

  const handleServicesMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setServicesHover(false);
    }, 200);
  };

  const handleServicesClick = () => {
    navigate("/services");
    setServicesHover(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setMobileDropdowns({});
  };

  // Render mobile menu items
  const renderMobileMenuItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = mobileDropdowns[item.id];
    const isActive = location.pathname === item.path;

    if (hasDropdown) {
      return (
        <div key={item.id} className="border-b border-gray-100">
          <button
            onClick={() => toggleMobileDropdown(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left font-medium transition-colors ${
              isActive ? "text-[#9B3DFF]" : "text-gray-700"
            }`}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="bg-gray-50">
              {item.dropdown.map((subItem) => (
                <RouterLink
                  key={subItem.id}
                  to={subItem.path}
                  className="block px-8 py-2 text-sm text-gray-600 hover:text-[#9B3DFF] hover:bg-gray-100 transition-colors"
                  onClick={() => handleNavClick(subItem.path)}
                >
                  {subItem.label}
                </RouterLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <RouterLink
        key={item.id}
        to={item.path}
        className={`block px-4 py-3 border-b border-gray-100 font-medium transition-colors ${
          isActive ? "text-[#9B3DFF]" : "text-gray-700 hover:text-[#9B3DFF]"
        }`}
        onClick={() => handleNavClick(item.path)}
      >
        {item.label}
      </RouterLink>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Header - Contact Info & Social Icons */}
      <div
        className={`bg-[#111111] text-white transition-all duration-300 ${
          showTopHeader ? "py-2 sm:py-3" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white cursor-pointer"
                >
                  {info.icon}
                  <span className="truncate max-w-[150px] sm:max-w-none">{info.text}</span>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{
          backgroundImage: "linear-gradient(to right, #f7dbff, #e4f8fb)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src={
                    country?.site_web_logo
                      ? `${STORAGE_URL}${country?.site_web_logo}`
                      : "/image/swch_logo.png"
                  }
                  alt="Logo"
                  className="w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((item) => {
                if (item.id === "services") {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      ref={servicesDropdownRef}
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                    >
                      <div
                        className={`font-semibold hover:text-[#D00EFF] transition-colors px-2 py-1 flex items-center gap-1 cursor-pointer ${
                          servicesHover || location.pathname === item.path ? "text-[#D00EFF]" : "text-[#333333]"
                        }`}
                        onClick={handleServicesClick}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            servicesHover ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {servicesHover && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#F2EEFF] rounded-lg shadow-lg z-50">
                          <div className="py-2">
                            {item.dropdown.map((dropdownItem) => (
                              <RouterLink
                                key={dropdownItem.id}
                                to={dropdownItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F2EEFF] hover:text-[#9B3DFF] transition-colors"
                                onClick={() => {
                                  setServicesHover(false);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {dropdownItem.label}
                              </RouterLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <RouterLink
                    key={item.id}
                    to={item.path}
                    className={`font-semibold hover:text-[#D00EFF] transition-colors px-2 py-1 ${
                      isActive ? "text-[#D00EFF]" : "text-[#333333]"
                    }`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </RouterLink>
                );
              })}

              {/* Country Selector - Desktop */}
              <div className="relative" ref={desktopCountryRef}>
                <button
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/80"
                >
                  <span className="text-lg sm:text-xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-semibold text-gray-800 hidden xl:inline">
                    {selectedCountry.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      countryOpen ? "rotate-180 text-[#9B3DFF]" : ""
                    }`}
                  />
                </button>

                {countryOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#F2EEFF] overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 px-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          Select Country
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      {countries.map((countryItem) => (
                        <button
                          key={countryItem.code}
                          onClick={() => handleCountrySelect(countryItem)}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left ${
                            selectedCountry.code === countryItem.code
                              ? "bg-[#F8F5FF] text-[#9B3DFF]"
                              : "hover:bg-[#F2EEFF] text-gray-800"
                          }`}
                        >
                          <span className="text-xl">{countryItem.flag}</span>
                          <span className="font-medium flex-1">
                            {countryItem.name}
                          </span>
                          {selectedCountry.code === countryItem.code && (
                            <div className="w-2 h-2 rounded-full bg-[#9B3DFF]"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-4 py-2 rounded-lg font-bold text-sm lg:text-base transition-all duration-300 hover:shadow-xl hover:shadow-red-200 hover:-translate-y-1 whitespace-nowrap">
                Explore SponicHR Now
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Country Selector */}
              <div className="relative" ref={mobileCountryRef}>
                <button
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-1 p-2 rounded-lg bg-white/50 backdrop-blur-sm"
                >
                  <span className="text-base sm:text-lg">{selectedCountry.flag}</span>
                  <ChevronDown size={14} className={`transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                </button>

                {countryOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                    {countries.map((countryItem) => (
                      <button
                        key={countryItem.code}
                        onClick={() => handleCountrySelect(countryItem)}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition"
                      >
                        <span className="text-lg">{countryItem.flag}</span>
                        <span className="text-sm font-medium">{countryItem.name}</span>
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
                {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="py-2">
              {navLinks.map((item) => {
                if (item.id === "services") {
                  const isServicesOpen = mobileDropdowns[item.id];
                  return (
                    <div key={item.id} className="border-b border-gray-100">
                      <button
                        onClick={() => toggleMobileDropdown(item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-700"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isServicesOpen && (
                        <div className="bg-gray-50">
                          <RouterLink
                            to="/services"
                            className="block px-8 py-2 text-sm text-gray-600 hover:text-[#9B3DFF] hover:bg-gray-100 transition-colors"
                            onClick={() => handleNavClick("/services")}
                          >
                            View All Services
                          </RouterLink>
                          {item.dropdown.map((subItem) => (
                            <RouterLink
                              key={subItem.id}
                              to={subItem.path}
                              className="block px-8 py-2 text-sm text-gray-600 hover:text-[#9B3DFF] hover:bg-gray-100 transition-colors"
                              onClick={() => handleNavClick(subItem.path)}
                            >
                              {subItem.label}
                            </RouterLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return renderMobileMenuItem(item);
              })}

              {/* Mobile CTA Button */}
              <div className="p-4">
                <button className="w-full bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:shadow-lg">
                  Explore SponicHR Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Announcement Bar */}
      <div className="announcement-bar shadow-md bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-b border-yellow-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="announcement-note text-xs sm:text-sm font-bold text-red-600 whitespace-nowrap">
              NOTE:
            </div>
            <div className="announcement-marquee flex-1 text-center">
              <div className="announcement-track text-xs sm:text-sm text-gray-700">
                {noteData?.note}&nbsp;
                <a
                  href="https://skilledworkerscloud.co.uk/hrms-v2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-link text-red-600 font-semibold hover:underline"
                >
                  SWC HRMS Software
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;