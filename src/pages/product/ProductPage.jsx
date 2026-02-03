import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  ArrowRight,
  Calendar,
  Clock,
  Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = [
    {
      id: 1,
      title: "SponicHR Cloud Platform",
      excerpt: "Comprehensive cloud-based HRMS solution with end-to-end automation for modern businesses",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      category: "Core Platform",
      price: "£99/user/month",
      rating: 4.9,
      users: "500+",
      launchDate: "2021",
      views: "5.2k",
      tags: ["Cloud", "HRMS", "Automation", "UK"],
      gradient: "from-[#1F2E9A] to-[#2430A3]"
    },
    {
      id: 2,
      title: "Recruitment Pro Suite",
      excerpt: "AI-powered recruitment platform with smart candidate matching and automated screening",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      category: "Recruitment",
      price: "£149/user/month",
      rating: 4.8,
      users: "350+",
      launchDate: "2022",
      views: "4.7k",
      tags: ["AI", "Recruitment", "Screening", "Automation"],
      gradient: "from-[#E60023] to-[#FF1F1F]"
    },
    {
      id: 3,
      title: "Compliance Guardian",
      excerpt: "Automated compliance management system for UK employment laws and GDPR regulations",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      category: "Compliance",
      price: "£79/user/month",
      rating: 4.7,
      users: "420+",
      launchDate: "2021",
      views: "3.9k",
      tags: ["GDPR", "Compliance", "Law", "Security"],
      gradient: "from-[#2EC5FF] to-[#9B5CFF]"
    },
    {
      id: 4,
      title: "Performance Accelerator",
      excerpt: "360-degree performance management with continuous feedback and goal tracking",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
      category: "Performance",
      price: "£89/user/month",
      rating: 4.6,
      users: "380+",
      launchDate: "2022",
      views: "4.2k",
      tags: ["Performance", "Feedback", "Goals", "Analytics"],
      gradient: "from-[#FF4D8D] to-[#FF9F1C]"
    },
    {
      id: 5,
      title: "Analytics Intelligence",
      excerpt: "Advanced HR analytics with predictive insights and real-time dashboards",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Analytics",
      price: "£129/user/month",
      rating: 4.9,
      users: "290+",
      launchDate: "2023",
      views: "3.4k",
      tags: ["Analytics", "Data", "Insights", "Dashboard"],
      gradient: "from-[#9B3DFF] to-[#2EC5FF]"
    },
    {
      id: 6,
      title: "Workflow Automator",
      excerpt: "Intelligent process automation with drag-and-drop workflow builder",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Automation",
      price: "£109/user/month",
      rating: 4.8,
      users: "310+",
      launchDate: "2023",
      views: "3.1k",
      tags: ["Workflow", "Automation", "Process", "Efficiency"],
      gradient: "from-[#00B894] to-[#00CEC9]"
    },
    {
      id: 7,
      title: "Payroll Pro",
      excerpt: "Automated payroll processing with tax compliance and reporting",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      category: "Payroll",
      price: "£139/user/month",
      rating: 4.7,
      users: "270+",
      launchDate: "2022",
      views: "2.8k",
      tags: ["Payroll", "Tax", "Finance", "Automation"],
      gradient: "from-[#6C5CE7] to-[#A29BFE]"
    },
    {
      id: 8,
      title: "Learning Hub",
      excerpt: "Corporate learning management system with course library and tracking",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      category: "Learning",
      price: "£69/user/month",
      rating: 4.5,
      users: "230+",
      launchDate: "2023",
      views: "2.5k",
      tags: ["Learning", "Training", "Courses", "Development"],
      gradient: "from-[#FD79A8] to-[#FF7675]"
    },
    {
      id: 9,
      title: "Employee Wellness",
      excerpt: "Comprehensive wellness program with mental health support and fitness tracking",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      category: "Wellness",
      price: "£59/user/month",
      rating: 4.6,
      users: "190+",
      launchDate: "2024",
      views: "2.1k",
      tags: ["Wellness", "Health", "Mental Health", "Fitness"],
      gradient: "from-[#00CEC9] to-[#81ECEC]"
    }
  ];

  const categories = [
    { id: "all", label: "All Products", count: products.length },
    { id: "core-platform", label: "Core Platform", count: 1 },
    { id: "recruitment", label: "Recruitment", count: 1 },
    { id: "compliance", label: "Compliance", count: 1 },
    { id: "performance", label: "Performance", count: 1 },
    { id: "analytics", label: "Analytics", count: 1 },
    { id: "automation", label: "Automation", count: 1 },
    { id: "payroll", label: "Payroll", count: 1 },
    { id: "learning", label: "Learning", count: 1 },
    { id: "wellness", label: "Wellness", count: 1 }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeFilter === "all" || 
      product.category.toLowerCase().replace(/\s+/g, "-") === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-30">
      {/* Hero Header */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1F2E9A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9B3DFF] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">Our Product</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] via-[#2EC5FF] to-[#E60023]">
                Suite Platform
              </span>
            </h1>

            <p className="text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed mb-8">
              Discover our comprehensive suite of cloud-based HR solutions designed 
              specifically for UK businesses to streamline operations and drive growth.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1F2E9A]">{products.length}+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E60023]">500+</div>
                <div className="text-sm text-gray-600">UK Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9B3DFF]">4.8</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2EC5FF]">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-8">
          <div className="mb-8">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products by name, features, or category..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white shadow-lg'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-[#1F2E9A] hover:bg-[#1F2E9A]/5'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {category.label}
                  <span className="text-xs opacity-80">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#1F2E9A]">
              Available Products ({filteredProducts.length})
            </h3>
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid - SAME DESIGN AS BLOG */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          {currentProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold text-[#1F2E9A] mb-2">
                No products found
              </h4>
              <p className="text-[#666666]">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-[400px]"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* IMAGE */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {/* OVERLAY - Same gradient effect as blog */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143cbf] to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465affbf]" />
                  </div>

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md z-20 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1F2E9A]" />
                    <span className="text-sm font-semibold text-[#1F2E9A]">
                      {product.category}
                    </span>
                  </div>

                  {/* PRICE BADGE */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white px-4 py-2 rounded-full shadow-md z-20 flex items-center gap-2">
                    <span className="text-sm font-bold">{product.price}</span>
                  </div>

                  {/* RATING BADGE */}
                  <div className="absolute top-16 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                  </div>

                  {/* USERS BADGE */}
                  <div className="absolute top-28 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#2EC5FF]" />
                    <span className="text-xs font-medium text-gray-900">{product.users}</span>
                  </div>

                  {/* CENTER HOVER ICON */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl">
                      <ArrowRight className="w-6 h-6 text-[#1F2E9A] group-hover:-rotate-40 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* CONTENT - Same as blog */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                      {product.title}
                    </h3>

                    <p className="text-sm text-white/90 mb-4 line-clamp-2">
                      {product.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {product.launchDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {product.views} views
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - Same as blog */}
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

      
    </div>
  );
};

export default ProductPage;