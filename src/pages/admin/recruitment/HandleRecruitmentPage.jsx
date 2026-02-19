import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  FileText,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleRecruitmentPage = () => {
  const [recruitmentData, setRecruitmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    badge_text: "",
    title: "",
    highalited_title: "",
    title_meta: "",
    description: "",
    desc_meta: "",
    is_active: true,
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch recruitment data on component mount
  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  const fetchRecruitmentData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming GET endpoint is admin/recruitments
      const response = await api.get("/admin/recruitments/edit");
      if (response.data && response.data.data) {
        setRecruitmentData(response.data.data);
        setFormData(response.data.data);
      } else {
        // No data found - first time add scenario
        setRecruitmentData(null);
        setFormData({
          badge_text: "",
          title: "",
          highalited_title: "",
          title_meta: "",
          description: "",
          desc_meta: "",
          is_active: true,
        });
      }
    } catch (err) {
      // If 404 or no data, it's first time add
      if (err.status === 404) {
        setRecruitmentData(null);
      } else {
        setError(err.message || "Failed to fetch recruitment data");
      }
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

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.badge_text?.trim())
      errors.badge_text = "Badge text is required";
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.highalited_title?.trim())
      errors.highalited_title = "Highlighted title is required";
    if (!formData.description?.trim())
      errors.description = "Description is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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
      let response;

      if (recruitmentData) {
        // Update existing data
        response = await api.post("/admin/recruitments/update", formData);
      } else {
        // Add new data
        response = await api.post("/admin/recruitments", formData);
      }

      if (response.data) {
        setRecruitmentData(formData);
        setSuccess(
          recruitmentData
            ? "Recruitment data updated successfully!"
            : "Recruitment data added successfully!",
        );
        setIsEditing(false);

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save recruitment data");
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    if (recruitmentData) {
      setFormData(recruitmentData);
    } else {
      setFormData({
        badge_text: "",
        title: "",
        highalited_title: "",
        title_meta: "",
        description: "",
        desc_meta: "",
        is_active: true,
      });
    }
    setIsEditing(false);
    setValidationErrors({});
    setError(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
          <p className="text-gray-600 font-body">Loading recruitment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Recruitment Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {recruitmentData
                    ? "Update your recruitment page content"
                    : "Add recruitment page content for the first time"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Preview Toggle */}
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                {previewMode ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>{previewMode ? "Edit Mode" : "Preview Mode"}</span>
              </button>

              {/* Edit/Save buttons */}
              {!previewMode && (
                <>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>
                        {recruitmentData ? "Edit Content" : "Add Content"}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>{recruitmentData ? "Update" : "Save"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
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

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Preview Mode */}
          {previewMode ? (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                {/* Badge */}
                {formData.badge_text && (
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4 mr-1" />
                    {formData.badge_text}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {formData.title}{" "}
                  {formData.highalited_title && (
                    <span className="text-gray-600">
                      {formData.highalited_title}
                    </span>
                  )}
                </h1>

                {/* Meta Title */}
                {formData.title_meta && (
                  <p className="text-lg text-gray-600 mb-6">
                    {formData.title_meta}
                  </p>
                )}

                {/* Description */}
                {formData.description && (
                  <div className="prose prose-lg max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formData.description }} />
                      {/* {formData.description} */}
                    {/* </p> */}
                  </div>
                )}

                {/* Description Meta */}
                {formData.desc_meta && (
                  <p className="text-sm text-gray-500 italic">
                    {formData.desc_meta}
                  </p>
                )}

                {/* Status Badge */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      formData.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {formData.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode Form */
            <form onSubmit={handleSubmit} className="p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Badge Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="badge_text"
                    value={formData.badge_text || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } ${validationErrors.badge_text ? "border-red-500" : "border-gray-200"}`}
                    placeholder="e.g., RECRUITMENT PLATFORM"
                  />
                  {validationErrors.badge_text && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.badge_text}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } ${validationErrors.title ? "border-red-500" : "border-gray-200"}`}
                    placeholder="e.g., Welcome to Skilled Workers Cloud"
                  />
                  {validationErrors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.title}
                    </p>
                  )}
                </div>

                {/* Highlighted Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highlighted Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="highalited_title"
                    value={formData.highalited_title || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } ${validationErrors.highalited_title ? "border-red-500" : "border-gray-200"}`}
                    placeholder="e.g., Recruitment Platform"
                  />
                  {validationErrors.highalited_title && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.highalited_title}
                    </p>
                  )}
                </div>

                {/* Title Meta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title Meta (Optional)
                  </label>
                  <input
                    type="text"
                    name="title_meta"
                    value={formData.title_meta || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } border-gray-200`}
                    placeholder="Meta description for title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`${!isEditing ? "pointer-events-none opacity-70" : ""}`}
                  >
                    <CustomTextEditor
                      value={formData.description || ""}
                      height={300}
                      placeholder="Enter detailed description..."
                      onChange={(content) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: content,
                        }))
                      }
                    />
                  </div>

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
                  <input
                    type="text"
                    name="desc_meta"
                    value={formData.desc_meta || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } border-gray-200`}
                    placeholder="Meta description"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active || false}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900 ${
                        !isEditing ? "opacity-50" : ""
                      }`}
                    ></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Active Status
                    </span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {formData.is_active
                      ? "Content is visible on site"
                      : "Content is hidden"}
                  </span>
                </div>

                {/* Read-only Mode Message */}
                {!isEditing && recruitmentData && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You are in view mode. Click "Edit Content" to make
                      changes.
                    </p>
                  </div>
                )}

                {/* First-time Add Message */}
                {!isEditing && !recruitmentData && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      No recruitment data found. Click "Add Content" to create
                      new content.
                    </p>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Quick Tips:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • Fields marked with <span className="text-red-500">*</span> are
              required
            </li>
            <li>
              • Toggle between Edit and Preview modes to see how content will
              appear
            </li>
            <li>
              • Use the Active Status switch to control visibility on the
              frontend
            </li>
            <li>• Meta fields are optional but help with SEO</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HandleRecruitmentPage;
