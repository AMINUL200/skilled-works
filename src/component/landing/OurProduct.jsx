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

const OurProduct = ({ productData = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  console.log("Received product data:", productData);
  const STORAGE_URL = import.meta.env.VITE_APP_STORAGE_URL;

  const navigate = useNavigate();

  // Filter products - keeping it simple without category filters
  useEffect(() => {
    setFilteredProducts(productData);
  }, [productData]);

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

  // Function to get gradient based on product id (for visual variety)
  const getProductGradient = (id) => {
    const gradients = [
      "from-[#1F2E9A] via-[#1A3CC3] to-[#2430A3]",
      "from-[#9B3DFF] via-[#9B5CFF] to-[#A83DFF]",
      "from-[#2EC5FF] via-[#2ED8FF] to-[#00C6FF]",
      "from-[#00B894] via-[#00D3A9] to-[#00E5B4]",
      "from-[#FF6B6B] via-[#FF8E8E] to-[#FFA8A8]",
      "from-[#8E44AD] via-[#9B59B6] to-[#AF7AC5]",
    ];
    return gradients[id % gradients.length];
  };

  // Function to get icon based on product title or id
  const getProductIcon = (title, id) => {
    const icons = [
      <Users className="w-5 h-5" />,
      <Brain className="w-5 h-5" />,
      <Shield className="w-5 h-5" />,
      <Globe className="w-5 h-5" />,
      <TrendingUp className="w-5 h-5" />,
      <Zap className="w-5 h-5" />,
    ];
    
    // You can customize this logic based on title keywords
    if (title.toLowerCase().includes("hrms") || title.toLowerCase().includes("hr")) {
      return <Users className="w-5 h-5" />;
    } else if (title.toLowerCase().includes("recruitment") || title.toLowerCase().includes("ai")) {
      return <Brain className="w-5 h-5" />;
    } else if (title.toLowerCase().includes("document")) {
      return <Shield className="w-5 h-5" />;
    } else if (title.toLowerCase().includes("attendance")) {
      return <Globe className="w-5 h-5" />;
    } else if (title.toLowerCase().includes("insight") || title.toLowerCase().includes("analytic")) {
      return <TrendingUp className="w-5 h-5" />;
    } else if (title.toLowerCase().includes("remote") || title.toLowerCase().includes("work")) {
      return <Zap className="w-5 h-5" />;
    }
    
    return icons[id % icons.length];
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
                📦
              </motion.div>
              <h4 className="text-3xl font-bold bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF] bg-clip-text text-transparent mb-3">
                No products found
              </h4>
              <p className="text-lg text-gray-500 mb-8">
                Please check back later for our product listings
              </p>
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
                  onClick={() => navigate(`/product/${product.slug || product.id}`)}
                >
                  {/* Premium Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* If you have actual images in your product data, use them here */}
                    {/* For now, using placeholder based on product title */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${product.images[0]?.image_url || 'https://via.placeholder.com/400x300?text=Product+Image'})` 
                      }}
                    />

                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143c]/70 to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465aff]/70" />

                    {/* Gradient Border Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${
                          getProductGradient(product.id).includes("1F2E9A")
                            ? "#1F2E9A"
                            : getProductGradient(product.id).includes("9B3DFF")
                              ? "#9B3DFF"
                              : getProductGradient(product.id).includes("2EC5FF")
                                ? "#2EC5FF"
                                : getProductGradient(product.id).includes("00B894")
                                  ? "#00B894"
                                  : getProductGradient(product.id).includes("FF6B6B")
                                    ? "#FF6B6B"
                                    : "#8E44AD"
                        }15, transparent)`,
                      }}
                    />

                    {/* Stats Badge - Top Left */}
                    <motion.div
                      className="absolute top-5 left-5 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40">
                        <div
                          className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getProductGradient(product.id)} animate-pulse`}
                        />
                        <span className="text-xs font-bold text-gray-900">
                          {product.rating ? `${product.rating} ★` : 'New'}
                        </span>
                      </div>
                    </motion.div>

                    {/* Views & Comments - Hover State (using happy_customer as views) */}
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
                            {product.happy_customer || 0}k
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
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${getProductGradient(product.id)}`}>
                        {getProductIcon(product.title, product.id)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#1F2E9A] transition-colors duration-300">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {product.short_desc || product.title_meta || "Comprehensive HR solution for modern businesses"}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {product.accuricy && (
                          <div className="flex items-center gap-2">
                            <Target className="w-3 h-3 text-gray-400" />
                            <span className="font-medium">{product.accuricy}</span>
                          </div>
                        )}
                        {product.support_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="font-medium">{product.support_time}</span>
                          </div>
                        )}
                      </div>

                      {/* Explore Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.slug || product.id}`);
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