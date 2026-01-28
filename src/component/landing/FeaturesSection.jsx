import React, { useRef, useEffect } from "react";
import {
  Users,
  FileText,
  ShieldCheck,
  Calendar,
  BarChart3,
  Search,
  CheckCircle,
  Zap,
  ChevronRight,
  Sparkles,
  Target,
  Brain,
  Globe,
  Lock,
  Clock,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const features = [
    {
      id: "hrms",
      title: "HRMS Features",
      description: "Comprehensive Human Resource Management System with employee lifecycle management, performance tracking, and automated workflows.",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-[#1F2E9A] via-[#1A3CC3] to-[#2430A3]",
      features: ["Employee Database", "Payroll Integration", "Performance Reviews", "Training Management"],
      stats: "98% efficiency gain",
      delay: 0,
      accentColor: "#1F2E9A"
    },
    {
      id: "recruitment",
      title: "Intelligent Recruitment",
      description: "AI-powered hiring process with smart screening, automated scheduling, and candidate matching algorithms.",
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-[#9B3DFF] via-[#9B5CFF] to-[#A83DFF]",
      features: ["AI Screening", "Smart Matching", "Interview Scheduling", "Offer Management"],
      stats: "60% faster hiring",
      delay: 100,
      accentColor: "#9B3DFF"
    },
    {
      id: "hr-file",
      title: "Smart Document Hub",
      description: "AI-driven document management with automatic categorization, smart search, and secure cloud storage.",
      icon: <FileText className="w-6 h-6" />,
      gradient: "from-[#2EC5FF] via-[#2ED8FF] to-[#00C6FF]",
      features: ["AI Categorization", "Smart Search", "Version Control", "Secure Cloud"],
      stats: "100% organized",
      delay: 200,
      accentColor: "#2EC5FF"
    },
    {
      id: "compliance",
      title: "Compliance Guardian",
      description: "Automated compliance monitoring with real-time regulatory updates and AI-powered risk detection.",
      icon: <ShieldCheck className="w-6 h-6" />,
      gradient: "from-[#E60023] via-[#FF1F1F] to-[#FF5252]",
      features: ["RTW Checks", "Compliance Audits", "Legal Updates", "Risk Detection"],
      stats: "Zero compliance issues",
      delay: 300,
      accentColor: "#E60023"
    },
    {
      id: "attendance",
      title: "Attendance Pro",
      description: "Real-time tracking with geofencing, biometric integration, and predictive absence management.",
      icon: <Clock className="w-6 h-6" />,
      gradient: "from-[#00B894] via-[#00D3A9] to-[#00E5B4]",
      features: ["Geofencing", "Biometric Integration", "Predictive Analytics", "Overtime AI"],
      stats: "95% accuracy",
      delay: 400,
      accentColor: "#00B894"
    },
    {
      id: "dashboard",
      title: "Insights Dashboard",
      description: "Interactive analytics with predictive insights, custom KPI tracking, and automated reporting.",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-[#FF6B6B] via-[#FF8E8E] to-[#FFA8A8]",
      features: ["Predictive Analytics", "Custom KPIs", "Real-time Insights", "Automated Reports"],
      stats: "30+ report types",
      delay: 500,
      accentColor: "#FF6B6B"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-16 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-[#1F2E9A]/10 via-[#9B3DFF]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#2EC5FF]/10 via-[#00B894]/10 to-transparent rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-transparent to-gray-100/5" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#9B3DFF]/30 to-[#2EC5FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
        
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-[#2430A3]">Everything You Need in </span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              One Complete Platform
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Streamline your operations with our comprehensive suite of features designed 
            for modern enterprises. From recruitment to retirement, we've got you covered.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: feature.delay / 1000,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-[1px] rounded-[32px] overflow-hidden">
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <div className="absolute inset-[1px] bg-white rounded-[31px]" />
              </div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-[32px] overflow-hidden h-full">
                {/* Gradient Orb Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 -translate-y-32 translate-x-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} blur-3xl`} />
                </div>

                {/* Top Accent Line */}
                <motion.div 
                  className={`h-1 bg-gradient-to-r ${feature.gradient}`}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: (feature.delay + 200) / 1000, duration: 0.6 }}
                  style={{ transformOrigin: 'left' }}
                />

                <div className="p-8 relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon Container with Morphing Background */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-16 h-16"
                      >
                        {/* Morphing Background Shape */}
                        <motion.div
                          animate={{
                            borderRadius: [
                              "30% 70% 70% 30% / 30% 30% 70% 70%",
                              "70% 30% 30% 70% / 70% 70% 30% 30%",
                              "30% 70% 70% 30% / 30% 30% 70% 70%",
                            ],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}
                        />
                        
                        {/* Icon */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>

                        {/* Pulse Ring */}
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Stats Badge */}
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        delay: (feature.delay + 300) / 1000,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group/badge"
                    >
                      {/* Badge Glow */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-full blur opacity-0 group-hover/badge:opacity-30 transition-opacity duration-300`} />
                      
                      <div className="relative px-4 py-2 rounded-full bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`} />
                          <span className="text-xs font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                            {feature.stats}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Title with Gradient on Hover */}
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                  >
                    {feature.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features List with Stagger Animation */}
                  <ul className="space-y-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          delay: (feature.delay + 400 + idx * 80) / 1000,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group/item relative"
                      >
                        <div className="flex items-center gap-3">
                          {/* Animated Check Circle */}
                          <div className="relative flex-shrink-0">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                              className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-sm`}
                            >
                              <CheckCircle className="w-3 h-3 text-white fill-current" />
                            </motion.div>
                            
                            {/* Expanding Ring on Hover */}
                            <motion.div
                              className={`absolute inset-0 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover/item:opacity-20`}
                              animate={{
                                scale: [1, 1.5],
                                opacity: [0, 0.2, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            />
                          </div>
                          
                          <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors">
                            {item}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Action Button with Magnetic Effect */}
                  <div className="pt-6 border-t border-gray-100">
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="group/btn relative inline-flex items-center gap-2 overflow-hidden"
                    >
                      {/* Background Gradient on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300 rounded-lg -inset-x-4 -inset-y-2`} />
                      
                      <span className={`relative font-semibold text-gray-900 group-hover/btn:bg-gradient-to-r group-hover/btn:${feature.gradient} group-hover/btn:bg-clip-text group-hover/btn:text-transparent transition-all duration-300`}>
                        Explore feature
                      </span>
                      
                      <motion.div
                        className="relative"
                        animate={{ 
                          x: [0, 4, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowUpRight className={`w-5 h-5 text-gray-600 group-hover/btn:text-[${feature.accentColor}] transition-colors duration-300`} />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>

                {/* Bottom Shine Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default FeaturesSection;