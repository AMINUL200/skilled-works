import React from "react";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Headphones,
  Rocket,
  Sparkles,
  Target,
  Shield,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

// Helper function to extract plain text from HTML
const extractPlainText = (htmlString) => {
  if (!htmlString) return "";
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

// Icon mapping based on feature title
const getIconForFeature = (title, index) => {
  const titleLower = (title || "").toLowerCase();
  
  if (titleLower.includes('expert') || titleLower.includes('team')) 
    return <Users className="w-7 h-7" />;
  if (titleLower.includes('custom') || titleLower.includes('solution')) 
    return <Briefcase className="w-7 h-7" />;
  if (titleLower.includes('transparent') || titleLower.includes('affordable') || titleLower.includes('pricing')) 
    return <DollarSign className="w-7 h-7" />;
  if (titleLower.includes('timely') || titleLower.includes('delivery') || titleLower.includes('deadline')) 
    return <Clock className="w-7 h-7" />;
  if (titleLower.includes('support') || titleLower.includes('24/7')) 
    return <Headphones className="w-7 h-7" />;
  if (titleLower.includes('compliance') || titleLower.includes('gdpr') || titleLower.includes('security')) 
    return <Shield className="w-7 h-7" />;
  
  // Default cycling through icons based on index
  const icons = [
    <Users className="w-7 h-7" />,
    <Briefcase className="w-7 h-7" />,
    <DollarSign className="w-7 h-7" />,
    <Clock className="w-7 h-7" />,
    <Headphones className="w-7 h-7" />,
    <Shield className="w-7 h-7" />
  ];
  return icons[index % icons.length];
};

// Color schemes for different features
const colorSchemes = [
  "from-[#1F2E9A] to-[#2EC5FF]",
  "from-[#9B3DFF] to-[#E60023]",
  "from-[#2430A3] to-[#9B3DFF]",
  "from-[#00B894] to-[#2EC5FF]",
  "from-[#FF6B6B] to-[#FFA726]",
  "from-[#E60023] to-[#B8001B]"
];

const ServiceWhyChoose = ({ whyChooseData = [] }) => {
  
  // Extract the actual data array from whyChooseData
  const dataArray = whyChooseData || [];
  
  // Transform API data to features format
  const transformFeatures = () => {
    if (!dataArray.length) {
      return []; // Return empty array, will use fallback
    }

    return dataArray.map((item, index) => {
      // Extract heading and description
      const title = item.heading || `Feature ${index + 1}`;
      const desc = extractPlainText(item.description || "");
      
      // Get color scheme based on index
      const color = colorSchemes[index % colorSchemes.length];
      
      return {
        title: title,
        desc: desc || "Feature description",
        icon: getIconForFeature(title, index),
        color: color,
        delay: index * 0.1,
      };
    });
  };

  // Fallback features if no API data
  const fallbackFeatures = [
    {
      title: "UK HR-Tech Experts",
      desc: "Team of certified professionals with proven expertise in UK HR regulations and compliance",
      icon: <Users className="w-7 h-7" />,
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      delay: 0,
    },
    {
      title: "Custom Business Solutions",
      desc: "Personalized HR-tech solutions crafted specifically for UK business requirements",
      icon: <Briefcase className="w-7 h-7" />,
      color: "from-[#9B3DFF] to-[#E60023]",
      delay: 0.1,
    },
    {
      title: "Transparent & Affordable",
      desc: "Competitive pricing with no hidden costs – clear UK market rates from day one",
      icon: <DollarSign className="w-7 h-7" />,
      color: "from-[#2430A3] to-[#9B3DFF]",
      delay: 0.2,
    },
    {
      title: "Guaranteed Timely Delivery",
      desc: "Committed to deadlines with agile methodologies and UK business hours support",
      icon: <Clock className="w-7 h-7" />,
      color: "from-[#00B894] to-[#2EC5FF]",
      delay: 0.3,
    },
    {
      title: "24/7 UK Support",
      desc: "Round-the-clock support and maintenance to ensure your HR systems run smoothly",
      icon: <Headphones className="w-7 h-7" />,
      color: "from-[#FF6B6B] to-[#FFA726]",
      delay: 0.4,
    },
    {
      title: "UK Compliance Focus",
      desc: "GDPR compliant, SOC 2 Type II certified, and UK regulatory standards adherence",
      icon: <Shield className="w-7 h-7" />,
      color: "from-[#E60023] to-[#B8001B]",
      delay: 0.5,
    },
  ];

  const features = transformFeatures().length > 0 ? transformFeatures() : fallbackFeatures;

  // Get the main heading from the first item or use fallback
  const mainHeading = dataArray[0]?.heading ? 
    dataArray[0].heading.split(" ").slice(0, 2).join(" ") : 
    "Why Choose Skilled";

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFF] via-white to-[#F6D9FF]/30">
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
              UK TRUSTED HR-TECH PARTNER
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-[#2430A3]">{mainHeading}</span>
            <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Workers Cloud?
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted UK HR-tech partner committed to delivering excellence in every project
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              {/* Feature Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                {/* Icon Container */}
                <div className="relative mb-6">
                  {/* Icon Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <div className="text-white">
                      {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                    </div>
                  </motion.div>

                  {/* Check Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 text-[#00B894]" />
                  </motion.div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1F2E9A] transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default ServiceWhyChoose;