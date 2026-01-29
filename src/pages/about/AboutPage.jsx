import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Target,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Calendar,
  Trophy,
  Linkedin,
  Twitter,
  Star,
  HelpCircle,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQComponent from "../../component/common/FAQComponent";
import MagneticButton from "../../component/common/MagneticButtonProps";
import AboutHero from "./AboutHero";
import AboutRight from "./AboutRight";
import AboutLeft from "./AboutLeft";
import AboutBusnes from "./AboutBusnes";

const AboutPage = () => {
  const navigate = useNavigate();
  const section2Ref = useRef(null);
  const isInView2 = useInView(section2Ref, { once: true, amount: 0.3 });
  const controls2 = useAnimation();

  useEffect(() => {
    if (isInView2) {
      controls2.start("visible");
    }
  }, [isInView2, controls2]);

  // Section 2 Data - Milestones
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with vision to revolutionize UK HR technology",
      icon: <Calendar className="w-5 h-5" />,
      color: "from-[#E60023] to-[#FF1F1F]",
    },
    {
      year: "2021",
      title: "First Major Client",
      description: "Onboarded 50+ UK businesses in first year",
      icon: <Users className="w-5 h-5" />,
      color: "from-[#1F2E9A] to-[#2430A3]",
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "Launched comprehensive HRMS platform",
      icon: <Target className="w-5 h-5" />,
      color: "from-[#2EC5FF] to-[#9B5CFF]",
    },
    {
      year: "2023",
      title: "500+ Clients",
      description: "Reached milestone of 500 UK businesses",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-[#00B894] to-[#2EC5FF]",
    },
    {
      year: "2024",
      title: "Award Recognition",
      description: "Received UK HR Technology Innovation Award",
      icon: <Star className="w-5 h-5" />,
      color: "from-[#FF4D8D] to-[#FF9F1C]",
    },
  ];

  // Team Members
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      expertise: "HR Technology Strategy",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      color: "from-[#1F2E9A] to-[#2430A3]",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      expertise: "Software Architecture",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      color: "from-[#2EC5FF] to-[#9B5CFF]",
    },
    {
      name: "Emma Wilson",
      role: "Head of HR Consulting",
      expertise: "UK Compliance & Strategy",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80",
      color: "from-[#E60023] to-[#FF1F1F]",
    },
    {
      name: "David Roberts",
      role: "Operations Director",
      expertise: "Business Process Optimization",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      color: "from-[#00B894] to-[#2EC5FF]",
    },
  ];

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "What makes your HR solutions unique for UK businesses?",
      answer:
        "Our platform is specifically designed for UK compliance requirements, including GDPR, employment law, and industry-specific regulations. We combine local expertise with global best practices to deliver solutions that work seamlessly within the UK business environment.",
      category: "Expertise",
    },
    {
      id: 2,
      question: "How do you ensure data security and privacy?",
      answer:
        "We use bank-level encryption, UK-based data centers, and comply with all UK GDPR regulations. Regular security audits, penetration testing, and ISO 27001 certification ensure your data is protected according to the highest industry standards.",
      category: "Security",
    },
    {
      id: 3,
      question: "What industries do you specialize in?",
      answer:
        "We serve a wide range of UK industries including aviation, healthcare, construction, IT, finance, education, and hospitality. Each solution is tailored to meet industry-specific compliance and operational requirements.",
      category: "Industries",
    },
    {
      id: 4,
      question: "How do you support clients during implementation?",
      answer:
        "Our dedicated implementation team provides end-to-end support including data migration, system configuration, staff training, and ongoing optimization. We assign a dedicated account manager to ensure smooth transition and adoption.",
      category: "Support",
    },
    {
      id: 5,
      question: "What is your company's vision for the future?",
      answer:
        "We aim to become the leading HR-tech provider in the UK by continuously innovating and adapting to changing workforce dynamics. Our focus is on AI-driven insights, enhanced employee experience, and seamless integration with emerging technologies.",
      category: "Vision",
    },
  ];

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleCTAClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-45">
      {/* Breadcrumb */}
      <div className="container mx-auto px-8 py-4">
        <nav className="text-sm text-[#666666]">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-[#1F2E9A]">
                Home
              </a>
            </li>
            <li>
              <ChevronRight className="w-4 h-4" />
            </li>
            <li className="text-[#1F2E9A] font-semibold">About Us</li>
          </ol>
        </nav>
      </div>

      {/* Section 1: Imported AboutHero Component */}
      <AboutHero />

      {/* Section 2: Left Content & Right Image */}
      <AboutRight />

      {/* Section 3: Right content & Left Image */}
      <AboutLeft />

      {/* Section 4: Business Expertise */}
      <AboutBusnes />

      {/* Section 3: FAQ Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FAQComponent faqs={faqData} />

          {/* Additional CTA */}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
