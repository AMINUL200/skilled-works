import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  User, 
  Mail, 
  Paperclip, 
  Send, 
  FileText, 
  Image as ImageIcon,
  File,
  X,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Phone,
  Clock,
  Shield,
  Users
} from 'lucide-react';
import PageLoader from '../../component/common/PageLoader';

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const fileType = file.type;
      const validTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      return validTypes.includes(fileType);
    });

    const newAttachments = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2) // Convert to MB
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData for file upload
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('message', formData.message);
    
    attachments.forEach((attachment, index) => {
      formDataObj.append(`attachment_${index}`, attachment.file);
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, you would send to your backend
      // await fetch('/api/support', {
      //   method: 'POST',
      //   body: formDataObj
      // });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setAttachments([]);
    } catch (error) {
      console.error('Error submitting form:', error);
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

    const [loading, setLoading] = useState(true);

  // ⏳ 2 second loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white py-12 px-4 sm:px-6 lg:px-8 pt-50">
      <div className="max-w-6xl mx-auto">
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
                Thank You for Your Feedback!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Your support request has been submitted successfully. Our team will review it and get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Submit Another Request
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
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Info & Support Details */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
              <div className="bg-gradient-to-br from-[#1F2E9A] to-[#2430A3] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Customer Support</h2>
                    <p className="text-white/80">We're here to help</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Response Time</h3>
                      <p className="text-white/70 text-sm">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure & Private</h3>
                      <p className="text-white/70 text-sm">All data is encrypted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Team</h3>
                      <p className="text-white/70 text-sm">UK-based support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <h3 className="font-semibold mb-4">Need Immediate Help?</h3>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Call our support line</p>
                      <p className="font-bold">+44 20 1234 5678</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#1F2E9A]" />
                  Before Submitting
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2EC5FF] mt-1.5"></div>
                    <span>Include screenshots for technical issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2EC5FF] mt-1.5"></div>
                    <span>Describe the steps to reproduce bugs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2EC5FF] mt-1.5"></div>
                    <span>Check our FAQ page for quick solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2EC5FF] mt-1.5"></div>
                    <span>Include error codes if available</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Support Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Support Request</h2>
                <p className="text-gray-600 mb-8">
                  Report issues, bugs, or share feedback. Our team will help you resolve any problems.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        Describe the Issue *
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300 resize-none"
                      placeholder="Please describe the issue in detail. Include steps to reproduce, error messages, and any other relevant information."
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-gray-400" />
                        Attach Files (Optional)
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Upload screenshots, error logs, or documents. Max 2MB per file. Supported: JPG, PNG, PDF, DOC
                      </span>
                    </label>
                    
                    <div className="mt-4">
                      {/* File Input */}
                      <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1F2E9A] hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <div className="text-center">
                          <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, PDF, DOC up to 2MB
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
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
                                  {getFileIcon(attachment.type)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.type.split('/')[1].toUpperCase()} • {attachment.size} MB
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
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full px-8 py-4 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Support Request</span>
                          <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;