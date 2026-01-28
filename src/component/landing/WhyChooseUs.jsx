import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cloud,
  Shield,
  Lock,
  Zap,
  HeadphonesIcon,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Users,
  Globe,
  Target,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState("cloud");

  const features = [
    {
      id: "cloud",
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud-based",
      description:
        "Access your HR platform anytime, anywhere with our secure cloud infrastructure. Scale effortlessly as your business grows.",
      gradient: "from-[#2EC5FF] via-[#00C6FF] to-[#1F2E9A]",
      iconBg: "from-[#2EC5FF]/10 to-[#1F2E9A]/10",
      benefits: [
        "99.9% Uptime",
        "Auto-scaling",
        "Global Access",
        "Real-time Sync",
      ],
      color: "#2EC5FF",
      delay: 0,
      number: "01",
    },
    {
      id: "compliant",
      icon: <Shield className="w-8 h-8" />,
      title: "UK-compliant",
      description:
        "Fully compliant with UK employment laws, GDPR, and industry regulations. Stay audit-ready with automated compliance tracking.",
      gradient: "from-[#00B894] via-[#00D3A9] to-[#2EC5FF]",
      iconBg: "from-[#00B894]/10 to-[#2EC5FF]/10",
      benefits: ["GDPR Ready", "RTW Checks", "Legal Updates", "Audit Trails"],
      color: "#00B894",
      delay: 100,
      number: "02",
    },
    {
      id: "secure",
      icon: <Lock className="w-8 h-8" />,
      title: "Secure",
      description:
        "Enterprise-grade security with end-to-end encryption, multi-factor authentication, and regular security audits.",
      gradient: "from-[#9B3DFF] via-[#A83DFF] to-[#E60023]",
      iconBg: "from-[#9B3DFF]/10 to-[#E60023]/10",
      benefits: ["256-bit Encryption", "MFA", "ISO Certified", "Data Backup"],
      color: "#9B3DFF",
      delay: 200,
      number: "03",
    },
    {
      id: "easy",
      icon: <Zap className="w-8 h-8" />,
      title: "Easy to use",
      description:
        "Intuitive interface designed for everyone. Get started in minutes with our user-friendly platform and guided onboarding.",
      gradient: "from-[#FFA726] via-[#FF8E53] to-[#FF6B6B]",
      iconBg: "from-[#FFA726]/10 to-[#FF6B6B]/10",
      benefits: [
        "No Training Needed",
        "Quick Setup",
        "Mobile Ready",
        "Smart Search",
      ],
      color: "#FFA726",
      delay: 300,
      number: "04",
    },
    {
      id: "support",
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Dedicated support",
      description:
        "Expert support team available 24/7 to help you succeed. Get personalized assistance whenever you need it.",
      gradient: "from-[#E60023] via-[#FF1F1F] to-[#FF6B6B]",
      iconBg: "from-[#E60023]/10 to-[#FF6B6B]/10",
      benefits: ["24/7 Available", "UK-based Team", "Live Chat", "Video Calls"],
      color: "#E60023",
      delay: 400,
      number: "05",
    },
  ];

  const stats = [
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-[#00B894]",
    },
    {
      value: "10K+",
      label: "Happy Users",
      icon: <Users className="w-5 h-5" />,
      color: "text-[#9B3DFF]",
    },
    {
      value: "<30min",
      label: "Setup Time",
      icon: <Zap className="w-5 h-5" />,
      color: "text-[#FFA726]",
    },
    {
      value: "4.9/5",
      label: "User Rating",
      icon: <Star className="w-5 h-5" />,
      color: "text-[#E60023]",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-[#FAFBFC]"
    >
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");

        .font-display {
          font-family: "DM Serif Display", serif;
        }

        .font-body {
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: overlay;
        }

        .bento-shadow {
          box-shadow:
            0 1px 2px rgba(31, 46, 154, 0.02),
            0 4px 8px rgba(31, 46, 154, 0.04),
            0 12px 24px rgba(31, 46, 154, 0.06),
            inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .bento-shadow-hover {
          box-shadow:
            0 4px 8px rgba(31, 46, 154, 0.04),
            0 12px 24px rgba(31, 46, 154, 0.08),
            0 24px 48px rgba(31, 46, 154, 0.12),
            inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .text-shadow-subtle {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }
      `}</style>

      {/* Sophisticated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2EC5FF08_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_#9B3DFF08_0%,_transparent_50%)]" />

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #1F2E9A 0px, #1F2E9A 1px, transparent 1px, transparent 60px)`,
            }}
          />
        </div>

        {/* Grain texture */}
        <div className="absolute inset-0 grain" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial-style Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 max-w-6xl mx-auto"
        >
         

          {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-[#2430A3]">Why Choose </span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Our Platform?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect combination of power, security, and simplicity. 
            Built for modern businesses that demand excellence.
          </p>
        </motion.div>

        
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16 max-w-7xl mx-auto">
          {/* Feature 1 - Large Card (Spans 6 columns) */}
         

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 lg:col-span-6"
          >
            <FeatureCard
              feature={features[0]}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              variant="medium"
            />
          </motion.div>

          {/* Feature 2 - Medium Card (Spans 6 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 lg:col-span-6"
          >
            <FeatureCard
              feature={features[1]}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              variant="medium"
            />
          </motion.div>

          {/* Feature 3 - Medium Card (Spans 5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 lg:col-span-4"
          >
            <FeatureCard
              feature={features[2]}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              variant="medium"
            />
          </motion.div>

          {/* Feature 4 - Medium Card (Spans 4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <FeatureCard
              feature={features[3]}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              variant="compact"
            />
          </motion.div>

          {/* Feature 5 - Medium Card (Spans 3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <FeatureCard
              feature={features[4]}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              variant="compact"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component with Variants
const FeatureCard = ({ feature, hoveredCard, setHoveredCard, variant }) => {
  const isHovered = hoveredCard === feature.id;
  const isLarge = variant === "large";
  const isMedium = variant === "medium";
  const isCompact = variant === "compact";

  return (
    <motion.div
      className="group relative h-full"
      onMouseEnter={() => setHoveredCard(feature.id)}
      onMouseLeave={() => setHoveredCard(null)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Card Container */}
      <div
        className={`
        relative h-full bg-white rounded-3xl overflow-hidden 
        border border-gray-100/50
        transition-all duration-500
        ${isHovered ? "bento-shadow-hover" : "bento-shadow"}
      `}
      >
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${feature.gradient}`}
            initial={{ x: "-100%" }}
            animate={isHovered ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div
          className={`relative p-8 md:p-10 h-full flex flex-col ${isLarge ? "lg:flex-row lg:items-start lg:gap-12" : ""}`}
        >
          {/* Left Section - Icon and Number */}
          <div className={`${isLarge ? "lg:w-1/3" : ""} mb-6 lg:mb-0`}>
            {/* Feature Number */}
            <div className="font-display text-7xl md:text-8xl font-bold mb-6 leading-none relative">
              <span className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 bg-clip-text text-transparent blur-sm">
                {feature.number}
              </span>
              <span
                className={`relative bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
              >
                {feature.number}
              </span>
            </div>

            {/* Icon Container */}
            <motion.div
              className="relative inline-block"
              animate={
                isHovered
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {/* Icon Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
              >
                <motion.div
                  className="text-white"
                  animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"
                    animate={
                      isHovered
                        ? {
                            x: ["-100%", "100%"],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Content */}
          <div className={`flex-1 ${isLarge ? "lg:pt-8" : ""}`}>
            {/* Title */}
            <h3 className="font-display text-3xl md:text-4xl font-bold text-[#1F2E9A] mb-4 leading-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="font-body text-gray-600 leading-relaxed mb-6 text-base md:text-lg font-light">
              {feature.description}
            </p>

            {/* Benefits Grid */}
            {!isCompact && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {feature.benefits.map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 group/item"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${feature.gradient} flex-shrink-0`}
                    />
                    <span className="font-body text-sm text-gray-600 font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Compact Benefits */}
            {isCompact && (
              <div className="space-y-2 mb-6">
                {feature.benefits.slice(0, 2).map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${feature.gradient}`}
                    />
                    <span className="font-body text-sm text-gray-600 font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA Link */}
            <motion.button
              className="font-body inline-flex items-center gap-2 text-[#1F2E9A] font-semibold group/btn relative"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative">
                Learn more
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF] group-hover/btn:w-full transition-all duration-300" />
              </span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Decorative Corner Element */}
        <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className={`absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-full blur-2xl`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;
