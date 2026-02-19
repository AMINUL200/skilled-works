import React, { useState, useEffect } from 'react';
import { 
  Search, 
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
import { api } from '../../utils/app';
import PageLoader from '../../component/common/PageLoader';

const ProductPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await api.get('/product');
      if(response.data.status){
        const data = response.data.data; // Adjust based on your API response structure
        setProducts(data);
      }
      // const data = response.data.data; // Adjust based on your API response structure
      // setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to empty array if API fails
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search only (category filter removed)
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title_meta?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
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

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug || product.id}`);
  };

  // Calculate stats from real data
  const totalProducts = products.length;
  const avgRating = products.length > 0 
    ? (products.reduce((acc, product) => acc + parseFloat(product.rating || 0), 0) / products.length).toFixed(1)
    : '4.8';
  const totalCustomers = products.reduce((acc, product) => acc + (product.happy_customer || 0), 0);

  // Get gradient based on product id for visual variety
  const getProductGradient = (id) => {
    const gradients = [
      "from-[#1F2E9A] to-[#2430A3]",
      "from-[#E60023] to-[#FF1F1F]",
      "from-[#2EC5FF] to-[#9B5CFF]",
      "from-[#FF4D8D] to-[#FF9F1C]",
      "from-[#9B3DFF] to-[#2EC5FF]",
      "from-[#00B894] to-[#00CEC9]",
      "from-[#6C5CE7] to-[#A29BFE]",
      "from-[#FD79A8] to-[#FF7675]",
      "from-[#00CEC9] to-[#81ECEC]",
    ];
    return gradients[id % gradients.length];
  };

  if(loading) return <PageLoader />;

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

            {/* Stats - Now using real data */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1F2E9A]">{totalProducts}+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E60023]">{totalCustomers}+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9B3DFF]">{avgRating}</div>
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

      {/* Search Section - Category filters removed */}
      <section className="py-8">
        <div className="container mx-auto px-8">
          <div className="mb-8">
            {/* Search Input - Now centered */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products by name or description..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#1F2E9A] focus:ring-2 focus:ring-[#1F2E9A]/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#1F2E9A]">
              Available Products ({filteredProducts.length})
            </h3>
            {filteredProducts.length > 0 && (
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg h-[400px] animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold text-[#1F2E9A] mb-2">
                No products found
              </h4>
              <p className="text-[#666666]">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-[400px]"
                  onClick={() => handleProductClick(product)}
                >
                  {/* IMAGE - Using placeholder images based on product id */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${STORAGE_URL}${product.images[0]?.image})` 
                    }}
                  >
                    {/* OVERLAY - Same gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143cbf] to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465affbf]" />
                  </div>

                  {/* CATEGORY BADGE - Using title as category since no category field */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-md z-20 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1F2E9A]" />
                    <span className="text-sm font-semibold text-[#1F2E9A]">
                      {product.title?.split(' ')[0] || 'Product'}
                    </span>
                  </div>

                  {/* RATING BADGE */}
                  {product.rating && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold text-gray-900">
                        {parseFloat(product.rating).toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* USERS BADGE */}
                  {product.happy_customer && (
                    <div className="absolute top-16 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#2EC5FF]" />
                      <span className="text-xs font-medium text-gray-900">
                        {product.happy_customer}k
                      </span>
                    </div>
                  )}

                  {/* ACCURACY BADGE (optional) */}
                  {product.accuricy && (
                    <div className="absolute top-28 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-gray-900">
                        {product.accuricy}
                      </span>
                    </div>
                  )}

                  {/* CENTER HOVER ICON */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl">
                      <ArrowRight className="w-6 h-6 text-[#1F2E9A] group-hover:-rotate-40 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                      {product.title}
                    </h3>

                    <p className="text-sm text-white/90 mb-4 line-clamp-2">
                      {product.short_desc || product.title_meta || "Comprehensive HR solution for modern businesses"}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <div className="flex items-center gap-4">
                        {product.support_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {product.support_time}
                          </div>
                        )}
                        {product.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(product.date).getFullYear()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - Same as before */}
          {totalPages > 1 && !loading && (
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