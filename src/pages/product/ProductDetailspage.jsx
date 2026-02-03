import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Download,
  Quote,
  ExternalLink,
  Globe,
  Award,
  TrendingUp,
  MessageCircle,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetailspage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Product details data
  const productDetails = {
    id: 1,
    title: "SponicHR Cloud Platform",
    tagline: "Comprehensive Cloud-Based HRMS Solution for UK Businesses",
    category: "Core Platform",
    rating: 4.9,
    reviews: "124",
    users: "500+",
    launchDate: "2021",
    price: "£99/user/month",
    
    // Images
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80"
    ],
    
    // Product description
    description: `SponicHR is a comprehensive, cloud-based HRMS platform designed specifically for UK businesses. Our all-in-one solution streamlines HR operations, ensures compliance with UK regulations, and provides actionable insights through advanced analytics.

Built with cutting-edge technology and a deep understanding of UK employment laws, SponicHR helps businesses of all sizes automate their HR processes, reduce administrative burden, and make data-driven decisions about their workforce.`,

    // Key Benefits
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "60% Faster HR Processes",
        description: "Automate routine tasks and reduce manual work"
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "100% UK Compliance",
        description: "Stay updated with latest employment laws"
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Real-time Analytics",
        description: "Make data-driven decisions with insights"
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Enhanced Employee Experience",
        description: "Self-service portal and mobile access"
      }
    ],

    // Features
    features: [
      "Employee database & record management",
      "Leave & attendance tracking",
      "Performance management system",
      "Recruitment & onboarding",
      "Payroll integration",
      "Document management",
      "Compliance monitoring",
      "Advanced reporting & analytics",
      "Mobile app access",
      "API integrations"
    ],

    // Stats
    stats: [
      { value: "500+", label: "UK Businesses" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "UK Support" },
      { value: "4.9/5", label: "Satisfaction" }
    ]
  };

  // Related Products
  const relatedProducts = [
    {
      id: 2,
      title: "Recruitment Pro Suite",
      excerpt: "AI-powered recruitment with smart candidate matching",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      category: "Recruitment",
      price: "£149/user/month",
      rating: 4.8
    },
    {
      id: 3,
      title: "Compliance Guardian",
      excerpt: "Automated compliance management for UK laws",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
      category: "Compliance",
      price: "£79/user/month",
      rating: 4.7
    },
    {
      id: 4,
      title: "Analytics Intelligence",
      excerpt: "Advanced HR analytics with predictive insights",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: "Analytics",
      price: "£129/user/month",
      rating: 4.9
    },
    {
      id: 5,
      title: "Workflow Automator",
      excerpt: "Intelligent process automation for HR operations",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Automation",
      price: "£109/user/month",
      rating: 4.8
    }
  ];

  // Client Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechVision Ltd",
      content: "SponicHR transformed our HR operations completely. We've reduced onboarding time from 2 weeks to just 3 days and achieved 100% compliance with UK regulations. The platform is intuitive and the support team is exceptional.",
      rating: 5,
      date: "2024-02-15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Solutions Inc",
      content: "The analytics dashboard alone was worth the investment. We now make data-driven decisions about our workforce and have identified areas for improvement that we never knew existed. Highly recommended for UK businesses.",
      rating: 5,
      date: "2024-02-10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "HR Business Partner",
      company: "Digital Growth Agency",
      content: "As a growing agency, we needed a scalable HR solution. SponicHR has grown with us and the customer support has been outstanding. They understand UK business needs perfectly.",
      rating: 4,
      date: "2024-02-05",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    },
    {
      id: 4,
      name: "David Roberts",
      role: "CEO",
      company: "Startup Innovations",
      content: "From day one, SponicHR helped us build proper HR processes. The compliance features saved us from potential legal issues. It's more than software - it's a partnership.",
      rating: 5,
      date: "2024-01-28",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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
                {productDetails.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#2430A3]">{productDetails.title}</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {productDetails.tagline}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{productDetails.rating}</span>
                <span className="text-gray-500">({productDetails.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2EC5FF]" />
                <span className="font-semibold text-gray-900">{productDetails.users} UK Businesses</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#9B3DFF]" />
                <span className="font-semibold text-gray-900">Since {productDetails.launchDate}</span>
              </div>
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
                    src={productDetails.images[selectedImage]} 
                    alt={productDetails.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Play Button */}
                  <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-6 h-6 text-[#1F2E9A]" />
                  </button>
                </div>

                {/* Thumbnail Images */}
                <div className="p-4 bg-gray-50">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {productDetails.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index 
                            ? 'border-[#1F2E9A] ring-2 ring-[#1F2E9A]/20' 
                            : 'border-gray-200 hover:border-gray-300'
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
              </div>

              {/* Product Description */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h2>
                
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {productDetails.description}
                  </p>

                  {/* Key Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {productDetails.benefits.map((benefit, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-gradient-to-r from-[#FAFAFF] to-[#F2EEFF] rounded-xl border border-[#E6E0FF] hover:border-[#9B5CFF] transition-colors duration-300"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <div className="text-[#1F2E9A]">
                                {benefit.icon}
                              </div>
                            </div>
                            <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                          </div>
                          <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {productDetails.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productDetails.stats.map((stat, index) => (
                      <div 
                        key={index}
                        className="text-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#1F2E9A] transition-colors duration-300"
                      >
                        <div className="text-2xl font-bold text-[#1F2E9A] mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

               
                </div>
              </div>
            </motion.div>

            {/* Right Column - Related Products */}
            <motion.div variants={itemVariants} className="space-y-8">
              
              {/* Related Products */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#9B3DFF]" />
                  Related Products
                </h3>
                
                <div className="space-y-4">
                  {relatedProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="group p-4 rounded-xl border border-gray-200 hover:border-[#1F2E9A] hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-[#1F2E9A] transition-colors duration-300">
                              {product.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-bold">{product.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {product.category}
                            </span>
                            {/* <span className="text-sm font-bold text-[#1F2E9A]">
                              {product.price}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate('/product')}
                  className="w-full mt-6 p-3 text-center text-[#1F2E9A] font-semibold hover:bg-gray-50 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  View All Products
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
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
              Hear from businesses that have transformed their HR operations with our platform.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
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
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-[#1F2E9A] font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1F2E9A] mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E60023] mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9B3DFF] mb-2">30</div>
                <div className="text-gray-600">Avg. Implementation Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2EC5FF] mb-2">500+</div>
                <div className="text-gray-600">UK Businesses Trust Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] rounded-2xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your HR Operations?</h3>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Join 500+ UK businesses already using SponicHR to streamline their HR processes and drive growth.
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