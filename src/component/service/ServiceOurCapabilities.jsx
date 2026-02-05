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

const ServiceOurCapabilities = () => {
  const capabilities = [
    {
      title: "Custom HR-Tech Solutions",
      desc: "Tailored HR technology strategies that align perfectly with your unique business needs and goals",
      icon: <Target className="w-6 h-6" />,
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      delay: 0,
    },
    {
      title: "Scalable & Future-Ready",
      desc: "Build HRMS solutions that grow with your business using modern, adaptable technologies",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-[#9B3DFF] to-[#E60023]",
      delay: 0.1,
    },
    {
      title: "Performance-Driven Development",
      desc: "Fast, efficient, and optimized HR solutions that deliver exceptional user experiences",
      icon: <Zap className="w-6 h-6" />,
      color: "from-[#00B894] to-[#2EC5FF]",
      delay: 0.2,
    },
    {
      title: "Secure & Compliant",
      desc: "Enterprise-grade security and UK compliance standards you can trust for HR operations",
      icon: <Shield className="w-6 h-6" />,
      color: "from-[#2430A3] to-[#9B3DFF]",
      delay: 0.3,
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
              <span className="block text-[#2430A3]">Built for Growth,</span>
              <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
                Designed for Success
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We combine technical HR expertise with business acumen to deliver solutions that not only meet your current needs but anticipate future workforce challenges.
            </p>

            <div className="space-y-6">
              {capabilities.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay }}
                  whileHover={{ x: 5 }}
                  className="group relative"
                >
                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                  />

                  <div className="flex gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300">
                    {/* Icon Container */}
                    <div className="relative flex-shrink-0">
                      {/* Icon Background Glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity`}
                      />
                      
                      {/* Icon */}
                      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <div className="text-white">
                          {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                        </div>
                      </div>
                      
                      {/* Check Badge */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 text-[#00B894]" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg text-gray-900 mb-2 font-semibold group-hover:text-[#1F2E9A] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800"
                  alt="HR Team Collaboration"
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
                    98%
                  </div>
                  <p className="text-sm text-gray-600">
                    Client Satisfaction
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#9B3DFF] to-[#E60023] text-transparent bg-clip-text mb-1">
                    500+
                  </div>
                  <p className="text-sm text-gray-600">
                    UK Businesses Served
                  </p>
                </div>
              </div>
              
              {/* Decorative Line */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  UK Trusted HR-Tech Partner
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
                <div className="text-xl font-bold mb-1">Award</div>
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