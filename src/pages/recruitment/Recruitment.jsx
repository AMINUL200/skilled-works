import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ChevronRight,
  Calendar,
  Building,
  Target,
  Users,
  Globe,
  TrendingUp,
  Award,
  GraduationCap,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQComponent from "../../component/common/FAQComponent";
import { api } from "../../utils/app";
import PageLoader from "../../component/common/PageLoader";

const Recruitment = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [visibleNotices, setVisibleNotices] = useState([]);
  const [recruitmentData, setRecruitmentData] = useState(null);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch recruitment data on component mount
  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const fetchRecruitmentData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await api.get("/recruitments");
      const result = response.data;
      if (result.status && result.data) {
        setRecruitmentData(result.data.recruitment);
        setAvailableJobs(result.data.available_jobs || []);
        if (result.data.faqs) {
          const transformedFaqs = result.data.faqs.map((faq, index) => ({
            id: faq.id || index + 1, // Use API ID or fallback to index
            question: faq.faq_question,
            answer: faq.faq_answer,
            category: faq.faq_type || "General",
          }));
          setFaqData(transformedFaqs);
        } else {
          setFaqData([]);
        }
      } else {
        setError("Failed to load recruitment data");
      }
    } catch (error) {
      console.error("Error fetching recruitment data:", error);
      setError("Failed to load recruitment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize visible notices from available_jobs
  useEffect(() => {
    if (availableJobs.length > 0) {
      setVisibleNotices(availableJobs.slice(0, 3));
    }
  }, [availableJobs]);

  // Animate notices (auto-scroll every 5 seconds)
  useEffect(() => {
    if (availableJobs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => {
        const nextIndex = (prev + 1) % availableJobs.length;

        // Update visible notices for smooth transition
        if (nextIndex + 2 < availableJobs.length) {
          setVisibleNotices(availableJobs.slice(nextIndex, nextIndex + 3));
        } else {
          const remaining = availableJobs.slice(nextIndex);
          const additional = availableJobs.slice(0, 3 - remaining.length);
          setVisibleNotices([...remaining, ...additional]);
        }

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [availableJobs]);

  // Helper function to get icon based on job category
  const getJobIcon = (category) => {
    if (!category) return <Briefcase className="w-5 h-5" />;

    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("data")) return <Target className="w-5 h-5" />;
    if (categoryLower.includes("law") || categoryLower.includes("legal"))
      return <Award className="w-5 h-5" />;
    if (categoryLower.includes("hr")) return <Users className="w-5 h-5" />;
    if (categoryLower.includes("tech") || categoryLower.includes("engineer"))
      return <Globe className="w-5 h-5" />;
    if (categoryLower.includes("marketing"))
      return <TrendingUp className="w-5 h-5" />;
    if (categoryLower.includes("finance"))
      return <DollarSign className="w-5 h-5" />;

    return <Briefcase className="w-5 h-5" />;
  };

  // Helper function to get color based on job category
  const getJobColor = (category) => {
    if (!category)
      return {
        color: "bg-gradient-to-r from-blue-100 to-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-700",
        bgColor: "bg-blue-100",
      };

    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("data"))
      return {
        color: "bg-gradient-to-r from-red-100 to-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        bgColor: "bg-red-100",
      };
    if (categoryLower.includes("law") || categoryLower.includes("legal"))
      return {
        color: "bg-gradient-to-r from-indigo-100 to-indigo-50",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-700",
        bgColor: "bg-indigo-100",
      };
    if (categoryLower.includes("hr"))
      return {
        color: "bg-gradient-to-r from-green-100 to-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-700",
        bgColor: "bg-green-100",
      };
    if (categoryLower.includes("tech"))
      return {
        color: "bg-gradient-to-r from-purple-100 to-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-700",
        bgColor: "bg-purple-100",
      };
    if (categoryLower.includes("marketing"))
      return {
        color: "bg-gradient-to-r from-orange-100 to-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-700",
        bgColor: "bg-orange-100",
      };

    return {
      color: "bg-gradient-to-r from-blue-100 to-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    };
  };

  // Format salary based on period
  const formatSalary = (job) => {
    if (!job.salary_range) return "Competitive";
    const period = job.salary_period ? `/${job.salary_period}` : "";
    return `${job.salary_range}${period}`;
  };

  // Format posted date
  const formatPostedDate = (dateString) => {
    if (!dateString) return "Recently";

    const posted = new Date(dateString);
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

  const handleNoticeClick = (job) => {
    navigate(`/recruitment/apply/${job.job_slug || job.id}`);
  };

  const handleApplyClick = (job) => {
    navigate(`/recruitment/apply/${job.job_slug || job.id}`);
  };

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

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#1F2E9A] mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchRecruitmentData}
            className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30">
      {/* Section 1: Hero with Content & Notice Board */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Left Content */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF]">
                  <Briefcase className="w-5 h-5 text-[#9B3DFF]" />
                  <span className="text-sm font-semibold text-[#1F2E9A]">
                    {recruitmentData?.badge_text || "RECRUITMENT PLATFORM"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                aria-label={`${recruitmentData?.title_meta || "Welcome to Skilled Workers Cloud"} ${recruitmentData?.highalited_title || "Recruitment Platform"}`}
                >
                  <span className="text-[#2430A3]">
                    {recruitmentData?.title ||
                      "Welcome to Skilled Workers Cloud"}
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                    {recruitmentData?.highalited_title ||
                      "Recruitment Platform"}
                  </span>
                </h1>

                {/* Render HTML description safely */}
                {recruitmentData?.description && (
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: recruitmentData.description,
                    }}
                    aria-label={recruitmentData.description_meta || "Skilled Workers Cloud offers a comprehensive recruitment platform connecting skilled workers with top UK employers. Explore our services and find your next career opportunity."}
                  />
                )}
              </div>
            </motion.div>

            {/* Right Side - Recruitment Notice Board */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Notice Board Header */}
                <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Recruitment Notice Board
                      </h3>
                      <p className="text-white/80 text-sm">
                        Latest job opportunities
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Notice Board Content */}
                <div className="p-6 h-[500px] overflow-hidden relative">
                  {/* Background animation effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10 pointer-events-none" />

                  <div className="relative h-full">
                    {visibleNotices.length > 0 ? (
                      visibleNotices.map((job, index) => {
                        const colors = getJobColor(job.category);
                        return (
                          <motion.div
                            key={job.id}
                            initial={{
                              opacity: 0,
                              y: 100,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: [0, 0.7, 1],
                              y: [100, 20, 0],
                              scale: [0.9, 0.95, 1],
                            }}
                            exit={{
                              opacity: 0,
                              y: -100,
                              scale: 0.9,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.2,
                              ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.02 }}
                            className={`absolute left-0 right-0 p-4 rounded-xl border-2 ${colors.borderColor} ${colors.color} transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
                              index === 0
                                ? "top-0 z-30"
                                : index === 1
                                  ? "top-1/3 z-20 opacity-90"
                                  : "top-2/3 z-10 opacity-80"
                            }`}
                            style={{
                              transform: `translateY(${index * 40}px) scale(${1 - index * 0.1})`,
                              zIndex: 30 - index * 10,
                            }}
                            onClick={() => handleNoticeClick(job)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                {getJobIcon(job.category)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-bold text-gray-900 text-lg">
                                    {job.job_title}
                                  </h4>
                                  <span
                                    className={`px-2 py-1 ${colors.bgColor} ${colors.textColor} text-xs rounded-full`}
                                  >
                                    {job.job_type || "Full-time"}
                                  </span>
                                </div>
                                <p className="text-[#1F2E9A] font-semibold text-sm mb-2">
                                  {job.category || "Technology"}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {job.location || "Remote"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" />
                                    {formatSalary(job)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  Posted {formatPostedDate(job.date)}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                          No jobs available at the moment
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Navigation Dots */}
                  {availableJobs.length > 0 && (
                    <div className="flex justify-center gap-2 mt-80 pt-4 border-t border-gray-100">
                      {availableJobs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentNoticeIndex(index);
                            if (index + 2 < availableJobs.length) {
                              setVisibleNotices(
                                availableJobs.slice(index, index + 3),
                              );
                            } else {
                              const remaining = availableJobs.slice(index);
                              const additional = availableJobs.slice(
                                0,
                                3 - remaining.length,
                              );
                              setVisibleNotices([...remaining, ...additional]);
                            }
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentNoticeIndex
                              ? "bg-[#1F2E9A] w-6"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="p-6 border-t border-gray-100 bg-white z-20">
                  <button
                    onClick={() => {
                      document
                        .getElementById("available-positions")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group w-full bg-gradient-to-r from-[#E60023] to-[#B8001B] text-white px-6 py-3 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>View All Positions</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Available Recruitment Positions */}
      <section
        id="available-positions"
        className="py-16 bg-gradient-to-b from-white to-[#FAFAFF] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-4">
                <Briefcase className="w-5 h-5 text-[#9B3DFF]" />
                <span className="text-sm font-semibold text-[#1F2E9A]">
                  AVAILABLE POSITIONS
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#2430A3]">Featured Job</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF]">
                  Opportunities
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover exciting career opportunities with leading UK employers
              </p>
            </div>

            {/* Job Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableJobs.length > 0 ? (
                availableJobs.map((job) => {
                  const colors = getJobColor(job.category);
                  return (
                    <motion.div
                      key={job.id}
                      id={`position-${job.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Job Header */}
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {job.job_title}
                            </h3>
                            <p className="text-[#1F2E9A] font-semibold">
                              {job.category || "Technology"}
                            </p>
                          </div>
                          {job.urgent_hiring && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                              URGENT
                            </span>
                          )}
                        </div>

                        {/* Job Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              {job.location || "Remote"}
                            </span>
                            {job.remote_available && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Remote
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-medium">
                              {formatSalary(job)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              Posted {formatPostedDate(job.date)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">
                              Experience: {job.experience || "Not specified"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Job Requirements & Footer */}
                      <div className="p-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span
                            className={`px-3 py-1 ${colors.bgColor} ${colors.textColor} text-sm rounded-full`}
                          >
                            {job.category || "General"}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                            {job.job_type || "Full-time"}
                          </span>
                          {job.visa_sponsorship && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                              Visa Sponsorship
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {job.job_description || "No description available"}
                          </p>
                        </div>

                        {/* Apply Button */}
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="group w-full bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                          <span>Apply Now</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No Positions Available
                  </h3>
                  <p className="text-gray-500">
                    Check back later for new opportunities
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FAQComponent
            faqs={faqData} // You can fetch FAQs from another API if needed
            title="Recruitment Process FAQs"
            description="Get answers to common questions about our recruitment services and processes"
          />
        </div>
      </section>
    </div>
  );
};

export default Recruitment;
