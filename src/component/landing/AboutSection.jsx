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
  Globe,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../common/MagneticButtonProps";

const AboutSection = ({ aboutData = null }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Extract description without HTML tags
  const extractPlainText = (htmlString) => {
    if (!htmlString) return "";
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  // Split description into paragraphs if needed
  const getDescriptionParagraphs = () => {
    if (!aboutData?.description) return [];

    const plainText = extractPlainText(aboutData.description);
    // Split by sentences or create meaningful paragraphs
    const sentences = plainText.split(". ").filter((s) => s.trim().length > 0);

    if (sentences.length <= 2) {
      return [plainText];
    }

    // Create two paragraphs
    const midPoint = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, midPoint).join(". ") + ".",
      sentences.slice(midPoint).join(". ") + ".",
    ];
  };

  const descriptionParagraphs = getDescriptionParagraphs();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precision HR Solutions",
      description: "Tailored to UK business needs",
      color: "from-[#E60023] to-[#FF1F1F]",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Legal Compliance",
      description: "UK regulation ready",
      color: "from-[#1F2E9A] to-[#2430A3]",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Streamlined Operations",
      description: "Automated workflows",
      color: "from-[#2EC5FF] to-[#9B5CFF]",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Employee focused",
      color: "from-[#FF4D8D] to-[#FF9F1C]",
    },
  ];

  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-8 md:py-12 lg:py-16"
      style={{
        background:
          "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-[#1F2E9A] rounded-full blur-2xl md:blur-3xl"></div>
        <div className="absolute bottom-10 right-4 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-[#9B5CFF] rounded-full blur-2xl md:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-[#2EC5FF] rounded-full blur-2xl md:blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-6 md:top-10 left-6 md:left-10 animate-float-slow">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF9F1C] opacity-20"></div>
      </div>
      <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 animate-float">
        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#2EC5FF] to-[#9B5CFF] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16">
          {/* LEFT — ANIMATED CIRCULAR DESIGN WITH IMAGE */}
          <div className="order-1 w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate={controls}
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] flex items-center justify-center"
            >
              {/* Outer Animated Ring */}
              <div className="absolute inset-0 rounded-full border-[2px] sm:border-[3px] border-dashed border-[#9B5CFF]/30 animate-spin-slow">
                <div className="absolute inset-[-3px] sm:inset-[-4px] rounded-full border-[1px] sm:border-[2px] border-[#2EC5FF]/20 animate-ping-slow"></div>
              </div>

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[250px] h-[250px] sm:w-[310px] sm:h-[310px] md:w-[370px] md:h-[370px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-[#FF1F1F]/20"
              >
                {/* Animated Dots */}
                {[0, 90, 180, 270].map((degree, index) => (
                  <motion.div
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute w-5 h-5 sm:w-6 sm:h-6"
                    style={{
                      transform: `rotate(${degree}deg)`,
                      left: "calc(50% - 10px)",
                      top: "-10px",
                    }}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                        index === 0
                          ? "bg-[#FF1F1F]"
                          : index === 1
                            ? "bg-[#2EC5FF]"
                            : index === 2
                              ? "bg-[#9B5CFF]"
                              : "bg-[#FF4D8D]"
                      }`}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Inner Ring with Image */}
              <div className="absolute w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] md:w-[310px] md:h-[310px] lg:w-[360px] lg:h-[360px] rounded-full border-2 sm:border-4 border-white/30 shadow-xl lg:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2E9A]/80 via-[#2430A3]/80 to-[#1F2E9A]/80 rounded-full flex items-center justify-center">
                  {/* Background Image */}
                  {aboutData?.image_url && (
                    <img
                      src={`${import.meta.env.VITE_STORAGE_URL}${aboutData.image}`}
                      alt={
                        aboutData.image_alt || aboutData.heading || "About Us"
                      }
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                  )}

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-full top-1/4 left-1/4 animate-pulse"></div>
                    <div className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#2EC5FF] rounded-full bottom-1/4 right-1/4 animate-pulse delay-700"></div>
                  </div>

                  {/* Main Content */}
                  <div className="relative text-center px-4 sm:px-6 lg:px-8 z-10">
                    {/* Animated Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 60 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-1 bg-gradient-to-r from-[#2EC5FF] to-[#FF1F1F] mx-auto rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 sm:top-2 right-2 sm:right-4 md:right-8 bg-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-lg sm:shadow-xl"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#FF9F1C]" />
                  <span className="text-xs sm:text-sm font-bold text-[#1F2E9A]">
                    UK BASED
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-0 sm:bottom-2 left-2 sm:left-4 md:left-8 bg-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-lg sm:shadow-xl"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#2EC5FF]" />
                  <span className="text-xs sm:text-sm font-bold text-[#1F2E9A]">
                    {aboutData?.highlighted_text || "HR-TECH LEADER"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — CONTENT */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
            className="order-1 lg:order-2 w-full lg:w-1/2 space-y-6 sm:space-y-8"
          >
            {/* Header */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left">
                <span className="block text-[#2430A3]">
                  {aboutData?.heading || "About Skilled Workers Cloud"}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                  {aboutData?.highlighted_text || "UK HRMS Provider"}
                </span>
              </h2>
            </div>

            {/* Animated Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.3, duration: 1 }}
              className="h-1.5 bg-gradient-to-r from-[#E60023] to-[#FF1F1F] rounded-full mx-auto lg:mx-0"
            />

            {/* Content from API */}
            <div
              className="editor-content text-[#444444] bg-transparent"
              dangerouslySetInnerHTML={{ __html: aboutData?.description }}
            />

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6 flex justify-center lg:justify-start">
              <MagneticButton
                variant="square"
                size={140}
                onClick={handleLearnMore}
                className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 flex items-center space-x-2 sm:space-x-3"
              >
                <span>Learn More About Our UK HRMS Software</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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
          animation: spin-slow 30s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
