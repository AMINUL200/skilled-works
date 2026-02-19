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
  RefreshCw,
  Layers,
  MessageSquare,
  User,
  Briefcase,
  Star as StarIcon,
} from "lucide-react";
import { api } from "../../../utils/app";
import { toast } from "react-toastify";

const HandleServicesCustomerStories = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  const [formData, setFormData] = useState({
    service_type_id: "",
    name: "",
    designation: "",
    message: "",
    retings: "",
    is_active: true,
  });
  const [formErrors, setFormErrors] = useState({});

  const itemsPerPage = 10;

  // Fetch service types
  const fetchServiceTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/service-type");
      if (response.data.status) {
        setServiceTypes(response.data.data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch service types");
    } finally {
      setLoading(false);
    }
  };

  // Fetch stories for selected service
  const fetchStories = async (serviceTypeId, page = 1) => {
    try {
      setLoadingItems(true);
      const response = await api.get(`/admin/customer-success-stories/${serviceTypeId}`);
      if (response.data.status) {
        setStories(response.data.data);
        setTotalPages(response.data.meta?.last_page || 1);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch customer stories");
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  useEffect(() => {
    if (selectedServiceType) {
      fetchStories(selectedServiceType.id, currentPage);
    } else {
      setStories([]);
    }
  }, [selectedServiceType, currentPage]);

  // Handle service type selection
  const handleServiceTypeSelect = (serviceType) => {
    setSelectedServiceType(serviceType);
    setCurrentPage(1);
    setShowForm(false);
    setEditingItem(null);
    resetForm();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      service_type_id: selectedServiceType?.id || prev.service_type_id,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.designation.trim()) errors.designation = "Designation is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    if (!formData.retings) {
      errors.retings = "Rating is required";
    } else if (formData.retings < 1 || formData.retings > 5) {
      errors.retings = "Rating must be between 1 and 5";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!selectedServiceType) {
      toast.error("Please select a service type first");
      return;
    }

    try {
      setButtonLoading(true);
      
      const submitData = {
        ...formData,
        service_type_id: selectedServiceType.id,
        retings: parseInt(formData.retings),
      };

      let response;
      if (editingItem) {
        response = await api.post(`/admin/customer-success-stories/update/${editingItem.id}`, submitData);
        toast.success("Story updated successfully");
      } else {
        response = await api.post("/admin/customer-success-stories", submitData);
        toast.success("Story created successfully");
      }

      if (response.data.status) {
        setShowForm(false);
        setEditingItem(null);
        resetForm();
        fetchStories(selectedServiceType.id, currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to save story");
    } finally {
      setButtonLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      service_type_id: item.service_type_id,
      name: item.name || "",
      designation: item.designation || "",
      message: item.message || "",
      retings: item.retings || "",
      is_active: item.is_active,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const response = await api.delete(`/admin/customer-success-stories/delete/${id}`);
      if (response.data.status) {
        toast.success("Story deleted successfully");
        fetchStories(selectedServiceType.id, currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete story");
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (item) => {
    try {
      const response = await api.patch(
        `/admin/customer-success-stories/${item.id}/toggle-status`,
        {
          is_active: !item.is_active,
        }
      );
      if (response.data.status) {
        toast.success(
          `Story ${!item.is_active ? "activated" : "deactivated"} successfully`
        );
        fetchStories(selectedServiceType.id, currentPage);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      service_type_id: selectedServiceType?.id || "",
      name: "",
      designation: "",
      message: "",
      retings: "",
      is_active: true,
    });
    setFormErrors({});
    setEditingItem(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Filter items based on search, status, and rating
  const filteredItems = stories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.message &&
        item.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && item.is_active) ||
      (filterStatus === "inactive" && !item.is_active);
    
    const matchesRating =
      filterRating === "all" ||
      (filterRating === "5" && item.retings === 5) ||
      (filterRating === "4" && item.retings === 4) ||
      (filterRating === "3" && item.retings === 3) ||
      (filterRating === "2" && item.retings === 2) ||
      (filterRating === "1" && item.retings === 1);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            size={16}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // Loading skeleton
  if (loading) {
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
              Customer Success Stories Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage customer testimonials and success stories for each service
            </p>
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Select Service Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceTypes.map((service) => (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceTypeSelect(service)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  selectedServiceType?.id === service.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    selectedServiceType?.id === service.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {service.id}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {selectedServiceType && (
          <>
            {/* Add Button */}
            <div className="flex justify-end mb-6">
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
                {showForm ? "Cancel" : `Add Story for ${selectedServiceType.name}`}
              </motion.button>
            </div>

            {/* Form Section */}
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
                      {editingItem ? "Edit Story" : `Add New Story for ${selectedServiceType.name}`}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                              formErrors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter customer name"
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
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
                            value={formData.designation}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                              formErrors.designation ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="e.g., HR Manager"
                          />
                          {formErrors.designation && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.designation}</p>
                          )}
                        </div>

                        {/* Rating */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating (1-5) <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="retings"
                            value={formData.retings}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                              formErrors.retings ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select rating</option>
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Good</option>
                            <option value="2">2 Stars - Fair</option>
                            <option value="1">1 Star - Poor</option>
                          </select>
                          {formErrors.retings && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.retings}</p>
                          )}
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

                        {/* Message */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Testimonial Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                              formErrors.message ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Write customer testimonial..."
                          />
                          {formErrors.message && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                          )}
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
                          disabled={buttonLoading}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            buttonLoading 
                              ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed' 
                              : 'bg-gray-900 text-white hover:bg-white hover:text-gray-900 border border-gray-900'
                          }`}
                        >
                          {buttonLoading ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>{editingItem ? "Updating..." : "Creating..."}</span>
                            </>
                          ) : (
                            <span>{editingItem ? "Update Story" : "Add Story"}</span>
                          )}
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
                    placeholder="Search by name, designation, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

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
                    onClick={() => fetchStories(selectedServiceType.id, 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stories List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="max-w-[450px] md:max-w-[800px] lg:max-w-[1240px] overflow-x-auto">
                <div className="w-full min-w-[1240px] lg:min-w-[800px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                    <div className="col-span-2">Customer</div>
                    <div className="col-span-3">Designation</div>
                    <div className="col-span-4">Message</div>
                    <div className="col-span-1 text-center">Rating</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-center">Actions</div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {loadingItems ? (
                      <div className="p-8 text-center text-gray-500">
                        <RefreshCw size={40} className="mx-auto mb-4 text-gray-400 animate-spin" />
                        <p>Loading stories...</p>
                      </div>
                    ) : filteredItems.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>No customer stories found</p>
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                        >
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-gray-100 rounded-lg">
                                <User size={18} className="text-gray-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-3">
                            <div className="flex items-center gap-2">
                              <Briefcase size={16} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {item.designation}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-4">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              "{item.message}"
                            </p>
                          </div>

                          <div className="col-span-1 text-center">
                            <div className="flex justify-center">
                              {renderStars(item.retings)}
                            </div>
                          </div>

                          <div className="col-span-1 text-center">
                            <button
                              onClick={() => handleToggleStatus(item)}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.is_active
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              } transition-colors`}
                            >
                              {item.is_active ? "Active" : "Inactive"}
                            </button>
                          </div>

                          <div className="col-span-1 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={18} className="text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
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
                  {totalPages > 1 && !loadingItems && (
                    <div className="flex items-center justify-between p-4 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
            {stories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Stories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stories.length}
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
                      <p className="text-sm text-gray-600">Active Stories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stories.filter((s) => s.is_active).length}
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
                          stories.reduce((acc, s) => acc + (s.retings || 0), 0) / 
                          stories.length || 0
                        ).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <StarIcon className="w-5 h-5 text-blue-600 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">5-Star Stories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stories.filter((s) => s.retings === 5).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HandleServicesCustomerStories;