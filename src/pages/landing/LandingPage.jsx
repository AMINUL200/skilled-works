import React, { useEffect, useState } from "react";
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
import OurProduct from "../../component/landing/OurProduct";
import { api } from "../../utils/app";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [loading, setLoading] = useState(true);

  const [landingData, setLandingData] = useState({
    popup: null,
    about: null,
    whyChoose :null,
    product : null,
  });

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        setLoading(true);

        const [popupRes, aboutRes, whyChooseRes, productRes] = await Promise.all([
          api.get("/popup"),
          api.get("/about"),
          api.get("/why-choose"),
          api.get("/product"),
        ]);

        setLandingData({
          popup: popupRes.data.data,
          about: aboutRes.data.data.about[0],
          whyChoose: whyChooseRes.data.data,
          product: productRes.data.data,
        });
      } catch (error) {
        console.error("Landing API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-white pt-50 md:pt-30">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection aboutData={landingData.about} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Our Product Section */}
      <OurProduct productData={landingData.product} />

      {/* Why Choose Us Section */}
      <WhyChooseUs whyChooseData={landingData.whyChoose} />

      {/* We Serve Section */}
      <WeServeSection />

      {/* CTA Section */}
      <CTASection />

      <PopupSection popupData={landingData.popup} />
    </div>
  );
};

export default LandingPage;
