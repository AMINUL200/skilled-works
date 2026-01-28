import React, { useState } from "react";
import {
  Plane,
  Cpu,
  Building2,
  HeartPulse,
  Banknote,
  GraduationCap,
  ChefHat,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

const WeServeSection = () => {
  const [activeIndustry, setActiveIndustry] = useState("aviation");
  const [hoveredCard, setHoveredCard] = useState(null);

  const industries = [
    {
      id: "aviation",
      title: "Aviation",
      icon: <Plane className="w-8 h-8" />,
      description:
        "Streamline crew management, compliance, and safety protocols for airlines and aviation services.",
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
      features: [
        "Crew Scheduling",
        "Safety Compliance",
        "Training Management",
        "Regulatory Reporting",
      ],
      stats: "40+ aviation partners",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600",
      iconBg: "from-[#1F2E9A]/10 to-[#2EC5FF]/10",
      textColor: "text-[#1F2E9A]",
    },
    {
      id: "it",
      title: "IT",
      icon: <Cpu className="w-8 h-8" />,
      description:
        "Manage tech talent, project allocations, and skill development for IT companies and startups.",
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      features: [
        "Talent Management",
        "Skill Tracking",
        "Project Allocation",
        "Performance Analytics",
      ],
      stats: "500+ tech teams",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600",
      iconBg: "from-[#9B3DFF]/10 to-[#E60023]/10",
      textColor: "text-[#9B3DFF]",
    },
    {
      id: "construction",
      title: "Construction",
      icon: <Building2 className="w-8 h-8" />,
      description:
        "Optimize workforce management, site safety, and contractor compliance for construction projects.",
      color: "from-[#FF6B6B] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
      features: [
        "Site Workforce",
        "Safety Compliance",
        "Contractor Management",
        "Project Tracking",
      ],
      stats: "300+ construction firms",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600",
      iconBg: "from-[#FF6B6B]/10 to-[#FFA726]/10",
      textColor: "text-[#FF6B6B]",
    },
    {
      id: "healthcare",
      title: "Healthcare",
      icon: <HeartPulse className="w-8 h-8" />,
      description:
        "Efficiently manage healthcare staff, certifications, and shift rotations for medical facilities.",
      color: "from-[#00B894] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]",
      features: [
        "Staff Scheduling",
        "Certification Tracking",
        "Patient Ratio",
        "Compliance Management",
      ],
      stats: "200+ healthcare providers",
      image:
        "https://images.unsplash.com/photo-1516549655669-df565bc5d4c5?auto=format&fit=crop&w=600",
      iconBg: "from-[#00B894]/10 to-[#2EC5FF]/10",
      textColor: "text-[#00B894]",
    },
    {
      id: "finance",
      title: "Finance",
      icon: <Banknote className="w-8 h-8" />,
      description:
        "Secure HR solutions for financial institutions with compliance and performance management.",
      color: "from-[#2430A3] to-[#9B3DFF]",
      gradient: "bg-gradient-to-br from-[#2430A3] to-[#9B3DFF]",
      features: [
        "Compliance Audits",
        "Performance Metrics",
        "Risk Management",
        "Regulatory Reporting",
      ],
      stats: "150+ financial firms",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600",
      iconBg: "from-[#2430A3]/10 to-[#9B3DFF]/10",
      textColor: "text-[#2430A3]",
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="w-8 h-8" />,
      description:
        "Manage academic staff, certifications, and training programs for educational institutions.",
      color: "from-[#FFA726] to-[#FF6B6B]",
      gradient: "bg-gradient-to-br from-[#FFA726] to-[#FF6B6B]",
      features: [
        "Faculty Management",
        "Certification Tracking",
        "Training Programs",
        "Academic Calendar",
      ],
      stats: "400+ institutions",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600",
      iconBg: "from-[#FFA726]/10 to-[#FF6B6B]/10",
      textColor: "text-[#FFA726]",
    },
    {
      id: "culinary",
      title: "Culinary",
      icon: <ChefHat className="w-8 h-8" />,
      description:
        "Streamline kitchen staff management, certifications, and shift planning for hospitality businesses.",
      color: "from-[#E60023] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#E60023] to-[#FFA726]",
      features: [
        "Shift Management",
        "Certification Tracking",
        "Inventory Staffing",
        "Hygiene Compliance",
      ],
      stats: "250+ restaurants",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600",
      iconBg: "from-[#E60023]/10 to-[#FFA726]/10",
      textColor: "text-[#E60023]",
    },
  ];

  const activeData =
    industries.find((ind) => ind.id === activeIndustry) || industries[0];

  return (
    <section
      className="relative py-16 overflow-hidden "
      style={{
        background:
          "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#1F2E9A]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#9B3DFF]/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#2EC5FF]/5 to-transparent rounded-full blur-3xl"
        />
      </div>

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-[#2430A3]">Tailored HR Solutions for</span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Every Industry We Serve
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our HR-tech platform adapts to the unique needs of different
            industries, providing specialized solutions that drive efficiency
            and compliance.
          </p>
        </motion.div>

        {/* Industry Pills Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <motion.button
                key={industry.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveIndustry(industry.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                  activeIndustry === industry.id
                    ? "shadow-xl"
                    : "shadow-md hover:shadow-lg"
                }`}
              >
                {/* Animated Background */}
                <div
                  className={`absolute inset-0 ${industry.gradient} transition-opacity duration-500 ${
                    activeIndustry === industry.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Static Background */}
                <div
                  className={`absolute inset-0 bg-white transition-opacity duration-500 ${
                    activeIndustry === industry.id ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Border */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-500 ${
                    activeIndustry === industry.id
                      ? "border-transparent"
                      : "border-gray-200 group-hover:border-gray-300"
                  }`}
                />

                {/* Content */}
                <div className="relative flex items-center gap-3 px-6 py-3">
                  {/* Icon Container */}
                  <motion.div
                    animate={
                      activeIndustry === industry.id
                        ? {
                            rotate: [0, 10, -10, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`p-2 rounded-xl transition-all duration-500 ${
                      activeIndustry === industry.id
                        ? "bg-white/20"
                        : `bg-gradient-to-br ${industry.iconBg}`
                    }`}
                  >
                    <div
                      className={`transition-colors duration-500 ${
                        activeIndustry === industry.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {React.cloneElement(industry.icon, {
                        className: "w-5 h-5",
                      })}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <span
                    className={`font-semibold whitespace-nowrap transition-colors duration-500 ${
                      activeIndustry === industry.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {industry.title}
                  </span>

                  {/* Active Indicator */}
                  <AnimatePresence>
                    {activeIndustry === industry.id && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shine Effect */}
                {activeIndustry === industry.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Industry Cards Stack */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: 50, rotateY: 15 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="relative"
              >
                {/* Main Active Card */}
                <div className="group relative">
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${activeData.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    {/* Gradient Header Bar */}
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${activeData.color}`}
                      layoutId="activeBar"
                    />

                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon with Morphing Background */}
                        <div className="relative">
                          <motion.div
                            animate={{
                              borderRadius: [
                                "40% 60% 60% 40% / 60% 40% 60% 40%",
                                "60% 40% 40% 60% / 40% 60% 40% 60%",
                                "40% 60% 60% 40% / 60% 40% 60% 40%",
                              ],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`absolute inset-0 bg-gradient-to-br ${activeData.iconBg} blur-xl`}
                          />

                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${activeData.color} shadow-xl flex items-center justify-center`}
                          >
                            <div className="text-white">
                              {React.cloneElement(activeData.icon, {
                                className: "w-10 h-10",
                              })}
                            </div>
                          </motion.div>

                          {/* Floating Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-[#00B894]" />
                          </motion.div>
                        </div>

                        {/* Stats Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="relative group/badge"
                        >
                          <div
                            className={`absolute -inset-1 bg-gradient-to-r ${activeData.color} rounded-2xl blur opacity-0 group-hover/badge:opacity-40 transition-opacity`}
                          />
                          <div className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-md">
                            <div className="flex items-center gap-2">
                              <TrendingUp
                                className={`w-4 h-4 ${activeData.textColor}`}
                              />
                              <span className="text-sm font-bold text-gray-900">
                                {activeData.stats}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Title & Description */}
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-bold text-gray-900 mb-4"
                      >
                        {activeData.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 mb-8 leading-relaxed text-lg"
                      >
                        {activeData.description}
                      </motion.p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {activeData.features.map((feature, idx) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="group/feature flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative mt-1">
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: idx * 0.2,
                                }}
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeData.color}`}
                              />
                              <div
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${activeData.color} blur-sm opacity-50`}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover/feature:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative w-full overflow-hidden rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeData.color} flex items-center justify-center shadow-md`}
                            >
                              <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-gray-900">
                                Explore Solutions
                              </div>
                              <div className="text-xs text-gray-600">
                                Learn more about {activeData.title}
                              </div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover/btn:text-gray-600 transition-colors" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50/50 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-50/50 to-transparent rounded-tr-full" />
                  </div>
                </div>

                {/* Background Cards for Depth */}
                <motion.div
                  className="absolute top-4 -right-4 w-full h-full bg-gray-100/50 rounded-3xl -z-10"
                  animate={{ rotate: [2, 3, 2] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-8 -right-8 w-full h-full bg-gray-100/30 rounded-3xl -z-20"
                  animate={{ rotate: [4, 5, 4] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Feature Showcase */}
          <div className="relative lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF]" />

                {/* Animated Mesh Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative p-8">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-sm font-semibold text-white">
                        COMPREHENSIVE FEATURES
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Industry-Specific Solutions
                    </h3>
                    <p className="text-white/80 text-lg">
                      Each industry gets customized features and workflows
                    </p>
                  </motion.div>

                  {/* Key Benefits Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Key Benefits
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Industry-compliant workflows",
                        "Custom reporting dashboards",
                        "Specialized training modules",
                        "Regulatory compliance tools",
                      ].map((benefit, idx) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 group/benefit"
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle className="w-5 h-5 text-[#00B894] flex-shrink-0" />
                          </motion.div>
                          <span className="text-white/90 group-hover/benefit:text-white transition-colors">
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Industry Excellence Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="relative h-40 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-6xl mb-3"
                        >
                          🏢
                        </motion.div>
                        <div className="text-white font-bold text-lg">
                          Cross-Industry Excellence
                        </div>
                      </div>
                    </div>

                    {/* Animated Particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 1, 0.2],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-[#FF6B6B] to-[#FFA726] rounded-3xl rotate-12 shadow-2xl opacity-90"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#00B894] to-[#2EC5FF] rounded-3xl -rotate-12 shadow-2xl opacity-90"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF] rounded-3xl blur-2xl opacity-10" />

            {/* Card */}
            <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #1F2E9A 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="relative text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-6"
                >
                  <Sparkles className="w-4 h-4 text-[#9B3DFF]" />
                  <span className="text-sm font-semibold text-[#1F2E9A]">
                    CUSTOM SOLUTIONS AVAILABLE
                  </span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Your Industry Not Listed?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  We customize solutions for any industry. Contact us to discuss
                  your specific HR needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton
                    variant="square"
                    className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#1F2E9A]/20 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Contact Our Team</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Calendar Icon Component
const Calendar = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

export default WeServeSection;
