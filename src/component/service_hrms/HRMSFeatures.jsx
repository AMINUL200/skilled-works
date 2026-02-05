import React, { useState } from "react";
import {
  Users,
  BarChart3,
  Shield,
  Zap,
  Clock,
  FileText,
  Smartphone,
  Cloud,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Lock,
  Globe,
  Calendar,
  Bell,
  Cpu,
  Database,
  Settings,
  RefreshCw,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  MessageSquare,
  PieChart,
  LineChart,
  Activity,
  Award,
  Star,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

const HRMSFeatures = () => {
  const [activeCategory, setActiveCategory] = useState("core");
  const [hoveredCard, setHoveredCard] = useState(null);

  const featureCategories = [
    {
      id: "core",
      title: "Core HR",
      icon: <Users className="w-8 h-8" />,
      description: "Essential HR management tools for workforce administration",
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
      features: [
        {
          title: "Employee Database",
          description: "Centralized employee records management",
          icon: <Database className="w-6 h-6" />,
          stats: "99.9% data accuracy",
        },
        {
          title: "Attendance Tracking",
          description: "Real-time clock-in/out with geofencing",
          icon: <Clock className="w-6 h-6" />,
          stats: "95% reduction in errors",
        },
        {
          title: "Leave Management",
          description: "Automated leave requests and approvals",
          icon: <Calendar className="w-6 h-6" />,
          stats: "70% faster approvals",
        },
        {
          title: "Onboarding",
          description: "Streamlined employee onboarding process",
          icon: <Upload className="w-6 h-6" />,
          stats: "50% less paperwork",
        },
      ],
      stats: "Used by 10,000+ employees",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600",
      iconBg: "from-[#1F2E9A]/10 to-[#2EC5FF]/10",
      textColor: "text-[#1F2E9A]",
      rightContent: {
        title: "Streamlined HR Management",
        description: "Centralize all employee data and processes in one unified platform",
        benefits: [
          "Single source of truth for employee data",
          "Automated workflows reduce manual work",
          "Real-time updates across all departments",
          "Compliance-ready reports and documentation",
        ],
        stats: [
          { value: "80%", label: "Faster Processing" },
          { value: "95%", label: "Data Accuracy" },
          { value: "50%", label: "Time Saved" },
        ],
        specialFeature: "AI-powered insights for employee engagement"
      }
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Data-driven insights for strategic HR decisions",
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      features: [
        {
          title: "Real-time Dashboards",
          description: "Interactive HR metrics and KPIs",
          icon: <Activity className="w-6 h-6" />,
          stats: "100+ metrics tracked",
        },
        {
          title: "Predictive Analytics",
          description: "Forecast trends and identify patterns",
          icon: <TrendingUp className="w-6 h-6" />,
          stats: "85% prediction accuracy",
        },
        {
          title: "Custom Reports",
          description: "Create and share detailed HR reports",
          icon: <FileText className="w-6 h-6" />,
          stats: "Unlimited report templates",
        },
        {
          title: "Employee Insights",
          description: "Deep dive into workforce analytics",
          icon: <Eye className="w-6 h-6" />,
          stats: "360° employee view",
        },
      ],
      stats: "200+ pre-built reports",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600",
      iconBg: "from-[#9B3DFF]/10 to-[#E60023]/10",
      textColor: "text-[#9B3DFF]",
      rightContent: {
        title: "Intelligent Analytics Suite",
        description: "Transform raw data into actionable insights with advanced analytics",
        benefits: [
          "Predictive workforce planning",
          "Real-time KPI dashboards",
          "Customizable reporting engine",
          "Benchmark against industry standards",
        ],
        stats: [
          { value: "200+", label: "Pre-built Reports" },
          { value: "85%", label: "Prediction Accuracy" },
          { value: "60%", label: "Better Decisions" },
        ],
        specialFeature: "ML-powered trend analysis and forecasting"
      }
    },
    {
      id: "security",
      title: "Security",
      icon: <Shield className="w-8 h-8" />,
      description: "Enterprise-grade security and compliance tools",
      color: "from-[#2430A3] to-[#9B3DFF]",
      gradient: "bg-gradient-to-br from-[#2430A3] to-[#9B3DFF]",
      features: [
        {
          title: "GDPR Compliance",
          description: "Full GDPR and data protection compliance",
          icon: <Lock className="w-6 h-6" />,
          stats: "100% compliant",
        },
        {
          title: "Access Control",
          description: "Role-based permissions and access management",
          icon: <Settings className="w-6 h-6" />,
          stats: "10+ permission levels",
        },
        {
          title: "Audit Trail",
          description: "Complete system activity logging",
          icon: <FileText className="w-6 h-6" />,
          stats: "Zero data loss",
        },
        {
          title: "Data Encryption",
          description: "End-to-end encryption for all data",
          icon: <Shield className="w-6 h-6" />,
          stats: "Military-grade security",
        },
      ],
      stats: "SOC 2 Type II certified",
      image:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=600",
      iconBg: "from-[#2430A3]/10 to-[#9B3DFF]/10",
      textColor: "text-[#2430A3]",
      rightContent: {
        title: "Enterprise Security Framework",
        description: "Protect sensitive HR data with military-grade security protocols",
        benefits: [
          "End-to-end encryption for all communications",
          "SOC 2 Type II certified infrastructure",
          "Granular role-based access controls",
          "Real-time security monitoring and alerts",
        ],
        stats: [
          { value: "99.99%", label: "Uptime SLA" },
          { value: "Zero", label: "Security Breaches" },
          { value: "100%", label: "GDPR Compliant" },
        ],
        specialFeature: "Advanced threat detection and prevention system"
      }
    },
    {
      id: "automation",
      title: "Automation",
      icon: <Zap className="w-8 h-8" />,
      description: "AI-powered automation for repetitive HR tasks",
      color: "from-[#00B894] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]",
      features: [
        {
          title: "Workflow Automation",
          description: "Automate HR processes and approvals",
          icon: <RefreshCw className="w-6 h-6" />,
          stats: "80% time saved",
        },
        {
          title: "AI Recruitment",
          description: "Smart candidate screening and matching",
          icon: <Cpu className="w-6 h-6" />,
          stats: "90% match accuracy",
        },
        {
          title: "Smart Notifications",
          description: "Automated reminders and alerts",
          icon: <Bell className="w-6 h-6" />,
          stats: "Zero missed deadlines",
        },
        {
          title: "Document Generation",
          description: "Auto-generate HR documents and contracts",
          icon: <FileText className="w-6 h-6" />,
          stats: "100+ templates",
        },
      ],
      stats: "500+ workflows automated",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600",
      iconBg: "from-[#00B894]/10 to-[#2EC5FF]/10",
      textColor: "text-[#00B894]",
      rightContent: {
        title: "Smart Automation Engine",
        description: "Eliminate manual work with intelligent automation and AI",
        benefits: [
          "AI-powered recruitment matching",
          "Automated onboarding workflows",
          "Smart document generation and signing",
          "Predictive scheduling optimization",
        ],
        stats: [
          { value: "80%", label: "Time Saved" },
          { value: "500+", label: "Workflows" },
          { value: "90%", label: "Match Accuracy" },
        ],
        specialFeature: "Context-aware automation with machine learning"
      }
    },
    {
      id: "mobile",
      title: "Mobile",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Full-featured HRMS on mobile devices",
      color: "from-[#FF6B6B] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
      features: [
        {
          title: "Mobile App",
          description: "Native iOS and Android applications",
          icon: <Smartphone className="w-6 h-6" />,
          stats: "4.8/5 app rating",
        },
        {
          title: "Push Notifications",
          description: "Instant updates and alerts",
          icon: <Bell className="w-6 h-6" />,
          stats: "Real-time delivery",
        },
        {
          title: "Offline Mode",
          description: "Work without internet connection",
          icon: <Cloud className="w-6 h-6" />,
          stats: "Full functionality",
        },
        {
          title: "Mobile Approval",
          description: "Approve requests on the go",
          icon: <CheckCircle className="w-6 h-6" />,
          stats: "2-minute approvals",
        },
      ],
      stats: "50,000+ mobile users",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600",
      iconBg: "from-[#FF6B6B]/10 to-[#FFA726]/10",
      textColor: "text-[#FF6B6B]",
      rightContent: {
        title: "Mobile-First HR Experience",
        description: "Access all HR features anytime, anywhere with our mobile platform",
        benefits: [
          "Native iOS and Android applications",
          "Offline functionality for remote work",
          "Biometric authentication for security",
          "Push notifications for instant updates",
        ],
        stats: [
          { value: "4.8/5", label: "App Rating" },
          { value: "50K+", label: "Active Users" },
          { value: "99%", label: "Uptime" },
        ],
        specialFeature: "Progressive web app with native performance"
      }
    },
    {
      id: "cloud",
      title: "Cloud",
      icon: <Cloud className="w-8 h-8" />,
      description: "Scalable cloud infrastructure for global teams",
      color: "from-[#E60023] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#E60023] to-[#FFA726]",
      features: [
        {
          title: "Global Access",
          description: "Access from anywhere in the world",
          icon: <Globe className="w-6 h-6" />,
          stats: "24/7 availability",
        },
        {
          title: "Auto Scaling",
          description: "Scale resources based on demand",
          icon: <TrendingUp className="w-6 h-6" />,
          stats: "Zero downtime",
        },
        {
          title: "Data Backup",
          description: "Automatic backups and recovery",
          icon: <Database className="w-6 h-6" />,
          stats: "99.99% uptime",
        },
        {
          title: "API Access",
          description: "Integrate with your existing tools",
          icon: <Settings className="w-6 h-6" />,
          stats: "50+ integrations",
        },
      ],
      stats: "99.99% uptime SLA",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600",
      iconBg: "from-[#E60023]/10 to-[#FFA726]/10",
      textColor: "text-[#E60023]",
      rightContent: {
        title: "Enterprise Cloud Infrastructure",
        description: "Scalable, secure, and reliable cloud platform for global businesses",
        benefits: [
          "Multi-region deployment options",
          "Automatic scaling for peak loads",
          "Enterprise-grade API ecosystem",
          "Real-time data synchronization",
        ],
        stats: [
          { value: "99.99%", label: "Uptime" },
          { value: "50+", label: "Integrations" },
          { value: "24/7", label: "Global Support" },
        ],
        specialFeature: "Multi-cloud architecture for maximum reliability"
      }
    },
  ];

  const activeData =
    featureCategories.find((cat) => cat.id === activeCategory) ||
    featureCategories[0];

  return (
    <section
      className="relative py-16 overflow-hidden"
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
            <span className="text-[#2430A3]">Powerful Features for</span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Modern HRMS  Software
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover comprehensive HRMS features designed to streamline your
            operations, boost productivity, and transform your HR department.
          </p>
        </motion.div>

        {/* Feature Categories Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {featureCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                  activeCategory === category.id
                    ? "shadow-xl"
                    : "shadow-md hover:shadow-lg"
                }`}
              >
                {/* Animated Background */}
                <div
                  className={`absolute inset-0 ${category.gradient} transition-opacity duration-500 ${
                    activeCategory === category.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />

                {/* Static Background */}
                <div
                  className={`absolute inset-0 bg-white transition-opacity duration-500 ${
                    activeCategory === category.id
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                />

                {/* Border */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-500 ${
                    activeCategory === category.id
                      ? "border-transparent"
                      : "border-gray-200 group-hover:border-gray-300"
                  }`}
                />

                {/* Content */}
                <div className="relative flex items-center gap-3 px-6 py-3">
                  {/* Icon Container */}
                  <motion.div
                    animate={
                      activeCategory === category.id
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
                      activeCategory === category.id
                        ? "bg-white/20"
                        : `bg-gradient-to-br ${category.iconBg}`
                    }`}
                  >
                    <div
                      className={`transition-colors duration-500 ${
                        activeCategory === category.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {React.cloneElement(category.icon, {
                        className: "w-5 h-5",
                      })}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <span
                    className={`font-semibold whitespace-nowrap transition-colors duration-500 ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {category.title}
                  </span>

                  {/* Active Indicator */}
                  <AnimatePresence>
                    {activeCategory === category.id && (
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
                {activeCategory === category.id && (
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
          {/* Left Side - Feature Cards Stack */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
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
                        {activeData.title} Features
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
                      <div className="grid grid-cols-1 gap-4 mb-8">
                        {activeData.features.map((feature, idx) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="group/feature p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                          >
                            <div className="flex items-start gap-4">
                              {/* Feature Icon */}
                              <div className="relative">
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeData.iconBg} flex items-center justify-center`}
                                >
                                  <div className={activeData.textColor}>
                                    {feature.icon}
                                  </div>
                                </motion.div>
                              </div>

                              {/* Feature Content */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900">
                                    {feature.title}
                                  </h4>
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700">
                                    {feature.stats}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
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
                                Explore {activeData.title}
                              </div>
                              <div className="text-xs text-gray-600">
                                Learn more about these features
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
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                {/* Main Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activeData.color}`} />

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
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-center mb-8"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white">
                          {activeData.title.toUpperCase()} HIGHLIGHTS
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {activeData.rightContent.title}
                      </h3>
                      <p className="text-white/80 text-lg">
                        {activeData.rightContent.description}
                      </p>
                    </motion.div>

                    {/* Key Benefits Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                        {activeData.rightContent.benefits.map((benefit, idx) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
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

                    {/* Stats Showcase */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="relative bg-gradient-to-r from-white/10 to-white/5 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm p-6"
                    >
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-white mb-2">
                          Performance Metrics
                        </h4>
                        <p className="text-white/70 text-sm">
                          {activeData.rightContent.specialFeature}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {activeData.rightContent.stats.map((stat, idx) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                            className="text-center"
                          >
                            <div className="text-2xl font-bold text-white mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs text-white/70">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Animated Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
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
                    className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl rotate-12 shadow-2xl opacity-90 backdrop-blur-sm"
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
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl -rotate-12 shadow-2xl opacity-90 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
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
                    START YOUR FREE TRIAL
                  </span>
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready  Your HRMS Software?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses that trust our HRMS platform.
                  Start your 14-day free trial today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* <MagneticButton
                    variant="square"
                    className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#1F2E9A]/20 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Start Free Trial</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </MagneticButton> */}
                  <MagneticButton
                    variant="square"
                    className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-200/20 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Schedule Demo</span>
                    <Calendar className="w-5 h-5" />
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

export default HRMSFeatures;