import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Tag,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import FAQComponent from "../../component/common/FAQComponent";
import MagneticButton from "../../component/common/MagneticButtonProps";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/app";
import PageLoader from "../../component/common/PageLoader";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const blogsPerPage = 6;
  const navigate = useNavigate();
  
  // Get storage URL from environment
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Fetch blogs and FAQs from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/blogs'); // Adjust the endpoint as needed
        
        if (response.data.status && response.data.data) {
          // Transform blogs data
          const transformedBlogs = response.data.data.blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            excerpt: blog.short_desc.replace(/<[^>]*>/g, '').substring(0, 150) + '...', // Strip HTML and truncate
            image: `${STORAGE_URL}${blog.web_image}`, // Use web_image_url if available
            author: "Skilled Workers Cloud", // Default author
            date: new Date(blog.created_at).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            readTime: calculateReadTime(blog.long_desc),
            title_slug: blog.title_slug,
            short_desc: blog.short_desc,
            long_desc: blog.long_desc,
          }));
          
          setBlogs(transformedBlogs);

          // Transform FAQs data
          if (response.data.data.faq && response.data.data.faq.length > 0) {
            const transformedFaqs = response.data.data.faq.map((faq, index) => ({
              id: faq.id || index + 1,
              question: faq.faq_question,
              answer: faq.faq_answer,
              category: faq.faq_type || "General",
            }));
            setFaqs(transformedFaqs);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to calculate read time based on content length
  const calculateReadTime = (content) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${Math.max(1, readTime)} min read`;
  };

  // Filter and search blogs
  useEffect(() => {
    if (blogs.length > 0) {
      let filtered = [...blogs];

      // Apply search filter only
      if (searchTerm) {
        filtered = filtered.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredBlogs(filtered);
      setCurrentPage(1); // Reset to first page when search changes
    }
  }, [searchTerm, blogs]);

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

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-[#1F2E9A] mb-2">Error</h3>
          <p className="text-[#666666]">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#1F2E9A] text-white rounded-lg hover:bg-[#2430A3] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-full border border-[#E6E0FF] focus:outline-none focus:ring-2 focus:ring-[#1F2E9A] focus:border-transparent shadow-lg"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#666666] w-5 h-5" />
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
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0}-
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
                Try adjusting your search terms
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

                  {/* CENTER HOVER ICON */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div
                      onClick={() => navigate(`/blog/${blog.title_slug}`)}
                      className="w-16 h-16 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl"
                    >
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
            faqs={faqs.length > 0 ? faqs : [
              // Fallback FAQs in case API returns empty
              {
                id: 1,
                question: "How often do you publish new articles?",
                answer: "We publish 2-3 new articles weekly, covering the latest HR trends, compliance updates, and technology insights specifically for UK businesses.",
                category: "Content",
              },
              {
                id: 2,
                question: "Can I contribute as a guest writer?",
                answer: "Yes! We welcome contributions from HR professionals and industry experts. Please submit your article proposal through our contact form with your credentials and topic outline.",
                category: "Contribution",
              },
              {
                id: 3,
                question: "Are the articles specific to UK regulations?",
                answer: "Yes, all our content is tailored to UK employment law, GDPR regulations, and market-specific challenges. We work with UK-based HR experts to ensure accuracy and relevance.",
                category: "Relevance",
              },
              {
                id: 4,
                question: "How can I stay updated with new articles?",
                answer: "Subscribe to our newsletter for weekly roundups, follow us on LinkedIn, or enable notifications for our blog RSS feed to get instant updates on new publications.",
                category: "Updates",
              },
              {
                id: 5,
                question: "Can I use your articles for training purposes?",
                answer: "Yes, our articles can be used for internal training and educational purposes with proper attribution. Contact us for commercial usage or bulk licensing options.",
                category: "Usage",
              },
            ]}
            title="Blog Questions Answered"
            description="Find answers to common questions about our blog content, contributions, and updates."
          />
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-12">
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
      </section> */}
    </div>
  );
};

export default BlogPage;