import React from "react";
import { Calendar, CheckCircle } from "lucide-react";
import MagneticButton from "../common/MagneticButtonProps";

const HRMSHero = () => {
  const handleBookNow = () => {
    // Handle booking logic here
    console.log("Booking demo...");
  };

  const features = [
    "Streamlined HR Processes",
    "Automated Employee Management",
    "Real-time Analytics Dashboard",
    "Secure Cloud-based Solution",
  ];

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
              <span className="text-sm">UK's Leading HR-Tech Solution</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block text-[#2430A3]">
                Transform Your HR Operations
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] via-[#9B5CFF] to-[#2EC5FF] mt-2">
                With Intelligent HRMS
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#444444] max-w-2xl leading-relaxed">
              Streamline your human resource management with our comprehensive
              HRMS platform. Automate processes, enhance employee experience,
              and gain actionable insights to drive business growth.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#9B5CFF] to-[#2EC5FF] rounded-full"></div>
                  <span className="text-[#444444] font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <MagneticButton
                variant="square"
                onClick={handleBookNow}
                className="group relative bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <span className="relative">Book a Demo Now</span>
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative" />
              </MagneticButton>
              
              {/* Trust indicator */}
              <p className="mt-4 text-sm text-[#777777]">
                Trusted by 500+ UK businesses
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* Image Container with Gradient Border */}
              <div className="relative w-full max-w-xl">
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#9B5CFF] via-[#2EC5FF] to-[#1F2E9A] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-[#FAFAFF] to-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="/image/950176905_banner_img1.png"
                    alt="HRMS Dashboard Preview"
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-[200px] animate-float">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#9B5CFF] to-[#2EC5FF] text-transparent bg-clip-text">
                        85%
                      </div>
                      <div className="text-sm text-[#444444] font-medium">
                        Process Efficiency Improved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-[#777777] animate-pulse">Discover More</span>
          <div className="w-6 h-10 border-2 border-[#1F2E9A]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#9B5CFF] to-[#2EC5FF] rounded-full mt-2 animate-bounce"></div>
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
          0%, 100% {
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