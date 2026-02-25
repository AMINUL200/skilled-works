import React, { useState, useEffect } from "react";
import { 
  Users,
  FileText,
  FolderOpen,
  Cpu,
  Briefcase,
  Globe,
  Factory,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Calendar,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";
import { useNavigate } from "react-router-dom";

// Helper function to extract plain text from HTML
const extractPlainText = (htmlString) => {
  if (!htmlString) return "";
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

// Helper function to extract features from description
const extractFeatures = (description) => {
  if (!description) return [];
  
  const plainText = extractPlainText(description);
  
  // Split by new lines or bullet points
  const lines = plainText.split('\n').filter(line => line.trim().length > 0);
  
  // If we have bullet points or line-separated features
  if (lines.length > 1) {
    return lines.slice(0, 6).map(line => line.trim());
  }
  
  // Fallback features based on service name
  return [
    "Streamlined Operations",
    "Automated Workflows",
    "Real-time Analytics",
    "Compliance Ready",
    "Secure Platform",
    "Dedicated Support"
  ];
};

// Icon mapping based on service name
const getIconForService = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  if (name.includes('hrms') || name.includes('software')) return <Users className="w-8 h-8" />;
  if (name.includes('file') || name.includes('document')) return <FileText className="w-8 h-8" />;
  if (name.includes('folder') || name.includes('manager')) return <FolderOpen className="w-8 h-8" />;
  if (name.includes('development') || name.includes('tech')) return <Cpu className="w-8 h-8" />;
  if (name.includes('business') || name.includes('consult')) return <Briefcase className="w-8 h-8" />;
  if (name.includes('web') || name.includes('profile')) return <Globe className="w-8 h-8" />;
  if (name.includes('industry') || name.includes('skilled')) return <Factory className="w-8 h-8" />;
  if (name.includes('career') || name.includes('talent')) return <Award className="w-8 h-8" />;
  
  // Default
  return <Users className="w-8 h-8" />;
};

// Color schemes for different services
const colorSchemes = [
  {
    color: "from-[#1F2E9A] to-[#2EC5FF]",
    gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
  },
  {
    color: "from-[#9B3DFF] to-[#E60023]",
    gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
  },
  {
    color: "from-[#2430A3] to-[#9B3DFF]",
    gradient: "bg-gradient-to-br from-[#2430A3] to-[#9B3DFF]",
  },
  {
    color: "from-[#00B894] to-[#2EC5FF]",
    gradient: "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]",
  },
  {
    color: "from-[#FF6B6B] to-[#FFA726]",
    gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
  },
  {
    color: "from-[#E60023] to-[#FFA726]",
    gradient: "bg-gradient-to-br from-[#E60023] to-[#FFA726]",
  },
  {
    color: "from-[#1F2E9A] to-[#2430A3]",
    gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2430A3]",
  },
  {
    color: "from-[#9B3DFF] to-[#2EC5FF]",
    gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#2EC5FF]",
  },
];

const ServiceWhatWeOffer = ({ serviceTypes = [] }) => {
  console.log("Received serviceTypes in ServiceWhatWeOffer:", serviceTypes);
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Extract the actual data array from serviceTypes
  const servicesData = serviceTypes || [];

  // Transform API data to component format
  const transformServices = () => {
    if (!servicesData.length) {
      return []; // Return empty array, will use fallback
    }

    return servicesData.map((service, index) => {
      const serviceId = service.slug || `service-${service.id}`;
      const serviceName = service.name || "Service";
      
      // Set first service as active by default
      if (index === 0 && activeService === "") {
        setActiveService(serviceId);
      }

      // Get color scheme based on index
      const colorScheme = colorSchemes[index % colorSchemes.length];

      // Extract features from description
      // const features = extractFeatures(service.description);

      // Create stats from badge text or generate
      const stats = service.badge_text || `${serviceName} Solution`;

      return {
        id: serviceId,
        label: serviceName,
        icon: getIconForService(serviceName),
        description: service.description || `Comprehensive ${serviceName} solution for UK businesses`,
        longDescription:service.description ,
        color: colorScheme.color,
        gradient: colorScheme.gradient,
        // features: features,
        stats: stats,
        image: `${STORAGE_URL}${service.image || ""}`,
        image_alt: service.image_alt || serviceName,
        buttonName: service.button_name || "Explore Service",
        path: `/service/${service.slug}`,
        delay: index * 0.1,
        heading: service.heading || "",
        highlightedText: service.highlighted_text || "",
      };
    });
  };

  // Fallback services if no API data
  const fallbackServices = [
    {
      id: "hrms_software",
      label: "HRMS Software",
      icon: <Users className="w-8 h-8" />,
      description: "Comprehensive HR management system for UK businesses",
      longDescription: "Complete HR management solution with employee database, attendance tracking, payroll integration, and compliance tools.",
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
      features: [
        "Employee database management",
        "Attendance & leave tracking",
        "Payroll integration",
        "Performance analytics",
        "UK compliance tools",
        "Mobile app access"
      ],
      stats: "Used by 500+ UK businesses",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600",
      path: "/service/hrms-software",
      delay: 0,
    },
    {
      id: "hr_file_preparation",
      label: "HR File Preparation",
      icon: <FileText className="w-8 h-8" />,
      description: "Professional HR documentation and compliance files",
      longDescription: "Expert HR documentation services including employment contracts, policy documentation, and compliance checklists.",
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      features: [
        "Employment contracts",
        "Policy documentation",
        "Compliance checklists",
        "Record management",
        "Audit preparation",
        "GDPR compliance"
      ],
      stats: "1000+ files prepared",
      image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=600",
      path: "/cms/hr-file-preparation",
      delay: 0.1,
    },
  ];

  const services = transformServices().length > 0 ? transformServices() : fallbackServices;
  const activeServiceData = services.find(service => service.id === activeService) || services[0];

  const handleServiceClick = (path) => {
    navigate(path);
  };

  // Benefits data
  const benefits = [
    { icon: <Shield />, text: "UK Compliance Guaranteed", color: "text-[#00B894]" },
    { icon: <TrendingUp />, text: "Proven Business Results", color: "text-[#1F2E9A]" },
    { icon: <Calendar />, text: "Timely Delivery Promise", color: "text-[#E60023]" },
    { icon: <MessageSquare />, text: "Dedicated UK Support", color: "text-[#9B3DFF]" },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFF] to-white">
        {/* Animated Background Shapes */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#9B3DFF]" />
            <span className="text-sm font-semibold text-[#1F2E9A]">
              COMPREHENSIVE SOLUTIONS
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-[#2430A3]">What We Offer</span>
            <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Services & Solutions
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of HR-tech and business solutions designed to meet the unique needs of UK businesses
          </p>
        </motion.div>

        {/* SERVICES NAVIGATION */}
        {services.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveService(service.id)}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    activeService === service.id
                      ? "shadow-xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 ${service.gradient} transition-opacity duration-500 ${
                      activeService === service.id ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Static Background */}
                  <div
                    className={`absolute inset-0 bg-white transition-opacity duration-500 ${
                      activeService === service.id ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-500 ${
                      activeService === service.id
                        ? "border-transparent"
                        : "border-gray-200 group-hover:border-gray-300"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative flex items-center gap-3 px-6 py-3">
                    {/* Icon Container */}
                    <motion.div
                      animate={
                        activeService === service.id
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
                        activeService === service.id
                          ? "bg-white/20"
                          : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`transition-colors duration-500 ${
                          activeService === service.id
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {React.cloneElement(service.icon, {
                          className: "w-5 h-5",
                        })}
                      </div>
                    </motion.div>

                    {/* Label */}
                    <span
                      className={`font-semibold whitespace-nowrap transition-colors duration-500 ${
                        activeService === service.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {service.label}
                    </span>

                    {/* Active Indicator */}
                    <AnimatePresence>
                      {activeService === service.id && (
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
                  {activeService === service.id && (
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

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - SERVICE DETAILS */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: 50, rotateY: 15 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="relative"
              >
                {/* Main Card */}
                <div className="group relative">
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${activeServiceData.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    {/* Gradient Header */}
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${activeServiceData.color}`}
                      layoutId="activeBar"
                    />

                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon */}
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
                            className="absolute inset-0 bg-gray-50 blur-xl"
                          />

                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${activeServiceData.color} shadow-xl flex items-center justify-center`}
                          >
                            <div className="text-white">
                              {React.cloneElement(activeServiceData.icon, {
                                className: "w-10 h-10",
                              })}
                            </div>
                          </motion.div>

                          {/* Check Badge */}
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
                            className={`absolute -inset-1 bg-gradient-to-r ${activeServiceData.color} rounded-2xl blur opacity-0 group-hover/badge:opacity-40 transition-opacity`}
                          />
                          <div className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-md">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-gray-700" />
                              <span className="text-sm font-bold text-gray-900">
                                {activeServiceData.stats}
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
                        {activeServiceData.label}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 mb-8 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{__html: activeServiceData.longDescription || activeServiceData.description}}
                            >
                      </motion.p>

                      

                      {/* CTA Button */}
                      <button
                        onClick={() => handleServiceClick(activeServiceData.path)}
                        className="group/btn relative w-full overflow-hidden rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeServiceData.color} flex items-center justify-center shadow-md`}
                            >
                              <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-gray-900">
                                {activeServiceData.buttonName || `Explore ${activeServiceData.label}`}
                              </div>
                              <div className="text-xs text-gray-600">
                                Learn more about this service
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
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - BENEFITS AND IMAGE */}
          <div className="space-y-8">
            {/* Image Card */}
            {activeServiceData.image && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF] rounded-3xl blur opacity-30" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <img 
                    src={activeServiceData.image} 
                    alt={activeServiceData.image_alt || activeServiceData.label}
                    className="w-full h-120 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl font-bold mb-1">{activeServiceData.heading || activeServiceData.label}</h4>
                    <p className="text-sm opacity-90">{activeServiceData.highlightedText || "Premium Service"}</p>
                  </div>
                </div>
              </motion.div>
            )}

           

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceWhatWeOffer;