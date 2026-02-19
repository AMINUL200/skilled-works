import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const RecruitmentHero = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [visibleNotices, setVisibleNotices] = useState([]);
  const navigate = useNavigate();
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


  return (
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
                  At Skilled Workers Cloud Recruitment platform, we're committed
                  to revolutionizing the way job seekers and employers connect.
                  Whether you're a seasoned professional looking for your next
                  career move or an employer seeking top talent, our platform
                  provides the tools and resources you need to succeed.
                </p>

                <p className="text-lg text-[#666666] leading-relaxed">
                  The global labour market is undergoing significant
                  transformations as a result of various local and international
                  influences, such as regulations, population demographics,
                  technological advancements, workforce mobility, and other
                  factors. As a consequence, employers are facing growing
                  challenges in locating and securing candidates equipped with
                  the essential skills required for the job.
                </p>

                <p className="text-lg text-[#666666] leading-relaxed">
                  Recruitment refers to the process of identifying, attracting,
                  evaluating, and hiring individuals to fill job vacancies
                  within an organization. It is a crucial function of human
                  resource management aimed at ensuring that the organization
                  has the right talent in the right positions to achieve its
                  goals effectively. The Recruitment process typically involves
                  several stages:
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
                    agencies, and networking events locally and internationally.
                  </li>
                  <li>
                    <strong>Screening and Shortlisting:</strong> Once potential
                    candidates are identified, they are screened against the job
                    requirements to determine if they meet the basic
                    qualifications. Qualified candidates are then shortlisted
                    for further evaluation.
                  </li>
                  <li>
                    <strong>Evaluation & Selection:</strong> This stage involves
                    conducting interviews, assessments, and other evaluations to
                    assess the candidates' skills, experience, and cultural fit
                    with the organization. The most suitable candidate(s) are
                    selected for the position(s).
                  </li>
                  <li>
                    <strong>Offer and Negotiation:</strong> An offer is extended
                    to the selected candidate, which includes details such as
                    salary, benefits, and start date. Negotiations may take
                    place regarding terms and conditions of employment.
                  </li>
                  <li>
                    <strong>Onboarding:</strong> Once the offer is accepted, the
                    new employee goes through the onboarding process, which
                    involves orientation, training, and integration into the
                    organization.
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
  );
};

export default RecruitmentHero;
