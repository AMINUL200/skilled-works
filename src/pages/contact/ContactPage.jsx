import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Building,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Star,
  Award,
  Headphones,
} from "lucide-react";
import MagneticButton from "../../component/common/MagneticButtonProps";
import FAQComponent from "../../component/common/FAQComponent";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Support",
      content: "+44 20 7123 4567",
      subtitle: "Mon-Fri, 9am-6pm GMT",
      color: "from-[#2EC5FF] to-[#1F2E9A]",
      action: "tel:+442071234567",
      description: "Speak directly with our HR experts"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      content: "support@skilledworkerscloud.co.uk",
      subtitle: "Response within 2 hours",
      color: "from-[#9B3DFF] to-[#E60023]",
      action: "mailto:support@skilledworkerscloud.co.uk",
      description: "Send detailed queries and documents"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "London Office",
      content: "123 Business Street, London EC1A 1BB",
      subtitle: "Central London Office",
      color: "from-[#00B894] to-[#2430A3]",
      action: "https://maps.google.com",
      description: "Schedule an in-person meeting"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Emergency Support",
      content: "+44 20 7123 4568",
      subtitle: "24/7 Critical HR support",
      color: "from-[#FF6B6B] to-[#FFA726]",
      action: "tel:+442071234568",
      description: "For urgent HR compliance issues"
    }
  ];

  const departments = [
    {
      name: "Sales & Demos",
      email: "sales@skilledworkerscloud.co.uk",
      phone: "+44 20 7123 4569",
      description: "Product demonstrations and pricing"
    },
    {
      name: "Technical Support",
      email: "tech@skilledworkerscloud.co.uk",
      phone: "+44 20 7123 4570",
      description: "Platform assistance and troubleshooting"
    },
    {
      name: "HR Consulting",
      email: "consulting@skilledworkerscloud.co.uk",
      phone: "+44 20 7123 4571",
      description: "HR strategy and implementation"
    }
  ];

  const faqData = [
    {
      id: 1,
      question: "How quickly can I implement your HRMS platform?",
      answer: "Most clients are fully operational within 2-4 weeks. Our implementation team provides dedicated support throughout the process, including data migration, configuration, and staff training.",
      category: "Implementation"
    },
    {
      id: 2,
      question: "Is your platform UK GDPR compliant?",
      answer: "Yes, our platform is fully compliant with UK GDPR regulations. We provide data processing agreements, regular security audits, and all necessary compliance documentation for UK businesses.",
      category: "Compliance"
    },
    {
      id: 3,
      question: "Can I customize the platform for my industry needs?",
      answer: "Absolutely! We offer industry-specific modules and customization options. Whether you're in aviation, healthcare, or construction, we can tailor the platform to your specific requirements.",
      category: "Customization"
    },
    {
      id: 4,
      question: "What kind of support do you offer after implementation?",
      answer: "We provide 24/7 technical support, dedicated account management, regular software updates, and ongoing HR consulting. All clients get access to our UK-based support team.",
      category: "Support"
    },
    {
      id: 5,
      question: "How secure is my data on your platform?",
      answer: "We use bank-level security with AES-256 encryption, regular penetration testing, and ISO 27001 certification. Your data is stored in UK-based data centers with daily backups.",
      category: "Security"
    },
    {
      id: 6,
      question: "Do you offer training for our staff?",
      answer: "Yes, we provide comprehensive training sessions, online tutorials, and detailed documentation. We also offer train-the-trainer programs for larger organizations.",
      category: "Training"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30 md:pt-30">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9B3DFF] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
           
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">Contact Us Today</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] via-[#2EC5FF] to-[#E60023]">
                With Your Query
              </span>
            </h1>
            
           
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <Award className="w-4 h-4 text-[#9B3DFF]" />
                <span className="text-sm font-semibold">UK-Based Support</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <Shield className="w-4 h-4 text-[#2EC5FF]" />
                <span className="text-sm font-semibold">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <Star className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-semibold">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Contact Details */}
            <div className="space-y-12">
              {/* Contact Cards */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#1F2E9A] flex items-center gap-3">
                  <Headphones className="w-8 h-8 text-[#9B3DFF]" />
                  Quick Contact
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactDetails.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.action}
                      target={contact.action?.startsWith('http') ? "_blank" : "_self"}
                      rel={contact.action?.startsWith('http') ? "noopener noreferrer" : ""}
                      className="block group"
                    >
                      <div className="h-full bg-white rounded-2xl border border-[#F2EEFF] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${contact.color} shadow-lg`}>
                            <div className="text-black">
                              {contact.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#1F2E9A] mb-1">
                              {contact.title}
                            </h3>
                            <p className="text-[#333333] font-semibold mb-1">
                              {contact.content}
                            </p>
                            <p className="text-sm text-[#666666] mb-2">
                              {contact.subtitle}
                            </p>
                            <p className="text-sm text-[#777777]">
                              {contact.description}
                            </p>
                          </div>
                        </div>
                       
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Department Contacts */}
              <div className="bg-gradient-to-br from-[#1F2E9A] to-[#2430A3] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6" />
                  Department Contacts
                </h3>
                
                <div className="space-y-6">
                  {departments.map((dept, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <h4 className="font-bold text-lg mb-2">{dept.name}</h4>
                      <p className="text-white/80 text-sm mb-3">{dept.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{dept.email}</span>
                        </a>
                        <a href={`tel:${dept.phone}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{dept.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border border-[#F2EEFF] text-center">
                  <div className="text-3xl font-bold text-[#E60023] mb-2">98%</div>
                  <div className="text-sm text-[#666666]">Client Satisfaction</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-[#F2EEFF] text-center">
                  <div className="text-3xl font-bold text-[#9B3DFF] mb-2">2h</div>
                  <div className="text-sm text-[#666666]">Avg Response Time</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-[#F2EEFF] text-center">
                  <div className="text-3xl font-bold text-[#2EC5FF] mb-2">24/7</div>
                  <div className="text-sm text-[#666666]">Support Available</div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-[#F2EEFF] text-center">
                  <div className="text-3xl font-bold text-[#00B894] mb-2">500+</div>
                  <div className="text-sm text-[#666666]">UK Businesses</div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl border border-[#F2EEFF] shadow-2xl overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-8 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">Send Your Query</h3>
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="text-white/80">
                      Fill out the form and our team will get back to you shortly
                    </p>
                  </div>

                  {/* Success Message */}
                  {isSubmitted && (
                    <div className="mx-8 mt-8 p-4 bg-gradient-to-r from-[#00B894] to-[#2EC5FF] rounded-xl">
                      <div className="flex items-center gap-3 text-white">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                          <h4 className="font-bold">Message Sent Successfully!</h4>
                          <p className="text-sm opacity-90">We'll contact you within 2 business hours.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                          <User className="w-4 h-4" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                          placeholder="John Smith"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                          <Building className="w-4 h-4" />
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                          placeholder="Your Company Ltd"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                          placeholder="john@company.co.uk"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                          placeholder="+44 20 7123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                        <Globe className="w-4 h-4" />
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Product Demo">Product Demo Request</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Sales Inquiry">Sales Inquiry</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                        <MessageSquare className="w-4 h-4" />
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Please provide details about your query or request..."
                      />
                    </div>

                    <div className="pt-4 flex justify-center">
                      <MagneticButton
                        variant="square"
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-[50%]  group ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-[#E60023] to-[#B8001B] hover:shadow-xl hover:shadow-red-200'
                        } text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </>
                        )}
                      </MagneticButton>
                    </div>

                    <div className="text-center pt-4">
                      <p className="text-sm text-[#666666]">
                        By submitting, you agree to our{" "}
                        <a href="#" className="text-[#1F2E9A] font-semibold hover:text-[#9B3DFF]">
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            

            {/* FAQ Component */}
            <FAQComponent faqs={faqData} />

            {/* Still Have Questions */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-2xl p-8 border border-[#E6E0FF]">
                <h3 className="text-2xl font-bold text-[#1F2E9A] mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-lg text-[#666666] mb-8 max-w-xl mx-auto">
                  Can't find what you're looking for? Our support team is ready to help.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton
                    variant="square"
                    className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Contact Support</span>
                    <Headphones className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </MagneticButton>
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default ContactPage;