import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  AlertCircle, 
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  ChevronRight,
  Home
} from 'lucide-react';
import { api } from '../../utils/app';
import PageLoader from '../../component/common/PageLoader';

const PolicyCmsPage = () => {
  const { slug } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    fetchPolicy();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);



  const fetchPolicy = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/privacy-terms/${slug}`);
      if (response.data && response.data.data) {
        setPolicy(response.data.data);
        document.title = `${response.data.data.title} - Skilled Workers Cloud`;
      }
    } catch (err) {
      setError(err.message || 'Failed to load policy');
    } finally {
      setLoading(false);
    }
  };



  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get icon based on page name
  const getPageIcon = () => {
    const name = policy?.page_name?.toLowerCase() || '';
    if (name.includes('privacy')) {
      return <Shield className="w-12 h-12 text-[#1F2E9A]" />;
    } else if (name.includes('term')) {
      return <FileText className="w-12 h-12 text-[#1F2E9A]" />;
    } else if (name.includes('cookie')) {
      return <Lock className="w-12 h-12 text-[#1F2E9A]" />;
    } else {
      return <CheckCircle className="w-12 h-12 text-[#1F2E9A]" />;
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (error || !policy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 font-display">
            Policy Not Found
          </h1>
          <p className="text-gray-600 mb-8 font-body">
            {error || "The policy you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#1F2E9A] text-white rounded-xl hover:bg-[#9B3DFF] transition-colors duration-300 font-body font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-body pt-40">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-white/80 mb-6">
              <Link to="/" className="hover:text-white transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-white">{policy.page_name}</span>
            </div>

            {/* Title Section */}
            <div className="flex items-start gap-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                {getPageIcon()}
              </div>
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                  {policy.page_name}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display leading-tight">
                  {policy.title}
                </h1>
               
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last Updated: {formatDate(policy.updated_at)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Effective from: {formatDate(policy.created_at)}
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="#F9FAFB" d="M0,64 C240,96 480,112 720,96 C960,80 1200,48 1440,64 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
           

            {/* Policy Content */}
            <div className="lg:w-4/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Render the HTML description */}
                  <div 
                    className="policy-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: policy.description }}
                  />

                
                </div>
              </motion.div>

              {/* Footer Navigation */}
              <div className="mt-8 flex justify-between items-center">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
                
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-[#1F2E9A] text-white rounded-xl hover:bg-[#9B3DFF] transition-all duration-200 font-medium"
                >
                  Print Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Policy Content */}
      <style jsx>{`
        .policy-content {
          color: #374151;
          line-height: 1.7;
        }
        
        .policy-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          font-family: 'DM Serif Display', serif;
        }
        
        .policy-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #111827;
          font-family: 'DM Serif Display', serif;
          scroll-margin-top: 100px;
        }
        
        .policy-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #1F2937;
        }
        
        .policy-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }
        
        .policy-content p {
          margin-bottom: 1.5rem;
          color: #4B5563;
        }
        
        .policy-content ul, .policy-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .policy-content li {
          margin-bottom: 0.5rem;
          color: #4B5563;
        }
        
        .policy-content a {
          color: #1F2E9A;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .policy-content a:hover {
          color: #9B3DFF;
        }
        
        .policy-content strong {
          color: #1F2937;
          font-weight: 600;
        }
        
        .policy-content blockquote {
          border-left: 4px solid #1F2E9A;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4B5563;
        }
        
        .policy-content table {
          width: 100%;
          margin-bottom: 1.5rem;
          border-collapse: collapse;
        }
        
        .policy-content th {
          background-color: #F3F4F6;
          padding: 0.75rem;
          font-weight: 600;
          color: #1F2937;
        }
        
        .policy-content td {
          padding: 0.75rem;
          border-bottom: 1px solid #E5E7EB;
        }
        
        .policy-content .bg-gradient-to-r {
          padding: 1.5rem;
          border-radius: 1rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default PolicyCmsPage;