import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  User, 
  Shield, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle,
  Globe,
  Lock,
  Mail,
  Phone,
  Calendar,
  Download,
  ExternalLink,
  BookOpen,
  Gavel,
  Briefcase,
  CreditCard,
  Database,
  Eye,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfUse = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('agreement');

  const sections = [
    { id: 'agreement', title: 'Agreement Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'definitions', title: 'Key Definitions', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'accounts', title: 'User Accounts', icon: <User className="w-4 h-4" /> },
    { id: 'services', title: 'Our Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'payments', title: 'Payment Terms', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'intellectual', title: 'Intellectual Property', icon: <Gavel className="w-4 h-4" /> },
    { id: 'liability', title: 'Limitations of Liability', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'termination', title: 'Termination', icon: <XCircle className="w-4 h-4" /> },
    { id: 'governing', title: 'Governing Law', icon: <Scale className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const effectiveDate = "January 15, 2024";
  const version = "3.2";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-20">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9B3DFF] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-6">
              <Scale className="w-5 h-5 text-[#9B3DFF]" />
              <span className="text-sm font-semibold text-[#1F2E9A]">
                LEGAL AGREEMENT
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">Terms of Use</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Legal agreement governing your access to and use of Skilled Workers Cloud's HRMS platform and related services.
            </p>

            {/* Legal Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Effective: {effectiveDate}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Version: {version}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-full border border-[#E6E0FF]">
                <Globe className="w-4 h-4 text-[#1F2E9A]" />
                <span className="text-sm font-medium text-[#1F2E9A]">UK Law Governed</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Important Legal Notice</h4>
                  <p className="text-sm text-red-800">
                    By accessing or using our Services, you agree to be bound by these Terms of Use. Please read them carefully. If you do not agree to these terms, you must not access or use our Services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Navigation */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-6">
                  <h3 className="text-lg font-bold text-white">Terms Sections</h3>
                  <p className="text-white/80 text-sm mt-1">Navigate through terms</p>
                </div>
                
                <div className="p-4">
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] border border-[#E6E0FF] text-[#1F2E9A] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {section.icon}
                        <span>{section.title}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 ml-auto text-[#1F2E9A]" />
                        )}
                      </button>
                    ))}
                  </nav>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#1F2E9A] rounded-lg font-semibold hover:shadow-md transition-all duration-300">
                      <Download className="w-4 h-4" />
                      Download PDF Version
                    </button>
                    <button 
                      onClick={() => navigate('/privacy-policy')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-semibold hover:bg-[#1F2E9A] hover:text-white transition-all duration-300"
                    >
                      <Shield className="w-4 h-4" />
                      Privacy Policy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Terms Details */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8"
            >
              {/* Agreement Overview */}
              <div id="agreement" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <FileText className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Agreement Overview</h2>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      These Terms of Use ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and <strong className="text-[#1F2E9A]">Skilled Workers Cloud Ltd</strong> ("Company," "we," "us," or "our") governing your access to and use of our HRMS platform, website, mobile applications, and related services (collectively, the "Services").
                    </p>

                    <div className="p-5 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF] my-6">
                      <h4 className="font-bold text-[#1F2E9A] mb-3">Key Agreement Points:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>By using our Services, you accept these Terms in full</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>You must be at least 18 years old to use our Services</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>You agree to comply with all applicable UK laws and regulations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>These Terms may be updated periodically; continued use constitutes acceptance</span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Acceptance Process</h3>
                    <p className="text-gray-700">
                      You indicate your acceptance of these Terms by:
                    </p>
                    <ol className="list-decimal pl-6 mt-3 space-y-2 text-gray-700">
                      <li>Clicking "I Accept" during registration</li>
                      <li>Accessing or using any part of our Services</li>
                      <li>Making any payment for our Services</li>
                      <li>Continuing to use our Services after we post updated Terms</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Key Definitions */}
              <div id="definitions" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <BookOpen className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Key Definitions</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        term: "Services",
                        definition: "Our HRMS platform, website, mobile applications, APIs, and all related features and functionality."
                      },
                      {
                        term: "Content",
                        definition: "All information, data, text, software, sound, images, and other materials available through our Services."
                      },
                      {
                        term: "User Account",
                        definition: "Your individual account registered with us for accessing and using our Services."
                      },
                      {
                        term: "Subscription",
                        definition: "The paid access plan you purchase to use our Services for a specified period."
                      },
                      {
                        term: "Confidential Information",
                        definition: "Non-public, proprietary information disclosed by either party, including business and technical data."
                      },
                      {
                        term: "Intellectual Property",
                        definition: "Patents, copyrights, trademarks, trade secrets, and other proprietary rights."
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#1F2E9A] transition-colors duration-300">
                        <h4 className="font-bold text-[#1F2E9A] mb-2">{item.term}</h4>
                        <p className="text-sm text-gray-700">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Accounts */}
              <div id="accounts" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <User className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">User Accounts & Responsibilities</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#1F2E9A]" />
                        Account Creation
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>You must provide accurate and complete information</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Maintain the confidentiality of your login credentials</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Notify us immediately of any unauthorized access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>You are responsible for all activities under your account</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-[#E60023]" />
                        Prohibited Activities
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Sharing accounts or login credentials</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Using bots or automated systems</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Reverse engineering or hacking</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span>Uploading malicious content or viruses</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Account Security</h4>
                        <p className="text-sm text-blue-800">
                          We implement industry-standard security measures, but you must also take reasonable steps to protect your account. Enable two-factor authentication and use strong, unique passwords.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Services */}
              <div id="services" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Briefcase className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-6">
                    {[
                      {
                        title: "Service Availability",
                        content: "We strive to maintain 99.9% uptime for our Services. However, we may perform scheduled maintenance and updates. We are not liable for any interruptions beyond our reasonable control."
                      },
                      {
                        title: "Updates & Changes",
                        content: "We continuously improve our Services and may add, modify, or remove features. We will provide reasonable notice for significant changes that may affect your use of the Services."
                      },
                      {
                        title: "Third-Party Integrations",
                        content: "Our Services may integrate with third-party services. Use of such integrations is subject to the terms of both parties. We are not responsible for third-party services."
                      },
                      {
                        title: "Support Services",
                        content: "We provide support according to your subscription plan. Support is available during UK business hours unless otherwise specified in your agreement."
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-5 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              <div id="payments" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Terms</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Subscription Plans</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Prices are per user, per month unless otherwise stated</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Annual billing offers cost savings</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Prices are exclusive of applicable taxes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>We reserve the right to adjust prices with 30 days' notice</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Payment & Billing</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Payments are due in advance for each billing period</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Failed payments may result in service suspension</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Refunds are provided according to our refund policy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>We use secure payment processors</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-900 mb-1">Free Trials</h4>
                        <p className="text-sm text-yellow-800">
                          Free trials are offered for evaluation purposes. You must provide valid payment information to start a trial. Services will automatically convert to a paid subscription at trial end unless cancelled.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Limitations of Liability */}
              <div id="liability" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Limitations of Liability</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                    <h4 className="font-bold text-red-900 mb-3">Important Limitations</h4>
                    <ul className="space-y-3 text-red-800">
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>We are not liable for indirect, incidental, or consequential damages</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Our total liability is limited to the fees paid for Services in the 12 months preceding the claim</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>We are not liable for data loss; you are responsible for maintaining backups</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>Force majeure events relieve us from liability for affected Services</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Indemnification</h4>
                        <p className="text-sm text-blue-800">
                          You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Governing Law */}
              <div id="governing" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Scale className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Governing Law & Dispute Resolution</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">Governing Law</h4>
                      <p className="text-gray-700">
                        These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">Dispute Resolution</h4>
                      <p className="text-gray-700">
                        Before initiating legal proceedings, parties agree to attempt to resolve disputes through good faith negotiations. If unresolved within 30 days, mediation may be pursued.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-900 mb-1">Notice Requirements</h4>
                        <p className="text-sm text-green-800">
                          Legal notices must be in writing and delivered by registered post to our registered office address. Notices are deemed received 3 business days after posting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div id="contact" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Mail className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Legal Department</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Legal Inquiries</div>
                          <div className="font-medium text-gray-900">legal@skilledworkerscloud.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium text-gray-900">+44 (0)20 1234 5678</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Company Registration</div>
                          <div className="font-medium text-gray-900">12345678 (England & Wales)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Registered Office</h4>
                    <div className="space-y-4">
                      <div className="text-gray-700 leading-relaxed">
                        <strong>Skilled Workers Cloud Ltd</strong><br />
                        Legal Department<br />
                        123 Tech Street<br />
                        London EC1A 1BB<br />
                        United Kingdom
                      </div>
                      <button className="inline-flex items-center gap-2 text-[#1F2E9A] font-semibold hover:text-[#9B3DFF] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Companies House Registration
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      <Mail className="w-5 h-5" />
                      Send Legal Inquiry
                    </button>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-semibold hover:bg-[#1F2E9A] hover:text-white transition-all duration-300"
                    >
                      General Contact Form
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Acceptance Footer */}
      <section className="py-16 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] rounded-2xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Scale className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Acceptance of Terms</h3>
              </div>
              
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                By continuing to use our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-[#1F2E9A] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>I Accept These Terms</span>
                  <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
                
                <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1F2E9A] transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Decline & Exit</span>
                  <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUse;