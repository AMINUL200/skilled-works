import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layout,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Users,
  Star,
  HeadphonesIcon,
  Award,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleServicePage = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // State management
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSection, setFilterSection] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  // Image states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    section: "",
    heading: "",
    highalited_text: "",
    heading_meta: "",
    description: "",
    desc_meta: "",
    badge1: "",
    badge2: "",
    image_alt: "",
    client_no: "",
    client_satisfaction: "",
    support: "",
    is_active: true,
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Fetch services from API
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/admin/services");
      if (response.data && response.data.data) {
        setServices(response.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Clean up previous blob URL if exists
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageRemoved(false);

      // Clear validation error
      if (validationErrors.image) {
        setValidationErrors((prev) => ({ ...prev, image: null }));
      }
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setImageRemoved(true);
  };

  // Validate form
  //   const validateForm = () => {
  //     const errors = {};
  //     if (!formData.section?.trim()) errors.section = "Section is required";
  //     if (!formData.heading?.trim()) errors.heading = "Heading is required";
  //     if (!formData.highalited_text?.trim())
  //       errors.highalited_text = "Highlighted text is required";
  //     if (!formData.description?.trim())
  //       errors.description = "Description is required";

  //     // Check if image is present (either existing, new file, or preview)
  //     const hasImage = imagePreview || imageFile || editingService?.image;
  //     if (!hasImage && !imageRemoved) {
  //       errors.image = "Image is required";
  //     }

  //     setValidationErrors(errors);
  //     return Object.keys(errors).length === 0;
  //   };

  const validateForm = () => {
    setValidationErrors({});
    return true; // always allow submit
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      section: "",
      heading: "",
      highalited_text: "",
      heading_meta: "",
      description: "",
      desc_meta: "",
      badge1: "",
      badge2: "",
      image_alt: "",
      client_no: "",
      client_satisfaction: "",
      support: "",
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setImageRemoved(false);
    setValidationErrors({});
    setEditingService(null);
  };

  // Handle add new service
  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // Handle edit service
  const handleEditClick = (service) => {
    setFormData({
      section: service.section || "",
      heading: service.heading || "",
      highalited_text: service.highalited_text || "",
      heading_meta: service.heading_meta || "",
      description: service.description || "",
      desc_meta: service.desc_meta || "",
      badge1: service.badge1 || "",
      badge2: service.badge2 || "",
      image_alt: service.image_alt || "",
      client_no: service.client_no || "",
      client_satisfaction: service.client_satisfaction || "",
      support: service.support || "",
      is_active: service.is_active !== undefined ? service.is_active : true,
    });
    setImagePreview(service.image ? `${STORAGE_URL}${service.image}` : null);
    setImageRemoved(false);
    setEditingService(service);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === "is_active") {
            submitData.append(key, formData[key] ? "1" : "0");
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });

      // Append image if changed
      if (imageFile) {
        submitData.append("image", imageFile);
      } else if (imageRemoved) {
        submitData.append("image", "");
      }

      let response;

      if (editingService) {
        // Update existing service
        response = await api.post(
          `/admin/services/update/${editingService.id}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        // Add new service
        response = await api.post("/admin/services", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data) {
        await fetchServices(); // Refresh the list
        setSuccess(
          editingService
            ? "Service updated successfully!"
            : "Service added successfully!",
        );
        handleCloseModal();

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save service");
      console.error("Error saving service:", err);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete service
  const handleDelete = async (serviceId) => {
    setSaving(true);
    setError(null);

    try {
      await api.delete(`/admin/services/delete/${serviceId}`);
      await fetchServices(); // Refresh the list
      setSuccess("Service deleted successfully!");
      setDeleteConfirm(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete service");
    } finally {
      setSaving(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
    setError(null);
    document.body.style.overflow = "unset";
  };

  // Filter services based on search, status, and section
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.highalited_text
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? service.is_active
          : filterStatus === "inactive"
            ? !service.is_active
            : true;

    const matchesSection =
      filterSection === "all" ? true : service.section === filterSection;

    return matchesSearch && matchesFilter && matchesSection;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get unique sections for filter
  const uniqueSections = [
    ...new Set(services.map((s) => s.section).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Layout className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Service Pages
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your service sections and content
                </p>
              </div>
            </div>

            <button
              onClick={handleAddClick}
              className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 flex-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 flex-1">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full md:w-64"
              />
            </div>

            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="all">All Sections</option>
              {uniqueSections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </p>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all" || filterSection !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first service"}
            </p>
            {!searchTerm &&
              filterStatus === "all" &&
              filterSection === "all" && (
                <button
                  onClick={handleAddClick}
                  className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Service Header */}
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Image Preview */}
                    {service.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={`${STORAGE_URL}${service.image}`}
                          alt={service.image_alt || "Service"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      {/* Badges and Status */}
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {service.section}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            service.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service.is_active ? "Active" : "Inactive"}
                        </span>
                        {service.badge1 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {service.badge1}
                          </span>
                        )}
                        {service.badge2 && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {service.badge2}
                          </span>
                        )}
                      </div>

                      {/* Heading */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {service.heading}{" "}
                        <span className="text-blue-600">
                          {service.highalited_text}
                        </span>
                      </h3>

                      {/* Heading Meta */}
                      {service.heading_meta && (
                        <p className="text-sm text-gray-500 mb-3">
                          {service.heading_meta}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        {service.client_no && (
                          <span className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            Clients: {service.client_no}
                          </span>
                        )}
                        {service.client_satisfaction && (
                          <span className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            Satisfaction: {service.client_satisfaction}
                          </span>
                        )}
                        {service.support && (
                          <span className="flex items-center text-sm text-gray-600">
                            <HeadphonesIcon className="w-4 h-4 mr-1 text-gray-400" />
                            Support: {service.support}
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Created: {formatDate(service.created_at)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Updated: {formatDate(service.updated_at)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditClick(service)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit service"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {deleteConfirm === service.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        // <button
                        //   onClick={() => setDeleteConfirm(service.id)}
                        //   className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        //   title="Delete service"
                        // >
                        //   <Trash2 className="w-5 h-5" />
                        // </button> 
                        ""
                      )}

                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === service.id ? null : service.id,
                          )
                        }
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedId === service.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-4">
                        {/* Full Description */}
                        {service.desc_meta && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Description Meta
                            </h4>
                            <p className="text-sm text-gray-600">
                              {service.desc_meta}
                            </p>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.badge1 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Badge 1
                              </h4>
                              <p className="text-sm text-gray-600 whitespace-pre-line">
                                {service.badge1}
                              </p>
                            </div>
                          )}

                          {service.badge2 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Badge 2
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.badge2}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Stats Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {service.client_no && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Client Count
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.client_no}
                              </p>
                            </div>
                          )}
                          {service.client_satisfaction && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Client Satisfaction
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.client_satisfaction}
                              </p>
                            </div>
                          )}
                          {service.support && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Support
                              </h4>
                              <p className="text-sm text-gray-600 whitespace-pre-line">
                                {service.support}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Image Alt */}
                        {service.image_alt && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Image Alt Text
                            </h4>
                            <p className="text-sm text-gray-500 italic">
                              {service.image_alt}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/50 z-[999]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[1000] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-full max-w-4xl bg-white rounded-xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingService ? "Edit Service" : "Add New Service"}
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <form onSubmit={handleSubmit} id="service-form">
                      <div className="space-y-4">
                        {/* Section Input - Changed to normal text input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.section
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter section name (e.g., section1, section2, section3)"
                          />
                          {validationErrors.section && (
                            <p className="mt-1 text-sm text-red-500">
                              {validationErrors.section}
                            </p>
                          )}
                        </div>

                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Image{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div
                            className={`border-2 border-dashed rounded-lg p-4 text-center ${
                              validationErrors.image
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {imagePreview ? (
                              <div className="relative">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="max-h-48 mx-auto rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="py-8">
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm text-gray-600 mb-2">
                                  {editingService && !imageRemoved
                                    ? "Current image will be kept"
                                    : "No image selected"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Recommended size: 800x600px • Max 5MB
                                </p>
                              </div>
                            )}

                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-colors cursor-pointer"
                            >
                              {imagePreview ? "Change Image" : "Select Image"}
                            </label>
                          </div>
                          {validationErrors.image && (
                            <p className="mt-1 text-sm text-red-500">
                              {validationErrors.image}
                            </p>
                          )}
                        </div>

                        {/* Image Alt Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Alt Text
                          </label>
                          <input
                            type="text"
                            name="image_alt"
                            value={formData.image_alt || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Describe the image for accessibility"
                          />
                        </div>

                        {/* Heading */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Heading <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="heading"
                              value={formData.heading}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                                validationErrors.heading
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                              placeholder="e.g., Built for Growth,"
                            />
                            {validationErrors.heading && (
                              <p className="mt-1 text-sm text-red-500">
                                {validationErrors.heading}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Highlighted Text{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="highalited_text"
                              value={formData.highalited_text}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                                validationErrors.highalited_text
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                              placeholder="e.g., Designed for Success"
                            />
                            {validationErrors.highalited_text && (
                              <p className="mt-1 text-sm text-red-500">
                                {validationErrors.highalited_text}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Heading Meta */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heading Meta (Subtitle)
                          </label>
                          <input
                            type="text"
                            name="heading_meta"
                            value={formData.heading_meta || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="e.g., Transform Your HR Operations"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                          </label>

                          <CustomTextEditor
                            value={formData.description || ""}
                            height={300}
                            placeholder="Enter service description..."
                            onChange={(content) =>
                              setFormData((prev) => ({
                                ...prev,
                                description: content,
                              }))
                            }
                          />

                          {validationErrors.description && (
                            <p className="mt-1 text-sm text-red-500">
                              {validationErrors.description}
                            </p>
                          )}
                        </div>

                        {/* Description Meta */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description Meta (Optional)
                          </label>
                          <textarea
                            name="desc_meta"
                            value={formData.desc_meta || ""}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Meta description for SEO"
                          />
                        </div>

                        {/* Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Badge 1
                            </label>
                            <textarea
                              name="badge1"
                              value={formData.badge1 || ""}
                              onChange={handleInputChange}
                              rows={2}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., Award\nBest HR-Tech 2024"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Badge 2
                            </label>
                            <input
                              type="text"
                              name="badge2"
                              value={formData.badge2 || ""}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., UK Trusted HR-Tech Partner"
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Client Count
                            </label>
                            <input
                              type="text"
                              name="client_no"
                              value={formData.client_no || ""}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., 560"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Client Satisfaction
                            </label>
                            <input
                              type="text"
                              name="client_satisfaction"
                              value={formData.client_satisfaction || ""}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., 95%"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Support
                            </label>
                            <textarea
                              name="support"
                              value={formData.support || ""}
                              onChange={handleInputChange}
                              rows={2}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., 24/7\nSupport"
                            />
                          </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center space-x-3 pt-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="is_active"
                              checked={formData.is_active}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                            <span className="ml-3 text-sm font-medium text-gray-700">
                              Active Status
                            </span>
                          </label>
                          <span className="text-sm text-gray-500">
                            {formData.is_active
                              ? "Service is visible on site"
                              : "Service is hidden"}
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="service-form"
                      disabled={saving}
                      className="px-4 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>
                            {editingService ? "Update Service" : "Save Service"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandleServicePage;
