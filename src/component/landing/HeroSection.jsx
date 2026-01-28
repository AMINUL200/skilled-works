import React from "react";
import { ArrowRight, PlayCircle, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../common/MagneticButtonProps";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login");
  };

  const features = [
    "Streamlined HR Processes",
    "Automated Employee Management",
    "Real-time Analytics Dashboard",
    "Secure Cloud-based Solution",
  ];

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(250, 250, 255, 0.95), rgba(246, 217, 255, 0.1)), url('/image/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#1F2E9A] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9B5CFF] rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#2EC5FF] rounded-full"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8 animate-fade-in">
            {/* Main Title */}
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
              <span className="block text-[#2430A3]">
                UK trusted Skilled HR-Tech
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF] mt-2">
                Empowering UK Businesses With Smart HR-Tech Solutions
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#444444] max-w-2xl leading-relaxed">
              SKILLED WORKERS CLOUD is a UK HR-tech company that will help
              manage your workforce skillfully and effectively. We specialize in
              HR-TECH systems for businesses in the UK.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* <button
                onClick={handleExploreClick}
                className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Explore Your HRMS Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button> */}

              <MagneticButton
                variant="square"
                onClick={handleExploreClick}
                className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Explore Your HRMS Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton
                variant="square"
                className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Schedule Demo</span>
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-float">
            <div className="relative flex justify-center items-center">
              {/* Main Image Container */}
              {/* <div className="relative bg-gradient-to-br from-[#FAFAFF] to-[#F2EEFF] rounded-3xl overflow-hidden shadow-2xl transform rotate-3"> */}
              <img
                src="/image/950176905_banner_img1.png"
                alt="SponicHR Dashboard Preview"
                className="w-[80%] h-[90%] "
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-[#777777]">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-[#1F2E9A] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#9B5CFF] to-[#2EC5FF] rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
