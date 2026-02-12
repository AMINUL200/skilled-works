import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Type,
  MessageSquare,
  Tag,
  Link,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Video,
  Star,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleServiceType = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  
  // State for service list
  const [serviceList, setServiceList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for form (add/edit)
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    badge_text: "",
    name: "",
    heading: "",
    highlighted_text: "",
    heading_meta: "",
    description: "",
    button_name: "",
    image: null,
    video: "",
    image_alt: "",
    is_active: true,
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for expanded service items
  const [expandedItems, setExpandedItems] = useState([]);

  // Fetch service list
  const fetchServiceList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/service-type");
      if (response.data.status) {
        setServiceList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching service list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = serviceList;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, serviceList]);

  // Toggle service item expansion
  const toggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // Handle add new service
  const handleAddNew = () => {
    setFormMode("add");
    setFormData({
      badge_text: "",
      name: "",
      heading: "",
      highlighted_text: "",
      heading_meta: "",
      description: "",
      button_name: "",
      image: null,
      video: "",
      image_alt: "",
      is_active: true,
    });
    setImagePreview(null);
    setExistingImage(null);
    setFormErrors({});
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle edit service
  const handleEdit = (service) => {
    setFormMode("edit");
    setCurrentId(service.id);
    setFormData({
      badge_text: service.badge_text || "",
      name: service.name || "",
      heading: service.heading || "",
      highlighted_text: service.highlighted_text || "",
      heading_meta: service.heading_meta || "",
      description: service.description || "",
      button_name: service.button_name || "",
      image: null,
      video: service.video || "",
      image_alt: service.image_alt || "",
      is_active: service.is_active,
    });
    
    // Set image preview using the image path with storage URL
    setImagePreview(service.image || null);
    setExistingImage(service.image || null);
    setFormErrors({});
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.delete(`/admin/service-type/${id}`);
        fetchServiceList(); // Refresh list
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file",
        }));
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 2MB",
        }));
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Store the file object
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Clear existing image
      setExistingImage(null);

      // Clear error
      if (formErrors.image) {
        setFormErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setExistingImage(null);
  };

  // Prepare FormData for submission
  const prepareFormData = () => {
    const formDataToSend = new FormData();

    // Add all text fields
    Object.keys(formData).forEach((key) => {
      if (
        key !== "image" &&
        formData[key] !== null &&
        formData[key] !== undefined
      ) {
        if (typeof formData[key] === "boolean") {
          formDataToSend.append(key, formData[key] ? "1" : "0");
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    // Add image file if exists
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // For edit mode: if existing image was removed and no new image uploaded
    if (formMode === "edit" && !existingImage && !formData.image) {
      formDataToSend.append("image", ""); // Send empty to delete existing image
    }

    return formDataToSend;
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Service name is required";
    }

    if (!formData.heading.trim()) {
      errors.heading = "Heading is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.button_name.trim()) {
      errors.button_name = "Button name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = prepareFormData();

      let response;
      if (formMode === "add") {
        response = await api.post("/admin/service-type", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post(
          `/admin/service-type/${currentId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      if (response.data.status) {
        setShowForm(false);
        fetchServiceList(); // Refresh list
      }
    } catch (error) {
      console.error("Error saving service:", error);
      // Handle backend validation errors
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active status
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/admin/service-type/${id}/status`, {
        is_active: !currentStatus,
      });
      fetchServiceList(); // Refresh list
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading service types...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-[#0A0A0A]">
            Service Type Management
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage service types and their details for your website
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      {/* Form Section (Top) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#0A0A0A]">
                {formMode === "add" ? "Add New Service" : "Edit Service"}
              </h3>
              <p className="text-[#4B5563] text-sm mt-1">
                {formMode === "add"
                  ? "Create a new service type"
                  : "Update the service details"}
              </p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-[#F3F4F6] rounded-lg transition"
            >
              <X size={24} className="text-[#4B5563]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                Basic Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Tag size={16} className="inline mr-2" />
                    Service Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    }`}
                    placeholder="e.g., HRMS Software, Recruitment Platform"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Badge Text */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Star size={16} className="inline mr-2" />
                    Badge Text
                  </label>
                  <input
                    type="text"
                    name="badge_text"
                    value={formData.badge_text}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    placeholder="e.g., UK's Leading HR-Tech Solution"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional badge/tag that appears above the heading
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <Type size={16} className="inline mr-2" />
                  Heading *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.heading
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    }`}
                    placeholder="Main heading for the service"
                  />
                  <input
                    type="text"
                    name="highlighted_text"
                    value={formData.highlighted_text}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    placeholder="Highlighted text (optional)"
                  />
                </div>
                {formErrors.heading && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.heading}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Highlighted text appears after the main heading with special
                  styling
                </p>
              </div>

              {/* Heading Meta */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  Heading Meta
                </label>
                <input
                  type="text"
                  name="heading_meta"
                  value={formData.heading_meta}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  placeholder="Meta information for SEO (optional)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <MessageSquare size={16} className="inline mr-2" />
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className={`w-full p-3 rounded-xl border ${
                    formErrors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  }`}
                  placeholder="Provide a detailed description of the service. Use \n\n for paragraph breaks."
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Use double line breaks (\n\n) to separate paragraphs
                </p>
              </div>
            </div>

            {/* Button Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                Call to Action Button
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    Button Text *
                  </label>
                  <input
                    type="text"
                    name="button_name"
                    value={formData.button_name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.button_name
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    }`}
                    placeholder="e.g., Book a Demo, Learn More"
                  />
                  {formErrors.button_name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.button_name}
                    </p>
                  )}
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0A0A0A] rounded"
                    />
                    <span className="text-sm font-medium text-[#4B5563]">
                      Active (Show on website)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                Service Image
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <ImageIcon size={16} className="inline mr-2" />
                    Service Image
                  </label>
                  <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <div className="relative">
                          {/* Check if it's a new upload (blob URL) or existing image (storage path) */}
                          <img
                            src={imagePreview.startsWith('blob:') 
                              ? imagePreview 
                              : `${STORAGE_URL}${imagePreview}`
                            }
                            alt="Service preview"
                            className="w-full h-48 object-contain mx-auto"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                          Change Image
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                          <ImageIcon className="text-gray-400 mb-2" size={32} />
                          <p className="text-sm text-gray-500">
                            No image selected
                          </p>
                          {formMode === "edit" && existingImage && (
                            <p className="text-xs text-gray-400 mt-1">
                              Existing image will be kept
                            </p>
                          )}
                        </div>
                        <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                          Upload Image
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {formErrors.image && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.image}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 800x600px. Max size: 2MB.
                  </p>
                </div>

                {/* Image Alt Text & Video */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      name="image_alt"
                      value={formData.image_alt}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="Descriptive text for accessibility"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      <Video size={16} className="inline mr-2" />
                      Video URL
                    </label>
                    <input
                      type="url"
                      name="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="https://www.youtube.com/ or https://vimeo.com/"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: YouTube or Vimeo video URL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-white text-[#0A0A0A] border border-[#E5E7EB] rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {formMode === "add" ? "Create Service" : "Update Service"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by service name, heading, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#4B5563]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Total Services</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {serviceList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Services</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {serviceList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Services</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {serviceList.filter((item) => !item.is_active).length}
          </p>
        </div>
      </div>

      {/* Service List */}
      <div className="space-y-4">
        {filteredList.length > 0 ? (
          filteredList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          service.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.is_active ? (
                          <>
                            <Eye size={12} />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            Inactive
                          </>
                        )}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        ID: {service.id}
                      </span>
                      {service.badge_text && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          {service.badge_text}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A]">
                      {service.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleActiveStatus(service.id, service.is_active)
                      }
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition whitespace-nowrap"
                    >
                      {service.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title={
                        expandedItems.includes(service.id)
                          ? "Collapse"
                          : "Expand"
                      }
                    >
                      {expandedItems.includes(service.id) ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Brief Info */}
                <div className="flex flex-wrap gap-4 text-sm text-[#4B5563] mb-2">
                  <span className="flex items-center gap-1">
                    <Type size={14} />
                    {service.heading}
                  </span>
                  {service.highlighted_text && (
                    <span className="flex items-center gap-1">
                      <Star size={14} />
                      {service.highlighted_text}
                    </span>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(service.id) && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-6">
                    {/* Image & Video */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Image */}
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          <ImageIcon size={16} className="inline mr-2" />
                          Service Image
                        </label>
                        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                          {service.image ? (
                            <img
                              src={`${STORAGE_URL}${service.image}`}
                              alt={service.image_alt || service.name}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                              }}
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                              <ImageIcon className="text-gray-400" size={32} />
                              <span className="text-gray-400 ml-2">
                                No image
                              </span>
                            </div>
                          )}
                        </div>
                        {service.image_alt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Alt text: {service.image_alt}
                          </p>
                        )}
                      </div>

                      {/* Video */}
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          <Video size={16} className="inline mr-2" />
                          Video URL
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {service.video ? (
                            <a
                              href={service.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {service.video}
                            </a>
                          ) : (
                            <span className="text-gray-400 italic">
                              No video provided
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <MessageSquare size={16} className="inline mr-2" />
                        Full Description
                      </label>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 whitespace-pre-line">
                        {service.description}
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Heading Meta
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {service.heading_meta || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Button Text
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {service.button_name}
                        </div>
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Created
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <p className="text-sm text-gray-600">
                            {new Date(service.created_at).toLocaleDateString()}{" "}
                            {new Date(service.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Last Updated
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <p className="text-sm text-gray-600">
                            {new Date(service.updated_at).toLocaleDateString()}{" "}
                            {new Date(service.updated_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Services Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "No services match your search criteria"
                  : "Get started by creating your first service"}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First Service
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Information Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 mt-1">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-800 mb-2">
              About Service Type Management
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Services are the main offerings displayed on your website
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Badge text appears as a tag above the service heading
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Highlighted text is displayed after the main heading with
                  special styling
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  URL slug is automatically generated by the backend - no manual
                  entry needed
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Upload images in JPG, PNG, or WebP format (max 2MB)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleServiceType;