import React from "react";
import { Calendar, CheckCircle } from "lucide-react";
import MagneticButton from "../common/MagneticButtonProps";
import { useNavigate } from "react-router-dom";

const HRMSHero = ({ serviceDetails = {} }) => {
  const navigation = useNavigate();
  console.log("HRMSHero received serviceDetails:", { serviceDetails });
  const STORAGE_URL = import.meta.env.VITE_APP_STORAGE_URL;
  const handleBookNow = () => {
    // Handle booking logic here
    console.log("Booking demo...");
    navigation("/contact");
  };

  // Helper function to extract features from description
  const extractFeatures = () => {
    if (!serviceDetails?.description) return [];

    // Split description by double newlines or bullet points
    const lines = serviceDetails.description
      .split("\n")
      .filter((line) => line.trim().length > 0);

    // Filter lines that look like features (short, descriptive lines)
    const features = lines.filter(
      (line) =>
        line.length < 50 &&
        !line.includes(".") &&
        !line.toLowerCase().includes("streamline your"),
    );

    return features.length > 0
      ? features
      : [
          "Streamlined HR Processes",
          "Automated Employee Management",
          "Real-time Analytics Dashboard",
          "Secure Cloud-based Solution",
        ];
  };

  const features = extractFeatures();

  // Construct image URL using storage URL and image path
  const getImageUrl = () => {
    if (!serviceDetails?.image) return "/image/950176905_banner_img1.png";
    return `${STORAGE_URL}${serviceDetails.image}`;
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFF] via-white to-[#F6D9FF]/30">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F2E9A] rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9B5CFF] rounded-full -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#2EC5FF] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2430A3]/10 text-[#1F2E9A] px-4 py-2 rounded-full font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">
                {serviceDetails?.badge_text || "UK's Leading HR-Tech Solution"}
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              aria-label={
                serviceDetails?.heading_meta ||
                "Transform Your HR Operations With Intelligent HRMS"
              }
            >
              <span className="block text-[#2430A3]">
                {serviceDetails?.heading || "Transform Your HR Operations"}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] via-[#9B5CFF] to-[#2EC5FF] mt-2">
                {serviceDetails?.highlighted_text || "With Intelligent HRMS"}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#444444] max-w-2xl leading-relaxed"
            dangerouslySetInnerHTML={{__html: serviceDetails?.description || "Streamline your human resource management with our comprehensive HRMS platform. Automate processes, enhance employee experience, and gain actionable insights to drive business growth."}}
            >
            </p>

            

            {/* CTA Button */}
            <div className="pt-6">
              <MagneticButton
                variant="square"
                onClick={handleBookNow}
                className="group relative bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <span className="relative">
                  {serviceDetails?.button_name || "Book a Demo Now"}
                </span>
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative" />
              </MagneticButton>

             
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* Image Container with Gradient Border */}
              <div className="relative w-full max-w-xl group">
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9B5CFF] via-[#2EC5FF] to-[#1F2E9A] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-[#FAFAFF] to-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src={getImageUrl()}
                    alt={
                      serviceDetails?.image_alt ||
                      serviceDetails?.heading ||
                      "HRMS Dashboard Preview"
                    }
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/image/950176905_banner_img1.png";
                    }}
                  />

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HRMSHero;
