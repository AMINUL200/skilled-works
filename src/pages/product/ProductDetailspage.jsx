import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Shield,
  Zap,
  BarChart3,
  Cloud,
  Clock,
  Calendar,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  PlayCircle,
  Quote,
  TrendingUp,
  MessageCircle,
  Loader,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/app";
import PageLoader from "../../component/common/PageLoader";
import renderStars from "../../utils/RenderStars";

const ProductDetailspage = () => {
  const navigate = useNavigate();
  const { id, slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Fetch product details on component mount
  useEffect(() => {
    fetchProductDetails();
  }, [id, slug]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use id or slug from URL params
      const productId = id || slug;
      // Replace with your actual API endpoint
      const response = await api.get(`/products/${productId}`);
      const result = response.data;

      if (result.status && result.data) {
        setProduct(result.data.product);
        setRelatedProducts(result.data.related_products || []);
      } else {
        setError("Failed to load product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Parse benefits from long_desc or use default structure
  const parseBenefits = () => {
    if (!product?.long_desc) return [];

    // This is a simplified parser - you might need to adjust based on your HTML structure
    const defaultBenefits = [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "60% Faster HR Processes",
        description: "Automate routine tasks and reduce manual work",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "100% UK Compliance",
        description: "Stay updated with latest employment laws",
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Real-time Analytics",
        description: "Make data-driven decisions with insights",
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Enhanced Employee Experience",
        description: "Self-service portal and mobile access",
      },
    ];

    return defaultBenefits;
  };

  // Parse features from long_desc
  const parseFeatures = () => {
    if (!product?.long_desc) return [];

    // Default features based on product data
    return [
      "Employee database & record management",
      "Leave & attendance tracking",
      "Performance management system",
      "Recruitment & onboarding",
      "Payroll integration",
      "Document management",
      "Compliance monitoring",
      "Advanced reporting & analytics",
      "Mobile app access",
      "API integrations",
    ];
  };

  // Get product images
  const getProductImages = () => {
    if (product?.images && product.images.length > 0) {
      return product.images
        .map((img) => (img.image ? `${STORAGE_URL}${img.image}` : null))
        .filter(Boolean);
    }
    // Fallback images
    return [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    ];
  };

  // Calculate average rating from reviews
const getAverageRating = () => {
  return parseFloat(product?.rating || 0).toFixed(1);
};


  // Get total reviews count
  const getTotalReviews = () => {
    return product?.reviews?.length || 0;
  };

  // Get stats from product data
  const getProductStats = () => {
    return [
      {
        value: product?.happy_customer ? `${product.happy_customer}+` : "500+",
        label: "UK Businesses",
      },
      { value: product?.accuricy || "99.9%", label: "Uptime" },
      { value: product?.support_time || "24/7", label: "Support" },
      { value: `${getAverageRating()}/5`, label: "Satisfaction" },
    ];
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#1F2E9A] mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/product")}
            className="px-6 py-3 bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    );
  }

  const productImages = getProductImages();
  const benefits = parseBenefits();
  const features = parseFeatures();
  const stats = getProductStats();
  const avgRating = getAverageRating();
  const totalReviews = getTotalReviews();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFF] to-white pt-50">
      {/* Product Title Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-6">
              <Cloud className="w-5 h-5 text-[#9B3DFF]" />
              <span className="text-sm font-semibold text-[#1F2E9A]">
                {product.title?.split(" ")[0] || "Product"}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              aria-label={product?.title_meta}
            >
              <span className="text-[#2430A3]">{product.title}</span>
            </h1>

            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
              aria-label={
                product?.short_desc_meta ||
                product?.title_meta ||
                product?.tagline
              }
            >
              {product.short_desc || product.title_meta || product.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(avgRating)}</div>

                <span className="text-lg font-bold text-gray-900">
                  {avgRating}
                </span>
                {totalReviews > 0 && (
                  <span className="text-gray-500">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                )}
              </div>

              {product.happy_customer && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2EC5FF]" />
                  <span className="font-semibold text-gray-900">
                    {product.happy_customer}+ UK Businesses
                  </span>
                </div>
              )}

              {product.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#9B3DFF]" />
                  <span className="font-semibold text-gray-900">
                    Since {new Date(product.date).getFullYear()}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Description */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Play Button - Only show if there's a video */}
                  {product.video_url && (
                    <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300">
                      <PlayCircle className="w-6 h-6 text-[#1F2E9A]" />
                    </button>
                  )}
                </div>

                {/* Thumbnail Images */}
                {productImages.length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            selectedImage === index
                              ? "border-[#1F2E9A] ring-2 ring-[#1F2E9A]/20"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h2> */}

                <div className="space-y-6">
                  {/* Render HTML description safely */}
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.long_desc || product.description,
                    }}
                    aria-label={`Description of ${product.long_desc_meta}`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Related Products */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#9B3DFF]" />
                    Related Products
                  </h3>

                  <div className="space-y-4">
                    {relatedProducts.slice(0, 4).map((relatedProduct) => (
                      <div
                        key={relatedProduct.id}
                        onClick={() =>
                          navigate(
                            `/product/${relatedProduct.slug || relatedProduct.id}`,
                          )
                        }
                        className="group p-4 rounded-xl border border-gray-200 hover:border-[#1F2E9A] hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={`${STORAGE_URL}${relatedProduct.images?.[0]?.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80"}`}
                                alt={relatedProduct.image_alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-bold text-gray-900 group-hover:text-[#1F2E9A] transition-colors duration-300">
                                {relatedProduct.title}
                              </h4>
                              {relatedProduct.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs font-bold">
                                    {parseFloat(relatedProduct.rating).toFixed(
                                      1,
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {relatedProduct.short_desc ||
                                relatedProduct.title_meta}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {relatedProduct.title?.split(" ")[0] ||
                                  "Product"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/product")}
                    className="w-full mt-6 p-3 text-center text-[#1F2E9A] font-semibold hover:bg-gray-50 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    View All Products
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-[#FAFAFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] mb-4">
                <MessageCircle className="w-5 h-5 text-[#9B3DFF]" />
                <span className="text-sm font-semibold text-[#1F2E9A]">
                  CLIENT TESTIMONIALS
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#2430A3]">What Our Clients</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#E60023]">
                  Say About Us
                </span>
              </h2>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from businesses that have transformed their HR operations
                with our platform.
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {product.reviews.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-[#1F2E9A]/20" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(parseFloat(testimonial.rating)) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.message}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {testimonial.image_url && (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={`${STORAGE_URL}${testimonial.image}`}
                          alt={testimonial.user_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.user_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.designation}
                      </p>
                      <p className="text-sm text-[#1F2E9A] font-semibold">
                        {testimonial.company_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] rounded-2xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your HR Operations?
              </h3>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Join {product.happy_customer || 500}+ UK businesses already
                using {product.title} to streamline their HR processes and drive
                growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-[#1F2E9A] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Start Free 14-Day Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>

                <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1F2E9A] transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>Book a Demo</span>
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailspage;
