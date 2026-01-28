import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import MagneticButton from "../../component/common/MagneticButtonProps";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(156);

  // Sample blog data - in real app, this would come from API/state
  const blog = {
    id: 1,
    title: "The Future of HR Technology in UK Businesses: A 2024 Perspective",
    excerpt:
      "How AI and automation are transforming HR processes across UK industries with real-time analytics and predictive insights.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    category: "HR Tech",
    author: {
      name: "Sarah Johnson",
      role: "HR Technology Expert",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
    },
    date: "March 15, 2024",
    readTime: "5 min read",
    views: "2.4k",
    comments: 42,
    tags: [
      "AI",
      "Automation",
      "HRMS",
      "UK Business",
      "Digital Transformation",
      "HR Analytics",
    ],
    content: `
      <h2>The Evolution of HR Technology in the UK</h2>
      <p>The landscape of Human Resources in the United Kingdom has undergone a remarkable transformation over the past decade. From traditional paper-based systems to sophisticated cloud-based platforms, the journey has been nothing short of revolutionary.</p>
      
      <p>In 2024, we're witnessing an unprecedented acceleration in HR technology adoption, driven by several key factors:</p>
      
      <ul>
        <li><strong>Remote Work Revolution:</strong> The pandemic-induced shift to remote work has made digital HR tools essential for business continuity.</li>
        <li><strong>Data-Driven Decision Making:</strong> Organizations now demand real-time insights into workforce analytics.</li>
        <li><strong>Compliance Complexity:</strong> With evolving UK employment laws, automated compliance has become non-negotiable.</li>
        <li><strong>Employee Experience Focus:</strong> Modern employees expect seamless digital experiences from onboarding to retirement.</li>
      </ul>
      
      <h3>AI-Powered Recruitment: Beyond Basic Automation</h3>
      
      <p>Artificial Intelligence has moved beyond simple automation to become an intelligent partner in the recruitment process. UK companies are leveraging AI for:</p>
      
      <div class="highlight-box">
        <h4>Key AI Applications in UK HR:</h4>
        <ul>
          <li><strong>Predictive Candidate Matching:</strong> Algorithms that analyze thousands of data points to identify ideal candidates</li>
          <li><strong>Automated Interview Scheduling:</strong> Intelligent systems that coordinate across time zones and calendars</li>
          <li><strong>Bias Reduction:</strong> AI tools designed to eliminate unconscious bias in hiring</li>
          <li><strong>Skill Gap Analysis:</strong> Predictive analytics identifying future skill requirements</li>
        </ul>
      </div>
      
      <p>According to recent studies, UK companies using AI-powered recruitment have reduced hiring time by an average of <strong>60%</strong> while improving candidate quality by <strong>45%</strong>.</p>
      
      <h3>Cloud-Based HRMS: The New Standard</h3>
      
      <p>The shift to cloud-based Human Resource Management Systems (HRMS) has become the standard across UK organizations of all sizes. The benefits are compelling:</p>
      
      <blockquote>
        <p>"Cloud HR platforms aren't just about cost savings anymore. They're strategic tools that provide unprecedented agility and insight into workforce management. For UK businesses navigating post-Brexit regulations and hybrid work models, these platforms have become essential."</p>
        <cite>— Michael Chen, HR Technology Analyst</cite>
      </blockquote>
      
      <h3>Data Security and GDPR Compliance</h3>
      
      <p>With stringent GDPR regulations in place, UK HR departments face unique challenges in data management. Modern HR technology addresses these concerns through:</p>
      
      <ul>
        <li><strong>UK-Based Data Centers:</strong> Ensuring data sovereignty and compliance</li>
        <li><strong>Automated Compliance Audits:</strong> Real-time monitoring of data handling practices</li>
        <li><strong>Employee Consent Management:</strong> Streamlined processes for data privacy compliance</li>
        <li><strong>Breach Detection Systems:</strong> AI-powered monitoring for potential data security issues</li>
      </ul>
      
      <h3>The Future: Predictive Analytics and Employee Wellbeing</h3>
      
      <p>Looking ahead, we see several emerging trends that will shape HR technology in the UK:</p>
      
      <table>
        <thead>
          <tr>
            <th>Technology</th>
            <th>Impact</th>
            <th>Adoption Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Predictive Turnover Analysis</td>
            <td>Reduce employee attrition by 40%</td>
            <td>2024-2025</td>
          </tr>
          <tr>
            <td>AI-Powered Wellbeing Platforms</td>
            <td>Improve employee satisfaction by 35%</td>
            <td>2024</td>
          </tr>
          <tr>
            <td>Blockchain for Credential Verification</td>
            <td>Reduce hiring fraud by 90%</td>
            <td>2025-2026</td>
          </tr>
          <tr>
            <td>Virtual Reality Onboarding</td>
            <td>Improve new hire retention by 25%</td>
            <td>2024</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Conclusion: Embracing the Digital HR Revolution</h3>
      
      <p>The transformation of HR technology in the UK is not just about adopting new tools—it's about fundamentally reimagining how we manage and engage with our most valuable asset: people. As we move through 2024, UK businesses that embrace these technological advancements will find themselves better positioned to attract, retain, and develop talent in an increasingly competitive market.</p>
      
      <p>The key to success lies in strategic implementation, focusing on solutions that address specific UK business challenges while maintaining the human touch that defines effective HR management.</p>
    `,
  };

  const relatedArticles = [
    {
      id: 2,
      title: "GDPR Compliance in HR: Best Practices for 2024",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-400&q=80",
      category: "Compliance",
      date: "March 1, 2024",
      readTime: "9 min read",
    },
    {
      id: 3,
      title: "Streamlining Recruitment with AI-Powered Screening",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80",
      category: "Recruitment",
      date: "March 10, 2024",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Cloud HR vs Traditional Systems: A Cost Analysis",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      category: "Technology",
      date: "March 8, 2024",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Employee Engagement Strategies That Actually Work",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80",
      category: "Engagement",
      date: "March 5, 2024",
      readTime: "4 min read",
    },
  ];

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
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      label: "Twitter",
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      color: "hover:bg-[#EA4335] hover:text-white",
    },
    {
      icon: <Printer className="w-4 h-4" />,
      label: "Print",
      color: "hover:bg-[#4285F4] hover:text-white",
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      label: "Copy Link",
      color: "hover:bg-[#34A853] hover:text-white",
    },
  ];

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
            {/* Blog Header */}
          

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
                      onClick={() => {
                        if (option.label === "Copy Link") {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      }}
                    >
                      {option.icon}
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-2xl border border-[#E6E0FF]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#1F2E9A] to-[#2430A3] flex-shrink-0">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F2E9A] mb-2">
                    {blog.author.name}
                  </h3>
                  <p className="text-[#666666] mb-3">{blog.author.role}</p>
                  <p className="text-[#666666]">
                    Sarah is a leading HR technology expert with over 15 years
                    of experience helping UK businesses implement digital
                    transformation strategies. She specializes in AI adoption
                    and compliance automation for HR departments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Related Articles */}
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
                      to={`/blog/${article.id}`}
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
          </div>
        </div>

       
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
