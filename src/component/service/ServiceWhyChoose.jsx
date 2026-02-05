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

const ServiceWhyChoose = () => {
  const features = [
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
      title: "Guanteed Timely Delivery",
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
            <span className="block text-[#2430A3]">Why Choose Skilled</span>
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "UK Businesses", color: "text-[#1F2E9A]" },
              { value: "98%", label: "Satisfaction", color: "text-[#E60023]" },
              { value: "24/7", label: "UK Support", color: "text-[#00B894]" },
              { value: "4.8/5", label: "Rating", color: "text-[#FFA726]" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceWhyChoose;