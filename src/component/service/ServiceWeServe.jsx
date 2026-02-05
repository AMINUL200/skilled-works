import React from "react";
import { 
  Rocket, 
  ShoppingBag, 
  GraduationCap, 
  Home, 
  HeartPulse,
  Store,
  ArrowRight,
  Sparkles,
  Building2,
  Banknote,
  Plane,
  ChefHat,
  Cpu,
  Target,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../common/MagneticButtonProps";

const ServiceWeServe = () => {
  const industries = [
    {
      title: "Aviation",
      desc: "Crew management & compliance systems",
      icon: <Plane className="w-8 h-8" />,
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      delay: 0,
    },
    {
      title: "IT & Tech",
      desc: "Tech talent management & HR systems",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-[#9B3DFF] to-[#E60023]",
      delay: 0.1,
    },
    {
      title: "Construction",
      desc: "Workforce & site safety management",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-[#FF6B6B] to-[#FFA726]",
      delay: 0.2,
    },
    {
      title: "Healthcare",
      desc: "Staff scheduling & compliance tracking",
      icon: <HeartPulse className="w-8 h-8" />,
      color: "from-[#00B894] to-[#2EC5FF]",
      delay: 0.3,
    },
    {
      title: "Finance",
      desc: "Compliance audits & performance metrics",
      icon: <Banknote className="w-8 h-8" />,
      color: "from-[#2430A3] to-[#9B3DFF]",
      delay: 0.4,
    },
    {
      title: "Education",
      desc: "Faculty management & certification",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-[#FFA726] to-[#FF6B6B]",
      delay: 0.5,
    },
    {
      title: "Hospitality",
      desc: "Staff management & compliance",
      icon: <ChefHat className="w-8 h-8" />,
      color: "from-[#E60023] to-[#FFA726]",
      delay: 0.6,
    },
    {
      title: "Retail",
      desc: "Workforce optimization & scheduling",
      icon: <Store className="w-8 h-8" />,
      color: "from-[#1F2E9A] to-[#2430A3]",
      delay: 0.7,
    },
    {
      title: "Startups",
      desc: "Scalable HR systems for growth",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-[#9B3DFF] to-[#2EC5FF]",
      delay: 0.8,
    },
    {
      title: "Real Estate",
      desc: "Agent management & compliance",
      icon: <Home className="w-8 h-8" />,
      color: "from-[#00B894] to-[#1F2E9A]",
      delay: 0.9,
    },
    {
      title: "Manufacturing",
      desc: "Factory workforce & safety systems",
      icon: <Target className="w-8 h-8" />,
      color: "from-[#E60023] to-[#FF6B6B]",
      delay: 1.0,
    },
    {
      title: "Government",
      desc: "Public sector HR management",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-[#2430A3] to-[#2EC5FF]",
      delay: 1.1,
    },
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
              UK INDUSTRY EXPERTISE
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-[#2430A3]">Industries We Serve</span>
            <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Across the UK
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized HR-tech solutions tailored for diverse UK industries, delivering compliance and efficiency
          </p>
        </motion.div>

        {/* INDUSTRIES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              {/* Industry Card */}
              <div className="relative bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                {/* Icon Container */}
                <div className="relative mb-4 mx-auto">
                  {/* Icon Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <div className="text-white">
                      {React.cloneElement(item.icon, { className: "w-8 h-8" })}
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
                    className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                  >
                    <CheckCircle className="w-3 h-3 text-[#00B894]" />
                  </motion.div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1F2E9A] transition-colors">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="relative max-w-2xl mx-auto">
            {/* Background Card */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF] rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] rounded-2xl p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Don't see your industry?
                  </h4>
                  <p className="text-gray-600">
                    We customize HR-tech solutions for businesses of all types and sizes across the UK.
                  </p>
                </div>
                
                <MagneticButton
                  variant="square"
                  className="group bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-red-200/20 transition-all duration-300 flex items-center gap-3"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { value: "12+", label: "Industries", color: "text-[#1F2E9A]" },
              { value: "500+", label: "UK Clients", color: "text-[#E60023]" },
              { value: "100%", label: "Compliance", color: "text-[#00B894]" },
              { value: "24/7", label: "UK Support", color: "text-[#FFA726]" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
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

export default ServiceWeServe;