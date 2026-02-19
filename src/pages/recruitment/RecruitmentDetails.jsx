import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  ExternalLink,
  Loader,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/app";
import { toast } from "react-toastify";
import PageLoader from "../../component/common/PageLoader";

const RecruitmentDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const topRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "immediate",
  });

  // Fetch job details on component mount
  useEffect(() => {
    fetchJobDetails();
  }, [slug]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use id or slug from URL params

      const response = await api.get(`/available-jobs/${slug}`);
      const result = response.data;

      if (result.status && result.data) {
        setJobDetails(result.data);
      } else {
        setError("Failed to load job details");
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to load job details. Please try again.");
    } finally {
      // setTimeout(() => {
        setLoading(false);
      // }, 300);
    } // smooth transition
  };

  // Format salary with period
  const formatSalary = () => {
    if (!jobDetails?.salary_range) return "Competitive";
    const period = jobDetails.salary_period
      ? `/${jobDetails.salary_period}`
      : "";
    return `${jobDetails.salary_range}${period}`;
  };

  // Format posted date
  const formatPostedDate = () => {
    if (!jobDetails?.date) return "Recently";

    const posted = new Date(jobDetails.date);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const fileType = file.type;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      return validTypes.includes(fileType) && file.size <= 5 * 1024 * 1024; // 5MB limit
    });

    const newAttachments = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2), // MB
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);

    if (validFiles.length !== files.length) {
      toast.error(
        "Some files were rejected. Maximum file size is 5MB and allowed formats are PDF, DOC, DOCX",
      );
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number (basic validation)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate CV document is uploaded
    if (attachments.length === 0) {
      toast.error("Please upload your CV document");
      return;
    }

    setIsSubmitting(true);

    // Create FormData for submission with the exact field names required
    const formDataObj = new FormData();

    // Add all required fields matching the API specification
    formDataObj.append("available_job_id", jobDetails.id);
    formDataObj.append("full_name", formData.fullName);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone_number", formData.phone);
    formDataObj.append("current_salary", formData.currentSalary || "");
    formDataObj.append("expected_salary", formData.expectedSalary || "");
    formDataObj.append("notice_period", formData.noticePeriod);
    formDataObj.append("cover_letter", formData.coverLetter || "");

    // Add CV document (only the first attachment as CV)
    if (attachments.length > 0) {
      formDataObj.append("cv_document", attachments[0].file);
    }

    // Add any additional documents if needed
    // attachments.slice(1).forEach((attachment, index) => {
    //   formDataObj.append(`additional_documents[${index}]`, attachment.file);
    // });

    try {
      // Using your API instance
      const response = await api.post("/job-applications/apply", formDataObj);

      const result = response.data;

      if (result.status) {
        toast.success("Application submitted successfully!");
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      // Handle specific error messages from API
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted && topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isSubmitted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  console.log("Loading State:", loading);
  if (loading) {
    return <PageLoader />;
  }

  if (error || !jobDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-45 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#1F2E9A] mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The job you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => navigate("/recruitment")}
            className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={topRef}
      className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-45"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-[#1F2E9A] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                <button
                  onClick={() => navigate("/recruitment")}
                  className="hover:text-[#1F2E9A] transition-colors"
                >
                  Recruitment
                </button>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
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
                Thank you for applying to the {jobDetails.job_title} position.
                Our HR team will review your application and contact you within
                3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/recruitment")}
                  className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Browse More Jobs
                </button>
                <button
                  onClick={() => navigate("/")}
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
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-8"
            >
              {/* Job Header */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gradient-to-r from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-[#1F2E9A]" />
                      </div>
                      <span className="text-sm font-semibold text-[#1F2E9A]">
                        {jobDetails.category || "Technology"}
                      </span>
                    </div>

                    <h1
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
                      aria-label={jobDetails.title_meta || "Job Title"}
                    >
                      {jobDetails.job_title}
                    </h1>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-gray-400" />
                        <span className="text-lg font-semibold text-[#1F2E9A]">
                          {jobDetails.category || "TechVision Ltd"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {jobDetails.urgent_hiring && (
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
                      <p className="font-semibold">
                        {jobDetails.location || "Remote"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-semibold">{formatSalary()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-semibold">
                        {jobDetails.job_type || "Full-time"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold">
                        {jobDetails.experience || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {jobDetails.remote_available && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                      Remote Available
                    </span>
                  )}
                  {jobDetails.visa_sponsorship && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      Visa Sponsorship
                    </span>
                  )}
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    Posted {formatPostedDate()}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                {jobDetails?.job_description ? (
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: jobDetails.job_description,
                    }}
                    aria-label={
                      jobDetails.description_meta || "Job Description"
                    }
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    No description available for this job.
                  </p>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                {/* Render HTML description safely */}
                {jobDetails.job_desc_long ? (
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: jobDetails.job_desc_long,
                    }}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {jobDetails.job_description || "No description available"}
                  </p>
                )}
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
                      <h3 className="text-xl font-bold text-white">
                        Apply for this Position
                      </h3>
                      <p className="text-white/80 text-sm">
                        Complete the form below
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">
                      Personal Information
                    </h4>

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
                    <h4 className="font-bold text-gray-900">
                      Salary Information
                    </h4>

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
                          Expected Salary *
                        </label>
                        <input
                          type="text"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                          placeholder="£"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notice Period *
                      </label>
                      <select
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
                      >
                        <option value="">Select notice period</option>
                        <option value="immediate">
                          Immediate / Currently Available
                        </option>
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
                        Upload CV/Resume *
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Upload your CV. Max 5MB. PDF, DOC, DOCX only.
                      </span>
                    </label>

                    <div className="mt-4">
                      {/* File Input */}
                      <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1F2E9A] hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">
                            Upload CV
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
                            Uploaded Files ({attachments.length})
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
