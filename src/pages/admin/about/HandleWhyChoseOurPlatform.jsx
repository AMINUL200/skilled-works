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
  Hash,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleWhyChoseOurPlatform = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // State for list
  const [itemList, setItemList] = useState([]);
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
    number: "",
    heading: "",
    heading_meta: "",
    description: "",
    description_meta: "",
    button_name: "",
    button_url: "",
    image: null,
    is_active: true,
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for expanded items
  const [expandedItems, setExpandedItems] = useState([]);

  // Fetch list
  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/why-choose");
      if (response.data.status) {
        setItemList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = itemList;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.button_name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, itemList]);

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
      number: "",
      heading: "",
      heading_meta: "",
      description: "",
      description_meta: "",
      button_name: "",
      button_url: "",
      image: null,
      is_active: true,
    });
    setImagePreview(null);
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
      number: item.number || "",
      heading: item.heading || "",
      heading_meta: item.heading_meta || "",
      description: item.description || "",
      description_meta: item.description_meta || "",
      button_name: item.button_name || "",
      button_url: item.button_url || "",
      image: null,
      is_active: item.is_active,
    });
    setImagePreview(item.image || null);
    setExistingImage(item.image || null);
    setFormErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/admin/why-choose/${id}`);
        fetchList();
      } catch (error) {
        console.error("Error deleting item:", error);
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

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 2MB",
        }));
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setExistingImage(null);

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
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setExistingImage(null);
  };

  // Prepare FormData for submission
  const prepareFormData = () => {
    const formDataObj = new FormData();

    // Add all text fields
    Object.keys(formData).forEach((key) => {
      if (
        key !== "image" &&
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        if (key === "is_active") {
          formDataObj.append(key, formData[key] ? "1" : "0");
        } else {
          formDataObj.append(key, formData[key]);
        }
      }
    });

    // Add image file if exists
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    // For edit mode: if existing image was removed and no new image uploaded
    if (formMode === "edit" && !existingImage && !formData.image) {
      formDataObj.append("image", ""); // Send empty to delete existing image
    }

    return formDataObj;
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.number) {
      errors.number = "Number is required";
    } else if (isNaN(formData.number) || parseInt(formData.number) < 0) {
      errors.number = "Please enter a valid positive number";
    }

    if (!formData.heading.trim()) {
      errors.heading = "Heading is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (formData.button_name && !formData.button_url) {
      errors.button_url = "Button URL is required when button name is provided";
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
      const formDataObj = prepareFormData();

      let response;
      if (formMode === "add") {
        response = await api.post("/admin/why-choose", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post(
          `/admin/why-choose/${currentId}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      if (response.data.status) {
        setShowForm(false);
        fetchList();
      }
    } catch (error) {
      console.error("Error saving item:", error);
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
      await api.patch(`/admin/why-choose-us/${id}/status`, {
        is_active: !currentStatus,
      });
      fetchList();
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
          <p className="text-[#4B5563]">Loading data...</p>
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
            Why Choose Our Platform
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage the reasons why customers should choose your platform
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {/* Form Section (Top) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#0A0A0A]">
                {formMode === "add" ? "Add New Item" : "Edit Item"}
              </h3>
              <p className="text-[#4B5563] text-sm mt-1">
                {formMode === "add"
                  ? "Create a new reason to choose your platform"
                  : "Update the item details"}
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
                {/* Number */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Hash size={16} className="inline mr-2" />
                    Number *
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.number
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    }`}
                    placeholder="e.g., 1, 2, 3"
                  />
                  {formErrors.number && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.number}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Display number/order for this item
                  </p>
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
                  placeholder="e.g., UK-compliant, 24/7 Support, Customizable"
                />
                {formErrors.heading && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.heading}
                  </p>
                )}
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
              <div
                className={`rounded-xl border ${
                  formErrors.description ? "border-red-300" : "border-[#E5E7EB]"
                }`}
              >
                <CustomTextEditor
                  value={formData.description}
                  height={300}
                  placeholder="Detailed description of why customers should choose your platform"
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

            {/* Button Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                Call to Action Button
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    {/* <Button size={16} className="inline mr-2" /> */}
                    Button Name
                  </label>
                  <input
                    type="text"
                    name="button_name"
                    value={formData.button_name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    placeholder="e.g., Learn More, Get Started"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Link size={16} className="inline mr-2" />
                    Button URL
                  </label>
                  <input
                    type="url"
                    name="button_url"
                    value={formData.button_url}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.button_url
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                    }`}
                    placeholder="https://example.com/page"
                  />
                  {formErrors.button_url && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.button_url}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                Image
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
                  Recommended size: 800x600px. Max size: 2MB.
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
                      {formMode === "add" ? "Create Item" : "Update Item"}
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
                placeholder="Search by heading, description, or button name..."
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
          <p className="text-[#4B5563] text-sm">Total Items</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {itemList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Items</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {itemList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Items</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {itemList.filter((item) => !item.is_active).length}
          </p>
        </div>
      </div>

      {/* List */}
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
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        #{item.number}
                      </span>
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
                              alt={item.heading}
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
                      </div>

                      {/* Button */}
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          <Link size={16} className="inline mr-2" />
                          Button
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {item.button_name ? (
                            <>
                              <p className="font-medium text-[#0A0A0A] mb-1">
                                {item.button_name}
                              </p>
                              <a
                                href={item.button_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm break-all"
                              >
                                {item.button_url}
                              </a>
                            </>
                          ) : (
                            <span className="text-gray-400 italic">
                              No button configured
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
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                        {item.description}
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Heading Meta
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
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
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {item.description_meta || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
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
                            {new Date(item.created_at).toLocaleDateString()}{" "}
                            {new Date(item.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Last Updated
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
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
                No Items Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "No items match your search criteria"
                  : 'Get started by adding your first "Why Choose Us" item'}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Add Your First Item
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
              About "Why Choose Our Platform"
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Display key reasons why customers should choose your platform
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  Each item includes a number, heading, description, and
                  optional button
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Meta fields help with SEO and internal organization</span>
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

export default HandleWhyChoseOurPlatform;
