import React, { useEffect, useRef, useState } from "react";
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
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";

const AboutPage = () => {
  const navigate = useNavigate();
  const section2Ref = useRef(null);
  const isInView2 = useInView(section2Ref, { once: true, amount: 0.3 });
  const controls2 = useAnimation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [section2Data, setSection2Data] = useState(null);
  const [section3Data, setSection3Data] = useState(null);
  const [section4Data, setSection4Data] = useState(null);

  useEffect(() => {
    if (isInView2) {
      controls2.start("visible");
    }
  }, [isInView2, controls2]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/about`);
      if (response.status) {
        setServiceDetails(response.data.data.about[0]);
        // setFaqData(response.data.data.faq);
        setSection2Data(response.data.data.about[1]);
        setSection3Data(response.data.data.about[2]);
        setSection4Data(response.data.data.about[3]);
        // Map FAQ data to match FAQComponent props
        const mappedFaqs = response.data.data.faq.map((faq) => ({
          id: faq.id,
          question: faq.faq_question,
          answer: faq.faq_answer,
          category: faq.faq_type, // Using faq_type as category
          link: null, // Add link if needed from your data structure
        }));
        setFaqData(mappedFaqs);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching service data:", error);
    } finally {
      setLoading(false);
    }
  };

  // FAQ Data
  // const faqData = [
  //   {
  //     id: 1,
  //     question: "What makes your HR solutions unique for UK businesses?",
  //     answer:
  //       "Our platform is specifically designed for UK compliance requirements, including GDPR, employment law, and industry-specific regulations. We combine local expertise with global best practices to deliver solutions that work seamlessly within the UK business environment.",
  //     category: "Expertise",
  //   },
  //   {
  //     id: 2,
  //     question: "How do you ensure data security and privacy?",
  //     answer:
  //       "We use bank-level encryption, UK-based data centers, and comply with all UK GDPR regulations. Regular security audits, penetration testing, and ISO 27001 certification ensure your data is protected according to the highest industry standards.",
  //     category: "Security",
  //   },
  //   {
  //     id: 3,
  //     question: "What industries do you specialize in?",
  //     answer:
  //       "We serve a wide range of UK industries including aviation, healthcare, construction, IT, finance, education, and hospitality. Each solution is tailored to meet industry-specific compliance and operational requirements.",
  //     category: "Industries",
  //   },
  //   {
  //     id: 4,
  //     question: "How do you support clients during implementation?",
  //     answer:
  //       "Our dedicated implementation team provides end-to-end support including data migration, system configuration, staff training, and ongoing optimization. We assign a dedicated account manager to ensure smooth transition and adoption.",
  //     category: "Support",
  //   },
  //   {
  //     id: 5,
  //     question: "What is your company's vision for the future?",
  //     answer:
  //       "We aim to become the leading HR-tech provider in the UK by continuously innovating and adapting to changing workforce dynamics. Our focus is on AI-driven insights, enhanced employee experience, and seamless integration with emerging technologies.",
  //     category: "Vision",
  //   },
  // ];

  // ⏳ 2 second loader
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

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
      <AboutHero aboutData={serviceDetails} />

      {/* Section 2: Left Content & Right Image */}
      <AboutRight aboutData={section2Data} />

      {/* Section 3: Right content & Left Image */}
      <AboutLeft aboutData={section3Data} />

      {/* Section 4: Business Expertise */}
      <AboutBusnes aboutData={section4Data} />

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
