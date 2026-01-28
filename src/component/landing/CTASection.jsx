import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  Shield,
  ArrowRight,
  Globe,
} from "lucide-react";
import MagneticButton from "../common/MagneticButtonProps";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+44 20 7123 4567",
      subtitle: "Mon-Fri, 9am-6pm GMT",
      color: "from-[#2EC5FF] to-[#1F2E9A]",
      gradient: "bg-gradient-to-br from-[#2EC5FF] to-[#1F2E9A]",
      action: "tel:+442071234567",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "hello@skilledworkerscloud.co.uk",
      subtitle: "Response within 2 hours",
      color: "from-[#9B3DFF] to-[#E60023]",
      gradient: "bg-gradient-to-br from-[#9B3DFF] to-[#E60023]",
      action: "mailto:hello@skilledworkerscloud.co.uk",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      content: "123 Business Street, London EC1A 1BB",
      subtitle: "Central London Office",
      color: "from-[#00B894] to-[#2430A3]",
      gradient: "bg-gradient-to-br from-[#00B894] to-[#2430A3]",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Support Hours",
      content: "24/7 Technical Support",
      subtitle: "Emergency HR support available",
      color: "from-[#FF6B6B] to-[#FFA726]",
      gradient: "bg-gradient-to-br from-[#FF6B6B] to-[#FFA726]",
      action: null,
    },
  ];

  const features = [
    "30-minute personalized demo",
    "No-obligation consultation",
    "Free HR process audit",
    "Custom implementation plan",
    "Post-demo support session",
  ];

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B3DFF] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#2EC5FF] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[#2430A3]">Ready to Transform Your</span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              HR Operations?
            </span>
          </h2>

          <p className="text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Book a personalized demo with our HR experts and discover how our
            platform can streamline your HR processes and boost efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Details */}
          <div>
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {contactDetails.map((contact, index) => (
                <a
                  key={index}
                  href={contact.action}
                  target={
                    contact.action?.startsWith("http") ? "_blank" : "_self"
                  }
                  rel={
                    contact.action?.startsWith("http")
                      ? "noopener noreferrer"
                      : ""
                  }
                  className={`block group ${!contact.action && "cursor-default"}`}
                >
                  <div className="bg-white rounded-2xl border border-[#F2EEFF] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${contact.gradient} shadow-lg`}
                      >
                        <div className="text-white">{contact.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2E9A] mb-1">
                          {contact.title}
                        </h3>
                        <p className="text-[#333333] font-semibold mb-1">
                          {contact.content}
                        </p>
                        <p className="text-sm text-[#666666]">
                          {contact.subtitle}
                        </p>
                      </div>
                    </div>
                    {contact.action && (
                      <div className="mt-4 flex items-center gap-2 text-[#9B3DFF] font-semibold">
                        <span className="text-sm">
                          Click to {contact.title.toLowerCase()}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Why Book Demo Section */}
            <div className="bg-gradient-to-br from-[#FAFAFF] to-[#F2EEFF] rounded-2xl p-8 border border-[#E6E0FF]">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#1F2E9A]" />
                <h3 className="text-2xl font-bold text-[#1F2E9A]">
                  What You'll Get
                </h3>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF]"></div>
                    <span className="text-[#444444] font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E6E0FF]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#1F2E9A] to-[#2430A3] rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2E9A]">
                    UK GDPR Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00B894] to-[#2EC5FF] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2E9A]">
                    ISO 27001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl border border-[#F2EEFF] shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-8 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">Book Your Demo</h3>
                    <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-white/80">
                    Fill out the form and our team will contact you within 24
                    hours
                  </p>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mx-8 mt-8 p-4 bg-gradient-to-r from-[#00B894] to-[#2EC5FF] rounded-xl">
                    <div className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <h4 className="font-bold">Demo Request Submitted!</h4>
                        <p className="text-sm opacity-90">
                          We'll contact you shortly to confirm your booking.
                        </p>
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
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
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

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                        <Calendar className="w-4 h-4" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                        <Clock className="w-4 h-4" />
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#1F2E9A]">
                      <MessageSquare className="w-4 h-4" />
                      Additional Notes
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-[#E6E0FF] bg-[#FAFAFF] focus:outline-none focus:ring-2 focus:ring-[#9B3DFF] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your HR challenges or specific requirements..."
                    />
                  </div>

                  <div className="pt-4 flex justify-center">
                    <MagneticButton
                      variant="square"
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-[50%] group  ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#E60023] to-[#B8001B] hover:shadow-xl hover:shadow-red-200"
                      } text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Book My Demo Now</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </MagneticButton>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-[#666666]">
                      By submitting, you agree to our{" "}
                      <a
                        href="#"
                        className="text-[#1F2E9A] font-semibold hover:text-[#9B3DFF]"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#9B3DFF] to-[#2EC5FF] rounded-2xl rotate-12 opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FFA726] rounded-2xl -rotate-12 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }

        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          filter: invert(0.3);
        }
      `}</style>
    </section>
  );
};

export default CTASection;
