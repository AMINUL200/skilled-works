import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Tag,
  Eye,
  MessageCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import FAQComponent from "../../component/common/FAQComponent";
import MagneticButton from "../../component/common/MagneticButtonProps";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  const blogData = [
    {
      id: 1,
      title: "The Future of HR Technology in UK Businesses",
      excerpt:
        "How AI and automation are transforming HR processes across UK industries with real-time analytics and predictive insights.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      category: "HR Tech",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "5 min read",
      views: "2.4k",
      comments: 42,
      tags: ["AI", "Automation", "HRMS", "UK"],
    },
    {
      id: 2,
      title: "Compliance Made Easy: UK Employment Law Updates 2024",
      excerpt:
        "Latest changes in UK employment legislation and how our HR platform ensures your business stays compliant automatically.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      category: "Compliance",
      author: "Michael Chen",
      date: "2024-03-12",
      readTime: "7 min read",
      views: "3.1k",
      comments: 38,
      tags: ["Compliance", "Law", "UK", "Updates"],
    },
    {
      id: 3,
      title: "Streamlining Recruitment with AI-Powered Screening",
      excerpt:
        "How intelligent algorithms are reducing hiring time by 60% while improving candidate quality for UK businesses.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      category: "Recruitment",
      author: "Emma Wilson",
      date: "2024-03-10",
      readTime: "6 min read",
      views: "4.2k",
      comments: 56,
      tags: ["AI", "Recruitment", "Screening", "Automation"],
    },
    {
      id: 4,
      title: "Cloud HR vs Traditional Systems: A Cost Analysis",
      excerpt:
        "Detailed breakdown of cost savings and efficiency gains when switching to cloud-based HR solutions in the UK market.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      category: "Technology",
      author: "David Roberts",
      date: "2024-03-08",
      readTime: "8 min read",
      views: "2.8k",
      comments: 29,
      tags: ["Cloud", "Cost", "Analysis", "SaaS"],
    },
    {
      id: 5,
      title: "Employee Engagement Strategies That Actually Work",
      excerpt:
        "Data-driven approaches to boost employee satisfaction and retention in post-pandemic UK workplaces.",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
      category: "Engagement",
      author: "Lisa Thompson",
      date: "2024-03-05",
      readTime: "4 min read",
      views: "5.6k",
      comments: 89,
      tags: ["Engagement", "Retention", "Strategy", "Wellbeing"],
    },
    {
      id: 6,
      title: "GDPR Compliance in HR: Best Practices for 2024",
      excerpt:
        "Essential GDPR guidelines for UK HR departments and how to implement them effectively using modern HR software.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Security",
      author: "James Miller",
      date: "2024-03-01",
      readTime: "9 min read",
      views: "3.9k",
      comments: 47,
      tags: ["GDPR", "Security", "Compliance", "Data"],
    },
    {
      id: 7,
      title: "The Rise of Remote Work: HR Challenges and Solutions",
      excerpt:
        "Managing distributed teams effectively with tools and policies designed for the modern UK workforce.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      category: "Remote Work",
      author: "Rachel Green",
      date: "2024-02-28",
      readTime: "6 min read",
      views: "6.2k",
      comments: 112,
      tags: ["Remote", "Hybrid", "Management", "Tools"],
    },
    {
      id: 8,
      title: "Payroll Automation: Saving Time and Reducing Errors",
      excerpt:
        "How automated payroll systems are transforming finance departments across UK organizations of all sizes.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      category: "Payroll",
      author: "Thomas Wright",
      date: "2024-02-25",
      readTime: "5 min read",
      views: "2.1k",
      comments: 31,
      tags: ["Payroll", "Automation", "Finance", "Accuracy"],
    },
    {
      id: 9,
      title: "Building a Diverse and Inclusive Workplace Culture",
      excerpt:
        "Practical steps and metrics for creating truly inclusive environments that drive innovation and growth.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      category: "Diversity",
      author: "Priya Sharma",
      date: "2024-02-22",
      readTime: "7 min read",
      views: "4.7k",
      comments: 67,
      tags: ["Diversity", "Inclusion", "Culture", "Innovation"],
    },
    {
      id: 10,
      title: "HR Analytics: Turning Data into Strategic Insights",
      excerpt:
        "Leveraging HR data to make informed decisions about talent management, retention, and organizational growth.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Analytics",
      author: "Alex Morgan",
      date: "2024-02-20",
      readTime: "8 min read",
      views: "3.4k",
      comments: 41,
      tags: ["Analytics", "Data", "Insights", "Strategy"],
    },
    {
      id: 11,
      title: "Onboarding Excellence: Creating Great First Impressions",
      excerpt:
        "Structured onboarding processes that boost productivity and retention from day one in UK companies.",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab234?w=800&q=80",
      category: "Onboarding",
      author: "Sophie Brown",
      date: "2024-02-18",
      readTime: "4 min read",
      views: "2.9k",
      comments: 28,
      tags: ["Onboarding", "Retention", "Productivity", "Process"],
    },
    {
      id: 12,
      title: "Future-Proofing Your HR Department",
      excerpt:
        "Skills and technologies HR professionals need to master for the evolving workplace landscape in the UK.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      category: "Future",
      author: "Robert King",
      date: "2024-02-15",
      readTime: "6 min read",
      views: "5.1k",
      comments: 73,
      tags: ["Future", "Skills", "Technology", "Trends"],
    },
  ];

  const categories = [
    { id: "all", label: "All Articles", icon: "📚" },
    { id: "hr-tech", label: "HR Tech", icon: "🤖" },
    { id: "compliance", label: "Compliance", icon: "⚖️" },
    { id: "recruitment", label: "Recruitment", icon: "👥" },
    { id: "engagement", label: "Engagement", icon: "❤️" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "remote-work", label: "Remote Work", icon: "🏠" },
  ];

  const faqData = [
    {
      id: 1,
      question: "How often do you publish new articles?",
      answer:
        "We publish 2-3 new articles weekly, covering the latest HR trends, compliance updates, and technology insights specifically for UK businesses.",
      category: "Content",
    },
    {
      id: 2,
      question: "Can I contribute as a guest writer?",
      answer:
        "Yes! We welcome contributions from HR professionals and industry experts. Please submit your article proposal through our contact form with your credentials and topic outline.",
      category: "Contribution",
    },
    {
      id: 3,
      question: "Are the articles specific to UK regulations?",
      answer:
        "Yes, all our content is tailored to UK employment law, GDPR regulations, and market-specific challenges. We work with UK-based HR experts to ensure accuracy and relevance.",
      category: "Relevance",
    },
    {
      id: 4,
      question: "How can I stay updated with new articles?",
      answer:
        "Subscribe to our newsletter for weekly roundups, follow us on LinkedIn, or enable notifications for our blog RSS feed to get instant updates on new publications.",
      category: "Updates",
    },
    {
      id: 5,
      question: "Can I use your articles for training purposes?",
      answer:
        "Yes, our articles can be used for internal training and educational purposes with proper attribution. Contact us for commercial usage or bulk licensing options.",
      category: "Usage",
    },
  ];

  // Filter and search blogs
  useEffect(() => {
    let filtered = [...blogData];

    // Apply category filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (blog) =>
          blog.category.toLowerCase().replace(/\s+/g, "-") === activeFilter,
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilter, searchTerm]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9B3DFF] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">HR Knowledge Hub</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] via-[#2EC5FF] to-[#E60023]">
                For UK Businesses
              </span>
            </h1>

            <p className="text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed mb-8">
              Expert insights, compliance updates, and technology trends to help
              you navigate the evolving HR landscape in the UK.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <TrendingUp className="w-4 h-4 text-[#9B3DFF]" />
                <span className="text-sm font-semibold">
                  Latest UK HR Trends
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <Calendar className="w-4 h-4 text-[#2EC5FF]" />
                <span className="text-sm font-semibold">Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E0FF]">
                <User className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-semibold">
                  Expert Contributors
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#1F2E9A]">
              Latest Articles ({filteredBlogs.length})
            </h3>
            <div className="text-sm text-[#666666]">
              Showing {indexOfFirstBlog + 1}-
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of{" "}
              {filteredBlogs.length}
            </div>
          </div>

          {currentBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold text-[#1F2E9A] mb-2">
                No articles found
              </h4>
              <p className="text-[#666666]">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-[400px]"
                >
                  {/* IMAGE */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${blog.image})` }}
                  >
                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143cbf] to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465affbf]" />
                  </div>

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md z-20 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1F2E9A]" />
                    <span className="text-sm font-semibold text-[#1F2E9A]">
                      {blog.category}
                    </span>
                  </div>

                  {/* CENTER HOVER ICON */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div
                    onClick={()=>navigate(`/blog/${blog.id}`)}
                     className="w-16 h-16 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl">
                      <ArrowRight className="w-6 h-6 text-[#1F2E9A] group-hover:-rotate-40 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-white/90 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="bg-white rounded-full border border-[#F2EEFF] shadow-lg p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#1F2E9A] hover:bg-gradient-to-r hover:from-[#F2EEFF] hover:to-[#E6F7FF] hover:-translate-y-1"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          currentPage === pageNumber
                            ? "bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white shadow-lg"
                            : "text-[#555] hover:bg-gradient-to-r hover:from-[#F2EEFF] hover:to-[#E6F7FF] hover:-translate-y-1"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#1F2E9A] hover:bg-gradient-to-r hover:from-[#F2EEFF] hover:to-[#E6F7FF] hover:-translate-y-1"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAFAFF]">
        <div className="container mx-auto px-8">
          <FAQComponent
            faqs={faqData}
            title="Blog Questions Answered"
            description="Find answers to common questions about our blog content, contributions, and updates."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-3xl p-8 border border-[#E6E0FF] text-center">
            <h3 className="text-2xl font-bold text-[#1F2E9A] mb-4">
              Want to Contribute?
            </h3>
            <p className="text-lg text-[#666666] mb-8 max-w-xl mx-auto">
              Are you an HR expert with insights to share? We're always looking
              for industry professionals to contribute to our blog.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                variant="square"
                className="group bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Become a Contributor</span>
                <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton
                variant="square"
                className="group border-2 border-[#1F2E9A] text-[#1F2E9A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1F2E9A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>View Submission Guidelines</span>
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
