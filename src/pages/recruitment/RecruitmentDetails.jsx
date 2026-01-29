import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  Building, 
  Users, 
  Calendar,
  FileText,
  Upload,
  User,
  Mail,
  Phone,
  ChevronRight,
  Award,
  Shield,
  Globe,
  CheckCircle,
  Paperclip,
  X,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecruitmentDetails = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: 'immediate'
  });

  // Job details data
  const jobDetails = {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechVision Ltd",
    location: "London, UK",
    type: "Full-time",
    salary: "£70,000 - £90,000 per year",
    posted: "2 days ago",
    category: "Technology",
    remote: true,
    visaSponsorship: true,
    urgent: true,
    experience: "5+ years",
    
    // Company details
    companyInfo: {
      name: "TechVision Ltd",
      description: "A leading technology company specializing in cloud solutions and enterprise software development. We work with Fortune 500 companies to transform their digital infrastructure.",
      size: "200-500 employees",
      industry: "Information Technology & Services",
      founded: "2015",
      website: "https://techvision.com"
    },

    // Job description
    description: "We're looking for a Senior Software Engineer to join our growing team and help build the next generation of our cloud-based HR platform. You'll be working on cutting-edge technologies and collaborating with a team of passionate engineers.",
    
    // Responsibilities
    responsibilities: [
      "Design, develop, and maintain scalable software solutions",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, efficient, and well-documented code",
      "Participate in code reviews and provide constructive feedback",
      "Troubleshoot and debug applications",
      "Stay up-to-date with emerging technologies and industry trends",
      "Mentor junior developers and contribute to team growth"
    ],

    // Requirements
    requirements: {
      mandatory: [
        "5+ years of professional software development experience",
        "Strong proficiency in JavaScript/TypeScript, React, and Node.js",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Knowledge of microservices architecture and RESTful APIs",
        "Experience with databases (PostgreSQL, MongoDB)",
        "Understanding of CI/CD pipelines and DevOps practices"
      ],
      preferred: [
        "Experience with Docker and Kubernetes",
        "Knowledge of GraphQL",
        "Previous experience in HR-tech or SaaS platforms",
        "Contributions to open-source projects",
        "Experience with Agile/Scrum methodologies"
      ]
    },

    // Benefits
    benefits: [
      { icon: <DollarSign className="w-5 h-5" />, title: "Competitive Salary", description: "Attractive package with performance bonuses" },
      { icon: <Calendar className="w-5 h-5" />, title: "Flexible Hours", description: "Work when you're most productive" },
      { icon: <Globe className="w-5 h-5" />, title: "Remote Work", description: "Fully remote or hybrid options available" },
      { icon: <Award className="w-5 h-5" />, title: "Career Growth", description: "Clear promotion paths and skill development" },
      { icon: <Shield className="w-5 h-5" />, title: "Health Insurance", description: "Comprehensive private healthcare" },
      { icon: <Users className="w-5 h-5" />, title: "Team Culture", description: "Inclusive and collaborative environment" }
    ],

    // Application process
    process: [
      "Submit your application with CV and cover letter",
      "Initial screening call with HR (30 minutes)",
      "Technical assessment (take-home or live coding)",
      "Technical interview with team leads (60 minutes)",
      "Cultural fit interview with senior management",
      "Reference checks and background verification",
      "Job offer and contract signing"
    ]
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const fileType = file.type;
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      return validTypes.includes(fileType) && file.size <= 5 * 1024 * 1024; // 5MB limit
    });

    const newAttachments = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) // MB
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData for submission
    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
    
    attachments.forEach((attachment, index) => {
      formDataObj.append(`attachment_${index}`, attachment.file);
    });

    // Add job details
    formDataObj.append('jobId', jobDetails.id);
    formDataObj.append('jobTitle', jobDetails.title);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-45">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="hover:text-[#1F2E9A] transition-colors"
                >
                  Home
                </button>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li>
                <button 
                  onClick={() => navigate('/recruitment')}
                  className="hover:text-[#1F2E9A] transition-colors"
                >
                  Recruitment
                </button>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-[#1F2E9A] font-semibold">Job Details</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Application Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for applying to the {jobDetails.title} position at {jobDetails.company}. 
                Our HR team will review your application and contact you within 3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/recruitment')}
                  className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Browse More Jobs
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border-2 border-[#1F2E9A] text-[#1F2E9A] rounded-lg font-medium hover:bg-[#1F2E9A] hover:text-white transition-colors duration-300"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left Column - Job Details */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
              {/* Job Header */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-[#1F2E9A]" />
                      </div>
                      <span className="text-sm font-semibold text-[#1F2E9A]">
                        {jobDetails.category}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {jobDetails.title}
                    </h1>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-gray-400" />
                        <span className="text-lg font-semibold text-[#1F2E9A]">
                          {jobDetails.company}
                        </span>
                      </div>
                      <button 
                        onClick={() => window.open(jobDetails.companyInfo.website, '_blank')}
                        className="flex items-center gap-1 text-sm text-[#1F2E9A] hover:text-[#9B3DFF] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Company
                      </button>
                    </div>
                  </div>
                  
                  {jobDetails.urgent && (
                    <div className="px-4 py-2 bg-gradient-to-r from-[#E60023] to-[#FF1F1F] text-white rounded-full font-bold text-sm">
                      URGENT HIRING
                    </div>
                  )}
                </div>

                {/* Job Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{jobDetails.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-semibold">{jobDetails.salary}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-semibold">{jobDetails.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold">{jobDetails.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {jobDetails.remote && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                      Remote Available
                    </span>
                  )}
                  {jobDetails.visaSponsorship && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      Visa Sponsorship
                    </span>
                  )}
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    Posted {jobDetails.posted}
                  </span>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#1F2E9A]" />
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {jobDetails.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities:</h3>
                  <ul className="space-y-3">
                    {jobDetails.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#1F2E9A] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements:</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Mandatory:</h4>
                    <ul className="space-y-2">
                      {jobDetails.requirements.mandatory.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Preferred (Bonus):</h4>
                    <ul className="space-y-2">
                      {jobDetails.requirements.preferred.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-[#FF9F1C] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Benefits & Perks:</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {jobDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-white rounded-lg">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

               
              </div>

             
            </motion.div>

            {/* Right Column - Application Form */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Apply for this Position</h3>
                      <p className="text-white/80 text-sm">Complete the form below</p>
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">Personal Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          Email Address *
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Phone Number *
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                        placeholder="+44 123 456 7890"
                      />
                    </div>
                  </div>

                  {/* Salary Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">Salary Information</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Salary
                        </label>
                        <input
                          type="text"
                          name="currentSalary"
                          value={formData.currentSalary}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                          placeholder="£"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Salary
                        </label>
                        <input
                          type="text"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                          placeholder="£"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notice Period
                      </label>
                      <select
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                      >
                        <option value="immediate">Immediate / Currently Available</option>
                        <option value="1week">1 Week</option>
                        <option value="2weeks">2 Weeks</option>
                        <option value="1month">1 Month</option>
                        <option value="2months">2 Months</option>
                        <option value="3months">3 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        Cover Letter
                      </div>
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300 resize-none"
                      placeholder="Tell us why you're the perfect candidate for this position..."
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        Upload Documents
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Upload your CV and supporting documents. Max 5MB per file. PDF, DOC, DOCX only.
                      </span>
                    </label>
                    
                    <div className="mt-4">
                      {/* File Input */}
                      <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1F2E9A] hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">
                            Upload CV & Documents
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, DOC, DOCX up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                      </label>

                      {/* Attachments List */}
                      {attachments.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="text-sm font-medium text-gray-700">
                            Attached Files ({attachments.length})
                          </p>
                          {attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg border">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.size} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(attachment.id)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                              >
                                <X className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentDetails;