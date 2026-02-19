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
  Upload,
  Filter,
  Search,
  MessageSquare,
  PieChart,
  LineChart,
  Activity,
  Award,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

// Helper function to extract plain text from HTML
const extractPlainText = (htmlString) => {
  if (!htmlString) return "";
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

// Helper function to parse feature cards from long_desc HTML
const parseFeatureCards = (htmlString) => {
  if (!htmlString) return [];

  const features = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find all feature card containers
  const featureCards = doc.querySelectorAll(".group\\/feature");

  featureCards.forEach((card) => {
    // Extract title
    const titleElement = card.querySelector("h4");
    const title = titleElement ? titleElement.textContent : "";

    // Extract stats
    const statsElement = card.querySelector("span.text-xs");
    const stats = statsElement ? statsElement.textContent : "";

    // Extract description
    const descElement = card.querySelector("p.text-gray-600.text-sm");
    const description = descElement ? descElement.textContent : "";

    // Determine icon based on title or content
    const getIconForFeature = (title) => {
      const titleLower = (title || "").toLowerCase();
      if (titleLower.includes("employee") || titleLower.includes("database"))
        return <Database className="w-6 h-6" />;
      if (
        titleLower.includes("attendance") ||
        titleLower.includes("time") ||
        titleLower.includes("clock")
      )
        return <Clock className="w-6 h-6" />;
      if (
        titleLower.includes("leave") ||
        titleLower.includes("holiday") ||
        titleLower.includes("calendar")
      )
        return <Calendar className="w-6 h-6" />;
      if (titleLower.includes("onboard")) return <Upload className="w-6 h-6" />;
      if (titleLower.includes("report") || titleLower.includes("document"))
        return <FileText className="w-6 h-6" />;
      if (titleLower.includes("dashboard") || titleLower.includes("analytics"))
        return <Activity className="w-6 h-6" />;
      return <CheckCircle className="w-6 h-6" />;
    };

    if (title) {
      features.push({
        title,
        description,
        icon: getIconForFeature(title),
        stats: stats || "Enhanced feature",
      });
    }
  });

  return features;
};

// Helper function to extract main description from long_desc
const extractMainDescription = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find the first paragraph with text-gray-600 class
  const descElement = doc.querySelector("p.text-gray-600");
  return descElement ? descElement.textContent : "";
};

const HRMSFeatures = ({ featureData = [], storageUrl = "" }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  console.log("HRMSFeatures received featureData:", {
    featureData,
    storageUrl,
  });

  // Transform API feature data to match component structure
  const transformFeatureData = () => {
    if (!featureData || featureData.length === 0) {
      return []; // Return empty array, will use fallback
    }

    return featureData.map((feature, index) => {
      // Extract feature name and create ID
      const featureName = feature.feature_name || "Core HR";
      const featureId = featureName.toLowerCase().replace(/\s+/g, "-");

      // Set first feature as active by default
      if (index === 0 && activeCategory === "") {
        setActiveCategory(featureId);
      }

      // Parse feature cards from long_desc
      const parsedFeatures = parseFeatureCards(feature.long_desc || "");

      // Get main description
      const mainDescription =
        extractMainDescription(feature.long_desc || "") ||
        extractPlainText(
          feature.desc || `Comprehensive ${featureName} features`,
        );

      // Determine icon based on feature name
      const getIcon = () => {
        const name = featureName.toLowerCase();
        if (name.includes("core")) return <Users className="w-8 h-8" />;
        if (name.includes("dashboard"))
          return <BarChart3 className="w-8 h-8" />;
        if (name.includes("analytics"))
          return <BarChart3 className="w-8 h-8" />;
        if (name.includes("security")) return <Shield className="w-8 h-8" />;
        if (name.includes("automation")) return <Zap className="w-8 h-8" />;
        if (name.includes("mobile")) return <Smartphone className="w-8 h-8" />;
        if (name.includes("cloud")) return <Cloud className="w-8 h-8" />;
        return <Target className="w-8 h-8" />;
      };

      // Determine color scheme based on feature name
      const getColorScheme = () => {
        const name = featureName.toLowerCase();
        if (name.includes("core")) {
          return {
            color: "from-[#1F2E9A] to-[#2EC5FF]",
            gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
            iconBg: "from-[#1F2E9A]/10 to-[#2EC5FF]/10",
            textColor: "text-[#1F2E9A]",
          };
        }
        if (name.includes("dashboard") || name.includes("analytics")) {
          return {
            color: "from-[#9B3DFF] to-[#E60023]",
            gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
            iconBg: "from-[#9B3DFF]/10 to-[#E60023]/10",
            textColor: "text-[#9B3DFF]",
          };
        }
        if (name.includes("security")) {
          return {
            color: "from-[#2430A3] to-[#9B3DFF]",
            gradient: "bg-gradient-to-br from-[#2430A3] to-[#9B3DFF]",
            iconBg: "from-[#2430A3]/10 to-[#9B3DFF]/10",
            textColor: "text-[#2430A3]",
          };
        }
        if (name.includes("automation")) {
          return {
            color: "from-[#00B894] to-[#2EC5FF]",
            gradient: "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]",
            iconBg: "from-[#00B894]/10 to-[#2EC5FF]/10",
            textColor: "text-[#00B894]",
          };
        }
        if (name.includes("mobile")) {
          return {
            color: "from-[#FF6B6B] to-[#FFA726]",
            gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
            iconBg: "from-[#FF6B6B]/10 to-[#FFA726]/10",
            textColor: "text-[#FF6B6B]",
          };
        }
        return {
          color: "from-[#E60023] to-[#FFA726]",
          gradient: "bg-gradient-to-br from-[#E60023] to-[#FFA726]",
          iconBg: "from-[#E60023]/10 to-[#FFA726]/10",
          textColor: "text-[#E60023]",
        };
      };

      const colors = getColorScheme();

      // Generate benefits array from parsed features
      const generateBenefits = () => {
        if (parsedFeatures.length > 0) {
          return parsedFeatures.slice(0, 4).map((f) => f.title);
        }
        return [
          `Streamlined ${featureName} processes`,
          `Automated workflows and approvals`,
          `Real-time ${featureName} insights`,
          `Compliance-ready ${featureName} documentation`,
        ];
      };

      return {
        id: featureId,
        title: featureName,
        icon: getIcon(),
        description: mainDescription,
        heading: feature.feature_heading || "Powerful Features for",
        highlighted_text: feature.highlighted_text || "Modern HRMS Software",
        color: colors.color,
        gradient: colors.gradient,
        iconBg: colors.iconBg,
        textColor: colors.textColor,
        features:
          parsedFeatures.length > 0
            ? parsedFeatures
            : [
                {
                  title: `${featureName} Management`,
                  description: `Comprehensive ${featureName.toLowerCase()} management tools`,
                  icon: getIcon(),
                  stats: "Enterprise-grade",
                },
                {
                  title: `Advanced ${featureName}`,
                  description: `Advanced ${featureName.toLowerCase()} features for your business`,
                  icon: getIcon(),
                  stats: "Enhanced",
                },
              ],
        stats: `Enhanced ${featureName} capabilities`,
        image: `${storageUrl}${feature.image}`,
        rightContent: {
          title: `Advanced ${featureName} Suite`,
          image: `${storageUrl}${feature.image}`,
          description:
            feature.desc ||
            `Discover comprehensive ${featureName.toLowerCase()} features designed to streamline your operations, boost productivity, and transform your HR department.`,
          benefits: generateBenefits(),
          stats: [
            { value: "80%", label: "Faster Processing" },
            { value: "95%", label: "Data Accuracy" },
            { value: "50%", label: "Time Saved" },
          ],
          specialFeature: `AI-powered ${featureName.toLowerCase()} insights and automation`,
        },
      };
    });
  };

  // Fallback feature categories if no API data
  const fallbackCategories = [
    {
      id: "core",
      title: "Core HR",
      icon: <Users className="w-8 h-8" />,
      description: "Essential HR management tools for workforce administration",
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
      iconBg: "from-[#1F2E9A]/10 to-[#2EC5FF]/10",
      textColor: "text-[#1F2E9A]",
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
      rightContent: {
        title: "Streamlined HR Management",
        description:
          "Centralize all employee data and processes in one unified platform",
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
        specialFeature: "AI-powered insights for employee engagement",
      },
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Interactive dashboards for real-time HR insights",
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      iconBg: "from-[#9B3DFF]/10 to-[#E60023]/10",
      textColor: "text-[#9B3DFF]",
      features: [
        {
          title: "Real-time Analytics",
          description: "Live HR metrics and KPIs",
          icon: <Activity className="w-6 h-6" />,
          stats: "Real-time updates",
        },
        {
          title: "Custom Reports",
          description: "Personalized report generation",
          icon: <FileText className="w-6 h-6" />,
          stats: "Unlimited templates",
        },
      ],
      stats: "Interactive dashboards",
      rightContent: {
        title: "Advanced Dashboard Suite",
        description: "Interactive dashboards for real-time HR insights",
        benefits: [
          "Real-time HR analytics",
          "Custom report generation",
          "Data visualization tools",
          "KPI tracking",
        ],
        stats: [
          { value: "100%", label: "Real-time" },
          { value: "24/7", label: "Availability" },
          { value: "50+", label: "Metrics" },
        ],
        specialFeature: "Interactive data visualization",
      },
    },
  ];

  const featureCategories =
    transformFeatureData().length > 0
      ? transformFeatureData()
      : fallbackCategories;

  // Find active data, default to first category if activeCategory not set
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
            <span className="text-[#2430A3]">
              {featureCategories[0]?.heading || "Powerful Features for"}
            </span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              {featureCategories[0]?.highlighted_text || "Modern HRMS Software"}
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {featureCategories[0]?.description ||
              "Discover comprehensive HRMS features designed to streamline your operations, boost productivity, and transform your HR department."}
          </p>
        </motion.div>

        {/* Feature Categories Navigation */}
        {featureCategories.length > 1 && (
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
        )}

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
                          {/* <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover/btn:text-gray-600 transition-colors" />
                          </motion.div> */}
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeData.color}`}
                  />

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
                      <p
                        className="text-white/80 text-lg"
                        dangerouslySetInnerHTML={{
                          __html: activeData.rightContent.description,
                        }}
                      ></p>
                    </motion.div>

                    {/* Key Benefits Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ y: -5 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20"
                    >
                     <img src={activeData.rightContent.image} alt={activeData.rightContent.title} className="w-full h-48 object-cover rounded-lg" />
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

        
      </div>
    </section>
  );
};

export default HRMSFeatures;
