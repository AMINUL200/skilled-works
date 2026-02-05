import React from "react";
import HRMSHero from "../../component/service_hrms/HRMSHero";
import HRMSFeatures from "../../component/service_hrms/HRMSFeatures";
import HRMSMobileFeatures from "../../component/service_hrms/HRMSMobileFeatures";
import FAQComponent from "../../component/common/FAQComponent";
import { ArrowRight } from "lucide-react";
import MagneticButton from "../../component/common/MagneticButtonProps";
import { useNavigate } from "react-router-dom";
import HRMSOtherService from "../../component/service_hrms/HRMSOtherService";
import WhyChooseHRMS from "../../component/service_hrms/WhyChooseHRMS";

const HRMSService = () => {
  const navigate = useNavigate();
  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "How quickly can we implement your HRMS software?",
      answer:
        "Most clients are fully operational within 2-4 weeks. Our implementation team provides dedicated support throughout the process, including data migration, configuration, and staff training. We offer a phased rollout approach to minimize disruption.",
      category: "Implementation",
    },
    {
      id: 2,
      question: "Is your platform UK GDPR compliant?",
      answer:
        "Yes, our platform is fully compliant with UK GDPR regulations. We provide data processing agreements, regular security audits, and all necessary compliance documentation for UK businesses. Our data centers are UK-based for additional security.",
      category: "Compliance",
    },
    {
      id: 3,
      question: "Can the system integrate with our existing tools?",
      answer:
        "Absolutely. Our platform offers comprehensive API integration with popular accounting software, payroll systems, CRM tools, and other business applications. We also provide custom integration solutions for unique requirements.",
      category: "Integration",
    },
    {
      id: 4,
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 technical support, dedicated account management, regular software updates, and ongoing HR consulting. All clients get access to our UK-based support team through multiple channels including phone, email, and live chat.",
      category: "Support",
    },
    {
      id: 5,
      question: "Is training provided for our team?",
      answer:
        "Yes, we provide comprehensive training sessions, online tutorials, and detailed documentation. We also offer train-the-trainer programs for larger organizations and ongoing support to ensure your team is confident using the platform.",
      category: "Training",
    },
  ];

  const handleCTAClick = () => {
    navigate("/contact");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-50">
      {/* Section 1: Hero */}
      <HRMSHero />

      {/* Section 2: Features */}
      <HRMSFeatures />

      {/* Section 3: Mobile Features */}
      {/* <HRMSMobileFeatures /> */}

      {/* Section 4: Why Choose HRMS */}
      <WhyChooseHRMS />

      {/* Section 5: Other Services */}
      <HRMSOtherService />

      {/* Section 6: FAQ */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQComponent faqs={faqData} />

          {/* Additional CTA - Responsive */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E6E0FF]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2E9A] mb-3 sm:mb-4">
                Still Have Questions?
              </h3>
              <p className="text-base sm:text-lg text-[#666666] mb-6 sm:mb-8 max-w-xl mx-auto">
                Our team is ready to help you with any questions about our HRMS
                software.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <MagneticButton
                  variant="square"
                  onClick={handleCTAClick}
                  className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3 w-full sm:w-auto"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </MagneticButton>

                <MagneticButton
                  variant="square"
                  onClick={() => navigate("/pricing")}
                  className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 w-full sm:w-auto"
                >
                  <span>SponicHR Register</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HRMSService;
