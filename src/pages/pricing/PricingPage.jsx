import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  X,
  HelpCircle,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Award,
  Download,
  Calendar,
  Headphones,
  FileText,
  Search,
  UserCheck,
  BarChart,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import MagneticButton from "../../component/common/MagneticButtonProps";
import FAQComponent from "../../component/common/FAQComponent";
import PageLoader from "../../component/common/PageLoader";

const PricingPage = () => {
  const [activeService, setActiveService] = useState("hrms");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const services = [
    {
      id: "hrms",
      title: "HRMS Software",
      icon: <Users className="w-6 h-6" />,
      description: "Complete Human Resource Management System",
      gradient: "from-[#1F2E9A] to-[#2430A3]",
    },
    {
      id: "hr-file",
      title: "HR File Preparation",
      icon: <FileText className="w-6 h-6" />,
      description: "Professional HR document creation and management",
      gradient: "from-[#9B3DFF] to-[#E60023]",
    },
    {
      id: "recruitment",
      title: "Recruitment",
      icon: <Search className="w-6 h-6" />,
      description: "End-to-end recruitment and hiring solutions",
      gradient: "from-[#2EC5FF] to-[#00B894]",
    },
  ];

  const pricingPlans = {
    hrms: [
      {
        name: "Starter",
        description: "Perfect for small businesses getting started",
        price: {
          monthly: 49,
          annual: 39,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Up to 50 employees", included: true },
          { text: "Core HR Management", included: true },
          { text: "Basic Attendance Tracking", included: true },
          { text: "Employee Self-Service", included: true },
          { text: "Email Support", included: true },
          { text: "Advanced Analytics", included: false },
          { text: "Performance Management", included: false },
          { text: "Custom Reports", included: false },
          { text: "API Access", included: false },
          { text: "Priority Support", included: false },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#2EC5FF] to-[#2ED8FF]",
      },
      {
        name: "Professional",
        description: "Best for growing businesses",
        price: {
          monthly: 99,
          annual: 79,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Up to 200 employees", included: true },
          { text: "Core HR Management", included: true },
          { text: "Advanced Attendance Tracking", included: true },
          { text: "Employee Self-Service", included: true },
          { text: "Priority Email & Chat Support", included: true },
          { text: "Advanced Analytics", included: true },
          { text: "Performance Management", included: true },
          { text: "Custom Reports", included: false },
          { text: "API Access", included: false },
          { text: "Dedicated Account Manager", included: false },
        ],
        popular: true,
        cta: "Explore Plan",
        gradient: "from-[#9B3DFF] to-[#9B5CFF]",
        badge: "Most Popular",
      },
      {
        name: "Enterprise",
        description: "For large organizations with complex needs",
        price: {
          monthly: 199,
          annual: 159,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Unlimited employees", included: true },
          { text: "Core HR Management", included: true },
          { text: "Advanced Attendance Tracking", included: true },
          { text: "Employee Self-Service", included: true },
          { text: "24/7 Phone & Chat Support", included: true },
          { text: "Advanced Analytics", included: true },
          { text: "Performance Management", included: true },
          { text: "Custom Reports", included: true },
          { text: "API Access", included: true },
          { text: "Dedicated Account Manager", included: true },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#1F2E9A] to-[#2430A3]",
      },
    ],
    "hr-file": [
      {
        name: "Basic",
        description: "Essential HR document preparation",
        price: {
          monthly: 29,
          annual: 23,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Standard Employment Contracts", included: true },
          { text: "Basic HR Policies", included: true },
          { text: "Employee Handbook Template", included: true },
          { text: "Basic Compliance Documents", included: true },
          { text: "Email Support", included: true },
          { text: "Custom Document Creation", included: false },
          { text: "Legal Review Service", included: false },
          { text: "Unlimited Revisions", included: false },
          { text: "Priority Support", included: false },
          { text: "Document Storage", included: false },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#FF6B6B] to-[#FF8E8E]",
      },
      {
        name: "Professional",
        description: "Comprehensive HR documentation",
        price: {
          monthly: 79,
          annual: 63,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Standard Employment Contracts", included: true },
          { text: "Advanced HR Policies", included: true },
          { text: "Custom Employee Handbook", included: true },
          { text: "Full Compliance Suite", included: true },
          { text: "Priority Email & Chat Support", included: true },
          { text: "Custom Document Creation", included: true },
          { text: "Basic Legal Review", included: true },
          { text: "Up to 5 Revisions", included: true },
          { text: "Document Storage (1GB)", included: true },
          { text: "Dedicated Consultant", included: false },
        ],
        popular: true,
        cta: "Explore Plan",
        gradient: "from-[#9B3DFF] to-[#E60023]",
        badge: "Recommended",
      },
      {
        name: "Enterprise",
        description: "Full-service HR documentation",
        price: {
          monthly: 149,
          annual: 119,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Standard Employment Contracts", included: true },
          { text: "Advanced HR Policies", included: true },
          { text: "Custom Employee Handbook", included: true },
          { text: "Full Compliance Suite", included: true },
          { text: "24/7 Priority Support", included: true },
          { text: "Custom Document Creation", included: true },
          { text: "Full Legal Review Service", included: true },
          { text: "Unlimited Revisions", included: true },
          { text: "Document Storage (5GB)", included: true },
          { text: "Dedicated Consultant", included: true },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#00B894] to-[#2EC5FF]",
      },
    ],
    recruitment: [
      {
        name: "Essentials",
        description: "Basic recruitment tools",
        price: {
          monthly: 69,
          annual: 55,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Job Posting on 3 Platforms", included: true },
          { text: "Basic Applicant Tracking", included: true },
          { text: "Resume Screening", included: true },
          { text: "Email Integration", included: true },
          { text: "Standard Support", included: true },
          { text: "Advanced Candidate Search", included: false },
          { text: "AI-Powered Matching", included: false },
          { text: "Interview Scheduling", included: false },
          { text: "Background Checks", included: false },
          { text: "Analytics Dashboard", included: false },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#FFA726] to-[#FF6B6B]",
      },
      {
        name: "Advanced",
        description: "Complete recruitment solution",
        price: {
          monthly: 129,
          annual: 103,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Job Posting on 10+ Platforms", included: true },
          { text: "Advanced Applicant Tracking", included: true },
          { text: "AI Resume Screening", included: true },
          { text: "Calendar Integration", included: true },
          { text: "Priority Support", included: true },
          { text: "Advanced Candidate Search", included: true },
          { text: "AI-Powered Matching", included: true },
          { text: "Automated Interview Scheduling", included: true },
          { text: "Basic Background Checks", included: false },
          { text: "Advanced Analytics Dashboard", included: false },
        ],
        popular: true,
        cta: "Explore Plan",
        gradient: "from-[#E60023] to-[#FF1F1F]",
        badge: "Most Popular",
      },
      {
        name: "Enterprise",
        description: "End-to-end recruitment platform",
        price: {
          monthly: 249,
          annual: 199,
        },
        savings: "Save 20% annually",
        features: [
          { text: "Unlimited Job Postings", included: true },
          { text: "Enterprise Applicant Tracking", included: true },
          { text: "Advanced AI Screening", included: true },
          { text: "Full Calendar Integration", included: true },
          { text: "24/7 Dedicated Support", included: true },
          { text: "Advanced Candidate Search", included: true },
          { text: "AI-Powered Matching", included: true },
          { text: "Automated Interview Scheduling", included: true },
          { text: "Comprehensive Background Checks", included: true },
          { text: "Advanced Analytics Dashboard", included: true },
        ],
        popular: false,
        cta: "Explore Plan",
        gradient: "from-[#1F2E9A] to-[#9B3DFF]",
      },
    ],
  };

  const currentPlans = pricingPlans[activeService];

  const serviceFeatures = {
    hrms: [
      {
        icon: <Users />,
        text: "Employee Database Management",
        color: "text-[#1F2E9A]",
      },
      {
        icon: <Calendar />,
        text: "Attendance & Leave Tracking",
        color: "text-[#9B3DFF]",
      },
      {
        icon: <BarChart />,
        text: "Performance & Appraisals",
        color: "text-[#2EC5FF]",
      },
      {
        icon: <Shield />,
        text: "Compliance & UK GDPR",
        color: "text-[#00B894]",
      },
      {
        icon: <TrendingUp />,
        text: "Real-time Analytics",
        color: "text-[#FF6B6B]",
      },
      {
        icon: <Award />,
        text: "Training & Development",
        color: "text-[#FFA726]",
      },
    ],
    "hr-file": [
      {
        icon: <FileText />,
        text: "Contract Templates",
        color: "text-[#9B3DFF]",
      },
      {
        icon: <Shield />,
        text: "Compliance Documentation",
        color: "text-[#2EC5FF]",
      },
      {
        icon: <UserCheck />,
        text: "Right-to-Work Checks",
        color: "text-[#00B894]",
      },
      { icon: <Award />, text: "HR Policy Creation", color: "text-[#FF6B6B]" },
      {
        icon: <Headphones />,
        text: "Legal Consultation",
        color: "text-[#FFA726]",
      },
      {
        icon: <Download />,
        text: "Digital Filing System",
        color: "text-[#1F2E9A]",
      },
    ],
    recruitment: [
      {
        icon: <Search />,
        text: "AI-Powered Candidate Search",
        color: "text-[#E60023]",
      },
      {
        icon: <UserCheck />,
        text: "Applicant Tracking System",
        color: "text-[#2EC5FF]",
      },
      {
        icon: <Calendar />,
        text: "Interview Scheduling",
        color: "text-[#00B894]",
      },
      {
        icon: <Shield />,
        text: "Background Verification",
        color: "text-[#FF6B6B]",
      },
      {
        icon: <TrendingUp />,
        text: "Recruitment Analytics",
        color: "text-[#FFA726]",
      },
      { icon: <Zap />, text: "Automated Onboarding", color: "text-[#1F2E9A]" },
    ],
  };

  const pricingFaqs = [
    {
      id: 1,
      question: "Can I switch between plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing will be prorated accordingly.",
      category: "Plans",
    },
    {
      id: 2,
      question: "Is there a free trial available?",
      answer:
        "All plans include a 14-day free trial with full access to all features. No credit card is required.",
      category: "Trial",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, American Express, PayPal, and bank transfer for annual plans.",
      category: "Billing",
    },
    {
      id: 4,
      question: "Do you offer discounts?",
      answer:
        "Yes, we provide special discounts for non-profits and educational institutions.",
      category: "Discounts",
    },
    {
      id: 5,
      question: "What kind of support is included?",
      answer:
        "Email support is included in all plans. Higher plans include priority chat and phone support.",
      category: "Support",
    },
  ];

  const [loading, setLoading] = useState(true);

  // ⏳ 2 second loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }


  return (
    <div className="min-h-screen bg-white overflow-hidden pt-50 ">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap");

        .font-display {
          font-family: "Cormorant Garamond", serif;
        }

        .font-body {
          font-family: "Manrope", sans-serif;
        }

        .luxury-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231F2E9A' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .premium-shadow {
          box-shadow:
            0 1px 2px rgba(31, 46, 154, 0.03),
            0 2px 4px rgba(31, 46, 154, 0.03),
            0 4px 8px rgba(31, 46, 154, 0.04),
            0 8px 16px rgba(31, 46, 154, 0.05),
            0 16px 32px rgba(31, 46, 154, 0.05);
        }

        .premium-shadow-xl {
          box-shadow:
            0 2px 4px rgba(31, 46, 154, 0.04),
            0 4px 8px rgba(31, 46, 154, 0.05),
            0 8px 16px rgba(31, 46, 154, 0.06),
            0 16px 32px rgba(31, 46, 154, 0.07),
            0 32px 64px rgba(31, 46, 154, 0.08);
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .price-number {
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.04em;
        }
      `}</style>

      {/* Service Selection - Premium Tabs */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="font-display text-5xl md:text-6xl font-light text-[#1F2E9A] mb-4">
                Choose Your
                <span className="font-semibold italic"> Service</span>
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#9B3DFF] to-transparent mx-auto" />
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {services.map((service, idx) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group relative p-8 rounded-3xl text-left transition-all duration-500 ${
                    activeService === service.id
                      ? "premium-shadow-xl"
                      : "premium-shadow hover:premium-shadow-xl"
                  }`}
                >
                  {/* Background */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                      activeService === service.id
                        ? `bg-gradient-to-br ${service.gradient}`
                        : "bg-white"
                    }`}
                  />

                  {/* Border glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                      activeService === service.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-10 blur-xl`}
                    />
                  </div>

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ${
                        activeService === service.id
                          ? "bg-white/20"
                          : `bg-gradient-to-br ${service.gradient}`
                      }`}
                    >
                      <div
                        className={
                          activeService === service.id
                            ? "text-white"
                            : "text-white"
                        }
                      >
                        {service.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className={` text-3xl font-semibold mb-3 transition-colors duration-500 ${
                        activeService === service.id
                          ? "text-white"
                          : "text-[#1F2E9A]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`font-body text-sm leading-relaxed transition-colors duration-500 ${
                        activeService === service.id
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Selection indicator */}
                    {activeService === service.id && (
                      <motion.div
                        layoutId="activeService"
                        className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Billing Toggle - Refined Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative inline-flex items-center gap-1 p-1.5 rounded-full bg-gray-100">
                {/* Sliding background */}
                <motion.div
                  className="absolute h-[calc(100%-12px)] rounded-full bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] premium-shadow"
                  initial={false}
                  animate={{
                    left: billingCycle === "monthly" ? "6px" : "50%",
                    right: billingCycle === "annual" ? "6px" : "50%",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative z-10 px-8 py-3 rounded-full font-body font-semibold text-sm transition-colors duration-300 ${
                    billingCycle === "monthly"
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`relative z-10 px-8 py-3 rounded-full font-body font-semibold text-sm transition-colors duration-300 flex items-center gap-2 ${
                    billingCycle === "annual"
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Annual
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      billingCycle === "annual"
                        ? "bg-white/20 text-white"
                        : "bg-[#9B3DFF]/10 text-[#9B3DFF]"
                    }`}
                  >
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {currentPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Premium Card Container */}
                  <div
                    className={`relative h-full rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                      plan.popular
                        ? "premium-shadow-xl scale-[1.02]"
                        : "premium-shadow hover:premium-shadow-xl hover:scale-[1.01]"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 z-20">
                        <div className="h-12 bg-gradient-to-r from-[#9B3DFF] via-[#E60023] to-[#9B3DFF] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white mr-2" />
                          <span className="text-sm font-bold text-white tracking-wider uppercase">
                            {plan.badge}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card Background */}
                    <div className="absolute inset-0 bg-white" />

                    {/* Subtle gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div
                      className={`relative p-10 ${plan.popular ? "pt-20" : ""}`}
                    >
                      {/* Plan Name */}
                      <div className="mb-8">
                        <h3 className=" text-4xl font-semibold text-[#1F2E9A] mb-3">
                          {plan.name}
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="mb-10 pb-8 border-b border-gray-100">
                        <div className="flex items-baseline mb-2">
                          <span className="font-body text-lg text-gray-500 mr-1">
                            £
                          </span>
                          <span className=" text-6xl font-bold text-[#1F2E9A] price-number">
                            {plan.price[billingCycle]}
                          </span>
                          <span className="font-body text-gray-500 ml-2">
                            /month
                          </span>
                        </div>

                        {billingCycle === "annual" && (
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#00B894]/10 to-[#2EC5FF]/10">
                              <TrendingUp className="w-3 h-3 text-[#00B894]" />
                              <span className="font-body text-sm font-semibold text-[#00B894]">
                                {plan.savings}
                              </span>
                            </div>
                            <p className="font-body text-sm text-gray-500">
                              Billed annually at £{plan.price.annual * 12}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="space-y-4 mb-10">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                feature.included
                                  ? "bg-gradient-to-br from-[#00B894] to-[#2EC5FF]"
                                  : "bg-gray-200"
                              }`}
                            >
                              {feature.included ? (
                                <Check className="w-3 h-3 text-white stroke-[3]" />
                              ) : (
                                <X className="w-3 h-3 text-gray-400 stroke-[3]" />
                              )}
                            </div>
                            <span
                              className={`font-body text-sm leading-relaxed ${
                                feature.included
                                  ? "text-gray-700 font-medium"
                                  : "text-gray-400"
                              }`}
                            >
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <MagneticButton
                        variant="square"
                        className={`w-full py-4 rounded-2xl font-body font-bold text-base transition-all duration-300 relative overflow-hidden group/btn ${
                          plan.popular
                            ? "bg-gradient-to-r from-[#9B3DFF] to-[#E60023] text-white premium-shadow-xl hover:shadow-2xl"
                            : "bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white premium-shadow hover:premium-shadow-xl"
                        }`}
                      >
                        {/* <span className="relative z-10 flex items-center justify-center gap-2"> */}
                        {plan.cta}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        {/* </span> */}
                      </MagneticButton>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tl ${plan.gradient} opacity-10 rounded-full blur-2xl`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white via-gray-50/40 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <FAQComponent
            faqs={pricingFaqs}
            title="Pricing Questions"
            description="Everything you need to know before choosing a plan"
          />
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
