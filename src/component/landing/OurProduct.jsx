import React, { useState, useEffect } from "react";
import {
  Tag,
  Eye,
  MessageCircle,
  ArrowRight,
  Zap,
  Users,
  Brain,
  Shield,
  Globe,
  TrendingUp,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  Target,
  BarChart3,
  Filter,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../common/MagneticButtonProps";

const OurProduct = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: "Smart HRMS Suite Pro",
      description:
        "Complete human resource management powered by artificial intelligence with real-time analytics and predictive insights.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      category: "HR Tech",
      stats: "98% Efficiency",
      views: "2.4k",
      comments: 42,
      tags: ["AI", "Automation", "HRMS", "Cloud"],
      icon: <Users className="w-5 h-5" />,
      readTime: "5 min setup",
      date: "2024-01-15",
      gradient: "from-[#1F2E9A] via-[#1A3CC3] to-[#2430A3]",
      features: [
        "Employee Database",
        "Payroll Integration",
        "Performance Tracking",
        "Training Management",
      ],
    },
    {
      id: 2,
      title: "Intelligent Recruitment AI",
      description:
        "Smart hiring platform with predictive candidate matching and automated interview scheduling.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      category: "Recruitment",
      stats: "60% Faster Hiring",
      views: "3.1k",
      comments: 38,
      tags: ["AI", "Recruitment", "Screening", "Automation"],
      icon: <Brain className="w-5 h-5" />,
      readTime: "6 min setup",
      date: "2024-02-20",
      gradient: "from-[#9B3DFF] via-[#9B5CFF] to-[#A83DFF]",
      features: [
        "AI Screening",
        "Smart Matching",
        "Video Interviews",
        "Offer Management",
      ],
    },
    {
      id: 3,
      title: "Document Intelligence Hub",
      description:
        "AI-powered document management with automatic categorization, smart search, and secure storage.",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
      category: "Documentation",
      stats: "100% Organized",
      views: "4.2k",
      comments: 56,
      tags: ["AI", "Document", "Security", "Cloud"],
      icon: <Shield className="w-5 h-5" />,
      readTime: "7 min setup",
      date: "2024-01-30",
      gradient: "from-[#2EC5FF] via-[#2ED8FF] to-[#00C6FF]",
      features: [
        "AI Categorization",
        "Smart Search",
        "Version Control",
        "Secure Cloud",
      ],
    },
    {
      id: 4,
      title: "Attendance Pro Max",
      description:
        "Advanced tracking with geofencing, biometric integration, and predictive analytics.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "Attendance",
      stats: "95% Accuracy",
      views: "5.6k",
      comments: 89,
      tags: ["Tracking", "Biometric", "Analytics", "Mobile"],
      icon: <Globe className="w-5 h-5" />,
      readTime: "4 min setup",
      date: "2024-02-05",
      gradient: "from-[#00B894] via-[#00D3A9] to-[#00E5B4]",
      features: [
        "Geofencing",
        "Biometric Integration",
        "Predictive Analytics",
        "Overtime AI",
      ],
    },
    {
      id: 5,
      title: "Insights Dashboard Elite",
      description:
        "Interactive analytics platform with predictive insights and automated reporting.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Analytics",
      stats: "30+ Report Types",
      views: "3.4k",
      comments: 41,
      tags: ["Analytics", "Dashboard", "Reports", "Insights"],
      icon: <TrendingUp className="w-5 h-5" />,
      readTime: "6 min setup",
      date: "2024-03-01",
      gradient: "from-[#FF6B6B] via-[#FF8E8E] to-[#FFA8A8]",
      features: [
        "Predictive Analytics",
        "Custom KPIs",
        "Real-time Insights",
        "Automated Reports",
      ],
    },
    {
      id: 6,
      title: "Remote Work Suite",
      description:
        "Complete toolkit for managing distributed teams with collaboration and productivity tools.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      category: "Remote Work",
      stats: "40% Productivity",
      views: "6.2k",
      comments: 112,
      tags: ["Remote", "Collaboration", "Productivity", "Tools"],
      icon: <Zap className="w-5 h-5" />,
      readTime: "7 min setup",
      date: "2024-02-15",
      gradient: "from-[#8E44AD] via-[#9B59B6] to-[#AF7AC5]",
      features: [
        "Team Collaboration",
        "Task Management",
        "Virtual Meetings",
        "Productivity Tracking",
      ],
    },
  ];

  const navigate = useNavigate();

  const categories = [
    { id: "all", label: "All Products", icon: "📦", count: products.length },
    { id: "HR Tech", label: "HR Tech", icon: "🤖", count: 1 },
    { id: "Recruitment", label: "Recruitment", icon: "👥", count: 1 },
    { id: "Documentation", label: "Documentation", icon: "📄", count: 1 },
    { id: "Attendance", label: "Attendance", icon: "⏰", count: 1 },
    { id: "Analytics", label: "Analytics", icon: "📊", count: 1 },
    { id: "Remote Work", label: "Remote Work", icon: "🏠", count: 1 },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products
  useEffect(() => {
    if (activeFilter !== "all") {
      const filtered = products.filter(
        (product) => product.category === activeFilter,
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  return (
    <section
      className="relative py-15 overflow-hidden bg-white"
      style={{
        background:
          "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)",
      }}
    >
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Gradient Orbs - More Subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#1F2E9A] to-[#9B3DFF] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#2EC5FF] to-[#00B894] rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles - Refined */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${
                i % 3 === 0 ? "#9B3DFF" : i % 3 === 1 ? "#2EC5FF" : "#1F2E9A"
              }40, transparent)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          {/* Main Heading */}
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
            <span className="block text-[#2430A3]">Discover Our</span>
            <span className="block mt-3 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Product Ecosystem
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            A seamlessly integrated platform where every module works in perfect
            harmony to transform your HR operations.
          </p>

          {/* Premium Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-6 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white border-transparent shadow-xl shadow-[#1F2E9A]/30"
                    : "bg-white/80 backdrop-blur-sm border-gray-200/80 text-gray-700 hover:border-[#1F2E9A]/50 hover:shadow-lg hover:bg-white"
                }`}
              >
                {/* Hover Gradient Effect */}
                {activeFilter !== category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1F2E9A]/5 to-[#9B3DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <span className="relative text-lg">{category.icon}</span>
                <span className="relative font-semibold text-sm">
                  {category.label}
                </span>

                {/* Count Badge */}
                <span
                  className={`relative ml-1 px-2 py-0.5 rounded-lg text-xs font-bold ${
                    activeFilter === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#1F2E9A]/10 group-hover:text-[#1F2E9A]"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

        
        </motion.div>

        {/* Premium Products Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🔍
              </motion.div>
              <h4 className="text-3xl font-bold bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF] bg-clip-text text-transparent mb-3">
                No products found
              </h4>
              <p className="text-lg text-gray-500 mb-8">
                Try selecting a different category
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Show All Products
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="products-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  layout
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 hover:shadow-2xl hover:shadow-gray-300/80 transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-gray-200/60"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Premium Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Background Image */}
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                      animate={{
                        scale: hoveredProduct === product.id ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143c]/70 to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465aff]/70" />

                    {/* Gradient Border Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${
                          product.gradient.includes("1F2E9A")
                            ? "#1F2E9A"
                            : product.gradient.includes("9B3DFF")
                              ? "#9B3DFF"
                              : product.gradient.includes("2EC5FF")
                                ? "#2EC5FF"
                                : product.gradient.includes("00B894")
                                  ? "#00B894"
                                  : product.gradient.includes("FF6B6B")
                                    ? "#FF6B6B"
                                    : "#8E44AD"
                        }15, transparent)`,
                      }}
                    />

                    {/* Category Badge - Top Right */}
                    <motion.div
                      className="absolute top-5 right-5 z-20"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40">
                        <div
                          className={`p-1.5 rounded-xl bg-gradient-to-br ${product.gradient}`}
                        >
                          <div className="text-white">{product.icon}</div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {product.category}
                        </span>
                      </div>
                    </motion.div>

                    {/* Stats Badge - Top Left */}
                    <motion.div
                      className="absolute top-5 left-5 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40">
                        <div
                          className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${product.gradient} animate-pulse`}
                        />
                        <span className="text-xs font-bold text-gray-900">
                          {product.stats}
                        </span>
                      </div>
                    </motion.div>

                    {/* Views & Comments - Hover State */}
                    <motion.div
                      className="absolute top-20 right-5 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {product.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {product.comments}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Center Hover Action Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          scale: hoveredProduct === product.id ? 1 : 0,
                          rotate: hoveredProduct === product.id ? 360 : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          rotate: { duration: 0.6 },
                        }}
                        className="w-20 h-20 bg-white/98 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50"
                      >
                        <ArrowRight
                          className="w-7 h-7 text-[#1F2E9A] group-hover:-rotate-45 transition-transform duration-500"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Premium Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1F2E9A] transition-colors duration-300">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                   

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">
                            {new Date(product.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">{product.readTime}</span>
                        </div>
                      </div>

                      {/* Explore Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subtle Shine Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background:
                        hoveredProduct === product.id
                          ? `linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
                          : "transparent",
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
        

          <MagneticButton
            onClick={() => navigate("/product")}
            variant="square"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#1F2E9A]/30 transition-all duration-500 hover:-translate-y-1 mt-5"
          >
          
            <span>View All Products</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />

          </MagneticButton>


        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default OurProduct;