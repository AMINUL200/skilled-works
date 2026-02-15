import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PopupSection = ({ popupData }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButton1Click = () => {
    if (popupData?.button1_url) {
      window.open(popupData.button1_url, "_blank", "noopener,noreferrer");
    }
    setIsOpen(false);
  };

  const handleButton2Click = () => {
    if (popupData?.button2_url) {
      window.open(popupData.button2_url, "_blank", "noopener,noreferrer");
    }
    setIsOpen(false);
  };

  const popupImage = isMobile
    ? `${STORAGE_URL}${popupData?.mobile_image}`
    : `${STORAGE_URL}${popupData?.web_image}`;

  // Parse description to handle line breaks
  const formattedDescription = popupData?.desc?.replace(/\r\n/g, '<br />');

  return (
    <AnimatePresence>
      {isOpen && popupData?.is_active && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-2 sm:p-4"
          >
            <div className="relative w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[95vh] flex flex-col md:flex-row">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              {/* Mobile: Image First, then Content */}
              {isMobile ? (
                <div className="flex flex-col overflow-auto">
                  {/* Image Section - Top on Mobile */}
                  <div className="relative w-full h-48 sm:h-64">
                    <img
                      src={popupImage}
                      alt={popupData?.image_alt || "HRMS Platform"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", popupImage);
                        e.target.src = "/fallback-image.jpg"; // Add a fallback image
                      }}
                    />
                  </div>

                  {/* Content Section - Scrollable on Mobile */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    <div className="space-y-4 sm:space-y-6">
                      {/* Header */}
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#040d91] mb-2 sm:mb-3"
                         aria-level={popupData?.title_meta}
                        >
                          {popupData?.title || "Explore Our Powerful HRMS Platform!"}
                        </h2>
                      </div>
                      
                      {/* Description */}
                      <div
                        className="text-base md:text-lg text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: formattedDescription || "Looking for a smarter way to manage recruitment, compliance, and employee operations? Access our feature-rich HRMS software built specifically for UK businesses. Streamline your HR processes, ensure compliance, and boost productivity with our comprehensive solution."
                        }}
                        aria-label={popupData?.desc_meta}
                      />

                      {/* CTA Buttons */}
                      <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4">
                        <button
                          onClick={handleButton1Click}
                          className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                        >
                          <span>{popupData?.button1_name || "Visit SponicHR"}</span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </button>

                        <button
                          onClick={handleButton2Click}
                          className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                        >
                          <span>{popupData?.button2_name || "Let's Schedule Demo"}</span>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop: Side by Side */
                <div className="grid md:grid-cols-2 flex-1">
                  {/* Left Side - Image/Illustration */}
                  <div className="relative bg-white p-0">
                    <img
                      src={popupImage}
                      alt={popupData?.image_alt || "HRMS Platform"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", popupImage);
                        e.target.src = "/fallback-image.jpg"; // Add a fallback image
                      }}
                    />
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto">
                    <div className="space-y-6 md:space-y-8">
                      {/* Header */}
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#040d91] mb-2 md:mb-3">
                          {popupData?.title || "Explore Our Powerful HRMS Platform!"}
                        </h2>
                      </div>

                      {/* Main Content */}
                      <div className="space-y-4 md:space-y-6">
                        <div
                          className="text-base md:text-lg text-gray-700"
                          dangerouslySetInnerHTML={{ 
                            __html: formattedDescription || "Looking for a smarter way to manage recruitment, compliance, and employee operations? Access our feature-rich HRMS software built specifically for UK businesses. Streamline your HR processes, ensure compliance, and boost productivity with our comprehensive solution."
                          }}
                        />
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6">
                        <button
                          onClick={handleButton1Click}
                          className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                        >
                          <span>{popupData?.button1_name || "Visit SponicHR"}</span>
                        </button>

                        <button
                          onClick={handleButton2Click}
                          className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                        >
                          <span>{popupData?.button2_name || "Let's Schedule a Demo"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupSection;