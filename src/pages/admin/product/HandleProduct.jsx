import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Search,
  X,
  Check,
  AlertCircle,
  Package,
  Star,
  Users,
  Clock,
  CheckCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  Percent,
  Award,
  RefreshCw,
  Image as ImageIcon,
  Upload,
  ExternalLink,
  Grid,
  List,
  MessageSquare,
  User,
  Briefcase,
  Building2,
  Star as StarIcon,
} from "lucide-react";
import { api } from "../../../utils/app";
import { toast } from "react-toastify";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  // Image management states
  const [showImageManager, setShowImageManager] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageViewMode, setImageViewMode] = useState("grid");

  // Review management states
  const [showReviewManager, setShowReviewManager] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    rating: "",
    message: "",
    user_name: "",
    designation: "",
    company_name: "",
    image: null,
    is_active: true,
  });
  const [reviewFormErrors, setReviewFormErrors] = useState({});
  const [reviewImagePreview, setReviewImagePreview] = useState(null);
  const [selectedReviewFile, setSelectedReviewFile] = useState(null);
  const [uploadingReview, setUploadingReview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    title_meta: "",
    short_desc: "",
    short_desc_meta: "",
    long_desc: "",
    long_desc_meta: "",
    rating: "",
    happy_customer: "",
    accuricy: "",
    support_time: "",
    is_active: true,
  });
  const [formErrors, setFormErrors] = useState({});

  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Fetch products
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/product`);
      if (response.data.status) {
        setProducts(response.data.data);
        setTotalPages(response.data.meta?.last_page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Fetch product images
  const fetchProductImages = async (productId) => {
    try {
      setLoadingImages(true);
      const response = await api.get(`/admin/product/${productId}/images`);
      if (response.data.status) {
        setProductImages(response.data.data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch product images");
    } finally {
      setLoadingImages(false);
    }
  };

  // Fetch product reviews
  const fetchProductReviews = async (productId) => {
    try {
      setLoadingReviews(true);
      const response = await api.get(`/admin/product/${productId}/reviews`);
      if (response.data.status) {
        setProductReviews(response.data.data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch product reviews");
    } finally {
      setLoadingReviews(false);
    }
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle review image selection
  const handleReviewImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedReviewFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    if (!imageAlt.trim()) {
      toast.error("Please provide alt text for the image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("image_alt", imageAlt);
    formData.append("is_active", "1");

    try {
      setUploadingImage(true);
      const response = await api.post(
        `/admin/product/${selectedProduct.id}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status) {
        toast.success("Image uploaded successfully");
        setSelectedFile(null);
        setImagePreview(null);
        setImageAlt("");
        fetchProductImages(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle image delete
  const handleImageDelete = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await api.delete(`/admin/product-images/${imageId}`);
      if (response.data.status) {
        toast.success("Image deleted successfully");
        fetchProductImages(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete image");
    }
  };

  // Handle toggle image status
  const handleToggleImageStatus = async (image) => {
    try {
      const response = await api.patch(
        `/admin/product/images/${image.id}/toggle-status`,
        {
          is_active: !image.is_active,
        },
      );
      if (response.data.status) {
        toast.success(
          `Image ${!image.is_active ? "activated" : "deactivated"} successfully`,
        );
        fetchProductImages(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update image status");
    }
  };

  // Handle review input change
  const handleReviewInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (reviewFormErrors[name]) {
      setReviewFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate review form
  const validateReviewForm = () => {
    const errors = {};
    if (!reviewFormData.rating) {
      errors.rating = "Rating is required";
    } else if (reviewFormData.rating < 0 || reviewFormData.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }
    if (!reviewFormData.message.trim()) {
      errors.message = "Review message is required";
    }
    if (!reviewFormData.user_name.trim()) {
      errors.user_name = "User name is required";
    }
    if (!reviewFormData.designation.trim()) {
      errors.designation = "Designation is required";
    }
    if (!reviewFormData.company_name.trim()) {
      errors.company_name = "Company name is required";
    }
    setReviewFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle review submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!validateReviewForm()) return;

    const formData = new FormData();
    formData.append("rating", reviewFormData.rating);
    formData.append("message", reviewFormData.message);
    formData.append("user_name", reviewFormData.user_name);
    formData.append("designation", reviewFormData.designation);
    formData.append("company_name", reviewFormData.company_name);
    formData.append("is_active", reviewFormData.is_active ? "1" : "0");

    if (selectedReviewFile) {
      formData.append("image", selectedReviewFile);
    }

    try {
      setUploadingReview(true);
      let response;
      
      if (editingReview) {
        // For update, we need to use POST with _method=PUT or use PUT with FormData
        // Laravel sometimes needs this approach for file uploads with PUT
        // formData.append("_method", "PUT");
        response = await api.post(
          `/admin/product-reviews/${editingReview.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        response = await api.post(
          `/admin/product/${selectedProduct.id}/reviews`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      if (response.data.status) {
        toast.success(
          editingReview ? "Review updated successfully" : "Review added successfully",
        );
        resetReviewForm();
        fetchProductReviews(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save review");
    } finally {
      setUploadingReview(false);
    }
  };

  // Handle review delete
  const handleReviewDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await api.delete(`/admin/product-reviews/${reviewId}`);
      if (response.data.status) {
        toast.success("Review deleted successfully");
        fetchProductReviews(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  // Handle toggle review status
  const handleToggleReviewStatus = async (review) => {
    try {
      const response = await api.patch(
        `/admin/product-reviews/${review.id}/toggle-status`,
        {
          is_active: !review.is_active,
        },
      );
      if (response.data.status) {
        toast.success(
          `Review ${!review.is_active ? "activated" : "deactivated"} successfully`,
        );
        fetchProductReviews(selectedProduct.id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update review status");
    }
  };

  // Handle edit review
  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewFormData({
      rating: review.rating,
      message: review.message,
      user_name: review.user_name,
      designation: review.designation,
      company_name: review.company_name,
      image: null,
      is_active: review.is_active,
    });
    setReviewImagePreview(review.image_url);
    setShowReviewForm(true);
  };

  // Reset review form
  const resetReviewForm = () => {
    setReviewFormData({
      rating: "",
      message: "",
      user_name: "",
      designation: "",
      company_name: "",
      image: null,
      is_active: true,
    });
    setReviewFormErrors({});
    setReviewImagePreview(null);
    setSelectedReviewFile(null);
    setEditingReview(null);
    setShowReviewForm(false);
  };

  // Open image manager
  const openImageManager = (product) => {
    setSelectedProduct(product);
    setShowImageManager(true);
    fetchProductImages(product.id);
  };

  // Close image manager
  const closeImageManager = () => {
    setShowImageManager(false);
    setSelectedProduct(null);
    setProductImages([]);
    setSelectedFile(null);
    setImagePreview(null);
    setImageAlt("");
  };

  // Open review manager
  const openReviewManager = (product) => {
    setSelectedProduct(product);
    setShowReviewManager(true);
    fetchProductReviews(product.id);
  };

  // Close review manager
  const closeReviewManager = () => {
    setShowReviewManager(false);
    setSelectedProduct(null);
    setProductReviews([]);
    resetReviewForm();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.short_desc.trim())
      errors.short_desc = "Short description is required";
    if (!formData.long_desc.trim())
      errors.long_desc = "Long description is required";
    if (
      formData.rating &&
      (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)
    ) {
      errors.rating = "Rating must be between 0 and 5";
    }
    if (formData.happy_customer && isNaN(formData.happy_customer)) {
      errors.happy_customer = "Must be a valid number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const submitData = {
        ...formData,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        happy_customer: formData.happy_customer
          ? parseInt(formData.happy_customer)
          : null,
      };

      let response;
      if (editingProduct) {
        response = await api.put(
          `/admin/product/${editingProduct.id}`,
          submitData,
        );
        toast.success("Product updated successfully");
      } else {
        response = await api.post("/admin/product", submitData);
        toast.success("Product created successfully");
      }

      if (response.data.status) {
        setShowForm(false);
        setEditingProduct(null);
        resetForm();
        fetchProducts(currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save product");
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      title_meta: product.title_meta || "",
      short_desc: product.short_desc || "",
      short_desc_meta: product.short_desc_meta || "",
      long_desc: product.long_desc || "",
      long_desc_meta: product.long_desc_meta || "",
      rating: product.rating || "",
      happy_customer: product.happy_customer || "",
      accuricy: product.accuricy || "",
      support_time: product.support_time || "",
      is_active: product.is_active,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await api.delete(`/admin/product/${id}`);
      if (response.data.status) {
        toast.success("Product deleted successfully");
        fetchProducts(currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (product) => {
    try {
      const response = await api.patch(
        `/admin/products/${product.id}/toggle-status`,
        {
          is_active: !product.is_active,
        },
      );
      if (response.data.status) {
        toast.success(
          `Product ${!product.is_active ? "activated" : "deactivated"} successfully`,
        );
        fetchProducts(currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      title_meta: "",
      short_desc: "",
      short_desc_meta: "",
      long_desc: "",
      long_desc_meta: "",
      rating: "",
      happy_customer: "",
      accuricy: "",
      support_time: "",
      is_active: true,
    });
    setFormErrors({});
    setEditingProduct(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Filter products based on search and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.short_desc &&
        product.short_desc.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.is_active) ||
      (filterStatus === "inactive" && !product.is_active);
    return matchesSearch && matchesStatus;
  });

  // Loading skeleton
  if (loading && products.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Products Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your HRMS products and modules
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300 flex items-center gap-2"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? "Cancel" : "Add New Product"}
          </motion.button>
        </div>

        {/* Form Section - Shows on top when active */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                          formErrors.title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter product title"
                      />
                      {formErrors.title && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    {/* Title Meta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title Meta (SEO)
                      </label>
                      <input
                        type="text"
                        name="title_meta"
                        value={formData.title_meta}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="SEO title"
                      />
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="short_desc"
                        value={formData.short_desc}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                          formErrors.short_desc
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Brief description"
                      />
                      {formErrors.short_desc && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.short_desc}
                        </p>
                      )}
                    </div>

                    {/* Short Desc Meta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description Meta
                      </label>
                      <textarea
                        name="short_desc_meta"
                        value={formData.short_desc_meta}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="SEO short description"
                      />
                    </div>

                    {/* Long Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Long Description <span className="text-red-500">*</span>
                      </label>
                      <CustomTextEditor
                        value={formData.long_desc}
                        height={350}
                        placeholder="Write detailed product description..."
                        onChange={(content) =>
                          setFormData((prev) => ({
                            ...prev,
                            long_desc: content,
                          }))
                        }
                      />

                      {formErrors.long_desc && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.long_desc}
                        </p>
                      )}
                    </div>

                    {/* Long Desc Meta */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Long Description Meta
                      </label>
                      <textarea
                        name="long_desc_meta"
                        value={formData.long_desc_meta}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="SEO long description"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        max="5"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                          formErrors.rating
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="4.5"
                      />
                      {formErrors.rating && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.rating}
                        </p>
                      )}
                    </div>

                    {/* Happy Customers */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Happy Customers
                      </label>
                      <input
                        type="number"
                        name="happy_customer"
                        value={formData.happy_customer}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                          formErrors.happy_customer
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="1250"
                      />
                      {formErrors.happy_customer && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.happy_customer}
                        </p>
                      )}
                    </div>

                    {/* Accuracy */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Accuracy
                      </label>
                      <input
                        type="text"
                        name="accuricy"
                        value={formData.accuricy}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="99.9% accuracy"
                      />
                    </div>

                    {/* Support Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Time
                      </label>
                      <input
                        type="text"
                        name="support_time"
                        value={formData.support_time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                        placeholder="24/7 Support"
                      />
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Active Status
                      </label>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300"
                    >
                      {editingProduct ? "Update Product" : "Create Product"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                onClick={() => fetchProducts(1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="max-w-[450px] md:max-w-[800px] lg:max-w-[1240px] overflow-x-auto">
            <div className="w-full min-w-[1240px] lg:min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-14 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                <div className="col-span-4">Product</div>
                <div className="col-span-2">Short Description</div>
                {/* <div className="col-span-1 text-center">Rating</div> */}
                <div className="col-span-1 text-center">Customers</div>
                <div className="col-span-1 text-center">Accuracy</div>
                <div className="col-span-1 text-center">Support</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1 text-center">Images</div>
                <div className="col-span-1 text-center">Reviews</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No products found</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-14 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                    >
                      <div className="col-span-4">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {product.title}
                          </h3>
                          {product.title_meta && (
                            <p className="text-xs text-gray-500 mt-1">
                              SEO: {product.title_meta}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.short_desc}
                        </p>
                      </div>

                      {/* <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {product.rating || "N/A"}
                          </span>
                        </div>
                      </div> */}

                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {product.happy_customer || "0"}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Percent className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {product.accuricy || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {product.support_time || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handleToggleStatus(product)}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.is_active
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          } transition-colors`}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </button>
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => openImageManager(product)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Manage Images"
                        >
                          <ImageIcon size={16} />
                          <span className="text-xs">Images</span>
                        </button>
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => openReviewManager(product)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                          title="Manage Reviews"
                        >
                          <MessageSquare size={16} />
                          <span className="text-xs">Reviews</span>
                        </button>
                      </div>

                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => p.is_active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    products.reduce(
                      (acc, p) => acc + (parseFloat(p.rating) || 0),
                      0,
                    ) / products.length || 0
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products
                    .reduce((acc, p) => acc + (p.happy_customer || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Manager Modal */}
      <AnimatePresence>
        {showImageManager && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeImageManager}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Manage Images - {selectedProduct.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add, view, and manage product images
                  </p>
                </div>
                <button
                  onClick={closeImageManager}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Upload Section */}
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upload New Image
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Form */}
                    <div>
                      <form onSubmit={handleImageUpload} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            placeholder="Describe the image for SEO"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={uploadingImage || !selectedFile}
                          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {uploadingImage ? (
                            <>
                              <RefreshCw size={18} className="animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload size={18} />
                              Upload Image
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Preview */}
                    {imagePreview && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preview
                        </label>
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images List */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Product Images ({productImages.length})
                    </h3>

                    {/* View Toggle */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setImageViewMode("grid")}
                        className={`p-2 rounded-lg transition-colors ${
                          imageViewMode === "grid"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <Grid size={18} />
                      </button>
                      <button
                        onClick={() => setImageViewMode("list")}
                        className={`p-2 rounded-lg transition-colors ${
                          imageViewMode === "list"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>

                  {loadingImages ? (
                    <div className="text-center py-12">
                      <RefreshCw
                        size={40}
                        className="mx-auto mb-4 text-gray-400 animate-spin"
                      />
                      <p className="text-gray-600">Loading images...</p>
                    </div>
                  ) : productImages.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <ImageIcon
                        size={48}
                        className="mx-auto mb-4 text-gray-400"
                      />
                      <p className="text-gray-600">No images uploaded yet</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload your first image using the form above
                      </p>
                    </div>
                  ) : (
                    <>
                      {imageViewMode === "grid" ? (
                        /* Grid View */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {productImages.map((image) => (
                            <motion.div
                              key={image.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                            >
                              <img
                                src={`${STORAGE_URL}/${image.image}`}
                                alt={image.image_alt || selectedProduct.title}
                                className="w-full h-full object-cover"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    window.open(
                                      `${STORAGE_URL}/${image.image}`,
                                      "_blank",
                                    )
                                  }
                                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                  title="View full size"
                                >
                                  <Eye size={16} className="text-gray-900" />
                                </button>
                                <button
                                  onClick={() => handleToggleImageStatus(image)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    image.is_active
                                      ? "bg-green-500 hover:bg-green-600"
                                      : "bg-gray-500 hover:bg-gray-600"
                                  }`}
                                  title={
                                    image.is_active ? "Deactivate" : "Activate"
                                  }
                                >
                                  {image.is_active ? (
                                    <Check size={16} className="text-white" />
                                  ) : (
                                    <X size={16} className="text-white" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleImageDelete(image.id)}
                                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} className="text-white" />
                                </button>
                              </div>

                              {/* Status Badge */}
                              {!image.is_active && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-gray-800/80 text-white text-xs rounded-lg">
                                  Inactive
                                </div>
                              )}

                              {/* Alt Text (hidden by default, show on hover) */}
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-xs truncate">
                                  {image.image_alt || "No alt text"}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        /* List View */
                        <div className="space-y-2">
                          {productImages.map((image) => (
                            <motion.div
                              key={image.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              {/* Thumbnail */}
                              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={`${STORAGE_URL}/${image.image}`}
                                  alt={image.image_alt || selectedProduct.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {image.image_alt || "No alt text"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Uploaded:{" "}
                                  {new Date(
                                    image.created_at,
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              {/* Status */}
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    image.is_active
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {image.is_active ? "Active" : "Inactive"}
                                </span>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    window.open(
                                      `${STORAGE_URL}/${image.image}`,
                                      "_blank",
                                    )
                                  }
                                  className="p-2 hover:bg-white rounded-lg transition-colors"
                                  title="View full size"
                                >
                                  <Eye size={16} className="text-gray-600" />
                                </button>
                                <button
                                  onClick={() => handleToggleImageStatus(image)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    image.is_active
                                      ? "hover:bg-green-100"
                                      : "hover:bg-gray-200"
                                  }`}
                                  title={
                                    image.is_active ? "Deactivate" : "Activate"
                                  }
                                >
                                  {image.is_active ? (
                                    <Check
                                      size={16}
                                      className="text-green-600"
                                    />
                                  ) : (
                                    <X size={16} className="text-gray-600" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleImageDelete(image.id)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Total: {productImages.length} image
                    {productImages.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={closeImageManager}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Manager Modal */}
      <AnimatePresence>
        {showReviewManager && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeReviewManager}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Manage Reviews - {selectedProduct.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Add, view, and manage product reviews
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      resetReviewForm();
                      setShowReviewForm(!showReviewForm);
                    }}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300 flex items-center gap-2"
                  >
                    {showReviewForm ? <X size={18} /> : <Plus size={18} />}
                    {showReviewForm ? "Cancel" : "Add Review"}
                  </button>
                  <button
                    onClick={closeReviewManager}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Review Form */}
                <AnimatePresence>
                  {showReviewForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingReview ? "Edit Review" : "Add New Review"}
                      </h3>

                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Rating */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rating (0-5) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              name="rating"
                              value={reviewFormData.rating}
                              onChange={handleReviewInputChange}
                              step="0.1"
                              min="0"
                              max="5"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                reviewFormErrors.rating
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="4.5"
                            />
                            {reviewFormErrors.rating && (
                              <p className="text-red-500 text-xs mt-1">
                                {reviewFormErrors.rating}
                              </p>
                            )}
                          </div>

                          {/* User Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              User Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="user_name"
                              value={reviewFormData.user_name}
                              onChange={handleReviewInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                reviewFormErrors.user_name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="John Doe"
                            />
                            {reviewFormErrors.user_name && (
                              <p className="text-red-500 text-xs mt-1">
                                {reviewFormErrors.user_name}
                              </p>
                            )}
                          </div>

                          {/* Designation */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Designation <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="designation"
                              value={reviewFormData.designation}
                              onChange={handleReviewInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                reviewFormErrors.designation
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="CEO"
                            />
                            {reviewFormErrors.designation && (
                              <p className="text-red-500 text-xs mt-1">
                                {reviewFormErrors.designation}
                              </p>
                            )}
                          </div>

                          {/* Company Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="company_name"
                              value={reviewFormData.company_name}
                              onChange={handleReviewInputChange}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                reviewFormErrors.company_name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Company Inc."
                            />
                            {reviewFormErrors.company_name && (
                              <p className="text-red-500 text-xs mt-1">
                                {reviewFormErrors.company_name}
                              </p>
                            )}
                          </div>

                          {/* Message */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Review Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="message"
                              value={reviewFormData.message}
                              onChange={handleReviewInputChange}
                              rows={4}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                reviewFormErrors.message
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Write review message..."
                            />
                            {reviewFormErrors.message && (
                              <p className="text-red-500 text-xs mt-1">
                                {reviewFormErrors.message}
                              </p>
                            )}
                          </div>

                          {/* Image Upload */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              User Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleReviewImageSelect}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                            />
                          </div>

                          {/* Status */}
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="is_active"
                              checked={reviewFormData.is_active}
                              onChange={handleReviewInputChange}
                              className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                            />
                            <label className="text-sm font-medium text-gray-700">
                              Active Status
                            </label>
                          </div>

                          {/* Image Preview */}
                          {reviewImagePreview && (
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image Preview
                              </label>
                              <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                                <img
                                  src={reviewImagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t">
                          <button
                            type="button"
                            onClick={resetReviewForm}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={uploadingReview}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {uploadingReview ? (
                              <>
                                <RefreshCw size={18} className="animate-spin" />
                                {editingReview ? "Updating..." : "Adding..."}
                              </>
                            ) : (
                              <>
                                {editingReview ? "Update Review" : "Add Review"}
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reviews List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Product Reviews ({productReviews.length})
                  </h3>

                  {loadingReviews ? (
                    <div className="text-center py-12">
                      <RefreshCw
                        size={40}
                        className="mx-auto mb-4 text-gray-400 animate-spin"
                      />
                      <p className="text-gray-600">Loading reviews...</p>
                    </div>
                  ) : productReviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <MessageSquare
                        size={48}
                        className="mx-auto mb-4 text-gray-400"
                      />
                      <p className="text-gray-600">No reviews yet</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Click "Add Review" to create your first review
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {productReviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            {/* User Image */}
                            <div className="flex-shrink-0">
                              {review.image_url ? (
                                <img
                                  src={review.image_url}
                                  alt={review.user_name}
                                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                  <User size={32} className="text-gray-500" />
                                </div>
                              )}
                            </div>

                            {/* Review Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {review.user_name}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                                    <Briefcase size={14} />
                                    <span>{review.designation}</span>
                                    <Building2 size={14} className="ml-2" />
                                    <span>{review.company_name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {/* Rating */}
                                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
                                    <StarIcon
                                      size={16}
                                      className="text-yellow-400 fill-current"
                                    />
                                    <span className="font-semibold text-gray-900">
                                      {review.rating}
                                    </span>
                                  </div>

                                  {/* Status */}
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      review.is_active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {review.is_active ? "Active" : "Inactive"}
                                  </span>

                                  {/* Actions */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleEditReview(review)}
                                      className="p-1 hover:bg-white rounded-lg transition-colors"
                                      title="Edit"
                                    >
                                      <Edit2 size={16} className="text-gray-600" />
                                    </button>
                                    <button
                                      onClick={() => handleToggleReviewStatus(review)}
                                      className={`p-1 rounded-lg transition-colors ${
                                        review.is_active
                                          ? "hover:bg-green-100"
                                          : "hover:bg-gray-200"
                                      }`}
                                      title={
                                        review.is_active ? "Deactivate" : "Activate"
                                      }
                                    >
                                      {review.is_active ? (
                                        <Check size={16} className="text-green-600" />
                                      ) : (
                                        <X size={16} className="text-gray-600" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => handleReviewDelete(review.id)}
                                      className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={16} className="text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Review Message */}
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {review.message}
                                </p>
                              </div>

                              {/* Date */}
                              <p className="text-xs text-gray-500 mt-2">
                                Added: {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Total: {productReviews.length} review
                    {productReviews.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={closeReviewManager}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandleProduct;