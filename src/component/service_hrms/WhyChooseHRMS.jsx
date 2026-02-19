import React, { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Clock,
  BarChart3,
  Lock,
  Cloud,
  Smartphone,
  MessageSquare,
  Star,
  Target,
  Cpu,
  Calendar,
  FileText,
  Database,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

const WhyChooseHRMS = ({ whyChooseData = [], customerStoriesData = [] }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  console.log("Why Choose Data:", whyChooseData);
  console.log("Customer Stories Data:", customerStoriesData);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [advantages, setAdvantages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Icon mapping based on title
  const getIconForTitle = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("security")) return <Shield className="w-8 h-8" />;
    if (
      titleLower.includes("ai") ||
      titleLower.includes("insight") ||
      titleLower.includes("predict")
    )
      return <Cpu className="w-8 h-8" />;
    if (titleLower.includes("scalab"))
      return <TrendingUp className="w-8 h-8" />;
    if (titleLower.includes("support"))
      return <MessageSquare className="w-8 h-8" />;
    if (titleLower.includes("cloud")) return <Cloud className="w-8 h-8" />;
    if (titleLower.includes("mobile"))
      return <Smartphone className="w-8 h-8" />;
    if (titleLower.includes("analytics"))
      return <BarChart3 className="w-8 h-8" />;
    if (titleLower.includes("global")) return <Globe className="w-8 h-8" />;
    if (titleLower.includes("clock") || titleLower.includes("time"))
      return <Clock className="w-8 h-8" />;
    if (titleLower.includes("award") || titleLower.includes("achievement"))
      return <Award className="w-8 h-8" />;
    if (titleLower.includes("heart") || titleLower.includes("care"))
      return <Heart className="w-8 h-8" />;
    if (titleLower.includes("target") || titleLower.includes("goal"))
      return <Target className="w-8 h-8" />;
    if (titleLower.includes("database") || titleLower.includes("data"))
      return <Database className="w-8 h-8" />;
    if (titleLower.includes("settings") || titleLower.includes("config"))
      return <Settings className="w-8 h-8" />;
    if (titleLower.includes("calendar") || titleLower.includes("schedule"))
      return <Calendar className="w-8 h-8" />;
    if (titleLower.includes("file") || titleLower.includes("document"))
      return <FileText className="w-8 h-8" />;
    return <Zap className="w-8 h-8" />; // Default icon
  };

  // Color schemes based on title or index
  const getColorScheme = (title, index) => {
    const schemes = [
      { from: "#1F2E9A", to: "#2EC5FF" }, // Blue
      { from: "#9B3DFF", to: "#E60023" }, // Purple to Red
      { from: "#00B894", to: "#2EC5FF" }, // Green to Blue
      { from: "#FF6B6B", to: "#FFA726" }, // Red to Orange
      { from: "#2430A3", to: "#9B3DFF" }, // Dark Blue to Purple
      { from: "#E60023", to: "#FFA726" }, // Red to Orange
    ];

    const titleLower = title.toLowerCase();

    // Assign specific colors based on content
    if (titleLower.includes("security")) return schemes[0];
    if (titleLower.includes("ai") || titleLower.includes("insight"))
      return schemes[1];
    if (titleLower.includes("scalab")) return schemes[2];
    if (titleLower.includes("support")) return schemes[3];

    // Fallback to index-based
    return schemes[index % schemes.length];
  };

  // Extract features from HTML description
  const extractFeatures = (htmlString) => {
    if (!htmlString) return [];

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Look for feature items in the HTML structure
    const featureElements = tempDiv.querySelectorAll(
      ".flex.items-center.gap-2 span",
    );
    const features = [];

    featureElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (text && text.length > 0) {
        features.push(text);
      }
    });

    // If no features found, try to extract from paragraphs
    if (features.length === 0) {
      const paragraphs = tempDiv.querySelectorAll("p");
      paragraphs.forEach((p) => {
        const text = p.textContent?.trim();
        if (text && text.length > 0 && !text.includes("box-sizing")) {
          features.push(text);
        }
      });
    }

    return features.length > 0 ? features : ["Feature not specified"];
  };

  // Extract plain description (first paragraph without HTML)
  const extractDescription = (htmlString) => {
    if (!htmlString) return "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const firstParagraph = tempDiv.querySelector("p");
    if (firstParagraph) {
      return firstParagraph.textContent?.trim() || "";
    }

    return tempDiv.textContent?.trim() || "";
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Process whyChooseData into advantages format
  useEffect(() => {
    if (whyChooseData && whyChooseData.length > 0) {
      const processedAdvantages = whyChooseData
        .filter((item) => item.is_active) // Only show active items
        .map((item, index) => {
          const colorScheme = getColorScheme(item.title, index);
          return {
            id: item.id,
            title: item.title,
            description: extractDescription(item.description),
            icon: getIconForTitle(item.title),
            color: `from-[${colorScheme.from}] to-[${colorScheme.to}]`,
            gradient: `bg-gradient-to-br from-[${colorScheme.from}] to-[${colorScheme.to}]`,
            features: extractFeatures(item.description),
            stats: item.badge1 || "Available",
            delay: index * 0.1,
          };
        });

      setAdvantages(processedAdvantages);
    }
  }, [whyChooseData]);

  // Process customerStoriesData into testimonials format
  useEffect(() => {
    if (customerStoriesData && customerStoriesData.length > 0) {
      const processedTestimonials = customerStoriesData
        .filter((story) => story.is_active) // Only show active stories
        .map((story, index) => ({
          name: story.name,
          role: story.designation.includes("•")
            ? story.designation
            : `${story.designation}`,
          company: "",
          content: story.message,
          rating: story.retings,
          avatar: getInitials(story.name),
          delay: 0.4 + index * 0.1, // Start from 0.4 and increment
        }));

      setTestimonials(processedTestimonials);
    }
  }, [customerStoriesData]);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFF] via-[#F2EEFF] to-[#FAFAFF]">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-6">
            <Sparkles className="w-4 h-4 text-[#9B3DFF]" />
            <span className="text-sm font-semibold text-[#1F2E9A]">
              TRUSTED BY INDUSTRY LEADERS
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-[#2430A3]">Why Choose Our </span>

            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Solutions & Expertise
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our  services help
            organizations improve efficiency, reduce complexity, and achieve
            measurable business results.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Advantages Grid */}
          <div>
            {advantages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={advantage.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: advantage.delay }}
                    onMouseEnter={() => setHoveredCard(advantage.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${advantage.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    {/* Card */}
                    <div className="relative bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                      {/* Icon Header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <motion.div
                              animate={
                                hoveredCard === advantage.id
                                  ? { rotate: 360 }
                                  : { rotate: 0 }
                              }
                              transition={{ duration: 0.6 }}
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${advantage.color} shadow-lg flex items-center justify-center`}
                            >
                              <div className="text-white">
                                {React.cloneElement(advantage.icon, {
                                  className: "w-7 h-7",
                                })}
                              </div>
                            </motion.div>

                            {/* Floating Badge */}
                            <motion.div
                              animate={
                                hoveredCard === advantage.id
                                  ? { scale: 1.2 }
                                  : { scale: 1 }
                              }
                              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                            >
                              <CheckCircle className="w-4 h-4 text-[#00B894]" />
                            </motion.div>
                          </div>

                          {/* Stats Badge */}
                          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm">
                            <span className="text-xs font-bold text-gray-900">
                              {advantage.stats}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">
                          {advantage.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2">
                          {advantage.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: advantage.delay + idx * 0.1,
                              }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                animate={
                                  hoveredCard === advantage.id
                                    ? { scale: 1.2 }
                                    : { scale: 1 }
                                }
                                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${advantage.color}`}
                              />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <motion.div
                        className={`h-1 bg-gradient-to-r ${advantage.color}`}
                        initial={{ width: "0%" }}
                        animate={
                          hoveredCard === advantage.id
                            ? { width: "100%" }
                            : { width: "0%" }
                        }
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500">No advantages data available</p>
              </div>
            )}
          </div>

          {/* Right Side - Testimonials & CTA */}
          <div className="space-y-8">
            {/* Testimonials Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF] rounded-3xl blur opacity-20" />

              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF]" />

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF] flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Customer Success Stories
                      </h3>
                      <p className="text-gray-600">
                        What our clients say about us
                      </p>
                    </div>
                  </div>

                  {/* Testimonials */}
                  {testimonials.length > 0 ? (
                    <div className="space-y-6">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: testimonial.delay }}
                          className="group/testimonial p-4 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center border border-gray-200 shadow-sm">
                                <span className="font-bold text-gray-900">
                                  {testimonial.avatar}
                                </span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#FFA726] to-[#FF6B6B] rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-white" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-900">
                                    {testimonial.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {testimonial.role}
                                  </p>
                                </div>
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="w-4 h-4 text-[#FFA726] fill-current"
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {testimonial.content}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No customer stories available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHRMS;
