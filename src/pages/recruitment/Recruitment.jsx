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

const Recruitment = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [visibleNotices, setVisibleNotices] = useState([]);
  const navigate = useNavigate();

  // Recruitment notices for vertical scrolling effect
  const recruitmentNotices = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechVision Ltd",
      location: "London, UK",
      salary: "£70,000 - £90,000",
      posted: "2 days ago",
      type: "Full-time",
      icon: <Building className="w-5 h-5" />,
      color: "bg-gradient-to-r from-blue-100 to-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      title: "HR Business Partner",
      company: "Global Solutions Inc",
      location: "Manchester, UK",
      salary: "£55,000 - £75,000",
      posted: "1 week ago",
      type: "Full-time",
      icon: <Users className="w-5 h-5" />,
      color: "bg-gradient-to-r from-green-100 to-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      salary: "£400 - £550/day",
      posted: "3 days ago",
      type: "Contract",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-gradient-to-r from-purple-100 to-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "Digital Growth Agency",
      location: "Birmingham, UK",
      salary: "£45,000 - £60,000",
      posted: "2 weeks ago",
      type: "Full-time",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-gradient-to-r from-orange-100 to-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Edinburgh, UK",
      salary: "£65,000 - £85,000",
      posted: "5 days ago",
      type: "Full-time",
      icon: <Target className="w-5 h-5" />,
      color: "bg-gradient-to-r from-red-100 to-red-50",
      borderColor: "border-red-200",
    },
    {
      id: 6,
      title: "Finance Controller",
      company: "Financial Leaders Group",
      location: "London, UK",
      salary: "£80,000 - £100,000",
      posted: "1 week ago",
      type: "Permanent",
      icon: <Award className="w-5 h-5" />,
      color: "bg-gradient-to-r from-indigo-100 to-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  // Available recruitment positions (same as notices but with more details)
  const availablePositions = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechVision Ltd",
      location: "London, UK",
      type: "Full-time",
      salary: "£70,000 - £90,000",
      posted: "2 days ago",
      category: "Technology",
      requirements: ["5+ years experience", "React/Node.js", "AWS/Azure"],
      visaSponsorship: true,
      remote: true,
      urgent: true,
      description:
        "Looking for an experienced software engineer to lead development of our cloud-based HR platform.",
    },
    {
      id: 2,
      title: "HR Business Partner",
      company: "Global Solutions Inc",
      location: "Manchester, UK",
      type: "Full-time",
      salary: "£55,000 - £75,000",
      posted: "1 week ago",
      category: "Human Resources",
      requirements: [
        "3+ years HR experience",
        "CIPD Level 7",
        "UK employment law",
      ],
      visaSponsorship: true,
      remote: false,
      urgent: false,
      description:
        "Strategic HR partner role supporting business units in talent management and employee relations.",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Remote",
      type: "Contract",
      salary: "£400 - £550/day",
      posted: "3 days ago",
      category: "Technology",
      requirements: ["Docker/Kubernetes", "Terraform", "CI/CD pipelines"],
      visaSponsorship: false,
      remote: true,
      urgent: true,
      description:
        "Contract role for DevOps engineer to implement and maintain cloud infrastructure.",
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "Digital Growth Agency",
      location: "Birmingham, UK",
      type: "Full-time",
      salary: "£45,000 - £60,000",
      posted: "2 weeks ago",
      category: "Marketing",
      requirements: [
        "Digital marketing",
        "Team management",
        "Campaign strategy",
      ],
      visaSponsorship: true,
      remote: true,
      urgent: false,
      description:
        "Lead marketing initiatives and drive brand growth for digital agency.",
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Edinburgh, UK",
      type: "Full-time",
      salary: "£65,000 - £85,000",
      posted: "5 days ago",
      category: "Data & Analytics",
      requirements: ["Python/R", "Machine Learning", "SQL"],
      visaSponsorship: true,
      remote: true,
      urgent: true,
      description:
        "Join our data science team to develop predictive models and analytics solutions.",
    },
    {
      id: 6,
      title: "Finance Controller",
      company: "Financial Leaders Group",
      location: "London, UK",
      type: "Permanent",
      salary: "£80,000 - £100,000",
      posted: "1 week ago",
      category: "Finance",
      requirements: [
        "ACCA/ACA qualified",
        "10+ years experience",
        "Team leadership",
      ],
      visaSponsorship: false,
      remote: false,
      urgent: false,
      description:
        "Senior finance role overseeing accounting operations and financial reporting.",
    },
  ];

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: "How does the recruitment process work?",
      answer:
        "Our recruitment process involves 6 key stages: 1) Requirement analysis and job description creation, 2) Candidate sourcing through multiple channels, 3) Initial screening and shortlisting, 4) Technical assessments and interviews, 5) Reference checks and offer negotiation, 6) Onboarding support and follow-up.",
      category: "Process",
    },
    {
      id: 2,
      question: "Do you provide visa sponsorship for international candidates?",
      answer:
        "Yes, we work with numerous UK employers who offer skilled worker visa sponsorship for qualified candidates. Our team provides end-to-end support with visa applications, documentation, and compliance requirements to ensure a smooth transition to the UK.",
      category: "Visa",
    },
    {
      id: 3,
      question: "What industries and roles do you specialize in?",
      answer:
        "We specialize in technology, healthcare, engineering, finance, and professional services sectors. Key roles include software development, data science, project management, nursing, engineering, accounting, and senior management positions.",
      category: "Specialization",
    },
    {
      id: 4,
      question: "How long does the recruitment process typically take?",
      answer:
        "For most positions, the process takes 2-4 weeks from initial application to job offer. For senior roles or positions requiring visa sponsorship, it may take 4-8 weeks. We provide regular updates and maintain transparent communication throughout the process.",
      category: "Timeline",
    },
    {
      id: 5,
      question: "What support do you provide after job placement?",
      answer:
        "We offer comprehensive post-placement support including relocation assistance, accommodation guidance, cultural orientation, and ongoing career development advice. We also provide a 3-month follow-up period to ensure both candidate and employer satisfaction.",
      category: "Support",
    },
  ];

  // Initialize visible notices
  useEffect(() => {
    setVisibleNotices(recruitmentNotices.slice(0, 3));
  }, []);

  // Animate notices (auto-scroll every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => {
        const nextIndex = (prev + 1) % recruitmentNotices.length;

        // Update visible notices for smooth transition
        if (nextIndex + 2 < recruitmentNotices.length) {
          setVisibleNotices(recruitmentNotices.slice(nextIndex, nextIndex + 3));
        } else {
          const remaining = recruitmentNotices.slice(nextIndex);
          const additional = recruitmentNotices.slice(0, 3 - remaining.length);
          setVisibleNotices([...remaining, ...additional]);
        }

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [recruitmentNotices]);

  const handleNoticeClick = (id) => {
    console.log("click");
    
    navigate(`/recruitment/apply/${id}`);
  };

  const handleApplyClick = (positionId) => {
    // Navigate to application page or open modal
    navigate(`/recruitment/apply/${positionId}`);
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
                    RECRUITMENT PLATFORM
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-[#2430A3]">
                    Welcome to Skilled Workers Cloud
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                    Recruitment Platform
                  </span>
                </h1>

                <p className="text-xl text-[#444444] leading-relaxed">
                  Connecting Talent with Opportunity
                </p>

                <div className="space-y-6">
                  <p className="text-lg text-[#666666] leading-relaxed">
                    At Skilled Workers Cloud Recruitment platform, we're
                    committed to revolutionizing the way job seekers and
                    employers connect. Whether you're a seasoned professional
                    looking for your next career move or an employer seeking top
                    talent, our platform provides the tools and resources you
                    need to succeed.
                  </p>

                  <p className="text-lg text-[#666666] leading-relaxed">
                    The global labour market is undergoing significant
                    transformations as a result of various local and
                    international influences, such as regulations, population
                    demographics, technological advancements, workforce
                    mobility, and other factors. As a consequence, employers are
                    facing growing challenges in locating and securing
                    candidates equipped with the essential skills required for
                    the job.
                  </p>

                  <p className="text-lg text-[#666666] leading-relaxed">
                    Recruitment refers to the process of identifying,
                    attracting, evaluating, and hiring individuals to fill job
                    vacancies within an organization. It is a crucial function
                    of human resource management aimed at ensuring that the
                    organization has the right talent in the right positions to
                    achieve its goals effectively. The Recruitment process
                    typically involves several stages:
                  </p>

                  <ul className="space-y-4 text-[#666666] list-disc pl-6">
                    <li>
                      <strong>Identifying the Need:</strong> This involves
                      determining the need for a new employee or employees based
                      on organisational goals, growth or turnover.
                    </li>
                    <li>
                      <strong>Job Analysis and Description:</strong> This step
                      involves defining the responsibilities, requirements, and
                      qualifications for the position(s) to be filled. A job
                      description is created to communicate these details to
                      potential candidates.
                    </li>
                    <li>
                      <strong>Sourcing:</strong> Sourcing involves searching for
                      potential candidates through various channels such as job
                      boards, social media, employee referrals, recruitment
                      agencies, and networking events locally and
                      internationally.
                    </li>
                    <li>
                      <strong>Screening and Shortlisting:</strong> Once
                      potential candidates are identified, they are screened
                      against the job requirements to determine if they meet the
                      basic qualifications. Qualified candidates are then
                      shortlisted for further evaluation.
                    </li>
                    <li>
                      <strong>Evaluation & Selection:</strong> This stage
                      involves conducting interviews, assessments, and other
                      evaluations to assess the candidates' skills, experience,
                      and cultural fit with the organization. The most suitable
                      candidate(s) are selected for the position(s).
                    </li>
                    <li>
                      <strong>Offer and Negotiation:</strong> An offer is
                      extended to the selected candidate, which includes details
                      such as salary, benefits, and start date. Negotiations may
                      take place regarding terms and conditions of employment.
                    </li>
                    <li>
                      <strong>Onboarding:</strong> Once the offer is accepted,
                      the new employee goes through the onboarding process,
                      which involves orientation, training, and integration into
                      the organization.
                    </li>
                  </ul>
                </div>
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
                    {visibleNotices.map((notice, index) => (
                      <motion.div
                        key={notice.id}
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
                        className={`absolute left-0 right-0 p-4 rounded-xl border-2 ${notice.borderColor} ${notice.color} transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
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
                        onClick={() => handleNoticeClick(notice.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {notice.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900 text-lg">
                                {notice.title}test
                              </h4>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {notice.type}
                              </span>
                            </div>
                            <p className="text-[#1F2E9A] font-semibold text-sm mb-2">
                              {notice.company}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {notice.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {notice.salary}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              Posted {notice.posted}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-80 pt-4 border-t border-gray-100">
                    {recruitmentNotices.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentNoticeIndex(index);
                          if (index + 2 < recruitmentNotices.length) {
                            setVisibleNotices(
                              recruitmentNotices.slice(index, index + 3),
                            );
                          } else {
                            const remaining = recruitmentNotices.slice(index);
                            const additional = recruitmentNotices.slice(
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
              {availablePositions.map((position) => (
                <motion.div
                  key={position.id}
                  id={`position-${position.id}`}
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
                          {position.title}
                        </h3>
                        <p className="text-[#1F2E9A] font-semibold">
                          {position.company}
                        </p>
                      </div>
                      {position.urgent && (
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
                          {position.location}
                        </span>
                        {position.remote && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">
                          {position.salary}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          Posted {position.posted}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Job Requirements & Footer */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {position.category}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        {position.type}
                      </span>
                      {position.visaSponsorship && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          Visa Sponsorship
                        </span>
                      )}
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {position.description}
                      </p>
                    </div>

                    {/* Apply Button */}
                    <button
                      onClick={() => handleApplyClick(position.id)}
                      className="group w-full bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3"
                    >
                      <span>Apply Now</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FAQComponent
            faqs={faqData}
            title="Recruitment Process FAQs"
            description="Get answers to common questions about our recruitment services and processes"
          />
        </div>
      </section>
    </div>
  );
};

export default Recruitment;
