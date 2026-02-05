import React, { useState } from "react";
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

const WhyChooseHRMS = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const advantages = [
    {
      id: "security",
      title: "Enterprise-Grade Security",
      description: "Military-grade encryption, SOC 2 Type II certified, GDPR compliant",
      icon: <Shield className="w-8 h-8" />,
      color: "from-[#1F2E9A] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#1F2E9A] to-[#2EC5FF]",
      features: ["End-to-end encryption", "Regular security audits", "Zero data breaches", "Compliance management"],
      stats: "99.99% Uptime",
      delay: 0,
    },
    {
      id: "ai",
      title: "AI-Powered Insights",
      description: "Smart analytics and predictive recommendations for better decisions",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      features: ["Predictive analytics", "Automated reporting", "Smart recommendations", "Trend analysis"],
      stats: "85% Prediction Accuracy",
      delay: 0.1,
    },
    {
      id: "scalable",
      title: "Highly Scalable",
      description: "Grows with your business from startups to enterprises",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-[#00B894] to-[#2EC5FF]",
      gradient: "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]",
      features: ["Unlimited users", "Global deployment", "Auto-scaling", "Custom modules"],
      stats: "1000+ Companies",
      delay: 0.2,
    },
    {
      id: "support",
      title: "24/7 Premium Support",
      description: "Dedicated support team with average 2-minute response time",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-[#FF6B6B] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
      features: ["24/7 live chat", "Phone support", "Dedicated account manager", "Training sessions"],
      stats: "98% Satisfaction",
      delay: 0.3,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechFlow Inc",
      content: "Our HR processes are now 60% faster. The platform's analytics helped us reduce turnover by 25%.",
      rating: 5,
      avatar: "SJ",
      delay: 0.4,
    },
    {
      name: "Michael Chen",
      role: "Operations Head",
      company: "Global Retail Co",
      content: "Implementation was seamless. The mobile app has been a game-changer for our field staff.",
      rating: 5,
      avatar: "MC",
      delay: 0.5,
    },
    {
      name: "Emma Wilson",
      role: "CEO",
      company: "StartupXYZ",
      content: "From 10 to 200 employees, this system scaled perfectly with us. The ROI was immediate.",
      rating: 5,
      avatar: "EW",
      delay: 0.6,
    },
  ];

  const stats = [
    { value: "95%", label: "Client Retention", icon: <Heart className="w-6 h-6" />, color: "text-[#E60023]" },
    { value: "4.8/5", label: "Customer Rating", icon: <Star className="w-6 h-6" />, color: "text-[#FFA726]" },
    { value: "50+", label: "Integrations", icon: <Settings className="w-6 h-6" />, color: "text-[#1F2E9A]" },
    { value: "24/7", label: "Support", icon: <Clock className="w-6 h-6" />, color: "text-[#00B894]" },
  ];

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
            <span className="text-[#2430A3]">Why Leading Companies</span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Choose Our HRMS Platform
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of forward-thinking companies that trust our platform to transform their HR operations and drive business growth.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300" />
                <div className="relative p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Advantages Grid */}
          <div>
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
                            animate={hoveredCard === advantage.id ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${advantage.color} shadow-lg flex items-center justify-center`}
                          >
                            <div className="text-white">
                              {React.cloneElement(advantage.icon, { className: "w-7 h-7" })}
                            </div>
                          </motion.div>
                          
                          {/* Floating Badge */}
                          <motion.div
                            animate={hoveredCard === advantage.id ? { scale: 1.2 } : { scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-[#00B894]" />
                          </motion.div>
                        </div>

                        {/* Stats Badge */}
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm">
                          <span className="text-xs font-bold text-gray-900">{advantage.stats}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{advantage.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{advantage.description}</p>

                      {/* Features List */}
                      <div className="space-y-2">
                        {advantage.features.map((feature, idx) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: advantage.delay + idx * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={hoveredCard === advantage.id ? { scale: 1.2 } : { scale: 1 }}
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${advantage.color}`}
                            />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect Line */}
                    <motion.div
                      className={`h-1 bg-gradient-to-r ${advantage.color}`}
                      initial={{ width: "0%" }}
                      animate={hoveredCard === advantage.id ? { width: "100%" } : { width: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
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
                      <h3 className="text-2xl font-bold text-gray-900">Customer Success Stories</h3>
                      <p className="text-gray-600">What our clients say about us</p>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="space-y-6">
                    {testimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.name}
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
                              <span className="font-bold text-gray-900">{testimonial.avatar}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#FFA726] to-[#FF6B6B] rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.role} • {testimonial.company}</p>
                              </div>
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-[#FFA726] fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">{testimonial.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
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