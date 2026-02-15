import React, { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Clock,
  Eye,
  MessageCircle,
  Tag,
  Share2,
  Bookmark,
  Heart,
  ChevronRight,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Printer,
  Mail,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MagneticButton from "../../component/common/MagneticButtonProps";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";
import FAQComponent from "../../component/common/FAQComponent";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [blog, setBlog] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get storage URL from environment
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Fetch blog from API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Use slug to fetch specific blog
        const response = await api.get(`/blogs/${slug}`); // Adjust endpoint as needed

        if (response.data.status && response.data.data) {
          const blogData = response.data.data;

          // Transform API data to match component structure
          const transformedBlog = {
            id: blogData.id,
            title: blogData.title,
            excerpt:
              blogData.short_desc.replace(/<[^>]*>/g, "").substring(0, 200) +
              "...",
            image: `${STORAGE_URL}${blogData.web_image}`,
            category: extractCategory(blogData.title),
            author: {
              name: "Skilled Workers Cloud",
              role: "HR Technology Expert",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80", // Default avatar
            },
            date: new Date(blogData.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            readTime: calculateReadTime(blogData.long_desc),
            views: "0", // Default value
            comments: 0, // Default value
            tags: extractTags(blogData.title),
            content: blogData.long_desc, // Use long_desc as main content
          };

          setBlog(transformedBlog);

          // Transform related blogs
          if (blogData.related_blog && blogData.related_blog.length > 0) {
            const transformedRelated = blogData.related_blog.map((related) => ({
              id: related.id,
              title: related.title,
              image: `${STORAGE_URL}${related.web_image}`,
              category: extractCategory(related.title),
              date: new Date(related.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              readTime: calculateReadTime(related.long_desc),
              title_slug: related.title_slug,
            }));
            setRelatedArticles(transformedRelated);
          }

          // Transform FAQs
          if (blogData.faq && blogData.faq.length > 0) {
            const transformedFaqs = blogData.faq.map((faq, index) => ({
              id: faq.id || index + 1,
              question: faq.faq_question,
              answer: faq.faq_answer,
              category: faq.faq_type || "General",
            }));
            setFaqs(transformedFaqs);
          }
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Helper function to extract category from title
  const extractCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("hr") || titleLower.includes("human resource"))
      return "HR Tech";
    if (titleLower.includes("attendance")) return "HR Tech";
    if (titleLower.includes("smart")) return "Technology";
    if (titleLower.includes("compliance")) return "Compliance";
    if (titleLower.includes("recruitment")) return "Recruitment";
    if (titleLower.includes("engagement")) return "Engagement";
    if (titleLower.includes("remote")) return "Remote Work";
    if (titleLower.includes("analytics")) return "Analytics";
    if (titleLower.includes("diversity")) return "Diversity";
    if (titleLower.includes("payroll")) return "Payroll";
    if (titleLower.includes("onboarding")) return "Onboarding";
    if (titleLower.includes("future")) return "Future";
    if (titleLower.includes("security") || titleLower.includes("gdpr"))
      return "Security";
    return "HR Tech";
  };

  // Helper function to calculate read time
  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${Math.max(1, readTime)} min read`;
  };

  // Helper function to extract tags from title
  const extractTags = (title) => {
    const words = title.split(" ");
    return words.slice(0, 5).map((word) => word.replace(/[^a-zA-Z]/g, ""));
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const shareOptions = [
    {
      icon: <Facebook className="w-4 h-4" />,
      label: "Facebook",
      color: "hover:bg-[#1877F2] hover:text-white",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          "_blank",
        ),
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter",
      color: "hover:bg-[#1DA1F2] hover:text-white",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog?.title || "")}`,
          "_blank",
        ),
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2] hover:text-white",
      action: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
          "_blank",
        ),
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      color: "hover:bg-[#EA4335] hover:text-white",
      action: () =>
        (window.location.href = `mailto:?subject=${encodeURIComponent(blog?.title || "")}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`),
    },
    {
      icon: <Printer className="w-4 h-4" />,
      label: "Print",
      color: "hover:bg-[#4285F4] hover:text-white",
      action: () => window.print(),
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      label: "Copy Link",
      color: "hover:bg-[#34A853] hover:text-white",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      },
    },
  ];

  if (loading) {
    return <PageLoader />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-[#1F2E9A] mb-2">Error</h3>
          <p className="text-[#666666]">{error || "Blog not found"}</p>
          <button
            onClick={() => navigate("/blog")}
            className="mt-4 px-6 py-2 bg-[#1F2E9A] text-white rounded-lg hover:bg-[#2430A3] transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-50">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#F2EEFF]">
        <div className="container mx-auto px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1F2E9A] hover:text-[#9B3DFF] transition-colors duration-300 font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        {/* BLOG HEADER */}
        <div className="mb-12 max-w-5xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#9B3DFF] font-semibold rounded-full text-sm">
              {blog.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1F2E9A] mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg text-[#666666] max-w-3xl mx-auto mb-6">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#666666]">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {blog.views}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {blog.comments}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Tags Section */}
            <div className="mt-12 pt-8 border-t border-[#F2EEFF]">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-[#9B3DFF]" />
                <h3 className="text-lg font-bold text-[#1F2E9A]">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="px-4 py-2 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#1F2E9A] rounded-full font-medium hover:from-[#1F2E9A] hover:to-[#2430A3] hover:text-white transition-all duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-2xl border border-[#E6E0FF]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1F2E9A] mb-2 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-[#9B3DFF]" />
                    Share this article
                  </h3>
                  <p className="text-[#666666]">
                    Help others discover this valuable content
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E6E0FF] text-[#666666] ${option.color} transition-all duration-300`}
                      onClick={option.action}
                    >
                      {option.icon}
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#F2EEFF] shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] p-6 text-white">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    Related Articles
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {relatedArticles.map((article) => (
                      <Link
                        key={article.id}
                        to={`/blog/${article.title_slug || article.id}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <span className="text-xs font-semibold px-2 py-1 bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#9B3DFF] rounded-full mb-2 inline-block">
                              {article.category}
                            </span>
                            <h4 className="font-bold text-[#1F2E9A] group-hover:text-[#9B3DFF] transition-colors duration-300 mb-2 line-clamp-2">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-[#666666]">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ FULL WIDTH BOTTOM */}
        {faqs.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <FAQComponent
              faqs={faqs}
              title={`Frequently Asked Questions about ${blog.title}`}
              description="Find answers to common questions about this topic."
            />
          </div>
        )}
      </div>

      {/* Custom CSS for blog content */}
      <style jsx>{`
        .blog-content {
          line-height: 1.8;
          color: #444444;
          font-size: 1.125rem;
        }

        .blog-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2e9a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2e9a;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2430a3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .blog-content li strong {
          color: #1f2e9a;
        }

        .blog-content .highlight-box {
          background: linear-gradient(to right, #f2eeff, #e6f7ff);
          border-left: 4px solid #9b3dff;
          padding: 1.5rem;
          border-radius: 0 12px 12px 0;
          margin: 2rem 0;
        }

        .blog-content .highlight-box h4 {
          color: #9b3dff;
          margin-top: 0;
        }

        .blog-content blockquote {
          border-left: 4px solid #2ec5ff;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #666666;
        }

        .blog-content blockquote cite {
          display: block;
          margin-top: 0.5rem;
          font-style: normal;
          color: #1f2e9a;
          font-weight: 600;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .blog-content table thead {
          background: linear-gradient(to right, #1f2e9a, #2430a3);
          color: white;
        }

        .blog-content table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
        }

        .blog-content table tbody tr:nth-child(even) {
          background: #fafaff;
        }

        .blog-content table td {
          padding: 1rem;
          border-bottom: 1px solid #f2eeff;
        }

        .blog-content strong {
          color: #1f2e9a;
        }

        .blog-content a {
          color: #9b3dff;
          text-decoration: none;
          font-weight: 600;
        }

        .blog-content a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .blog-content h2 {
            font-size: 1.75rem;
          }

          .blog-content h3 {
            font-size: 1.375rem;
          }

          .blog-content {
            font-size: 1.0625rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
