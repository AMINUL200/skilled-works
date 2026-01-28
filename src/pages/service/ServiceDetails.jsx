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
  Clock,
  BarChart3,
  FileText,
  Search,
  Calendar,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQComponent from "../../component/common/FAQComponent";
import MagneticButton from "../../component/common/MagneticButtonProps";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const isInView1 = useInView(section1Ref, { once: true, amount: 0.3 });
  const isInView2 = useInView(section2Ref, { once: true, amount: 0.3 });
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    if (isInView1) {
      controls1.start("visible");
    }
  }, [isInView1, controls1]);

  useEffect(() => {
    if (isInView2) {
      controls2.start("visible");
    }
  }, [isInView2, controls2]);

  // Section 1 Data
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

  // Section 2 Data
  const benefits = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Reduce administrative workload by 60%",
      color: "text-[#00B894]"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Cut hiring time from weeks to days",
      color: "text-[#2EC5FF]"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Improve decision making with real-time analytics",
      color: "text-[#9B3DFF]"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Ensure 100% compliance with UK regulations",
      color: "text-[#1F2E9A]"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Increase employee retention by 40%",
      color: "text-[#E60023]"
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Achieve industry-leading satisfaction scores",
      color: "text-[#FFA726]"
    }
  ];

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "How quickly can we implement your HRMS software?",
      answer: "Most clients are fully operational within 2-4 weeks. Our implementation team provides dedicated support throughout the process, including data migration, configuration, and staff training. We offer a phased rollout approach to minimize disruption.",
      category: "Implementation"
    },
    {
      id: 2,
      question: "Is your platform UK GDPR compliant?",
      answer: "Yes, our platform is fully compliant with UK GDPR regulations. We provide data processing agreements, regular security audits, and all necessary compliance documentation for UK businesses. Our data centers are UK-based for additional security.",
      category: "Compliance"
    },
    {
      id: 3,
      question: "Can the system integrate with our existing tools?",
      answer: "Absolutely. Our platform offers comprehensive API integration with popular accounting software, payroll systems, CRM tools, and other business applications. We also provide custom integration solutions for unique requirements.",
      category: "Integration"
    },
    {
      id: 4,
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 technical support, dedicated account management, regular software updates, and ongoing HR consulting. All clients get access to our UK-based support team through multiple channels including phone, email, and live chat.",
      category: "Support"
    },
    {
      id: 5,
      question: "Is training provided for our team?",
      answer: "Yes, we provide comprehensive training sessions, online tutorials, and detailed documentation. We also offer train-the-trainer programs for larger organizations and ongoing support to ensure your team is confident using the platform.",
      category: "Training"
    }
  ];

  // Animation Variants
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

  const handleCTAClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-45">
      {/* Breadcrumb */}
      <div className="container mx-auto px-8 py-4">
        <nav className="text-sm text-[#666666]">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-[#1F2E9A]">Home</a></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><a href="/services" className="hover:text-[#1F2E9A]">Services</a></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-[#1F2E9A] font-semibold">HRMS Software</li>
          </ol>
        </nav>
      </div>

      {/* Section 1: Animated Circular Design (Same as AboutSection) */}
      <section 
        ref={section1Ref}
        className="relative w-full overflow-hidden py-20"
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
                animate={controls1}
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
                        HRMS<br />SOFTWARE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EC5FF] to-[#9B5CFF]">
                          SOLUTION
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
              animate={controls1}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="block text-[#2430A3]">
                    Complete HRMS Software
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                    For UK Businesses
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
                  Our comprehensive <strong className="text-[#1F2E9A]">HRMS Software</strong> is designed specifically for UK businesses to streamline human resource management, ensure compliance, and boost productivity.
                </p>

                <p className="text-lg text-[#444444] leading-relaxed">
                  From employee onboarding to retirement, our cloud-based platform provides end-to-end solutions that automate HR processes, reduce administrative burdens, and provide valuable insights through real-time analytics.
                </p>

                <p className="text-lg text-[#444444] leading-relaxed">
                  With features tailored to meet UK employment laws and GDPR requirements, our software ensures your business stays compliant while focusing on growth and employee satisfaction.
                </p>
              </div>

             

              {/* CTA Button */}
              {/* <MagneticButton
                variant="square"
                onClick={handleCTAClick}
                className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 mt-8 flex items-center space-x-3"
              >
                <span>Get Started with HRMS Software</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </MagneticButton> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Left Content & Right Image */}
      <section 
        ref={section2Ref}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={controls2}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF]">
                  <TrendingUp className="w-5 h-5 text-[#9B3DFF]" />
                  <span className="text-sm font-semibold text-[#1F2E9A]">
                    KEY BENEFITS
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-[#2430A3]">Transform Your</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF]">
                    HR Operations
                  </span>
                </h2>
              </div>

              <p className="text-lg text-[#666666] leading-relaxed">
                Our HRMS software delivers measurable results for UK businesses of all sizes. From small startups to large enterprises, organizations benefit from increased efficiency, reduced costs, and improved compliance.
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={featureVariants}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#FAFAFF] transition-colors duration-300"
                  >
                    <div className={`p-2 rounded-lg ${benefit.color} bg-gradient-to-r from-white to-[#F2EEFF]`}>
                      {benefit.icon}
                    </div>
                    <span className="font-medium text-[#444444]">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              

              <MagneticButton
                variant="square"
                onClick={() => navigate("/pricing")}
                className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center space-x-3"
              >
                <span>View Pricing Plans</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </MagneticButton>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#1F2E9A] to-[#9B3DFF]">
                  {/* Placeholder for dashboard image */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="w-8 h-8 text-white" />
                        <h3 className="text-xl font-bold text-white">HR Dashboard Preview</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white text-sm mb-1">Active Employees</div>
                          <div className="text-white text-2xl font-bold">245</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white text-sm mb-1">Pending Requests</div>
                          <div className="text-white text-2xl font-bold">12</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white text-sm mb-1">This Month Hires</div>
                          <div className="text-white text-2xl font-bold">8</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white text-sm mb-1">Compliance Score</div>
                          <div className="text-white text-2xl font-bold">98%</div>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-white text-sm mb-2">Monthly Performance</div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#2EC5FF] to-[#9B5CFF] w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#FF4D8D] to-[#FF9F1C] rounded-2xl rotate-12 opacity-30"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-[#2EC5FF] to-[#9B5CFF] rounded-2xl -rotate-12 opacity-30"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#E60023] to-[#FF1F1F] rounded-xl rotate-45 opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#00B894] to-[#2EC5FF] rounded-xl -rotate-45 opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="max-w-6xl mx-auto px-6">
          

          <FAQComponent faqs={faqData} />

          {/* Additional CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-3xl p-8 border border-[#E6E0FF]">
              <h3 className="text-2xl font-bold text-[#1F2E9A] mb-4">
                Still Have Questions?
              </h3>
              <p className="text-lg text-[#666666] mb-8 max-w-xl mx-auto">
                Our team is ready to help you with any questions about our HRMS software.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton
                  variant="square"
                  onClick={handleCTAClick}
                  className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </MagneticButton>
                
                <MagneticButton
                  variant="square"
                  onClick={() => navigate("/pricing")}
                  className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>SponicHR Register</span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

   

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
    </div>
  );
};

export default ServiceDetails;