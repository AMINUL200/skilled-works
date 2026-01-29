import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Award,
  Globe,
  Code,
  Palette,
  Smartphone,
} from "lucide-react";
import HeroSection from "../../component/landing/HeroSection";
import AboutSection from "../../component/landing/AboutSection";
import FeaturesSection from "../../component/landing/FeaturesSection";
import WeServeSection from "../../component/landing/WeServeSection";
import WhyChooseUs from "../../component/landing/WhyChooseUs";
import CTASection from "../../component/landing/CTASection";
import PopupSection from "../../component/landing/PopupSection";
import PageLoader from "../../component/common/PageLoader";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-white pt-50 md:pt-30">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* We Serve Section */}
      <WeServeSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* CTA Section */}
      <CTASection />

      <PopupSection />
    </div>
  );
};

export default LandingPage;
