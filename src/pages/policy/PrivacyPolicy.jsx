import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  Eye, 
  Download,
  Mail,
  Phone,
  Calendar,
  User,
  Globe,
  Database,
  Settings,
  Bell,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <FileText className="w-4 h-4" /> },
    { id: 'data-collection', title: 'Data We Collect', icon: <Database className="w-4 h-4" /> },
    { id: 'data-use', title: 'How We Use Data', icon: <Settings className="w-4 h-4" /> },
    { id: 'data-sharing', title: 'Data Sharing', icon: <User className="w-4 h-4" /> },
    { id: 'data-security', title: 'Data Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'rights', title: 'Your Rights', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'cookies', title: 'Cookies Policy', icon: <Bell className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const lastUpdated = "January 15, 2024";
  const version = "2.1";

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
              <Shield className="w-5 h-5 text-[#9B3DFF]" />
              <span className="text-sm font-semibold text-[#1F2E9A]">
                PRIVACY & COMPLIANCE
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">Privacy Policy</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Our commitment to protecting your personal data and privacy in accordance with UK GDPR regulations and data protection laws.
            </p>

            {/* Last Updated Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Version: {version}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 rounded-full border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">UK GDPR Compliant</span>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#1F2E9A]" />
                Quick Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1F2E9A]">100%</div>
                  <div className="text-xs text-gray-600">GDPR Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#E60023]">0</div>
                  <div className="text-xs text-gray-600">Data Breaches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#9B3DFF]">UK</div>
                  <div className="text-xs text-gray-600">Data Centers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2EC5FF]">24/7</div>
                  <div className="text-xs text-gray-600">Security Monitoring</div>
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
                  <h3 className="text-lg font-bold text-white">Policy Sections</h3>
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

                  {/* Download Button */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#1F2E9A] rounded-lg font-semibold hover:shadow-md transition-all duration-300">
                      <Download className="w-4 h-4" />
                      Download PDF Version
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Policy Details */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8"
            >
              {/* Introduction Section */}
              <div id="introduction" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <FileText className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Introduction & Scope</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    This Privacy Policy describes how <strong className="text-[#1F2E9A]">Skilled Workers Cloud Ltd</strong> ("we," "us," or "our") collects, uses, shares, and protects personal data when you use our HRMS platform, website, and related services (collectively, the "Services").
                  </p>

                  <div className="p-4 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF]">
                    <h4 className="font-bold text-[#1F2E9A] mb-2">Scope of Policy</h4>
                    <p className="text-sm text-gray-700">
                      This policy applies to all personal data we process as a data controller under UK GDPR. It covers data collected through our website, mobile applications, platform, and any interactions with our team.
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">UK GDPR Compliance</h4>
                        <p className="text-sm text-blue-800">
                          We are fully compliant with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Our Data Protection Officer (DPO) oversees all data protection activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Collection Section */}
              <div id="data-collection" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Database className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data We Collect</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    We collect different types of personal data depending on your relationship with us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#1F2E9A]" />
                        Personal Information
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Name, email, phone number</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Job title and company details</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Professional credentials</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Communication preferences</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#E60023]" />
                        Platform Data
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Employee records and profiles</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Attendance and leave data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Performance reviews</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>System usage analytics</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#9B3DFF]" />
                        Technical Data
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>IP address and device information</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Browser type and settings</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Cookies and usage data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Log files and error reports</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[#2EC5FF]" />
                        Communication Data
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Email correspondence</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Support requests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Feedback and surveys</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Marketing preferences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Use Section */}
              <div id="data-use" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Settings className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Data</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    We use your personal data for the following lawful purposes under UK GDPR:
                  </p>

                  <div className="grid gap-4">
                    {[
                      {
                        purpose: "Service Delivery",
                        description: "To provide and maintain our HRMS platform, process transactions, and deliver customer support.",
                        legalBasis: "Contractual necessity"
                      },
                      {
                        purpose: "Platform Improvement",
                        description: "To enhance platform features, develop new functionalities, and improve user experience.",
                        legalBasis: "Legitimate interests"
                      },
                      {
                        purpose: "Communication",
                        description: "To send service updates, security alerts, and respond to your inquiries.",
                        legalBasis: "Contractual necessity"
                      },
                      {
                        purpose: "Compliance & Security",
                        description: "To comply with legal obligations, prevent fraud, and ensure platform security.",
                        legalBasis: "Legal obligation"
                      },
                      {
                        purpose: "Marketing (with consent)",
                        description: "To send promotional materials about new features and services (only with your explicit consent).",
                        legalBasis: "Consent"
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#F2EEFF] hover:to-[#E6F7FF] transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{item.purpose}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <span className="px-3 py-1 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 text-[#1F2E9A] text-sm font-semibold rounded-full whitespace-nowrap">
                            {item.legalBasis}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Security Section */}
              <div id="data-security" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <Lock className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data Security Measures</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    We implement robust technical and organizational security measures to protect your personal data:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <Lock className="w-5 h-5" />,
                        title: "Encryption",
                        description: "AES-256 encryption for data at rest and TLS 1.3 for data in transit"
                      },
                      {
                        icon: <Shield className="w-5 h-5" />,
                        title: "Access Controls",
                        description: "Role-based access control (RBAC) and multi-factor authentication"
                      },
                      {
                        icon: <Database className="w-5 h-5" />,
                        title: "UK Data Centers",
                        description: "All data stored in UK-based, ISO 27001 certified data centers"
                      },
                      {
                        icon: <Eye className="w-5 h-5" />,
                        title: "Monitoring",
                        description: "24/7 security monitoring and intrusion detection systems"
                      },
                      {
                        icon: <FileText className="w-5 h-5" />,
                        title: "Policies",
                        description: "Regular security audits and employee training programs"
                      },
                      {
                        icon: <Settings className="w-5 h-5" />,
                        title: "Backup & Recovery",
                        description: "Daily backups with 30-day retention and disaster recovery plans"
                      }
                    ].map((measure, index) => (
                      <div key={index} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-lg">
                            {measure.icon}
                          </div>
                          <h4 className="font-bold text-gray-900">{measure.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{measure.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Your Rights Section */}
              <div id="rights" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Data Protection Rights</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    Under UK GDPR, you have the following rights regarding your personal data:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        right: "Right to Access",
                        description: "Request copies of your personal data we hold"
                      },
                      {
                        right: "Right to Rectification",
                        description: "Request correction of inaccurate or incomplete data"
                      },
                      {
                        right: "Right to Erasure",
                        description: "Request deletion of your personal data in certain circumstances"
                      },
                      {
                        right: "Right to Restrict Processing",
                        description: "Request restriction of processing your data"
                      },
                      {
                        right: "Right to Data Portability",
                        description: "Receive your data in a structured, commonly used format"
                      },
                      {
                        right: "Right to Object",
                        description: "Object to processing based on legitimate interests"
                      },
                      {
                        right: "Right to Withdraw Consent",
                        description: "Withdraw consent at any time where processing is based on consent"
                      },
                      {
                        right: "Right to Complain",
                        description: "Lodge a complaint with the UK Information Commissioner's Office (ICO)"
                      }
                    ].map((right, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF]">
                        <h4 className="font-bold text-[#1F2E9A] mb-2">{right.right}</h4>
                        <p className="text-sm text-gray-700">{right.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-900 mb-1">Exercising Your Rights</h4>
                        <p className="text-sm text-green-800">
                          To exercise any of these rights, please contact our Data Protection Officer at <strong>dpo@skilledworkerscloud.com</strong>. We will respond to all legitimate requests within 30 days, as required by UK GDPR.
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
                    <h4 className="font-bold text-gray-900 mb-4">Data Protection Officer</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium text-gray-900">dpo@skilledworkerscloud.com</div>
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
                          <div className="text-sm text-gray-500">ICO Registration</div>
                          <div className="font-medium text-gray-900">ZA123456</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Mailing Address</h4>
                    <div className="space-y-4">
                      <div className="text-gray-700 leading-relaxed">
                        <strong>Skilled Workers Cloud Ltd</strong><br />
                        Data Protection Officer<br />
                        123 Tech Street<br />
                        London EC1A 1BB<br />
                        United Kingdom
                      </div>
                      <button className="inline-flex items-center gap-2 text-[#1F2E9A] font-semibold hover:text-[#9B3DFF] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      <Mail className="w-5 h-5" />
                      Email Data Request
                    </button>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-semibold hover:bg-[#1F2E9A] hover:text-white transition-all duration-300"
                    >
                      Contact Support Team
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-3xl p-8 border border-[#E6E0FF]">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-[#1F2E9A] mb-4">
                Questions About Our Privacy Policy?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Our data protection team is here to help you understand how we protect your data and your rights under UK GDPR.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/faq')}
                  className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>Visit FAQ Section</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                
                <button 
                  onClick={() => navigate('/terms')}
                  className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>View Terms of Service</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;