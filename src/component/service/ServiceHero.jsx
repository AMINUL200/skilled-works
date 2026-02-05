import React from "react";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import MagneticButton from "../common/MagneticButtonProps";

const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#FAFAFF] via-white to-[#F6D9FF]/30 pt-24 pb-20 px-6 overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue Gradient Shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F2E9A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        
        {/* Purple Gradient Shape */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9B5CFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
        
        {/* Teal Gradient Shape */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#2EC5FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-300"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1F2E9A 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 text-[#1F2E9A] rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Full-Service HR-Tech Agency
            </div>

            {/* Main Title */}
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block text-[#2430A3]">Comprehensive HR-Tech</span>
              <span className="block mt-2 bg-gradient-to-r from-[#9B3DFF] via-[#9B5CFF] to-[#2EC5FF] bg-clip-text text-transparent">
                Services & Solutions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl mb-6 text-[#444444]">
              Smart HR Solutions to Scale Your Business
            </p>

            {/* Description */}
            <p className="text-lg text-[#777777] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              At Skilled Workers Cloud, we deliver cutting-edge HR-tech solutions tailored to your business needs. From custom HRMS development to comprehensive digital transformation, we're your trusted partner in workforce management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton
                variant="square"
                className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#1F2E9A]/20 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                variant="square"
                className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-200/20 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Get Consultation</span>
                <Calendar className="w-5 h-5" />
              </MagneticButton>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
              {[
                { value: "500+", label: "Clients Served" },
                { value: "95%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#1F2E9A] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#777777]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Main Image Container with Gradient Border */}
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9B5CFF] via-[#2EC5FF] to-[#1F2E9A] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800"
                  alt="HR-Tech Solutions"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E9A]/20 to-transparent"></div>
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs hidden lg:block animate-float border border-gray-100">
              <div className="flex items-center gap-4">
                {/* Icon with Gradient */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9B5CFF] to-[#2EC5FF] rounded-xl blur"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-[#9B5CFF] to-[#2EC5FF] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    5+
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-gray-600 text-sm">Years of Excellence</p>
                  <p className="text-gray-900 font-semibold">
                    UK Trusted HR-Tech
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Feature Card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-[200px] hidden lg:block animate-float-slow border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-transparent bg-clip-text mb-1">
                  Award Winning
                </div>
                <div className="text-xs text-gray-600">
                  Best HR-Tech Solution 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ServiceHero;