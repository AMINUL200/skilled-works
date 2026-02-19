import React, { useState } from "react";
import HRMSHero from "../../component/service_hrms/HRMSHero";
import HRMSFeatures from "../../component/service_hrms/HRMSFeatures";
import HRMSMobileFeatures from "../../component/service_hrms/HRMSMobileFeatures";
import FAQComponent from "../../component/common/FAQComponent";
import { ArrowRight } from "lucide-react";
import MagneticButton from "../../component/common/MagneticButtonProps";
import { useNavigate, useParams } from "react-router-dom";
import HRMSOtherService from "../../component/service_hrms/HRMSOtherService";
import WhyChooseHRMS from "../../component/service_hrms/WhyChooseHRMS";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";

const ServiceRender = () => {
  const { slug } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [whyChooseData, setWhyChooseData] = useState([]);
  const [whatWeOfferData, setWhatWeOfferData] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [customerStoriesData, setCustomerStoriesData] = useState([]);
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  const fetchData = async () => {
    try {
      const response = await api.get(`/service-type/${slug}`);
      if (response.status) {
        setServiceDetails(response.data.data.service);
        setFeatureData(response.data.data.features);
        
        // Map FAQ data to match FAQComponent props
        const mappedFaqs = response.data.data.faq.map(faq => ({
          id: faq.id,
          question: faq.faq_question,
          answer: faq.faq_answer,
          category: faq.faq_type, // Using faq_type as category
          link: null // Add link if needed from your data structure
        }));
        setFaqData(mappedFaqs);
        
        setWhyChooseData(response.data.data.why_chose_our_platform);
        setWhatWeOfferData(response.data.data.what_we_offer);
        setCustomerStoriesData(response.data.data.customer_success_story);
      } else {
        setError("Failed to load service data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
      setError("Failed to load service data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate("/contact");
  };

  React.useEffect(() => {
    fetchData();
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#1F2E9A] text-white rounded-lg hover:bg-[#2430A3] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-50">
      {/* Section 1: Hero */}
      <HRMSHero serviceDetails={serviceDetails} />

      {/* Section 2: Features */}
      <HRMSFeatures featureData={featureData} storageUrl={STORAGE_URL} />

      {/* Section 3: Mobile Features */}
      {/* <HRMSMobileFeatures /> */}

      {/* Section 4: Why Choose HRMS */}
      <WhyChooseHRMS whyChooseData={whyChooseData} customerStoriesData={customerStoriesData} />
      
      {/* Section 5: Other Services */}
      <HRMSOtherService serviceData={whatWeOfferData} storageUrl={STORAGE_URL}/>

      {/* Section 6: FAQ */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.length > 0 ? (
            <FAQComponent 
              faqs={faqData}
              title="Frequently Asked Questions"
              description="Find quick answers to common questions about our HRMS software"
            />
          ) : (
            // Fallback FAQ if no data
            <FAQComponent 
              faqs={[
                {
                  id: 1,
                  question: "How quickly can we implement your HRMS software?",
                  answer: "Most clients are fully operational within 2-4 weeks. Our implementation team provides dedicated support throughout the process, including data migration, configuration, and staff training.",
                  category: "Implementation"
                },
                {
                  id: 2,
                  question: "Is your platform UK GDPR compliant?",
                  answer: "Yes, our platform is fully compliant with UK GDPR regulations. We provide data processing agreements, regular security audits, and all necessary compliance documentation.",
                  category: "Compliance"
                },
                {
                  id: 3,
                  question: "Can the system integrate with our existing tools?",
                  answer: "Absolutely. Our platform offers comprehensive API integration with popular accounting software, payroll systems, CRM tools, and other business applications.",
                  category: "Integration"
                },
                {
                  id: 4,
                  question: "What kind of support do you offer?",
                  answer: "We provide 24/7 technical support, dedicated account management, regular software updates, and ongoing HR consulting through multiple channels.",
                  category: "Support"
                },
                {
                  id: 5,
                  question: "Is training provided for our team?",
                  answer: "Yes, we provide comprehensive training sessions, online tutorials, and detailed documentation to ensure your team is confident using the platform.",
                  category: "Training"
                }
              ]}
              title="Frequently Asked Questions"
              description="Find quick answers to common questions about our HRMS software"
            />
          )}

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

export default ServiceRender;