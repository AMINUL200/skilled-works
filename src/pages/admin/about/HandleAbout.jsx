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
  Check,
  AlertCircle,
  Image as ImageIcon,
  Star,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleAbout = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // State for about list
  const [aboutList, setAboutList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for form (add/edit)
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [currentId, setCurrentId] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    heading: "",
    highlighted_text: "",
    heading_meta: "",
    description: "",
    description_meta: "",
    image: null,
    image_alt: "",
    is_active: true,
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for expanded items
  const [expandedItems, setExpandedItems] = useState([]);

  // Fetch about list
  const fetchAboutList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/about");
      if (response.data.status) {
        setAboutList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching about list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = aboutList;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.highlighted_text
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, aboutList]);

  // Toggle item expansion
  const toggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // Handle add new
  const handleAddNew = () => {
    setFormMode("add");
    setFormData({
      heading: "",
      highlighted_text: "",
      heading_meta: "",
      description: "",
      description_meta: "",
      image: null,
      image_alt: "",
      is_active: true,
    });
    setImagePreview(null);
    setImageFile(null);
    setExistingImage(null);
    setFormErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle edit
  const handleEdit = (item) => {
    setFormMode("edit");
    setCurrentId(item.id);
    setFormData({
      heading: item.heading || "",
      highlighted_text: item.highlighted_text || "",
      heading_meta: item.heading_meta || "",
      description: item.description || "",
      description_meta: item.description_meta || "",
      image: null,
      image_alt: item.image_alt || "",
      is_active: item.is_active,
    });
    setImagePreview(item.image || null);
    setImageFile(null);
    setExistingImage(item.image || null);
    setFormErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this about section?")) {
      try {
        await api.delete(`/admin/about/${id}`);
        fetchAboutList();
      } catch (error) {
        console.error("Error deleting about section:", error);
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

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setExistingImage(null); // Clear existing image when new file is uploaded

      if (formErrors.image) {
        setFormErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
    setExistingImage(null);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.heading.trim()) {
      errors.heading = "Heading is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Prepare FormData for submission
  const prepareFormData = () => {
    const formDataObj = new FormData();

    // Add all text fields - even if empty, send them as empty strings
    // This ensures the backend receives all expected fields
    const fieldsToSend = [
      "heading",
      "highlighted_text",
      "heading_meta",
      "description",
      "description_meta",
      "image_alt",
    ];

    fieldsToSend.forEach((key) => {
      // Always append the field, even if empty
      const value = formData[key] || "";
      formDataObj.append(key, value);
    });

    // Handle is_active separately (boolean to string)
    formDataObj.append("is_active", formData.is_active ? "1" : "0");

    // Add image file if exists
    if (imageFile) {
      formDataObj.append("image", imageFile);
    }

    // For edit mode: if existing image was removed and no new image uploaded
    if (formMode === "edit" && !existingImage && !imageFile) {
      formDataObj.append("image", ""); // Send empty to delete existing image
    }

    // For PUT request using POST spoofing
    if (formMode === "edit") {
      formDataObj.append("_method", "PUT");
    }

    return formDataObj;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataObj = prepareFormData();

      let response;
      if (formMode === "add") {
        response = await api.post("/admin/about", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Use POST with _method=PUT for file uploads
        response = await api.post(`/admin/about/${currentId}`, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.status) {
        setShowForm(false);
        fetchAboutList();
      }
    } catch (error) {
      console.error("Error saving about section:", error);
      if (error.response?.data?.errors) {
        const backendErrors = {};
        Object.keys(error.response.data.errors).forEach((key) => {
          if (Array.isArray(error.response.data.errors[key])) {
            backendErrors[key] = error.response.data.errors[key][0];
          } else {
            backendErrors[key] = error.response.data.errors[key];
          }
        });
        setFormErrors(backendErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active status
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/admin/about/${id}/status`, {
        is_active: !currentStatus,
      });
      fetchAboutList();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading about sections...</p>
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
            About Sections
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage about sections for your website
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Section
        </button>
      </div>

      {/* Form Section (Top) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#0A0A0A]">
                {formMode === "add"
                  ? "Add New About Section"
                  : "Edit About Section"}
              </h3>
              <p className="text-[#4B5563] text-sm mt-1">
                {formMode === "add"
                  ? "Create a new about section for your website"
                  : "Update the about section details"}
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
                {/* Heading */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Type size={16} className="inline mr-2" />
                    Heading *
                  </label>
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
                    placeholder="e.g., About Our Company, About Skilled Workers Cloud"
                  />
                  {formErrors.heading && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.heading}
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

              {/* Highlighted Text */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <Star size={16} className="inline mr-2" />
                  Highlighted Text
                </label>
                <input
                  type="text"
                  name="highlighted_text"
                  value={formData.highlighted_text}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  placeholder="e.g., HR-Tech Excellence, Industry Leaders"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional highlighted text that appears with special styling
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
                <div
                  className={`rounded-xl border ${
                    formErrors.description
                      ? "border-red-300"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <CustomTextEditor
                    value={formData.description}
                    height={300}
                    placeholder="Detailed description about your company or section"
                    onChange={(content) => {
                      setFormData((prev) => ({
                        ...prev,
                        description: content,
                      }));

                      if (formErrors.description) {
                        setFormErrors((prev) => ({
                          ...prev,
                          description: "",
                        }));
                      }
                    }}
                  />
                </div>

                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.description}
                  </p>
                )}
              </div>

              {/* Description Meta */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  Description Meta
                </label>
                <input
                  type="text"
                  name="description_meta"
                  value={formData.description_meta}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  placeholder="Meta information for SEO (optional)"
                />
              </div>
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                About Image
              </h4>

              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <ImageIcon size={16} className="inline mr-2" />
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={
                            imagePreview.startsWith("blob:")
                              ? imagePreview
                              : `${STORAGE_URL}${imagePreview}`
                          }
                          alt="Preview"
                          className="w-full max-h-64 object-contain mx-auto"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <label className="inline-block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
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
                      <label className="inline-block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
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
                  Recommended size: 1200x800px. Max size: 5MB.
                </p>
              </div>

              {/* Image Alt Text */}
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
                  placeholder="Descriptive text for image (SEO)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Helps with accessibility and SEO
                </p>
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
                      {formMode === "add" ? "Create Section" : "Update Section"}
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
                placeholder="Search by heading, description, or highlighted text..."
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
          <p className="text-[#4B5563] text-sm">Total Sections</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {aboutList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Sections</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {aboutList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Sections</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {aboutList.filter((item) => !item.is_active).length}
          </p>
        </div>
      </div>

      {/* About List */}
      <div className="space-y-4">
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          item.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.is_active ? (
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
                      <span className="text-sm text-[#4B5563]">
                        ID: {item.id}
                      </span>
                      {item.highlighted_text && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          {item.highlighted_text}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A]">
                      {item.heading}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleActiveStatus(item.id, item.is_active)
                      }
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition whitespace-nowrap"
                    >
                      {item.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title={
                        expandedItems.includes(item.id) ? "Collapse" : "Expand"
                      }
                    >
                      {expandedItems.includes(item.id) ? (
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
                    <MessageSquare size={14} />
                    {item.description.substring(0, 100)}
                    {item.description.length > 100 && "..."}
                  </span>
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(item.id) && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-6">
                    {/* Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          <ImageIcon size={16} className="inline mr-2" />
                          Image
                        </label>
                        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                          {item.image ? (
                            <img
                              src={`${STORAGE_URL}${item.image}`}
                              alt={item.image_alt || item.heading}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
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
                        {item.image_alt && (
                          <p className="text-xs text-[#4B5563] mt-1">
                            Alt text: {item.image_alt}
                          </p>
                        )}
                      </div>

                      {/* Meta Information */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#4B5563] mb-2">
                            Heading Meta
                          </label>
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                            {item.heading_meta || (
                              <span className="text-gray-400 italic">
                                Not set
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#4B5563] mb-2">
                            Description Meta
                          </label>
                          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                            {item.description_meta || (
                              <span className="text-gray-400 italic">
                                Not set
                              </span>
                            )}
                          </div>
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
                        {item.description}
                      </div>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Created
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                          <p className="text-sm text-gray-600">
                            {new Date(item.created_at).toLocaleDateString()}{" "}
                            {new Date(item.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Last Updated
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                          <p className="text-sm text-gray-600">
                            {new Date(item.updated_at).toLocaleDateString()}{" "}
                            {new Date(item.updated_at).toLocaleTimeString()}
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
                No About Sections Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "No sections match your search criteria"
                  : "Get started by creating your first about section"}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First Section
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
              About "About Sections"
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Display company information, mission, values, and history
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Each section includes heading, description, and optional image
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Highlighted text appears with special styling for emphasis
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Meta fields help with SEO and internal organization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleAbout;
