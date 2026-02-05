import React from "react";
import { 
  FileText,
  Target,
  Cpu,
  CheckCircle,
  CloudUpload,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const ServiceDevelopmentProcess = () => {
  const steps = [
    {
      title: "Requirement Analysis",
      desc: "Deep dive into your HR needs and business objectives",
      gradient: "from-[#1F2E9A] to-[#2EC5FF]",
      number: 1,
      icon: <FileText className="w-8 h-8" />,
      delay: 0,
    },
    {
      title: "Strategy & Planning",
      desc: "Create detailed HR-tech roadmap and architecture",
      gradient: "from-[#9B3DFF] to-[#E60023]",
      number: 2,
      icon: <Target className="w-8 h-8" />,
      delay: 0.1,
    },
    {
      title: "Design & Development",
      desc: "Build your HR solution with modern tech and best practices",
      gradient: "from-[#2430A3] to-[#9B3DFF]",
      number: 3,
      icon: <Cpu className="w-8 h-8" />,
      delay: 0.2,
    },
    {
      title: "Testing & Optimization",
      desc: "Rigorous QA testing and performance optimization",
      gradient: "from-[#00B894] to-[#2EC5FF]",
      number: 4,
      icon: <CheckCircle className="w-8 h-8" />,
      delay: 0.3,
    },
    {
      title: "Deployment & Support",
      desc: "Launch your HRMS and provide ongoing UK support",
      gradient: "from-[#FF6B6B] to-[#FFA726]",
      number: 5,
      icon: <CloudUpload className="w-8 h-8" />,
      delay: 0.4,
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#9B3DFF]" />
            <span className="text-sm font-semibold text-[#1F2E9A]">
              PROVEN METHODOLOGY
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-[#2430A3]">Our Development &</span>
            <span className="block bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Delivery Process
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven HR-tech methodology that ensures quality, transparency, and timely delivery at every stage
          </p>
        </motion.div>

        {/* DESKTOP TIMELINE */}
        <div className="hidden lg:block relative">
          {/* Main Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1F2E9A]/20 via-[#9B3DFF]/20 to-[#E60023]/20 rounded-full">
            {/* Animated Progress Line */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Step Number Connector */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-sm font-bold bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </motion.div>
                </div>

                {/* Step Card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group-hover:border-transparent">
                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${step.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">
                      {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h4 className="text-center mb-3 text-lg font-bold text-gray-900 group-hover:text-[#1F2E9A] transition-colors">
                    {step.title}
                  </h4>

                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Arrow Indicator */}
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MOBILE STEPPER */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1F2E9A]/20 via-[#9B3DFF]/20 to-[#E60023]/20">
              {/* Animated Progress Line */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1F2E9A] via-[#9B3DFF] to-[#E60023]"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8 pl-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -left-12 top-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                        <div className="text-white">
                          {React.cloneElement(step.icon, { className: "w-6 h-6" })}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default ServiceDevelopmentProcess;