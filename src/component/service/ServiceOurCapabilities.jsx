import React from "react";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Shield,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";






const ServiceOurCapabilities = ({ capabilityData = {} }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL ;
  
  // Extract the actual data (handle both direct and nested structure)
  const data = capabilityData || {};
  
  // Extract heading and highlighted text
  const heading = data.heading || "Built for Growth,";
  const highlightedText = data.highalited_text || "Designed for Success";

 
  
  
  
  // Stats for floating card
  const clientNo = data.client_no || "500+";
  const clientSatisfaction = data.client_satisfaction || "98%";
  const badge2 = data.badge2 || "UK Trusted HR-Tech Partner";
  const badge1 = data.badge1 || "Award";

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAFF] via-white to-[#F6D9FF]/30">
        {/* Animated Background Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#1F2E9A]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#9B5CFF]/5 rounded-full blur-3xl"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 text-[#1F2E9A] rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Our HR-Tech Capabilities
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 font-bold">
              <span className="block text-[#2430A3]">{heading}</span>
              <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
                {highlightedText}
              </span>
            </h2>

            

            <div className="space-y-6">
              <div className="text-lg text-gray-600 mb-10 leading-relaxed" dangerouslySetInnerHTML={{__html:data?.description}}></div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9B5CFF] via-[#2EC5FF] to-[#1F2E9A] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src={`${STORAGE_URL}${data.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800"}`}
                  alt={data.image_alt || "HR Team Collaboration"}
                  className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E9A]/20 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* FLOATING STATS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs border border-gray-100"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-transparent bg-clip-text mb-1">
                    {clientSatisfaction}
                  </div>
                  <p className="text-sm text-gray-600">
                    Client Satisfaction
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#9B3DFF] to-[#E60023] text-transparent bg-clip-text mb-1">
                    {clientNo}
                  </div>
                  <p className="text-sm text-gray-600">
                    UK Businesses Served
                  </p>
                </div>
              </div>
              
              {/* Decorative Line */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  {badge2}
                </p>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 bg-gradient-to-br from-[#E60023] to-[#B8001B] text-white rounded-2xl shadow-2xl p-4 max-w-[180px] border border-white/20"
            >
              <div className="text-center">
                <div className="text-xl font-bold mb-1">{badge1}</div>
                <div className="text-xs opacity-90">
                  Best HR-Tech 2024
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOurCapabilities;