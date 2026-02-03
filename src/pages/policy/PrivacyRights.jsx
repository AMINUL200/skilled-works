import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  User, 
  FileText, 
  CheckCircle,
  XCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Globe,
  Bell,
  Trash2,
  Edit,
  Copy,
  Key,
  Server,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyRights = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Privacy Overview', icon: <Shield className="w-4 h-4" /> },
    { id: 'data-collection', title: 'Data We Collect', icon: <Database className="w-4 h-4" /> },
    { id: 'data-use', title: 'How We Use Data', icon: <Eye className="w-4 h-4" /> },
    { id: 'rights', title: 'Your Privacy Rights', icon: <User className="w-4 h-4" /> },
    { id: 'security', title: 'Data Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'cookies', title: 'Cookies & Tracking', icon: <FileText className="w-4 h-4" /> },
    { id: 'third-party', title: 'Third-Party Sharing', icon: <Server className="w-4 h-4" /> },
    { id: 'gdpr', title: 'GDPR Compliance', icon: <Globe className="w-4 h-4" /> },
    { id: 'exercising', title: 'Exercising Rights', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact', title: 'Contact DPO', icon: <Mail className="w-4 h-4" /> }
  ];

  const effectiveDate = "January 15, 2024";
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

  const privacyRights = [
    {
      id: 1,
      title: "Right to Access",
      description: "Request access to your personal data we hold",
      icon: <Eye className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      timeline: "Within 30 days",
      action: "Request Data Report"
    },
    {
      id: 2,
      title: "Right to Rectification",
      description: "Request correction of inaccurate personal data",
      icon: <Edit className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      timeline: "Immediate",
      action: "Update Information"
    },
    {
      id: 3,
      title: "Right to Erasure",
      description: "Request deletion of your personal data",
      icon: <Trash2 className="w-5 h-5" />,
      color: "from-red-500 to-red-600",
      timeline: "Within 30 days",
      action: "Request Deletion"
    },
    {
      id: 4,
      title: "Right to Restriction",
      description: "Request restriction of data processing",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-yellow-500 to-yellow-600",
      timeline: "Within 7 days",
      action: "Restrict Processing"
    },
    {
      id: 5,
      title: "Right to Data Portability",
      description: "Receive your data in a structured format",
      icon: <Copy className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      timeline: "Within 30 days",
      action: "Export Data"
    },
    {
      id: 6,
      title: "Right to Object",
      description: "Object to processing of your personal data",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
      timeline: "Within 30 days",
      action: "File Objection"
    }
  ];

  const dataTypes = [
    { type: "Personal Identifiers", examples: "Name, email, phone number, address", collection: "During registration and account setup" },
    { type: "Professional Information", examples: "Job title, company, department, employee ID", collection: "HR system integration and user profile" },
    { type: "Usage Data", examples: "Login times, feature usage, preferences", collection: "Automatically through platform usage" },
    { type: "Technical Data", examples: "IP address, device information, browser type", collection: "Automatically through website and app" },
    { type: "Document Data", examples: "Uploaded documents, CVs, certificates", collection: "User uploads and system integrations" },
    { type: "Communication Data", examples: "Emails, support tickets, chat logs", collection: "Customer support interactions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-20">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2EC5FF] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#E6F7FF] to-[#F2EEFF] mb-6">
              <Shield className="w-5 h-5 text-[#2EC5FF]" />
              <span className="text-sm font-semibold text-[#1F2E9A]">
                DATA PROTECTION
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">Your Privacy Rights</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Understand and exercise your data protection rights under UK GDPR and data protection laws.
            </p>

            {/* Privacy Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Effective: {effectiveDate}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Version: {version}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-full border border-[#E6E0FF]">
                <Globe className="w-4 h-4 text-[#1F2E9A]" />
                <span className="text-sm font-medium text-[#1F2E9A]">UK GDPR Compliant</span>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Your Data, Your Rights</h4>
                  <p className="text-sm text-blue-800">
                    Under UK data protection laws, you have specific rights regarding your personal data. This page explains these rights and how to exercise them. We are committed to protecting your privacy and ensuring transparency.
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
                <div className="bg-gradient-to-r from-[#2EC5FF] to-[#1F2E9A] p-6">
                  <h3 className="text-lg font-bold text-white">Privacy Rights</h3>
                  <p className="text-white/80 text-sm mt-1">Navigate through sections</p>
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
                            ? 'bg-gradient-to-r from-[#E6F7FF] to-[#F2EEFF] border border-[#E6E0FF] text-[#1F2E9A] font-semibold'
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
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#E6F7FF] to-[#F2EEFF] text-[#1F2E9A] rounded-lg font-semibold hover:shadow-md transition-all duration-300">
                      <Download className="w-4 h-4" />
                      Download Rights Summary
                    </button>
                    <button 
                      onClick={() => navigate('/terms-of-use')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-semibold hover:bg-[#1F2E9A] hover:text-white transition-all duration-300"
                    >
                      <FileText className="w-4 h-4" />
                      Terms of Use
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Privacy Rights Details */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8"
            >
              {/* Overview */}
              <div id="overview" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Shield className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Rights Overview</h2>
                </div>

                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      At <strong className="text-[#1F2E9A]">Skilled Workers Cloud Ltd</strong>, we are committed to protecting your privacy and ensuring transparency in how we handle your personal data. Under UK GDPR and data protection laws, you have specific rights regarding your personal information.
                    </p>

                    <div className="p-5 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF] my-6">
                      <h4 className="font-bold text-[#1F2E9A] mb-3">Our Privacy Commitment:</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>We process personal data lawfully, fairly, and transparently</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>We collect data only for specified, explicit, and legitimate purposes</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>We minimize data collection to what is necessary</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>We maintain accurate data and keep it updated</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data We Collect */}
              <div id="data-collection" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Database className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data We Collect</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {dataTypes.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#1F2E9A] transition-colors duration-300">
                        <h4 className="font-bold text-[#1F2E9A] mb-2">{item.type}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Examples:</strong> {item.examples}
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Collected:</strong> {item.collection}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-yellow-900 mb-1">Sensitive Data</h4>
                        <p className="text-sm text-yellow-800">
                          We do not process special category data (racial/ethnic origin, political opinions, religious beliefs, etc.) unless explicitly required for our services and with your explicit consent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Privacy Rights Cards */}
              <div id="rights" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <User className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
                    <p className="text-gray-600">Under UK GDPR and data protection laws</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {privacyRights.map((right) => (
                    <motion.div
                      key={right.id}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-[#1F2E9A] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-r ${right.color} p-4`}>
                        <div className="flex items-center justify-between">
                          <div className="text-white p-2 bg-white/20 rounded-lg">
                            {right.icon}
                          </div>
                          <span className="text-xs font-semibold text-white bg-white/20 px-2 py-1 rounded">
                            {right.timeline}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-3">{right.title}</h3>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-4">{right.description}</p>
                        
                        {/* Action Button */}
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-colors duration-300 group-hover:bg-[#1F2E9A]/10 group-hover:text-[#1F2E9A]">
                          {right.action}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Rights */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4">Additional Rights</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Right to be Informed
                      </h5>
                      <p className="text-sm text-gray-600">
                        You have the right to be informed about the collection and use of your personal data.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Rights Related to Automated Decision Making
                      </h5>
                      <p className="text-sm text-gray-600">
                        You have the right not to be subject to decisions based solely on automated processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How We Use Data */}
              <div id="data-use" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Eye className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Data</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        purpose: "Service Provision",
                        examples: "Account management, HR features, document processing",
                        legalBasis: "Contractual necessity"
                      },
                      {
                        purpose: "Improvement & Development",
                        examples: "Feature development, bug fixes, user experience enhancement",
                        legalBasis: "Legitimate interests"
                      },
                      {
                        purpose: "Communication",
                        examples: "Support responses, service updates, security alerts",
                        legalBasis: "Contractual necessity & legitimate interests"
                      },
                      {
                        purpose: "Compliance",
                        examples: "Legal obligations, regulatory requirements, fraud prevention",
                        legalBasis: "Legal obligation"
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-[#1F2E9A] transition-colors duration-300">
                        <h4 className="font-bold text-gray-900 mb-2">{item.purpose}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Examples:</strong> {item.examples}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          <FileText className="w-3 h-3" />
                          {item.legalBasis}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-900 mb-1">Data Retention</h4>
                        <p className="text-sm text-green-800">
                          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div id="security" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Lock className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data Security Measures</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#1F2E9A]" />
                        Technical Security
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>End-to-end encryption for data in transit</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>At-rest encryption for stored data</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Regular security audits and penetration testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Secure data centers with physical access controls</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#E60023]" />
                        Organizational Security
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Regular employee security training</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Strict access controls and role-based permissions</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Data protection impact assessments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Incident response and breach notification procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-1">Security Incident Response</h4>
                        <p className="text-sm text-red-800">
                          In the unlikely event of a data breach, we have established procedures to promptly assess and mitigate risks, notify affected individuals where required, and report to regulatory authorities within 72 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GDPR Compliance */}
              <div id="gdpr" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Globe className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">UK GDPR Compliance</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">Our GDPR Principles</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Lawfulness, fairness, and transparency</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Purpose limitation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Data minimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Accuracy</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Storage limitation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Integrity and confidentiality</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3">International Data Transfers</h4>
                      <p className="text-gray-700 mb-3">
                        We ensure that any international transfers of personal data comply with UK data protection laws through appropriate safeguards.
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>EU Standard Contractual Clauses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Adequacy decisions where applicable</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>UK International Data Transfer Agreement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercising Rights */}
              <div id="exercising" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Exercising Your Rights</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF]">
                    <h4 className="font-bold text-[#1F2E9A] mb-3">How to Exercise Your Rights</h4>
                    <ol className="list-decimal pl-6 mt-3 space-y-3 text-gray-700">
                      <li>
                        <strong>Submit a request</strong> through our Data Rights Portal or by emailing our Data Protection Officer
                      </li>
                      <li>
                        <strong>Provide identification</strong> to verify your identity and protect your data
                      </li>
                      <li>
                        <strong>Specify the right(s)</strong> you wish to exercise and provide relevant details
                      </li>
                      <li>
                        <strong>Await our response</strong> within the legally required timeframe (usually 30 days)
                      </li>
                      <li>
                        <strong>Receive confirmation</strong> and, where applicable, the requested data or action
                      </li>
                    </ol>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2">Verification Process</h4>
                      <p className="text-sm text-blue-800">
                        To protect your data, we require identity verification before processing rights requests. This may include providing government-issued ID or answering security questions.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                      <h4 className="font-bold text-green-900 mb-2">No Fee Policy</h4>
                      <p className="text-sm text-green-800">
                        Exercising your data protection rights is free of charge. However, we may charge a reasonable fee if requests are manifestly unfounded or excessive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact DPO */}
              <div id="contact" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1F2E9A]/10 to-[#2EC5FF]/10 rounded-xl">
                    <Mail className="w-6 h-6 text-[#1F2E9A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Our Data Protection Officer</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Data Protection Officer</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Email DPO</div>
                          <div className="font-medium text-gray-900">dpo@skilledworkerscloud.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium text-gray-900">+44 (0)20 1234 5679</div>
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
                    <h4 className="font-bold text-gray-900 mb-4">Regulatory Authority</h4>
                    <div className="space-y-4">
                      <div className="text-gray-700 leading-relaxed">
                        <strong>Information Commissioner's Office (ICO)</strong><br />
                        UK's independent authority for data protection<br />
                        Wycliffe House, Water Lane<br />
                        Wilmslow, Cheshire SK9 5AF<br />
                        United Kingdom
                      </div>
                      <button className="inline-flex items-center gap-2 text-[#1F2E9A] font-semibold hover:text-[#2EC5FF] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Report to ICO
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      <Mail className="w-5 h-5" />
                      Contact DPO
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-semibold hover:bg-[#1F2E9A] hover:text-white transition-all duration-300">
                      <Shield className="w-5 h-5" />
                      Data Rights Portal
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
          <div className="bg-gradient-to-r from-[#2EC5FF] to-[#1F2E9A] rounded-2xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Your Data, Your Rights</h3>
              </div>
              
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                We are committed to protecting your privacy and ensuring you can exercise your data protection rights. For any questions or to exercise your rights, contact our Data Protection Officer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-[#1F2E9A] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Access Data Rights Portal</span>
                  <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
                
                <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1F2E9A] transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Download Privacy Guide</span>
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyRights;