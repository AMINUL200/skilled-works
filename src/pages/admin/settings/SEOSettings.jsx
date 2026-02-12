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
  Globe,
} from "lucide-react";
import { api } from "../../../utils/app";
import { toast } from "react-toastify";

const SEOSettings = () => {
  // State for SEO list
  const [seoList, setSeoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("add"); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    page_key: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    robots: "index,follow",
    schema_json: "",
    is_active: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch SEO list
  const fetchSEOList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/seo"); // Adjust endpoint
      if (response.data.status) {
        setSeoList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = seoList;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.page_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.meta_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.meta_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, seoList]);

  // Handle popup open for add
  const handleAddNew = () => {
    setPopupMode("add");
    setFormData({
      page_key: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      og_title: "",
      og_description: "",
      og_image: "",
      canonical_url: "",
      robots: "index,follow",
      schema_json: "",
      is_active: true,
    });
    setFormErrors({});
    setShowPopup(true);
  };

  // Handle popup open for edit
  const handleEdit = (item) => {
    setPopupMode("edit");
    setCurrentId(item.id);
    setFormData({
      page_key: item.page_key,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      meta_keywords: item.meta_keywords,
      og_title: item.og_title,
      og_description: item.og_description,
      og_image: item.og_image,
      canonical_url: item.canonical_url,
      robots: item.robots,
      schema_json:
        typeof item.schema_json === "string"
          ? item.schema_json
          : JSON.stringify(item.schema_json, null, 2),
      is_active: item.is_active,
    });
    setFormErrors({});
    setShowPopup(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this SEO setting?")) {
      try {
        await api.delete(`/admin/seo/${id}`);
        fetchSEOList(); // Refresh list
      } catch (error) {
        console.error("Error deleting SEO setting:", error);
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

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.page_key.trim()) {
      errors.page_key = "Page key is required";
    }

    if (!formData.meta_title.trim()) {
      errors.meta_title = "Meta title is required";
    } else if (formData.meta_title.length > 60) {
      errors.meta_title = "Meta title should be less than 60 characters";
    }

    if (!formData.meta_description.trim()) {
      errors.meta_description = "Meta description is required";
    } else if (formData.meta_description.length > 160) {
      errors.meta_description =
        "Meta description should be less than 160 characters";
    }

    if (!formData.robots.trim()) {
      errors.robots = "Robots directive is required";
    }

    try {
      if (formData.schema_json.trim()) {
        JSON.parse(formData.schema_json);
      }
    } catch (e) {
      errors.schema_json = "Invalid JSON format";
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
      const payload = {
        ...formData,
        schema_json: formData.schema_json.trim()
          ? JSON.parse(formData.schema_json)
          : null,
      };

      let response;
      if (popupMode === "add") {
        response = await api.post("/admin/seo", payload);
      } else {
        response = await api.put(`/admin/seo/${currentId}`, payload);
      }

      if (response.data.status) {
        setShowPopup(false);
        fetchSEOList(); // Refresh list
      }
    } catch (error) {
      console.error("Error saving SEO setting:", error);
      toast.error(error.message || "Error saving SEO setting");
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
      await api.patch(`/seo-settings/${id}/status`, {
        is_active: !currentStatus,
      });
      fetchSEOList(); // Refresh list
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setFormErrors({});
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading SEO settings...</p>
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
            SEO Settings
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage SEO meta tags and settings for different pages
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New SEO
        </button>
      </div>

      {/* Filters */}
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
                placeholder="Search by page key, title, or description..."
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
          <p className="text-[#4B5563] text-sm">Total Pages</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {seoList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Pages</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {seoList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Pages</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {seoList.filter((item) => !item.is_active).length}
          </p>
        </div>
      </div>

      {/* SEO List Table */}
      <div className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden">
        <div className="max-w-[400px] md:max-w-[700px] lg:max-w-[1140px] overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-[#4B5563]">
                  Page
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[#4B5563]">
                  Meta Title
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[#4B5563]">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[#4B5563]">
                  Last Updated
                </th>
                <th className="text-left p-4 text-sm font-semibold text-[#4B5563]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-[#4B5563]" />
                        <span className="font-medium text-[#0A0A0A]">
                          {item.page_key}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs">
                        <p className="text-[#0A0A0A] font-medium truncate">
                          {item.meta_title}
                        </p>
                        <p className="text-[#4B5563] text-sm truncate">
                          {item.meta_description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          toggleActiveStatus(item.id, item.is_active)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          item.is_active
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
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
                      </button>
                    </td>
                    <td className="p-4 text-[#4B5563] text-sm">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#4B5563]">
                    {searchTerm || statusFilter !== "all"
                      ? "No matching SEO settings found"
                      : 'No SEO settings found. Click "Add New SEO" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-xl font-semibold text-[#0A0A0A]">
                  {popupMode === "add"
                    ? "Add New SEO Setting"
                    : "Edit SEO Setting"}
                </h3>
                <p className="text-[#4B5563] text-sm mt-1">
                  Configure SEO meta tags for better search engine visibility
                </p>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-[#F3F4F6] rounded-lg transition"
              >
                <X size={24} className="text-[#4B5563]" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[calc(90vh-140px)]"
            >
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Page Key *
                    </label>
                    <input
                      type="text"
                      name="page_key"
                      value={formData.page_key}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.page_key
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder="e.g., home, about, contact"
                    />
                    {formErrors.page_key && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.page_key}
                      </p>
                    )}
                  </div>

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
                        Active (Show in search results)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Meta Tags */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Meta Tags
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Meta Title *
                      <span className="float-right text-xs font-normal">
                        {formData.meta_title.length}/60
                      </span>
                    </label>
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.meta_title
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder="Page title for search results (max 60 chars)"
                    />
                    {formErrors.meta_title && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.meta_title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Meta Description *
                      <span className="float-right text-xs font-normal">
                        {formData.meta_description.length}/160
                      </span>
                    </label>
                    <textarea
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.meta_description
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder="Brief description for search results (max 160 chars)"
                    />
                    {formErrors.meta_description && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.meta_description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>

                {/* Open Graph */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Open Graph (Social Sharing)
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      OG Title
                    </label>
                    <input
                      type="text"
                      name="og_title"
                      value={formData.og_title}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="Title for social media sharing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      OG Description
                    </label>
                    <textarea
                      name="og_description"
                      value={formData.og_description}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="Description for social media sharing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      OG Image URL
                    </label>
                    <input
                      type="url"
                      name="og_image"
                      value={formData.og_image}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Advanced */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Advanced Settings
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Canonical URL
                      </label>
                      <input
                        type="url"
                        name="canonical_url"
                        value={formData.canonical_url}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="https://example.com/page"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Robots Directive *
                      </label>
                      <select
                        name="robots"
                        value={formData.robots}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.robots
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        }`}
                      >
                        <option value="index,follow">Index, Follow</option>
                        <option value="index,nofollow">Index, NoFollow</option>
                        <option value="noindex,follow">NoIndex, Follow</option>
                        <option value="noindex,nofollow">
                          NoIndex, NoFollow
                        </option>
                      </select>
                      {formErrors.robots && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.robots}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Schema JSON (Structured Data)
                    </label>
                    <textarea
                      name="schema_json"
                      value={formData.schema_json}
                      onChange={handleInputChange}
                      rows="6"
                      className={`w-full p-3 rounded-xl border font-mono text-sm ${
                        formErrors.schema_json
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}'
                    />
                    {formErrors.schema_json && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.schema_json}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#4B5563]">
                      Enter valid JSON for structured data markup
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#E5E7EB] p-6 bg-[#F9FAFB]">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closePopup}
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
                        {popupMode === "add"
                          ? "Create SEO Setting"
                          : "Update SEO Setting"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOSettings;
