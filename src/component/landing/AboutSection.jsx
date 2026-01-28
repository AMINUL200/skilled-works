import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Target, 
  Users, 
  Shield, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Award,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision HR Solutions",
      description: "Tailored to UK business needs",
      color: "from-[#E60023] to-[#FF1F1F]"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Legal Compliance",
      description: "UK regulation ready",
      color: "from-[#1F2E9A] to-[#2430A3]"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Streamlined Operations",
      description: "Automated workflows",
      color: "from-[#2EC5FF] to-[#9B5CFF]"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Employee focused",
      color: "from-[#FF4D8D] to-[#FF9F1C]"
    }
  ];

  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10"
      style={{
        background: "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1F2E9A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B5CFF] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#2EC5FF] rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-float-slow">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF9F1C] opacity-20"></div>
      </div>
      <div className="absolute bottom-10 right-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2EC5FF] to-[#9B5CFF] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT — ANIMATED CIRCULAR DESIGN */}
          <div className="relative flex justify-center items-center">
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate={controls}
              className="relative w-[480px] h-[480px]"
            >
              {/* Outer Animated Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#9B5CFF]/30 animate-spin-slow">
                <div className="absolute inset-[-4px] rounded-full border-[2px] border-[#2EC5FF]/20 animate-ping-slow"></div>
              </div>

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[420px] h-[420px] rounded-full border-2 border-[#FF1F1F]/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {/* Animated Dots */}
                {[0, 90, 180, 270].map((degree, index) => (
                  <motion.div
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-6 h-6"
                    style={{
                      transform: `rotate(${degree}deg)`,
                      left: 'calc(50% - 12px)',
                      top: '-12px'
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? "bg-[#FF1F1F]" :
                      index === 1 ? "bg-[#2EC5FF]" :
                      index === 2 ? "bg-[#9B5CFF]" :
                      "bg-[#FF4D8D]"
                    }`}></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Inner Ring */}
              <div className="absolute w-[360px] h-[360px] rounded-full border-4 border-white/30 shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2E9A] via-[#2430A3] to-[#1F2E9A] rounded-full flex items-center justify-center">
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-32 h-32 bg-white rounded-full top-1/4 left-1/4 animate-pulse"></div>
                    <div className="absolute w-24 h-24 bg-[#2EC5FF] rounded-full bottom-1/4 right-1/4 animate-pulse delay-700"></div>
                  </div>

                  {/* Main Content */}
                  <div className="relative text-center px-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4"
                    >
                      GET TO<br />KNOW<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EC5FF] to-[#9B5CFF]">
                        US
                      </span>
                    </motion.h2>
                    
                    {/* Animated Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 100 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-1 bg-gradient-to-r from-[#2EC5FF] to-[#FF1F1F] mx-auto rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 right-8 bg-white px-6 py-3 rounded-full shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#FF9F1C]" />
                  <span className="text-sm font-bold text-[#1F2E9A]">UK BASED</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 left-8 bg-white px-6 py-3 rounded-full shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-[#2EC5FF]" />
                  <span className="text-sm font-bold text-[#1F2E9A]">HR-TECH LEADER</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — CONTENT */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              {/* <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4D8D]/10 to-[#2EC5FF]/10 border border-[#2EC5FF]/20">
                <span className="text-sm font-semibold text-[#1F2E9A]">
                  ABOUT OUR COMPANY
                </span>
              </div> */}
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="block text-[#2430A3]">
                  About Skilled Workers Cloud
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                  UK HRMS Provider
                </span>
              </h2>
            </div>

            {/* Animated Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-1.5 bg-gradient-to-r from-[#E60023] to-[#FF1F1F] rounded-full"
            />

            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg text-[#444444] leading-relaxed">
                <strong className="text-[#1F2E9A]">SKILLED WORKERS CLOUD</strong> is a premier UK HR-tech company dedicated to helping you manage your workforce skillfully and effectively. We specialize in cutting-edge HR-TECH systems tailored for businesses across the UK.
              </p>

              <p className="text-lg text-[#444444] leading-relaxed">
                Our enterprise-ready software and services provide comprehensive solutions that ensure compliance with UK legal guidance while enabling smooth business operations. From maintaining up-to-date employee records to ensuring regulatory compliance, we've got you covered.
              </p>

              <p className="text-lg text-[#444444] leading-relaxed">
                Our expert HR team combined with innovative software delivers realistic, feasible solutions that eliminate operational hassles, allowing you to focus on growing your business.
              </p>
            </div>

           

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
              className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 mt-8 flex items-center space-x-3"
            >
              <span>Learn More About Our UK HRMS Software</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;