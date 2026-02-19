import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
  Link as LinkIcon,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleBanner = () => {
  // State management
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Image states
  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);
  const [webImageFile, setWebImageFile] = useState(null);
  const [mobileImageFile, setMobileImageFile] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    highalited_text: "",
    title_meta: "",
    description: "",
    desc_meta: "",
    image_alt: "",
    first_button: "",
    first_button_url: "",
    second_button: "",
    second_button_url: "",
    is_active: true,
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch banner data on component mount
  useEffect(() => {
    fetchBannerData();
  }, []);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (webImagePreview && webImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webImagePreview);
      }
      if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImagePreview);
      }
    };
  }, [webImagePreview, mobileImagePreview]);

  // Fetch banner data from API
  const fetchBannerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/admin/banners/single");
      if (response.data && response.data.data) {
        const data = response.data.data;
        setBannerData(data);
        setFormData({
          title: data.title || "",
          highalited_text: data.highalited_text || "",
          title_meta: data.title_meta || "",
          description: data.description || "",
          desc_meta: data.desc_meta || "",
          image_alt: data.image_alt || "",
          first_button: data.first_button || "",
          first_button_url: data.first_button_url || "",
          second_button: data.second_button || "",
          second_button_url: data.second_button_url || "",
          is_active: data.is_active === "1" || data.is_active === 1 || data.is_active === true,
        });
        setWebImagePreview(data.web_image ? `${STORAGE_URL}${data.web_image}` : null);
        setMobileImagePreview(data.mobile_image ? `${STORAGE_URL}${data.mobile_image}` : null);
      }
    } catch (err) {
      // If 404 or no data, it's first time add
      if (err.status === 404) {
        setBannerData(null);
      } else {
        setError(err.message || "Failed to fetch banner data");
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
      // Clear any removal flags when changing values
      ...(name === 'web_image' && { web_image_removed: false }),
      ...(name === 'mobile_image' && { mobile_image_removed: false }),
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle web image upload
  const handleWebImageChange = (e) => {
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
      if (webImagePreview && webImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webImagePreview);
      }

      setWebImageFile(file);
      setWebImagePreview(URL.createObjectURL(file));
      setWebImage(file.name);
      
      // Clear removal flag
      setFormData(prev => ({
        ...prev,
        web_image_removed: false
      }));

      // Clear validation error
      if (validationErrors.web_image) {
        setValidationErrors((prev) => ({ ...prev, web_image: null }));
      }
    }
  };

  // Handle mobile image upload
  const handleMobileImageChange = (e) => {
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
      if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImagePreview);
      }

      setMobileImageFile(file);
      setMobileImagePreview(URL.createObjectURL(file));
      setMobileImage(file.name);
      
      // Clear removal flag
      setFormData(prev => ({
        ...prev,
        mobile_image_removed: false
      }));

      // Clear validation error
      if (validationErrors.mobile_image) {
        setValidationErrors((prev) => ({ ...prev, mobile_image: null }));
      }
    }
  };

  // Remove web image
  const handleRemoveWebImage = () => {
    // Clean up blob URL if exists
    if (webImagePreview && webImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(webImagePreview);
    }

    setWebImageFile(null);
    setWebImagePreview(null);
    setWebImage(null);
    
    // Set removal flag
    setFormData(prev => ({
      ...prev,
      web_image_removed: true
    }));

    // Set validation error if required
    if (!bannerData?.web_image) {
      setValidationErrors(prev => ({
        ...prev,
        web_image: "Web image is required"
      }));
    }
  };

  // Remove mobile image
  const handleRemoveMobileImage = () => {
    // Clean up blob URL if exists
    if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(mobileImagePreview);
    }

    setMobileImageFile(null);
    setMobileImagePreview(null);
    setMobileImage(null);
    
    // Set removal flag
    setFormData(prev => ({
      ...prev,
      mobile_image_removed: true
    }));

    // Set validation error if required
    if (!bannerData?.mobile_image) {
      setValidationErrors(prev => ({
        ...prev,
        mobile_image: "Mobile image is required"
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.highalited_text?.trim())
      errors.highalited_text = "Highlighted text is required";
    if (!formData.description?.trim())
      errors.description = "Description is required";
    
    // Check if images are present (either existing, new file, or preview)
    const hasWebImage = webImagePreview || webImageFile || bannerData?.web_image;
    const hasMobileImage = mobileImagePreview || mobileImageFile || bannerData?.mobile_image;
    
    if (!hasWebImage) errors.web_image = "Web image is required";
    if (!hasMobileImage) errors.mobile_image = "Mobile image is required";

    // Validate URLs if provided
    if (formData.first_button_url && !isValidUrl(formData.first_button_url)) {
      errors.first_button_url = "Please enter a valid URL";
    }
    if (formData.second_button_url && !isValidUrl(formData.second_button_url)) {
      errors.second_button_url = "Please enter a valid URL";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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

      // Append all form fields with proper formatting
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          // Handle is_active specially - convert to '1' or '0'
          if (key === "is_active") {
            submitData.append(key, formData[key] ? "1" : "0");
          } 
          // Skip temporary flags
          else if (!key.includes('_removed')) {
            submitData.append(key, formData[key]);
          }
        }
      });

      // Append images if changed
      if (webImageFile) {
        submitData.append("web_image", webImageFile);
      } else if (formData.web_image_removed) {
        // If image was removed and no new file, send empty string
        submitData.append("web_image", "");
      }
      
      if (mobileImageFile) {
        submitData.append("mobile_image", mobileImageFile);
      } else if (formData.mobile_image_removed) {
        // If image was removed and no new file, send empty string
        submitData.append("mobile_image", "");
      }

      // Log the FormData contents for debugging
      console.log("Submitting FormData:");
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      let response;

      if (bannerData) {
        // Update existing banner - using POST with _method PUT for Laravel
        // submitData.append("_method", "PUT");
        response = await api.post("/admin/banners/update", submitData);
      } else {
        // Add new banner
        response = await api.post("/admin/banners", submitData);
      }

      if (response.data) {
        await fetchBannerData(); // Refresh data
        setSuccess(
          bannerData
            ? "Banner updated successfully!"
            : "Banner added successfully!",
        );
        setIsEditing(false);

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save banner");
      console.error("Error saving banner:", err);
      console.error("Error response:", err.response?.data);
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    // Clean up any blob URLs
    if (webImagePreview && webImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(webImagePreview);
    }
    if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(mobileImagePreview);
    }

    if (bannerData) {
      setFormData({
        title: bannerData.title || "",
        highalited_text: bannerData.highalited_text || "",
        title_meta: bannerData.title_meta || "",
        description: bannerData.description || "",
        desc_meta: bannerData.desc_meta || "",
        image_alt: bannerData.image_alt || "",
        first_button: bannerData.first_button || "",
        first_button_url: bannerData.first_button_url || "",
        second_button: bannerData.second_button || "",
        second_button_url: bannerData.second_button_url || "",
        is_active: bannerData.is_active === "1" || bannerData.is_active === 1 || bannerData.is_active === true,
      });
      setWebImagePreview(bannerData.web_image ? `${STORAGE_URL}${bannerData.web_image}` : null);
      setMobileImagePreview(bannerData.mobile_image ? `${STORAGE_URL}${bannerData.mobile_image}` : null);
      setWebImageFile(null);
      setMobileImageFile(null);
      setWebImage(null);
      setMobileImage(null);
    } else {
      setFormData({
        title: "",
        highalited_text: "",
        title_meta: "",
        description: "",
        desc_meta: "",
        image_alt: "",
        first_button: "",
        first_button_url: "",
        second_button: "",
        second_button_url: "",
        is_active: true,
      });
      setWebImagePreview(null);
      setMobileImagePreview(null);
      setWebImageFile(null);
      setMobileImageFile(null);
      setWebImage(null);
      setMobileImage(null);
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
          <p className="text-gray-600 font-body">Loading banner data...</p>
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
              <ImageIcon className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Banner Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {bannerData
                    ? "Update your homepage banner"
                    : "Add a banner for the first time"}
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
                      <RefreshCw className="w-4 h-4" />
                      <span>{bannerData ? "Edit Banner" : "Add Banner"}</span>
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
                            <span>
                              {bannerData ? "Update Banner" : "Save Banner"}
                            </span>
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

        {/* Preview Mode */}
        {previewMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Banner Preview */}
            <div className="relative">
              {/* Web Image */}
              {webImagePreview && (
                <img
                  src={webImagePreview}
                  alt={formData.image_alt || "Banner preview"}
                  className="w-full h-auto hidden md:block"
                />
              )}

              {/* Mobile Image */}
              {mobileImagePreview && (
                <img
                  src={mobileImagePreview}
                  alt={formData.image_alt || "Banner preview"}
                  className="w-full h-auto md:hidden"
                />
              )}

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl text-white">
                    {/* Badge/Highlighted Text */}
                    {formData.highalited_text && (
                      <span className="inline-block px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        {formData.highalited_text}
                      </span>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {formData.title}
                    </h1>

                    {/* Title Meta */}
                    {formData.title_meta && (
                      <p className="text-xl md:text-2xl mb-6 text-gray-200">
                        {formData.title_meta}
                      </p>
                    )}

                    {/* Description */}
                    {formData.description && (
                      <p className="text-lg mb-8 text-gray-200 max-w-xl">
                        {formData.description}
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {formData.first_button && (
                        <a
                          href={formData.first_button_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium"
                        >
                          {formData.first_button}
                        </a>
                      )}
                      {formData.second_button && (
                        <a
                          href={formData.second_button_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium"
                        >
                          {formData.second_button}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="p-4 border-t border-gray-200">
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
          </motion.div>
        ) : (
          /* Edit Mode Form */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <form onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Banner Images
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Web Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Web/Desktop Image <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        validationErrors.web_image
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {webImagePreview ? (
                        <div className="relative">
                          <img
                            src={webImagePreview}
                            alt="Web preview"
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          {isEditing && (
                            <button
                              type="button"
                              onClick={handleRemoveWebImage}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="py-8">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-2">
                            No image selected
                          </p>
                          <p className="text-xs text-gray-500">
                            Recommended size: 1920x600px • Max 5MB
                          </p>
                        </div>
                      )}

                      {isEditing && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleWebImageChange}
                            className="hidden"
                            id="web-image-upload"
                          />
                          <label
                            htmlFor="web-image-upload"
                            className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-colors cursor-pointer"
                          >
                            {webImagePreview ? "Change Image" : "Select Image"}
                          </label>
                        </>
                      )}
                    </div>
                    {validationErrors.web_image && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.web_image}
                      </p>
                    )}
                  </div>

                  {/* Mobile Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Image <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        validationErrors.mobile_image
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {mobileImagePreview ? (
                        <div className="relative">
                          <img
                            src={mobileImagePreview}
                            alt="Mobile preview"
                            className="max-h-48 mx-auto rounded-lg"
                          />
                          {isEditing && (
                            <button
                              type="button"
                              onClick={handleRemoveMobileImage}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="py-8">
                          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-2">
                            No image selected
                          </p>
                          <p className="text-xs text-gray-500">
                            Recommended size: 600x800px • Max 5MB
                          </p>
                        </div>
                      )}

                      {isEditing && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMobileImageChange}
                            className="hidden"
                            id="mobile-image-upload"
                          />
                          <label
                            htmlFor="mobile-image-upload"
                            className="mt-4 inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-colors cursor-pointer"
                          >
                            {mobileImagePreview ? "Change Image" : "Select Image"}
                          </label>
                        </>
                      )}
                    </div>
                    {validationErrors.mobile_image && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.mobile_image}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Alt Text */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Alt Text (for accessibility)
                  </label>
                  <input
                    type="text"
                    name="image_alt"
                    value={formData.image_alt || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } border-gray-200`}
                    placeholder="Describe the banner image"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Banner Content
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                        } ${validationErrors.title ? "border-red-500" : "border-gray-200"}`}
                        placeholder="Main banner title"
                      />
                      {validationErrors.title && (
                        <p className="mt-1 text-sm text-red-500">
                          {validationErrors.title}
                        </p>
                      )}
                    </div>

                    {/* Highlighted Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highlighted Text <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="highalited_text"
                        value={formData.highalited_text}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                        } ${validationErrors.highalited_text ? "border-red-500" : "border-gray-200"}`}
                        placeholder="Highlighted or badge text"
                      />
                      {validationErrors.highalited_text && (
                        <p className="mt-1 text-sm text-red-500">
                          {validationErrors.highalited_text}
                        </p>
                      )}
                    </div>

                    {/* Title Meta */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title Meta (Subtitle)
                      </label>
                      <input
                        type="text"
                        name="title_meta"
                        value={formData.title_meta || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                        } border-gray-200`}
                        placeholder="Subtitle or meta description"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* First Button */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Button Text
                      </label>
                      <input
                        type="text"
                        name="first_button"
                        value={formData.first_button || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                        } border-gray-200`}
                        placeholder="e.g., Explore HRMS"
                      />
                    </div>

                    {/* First Button URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Button URL
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          name="first_button_url"
                          value={formData.first_button_url || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                          } ${validationErrors.first_button_url ? "border-red-500" : "border-gray-200"}`}
                          placeholder="https://example.com"
                        />
                      </div>
                      {validationErrors.first_button_url && (
                        <p className="mt-1 text-sm text-red-500">
                          {validationErrors.first_button_url}
                        </p>
                      )}
                    </div>

                    {/* Second Button */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Second Button Text
                      </label>
                      <input
                        type="text"
                        name="second_button"
                        value={formData.second_button || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                        } border-gray-200`}
                        placeholder="e.g., HRMS Demo"
                      />
                    </div>

                    {/* Second Button URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Second Button URL
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          name="second_button_url"
                          value={formData.second_button_url || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                          } ${validationErrors.second_button_url ? "border-red-500" : "border-gray-200"}`}
                          placeholder="https://example.com"
                        />
                      </div>
                      {validationErrors.second_button_url && (
                        <p className="mt-1 text-sm text-red-500">
                          {validationErrors.second_button_url}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } ${validationErrors.description ? "border-red-500" : "border-gray-200"}`}
                    placeholder="Enter banner description..."
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
                  <input
                    type="text"
                    name="desc_meta"
                    value={formData.desc_meta || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      !isEditing ? "bg-gray-50 text-gray-600" : "bg-white"
                    } border-gray-200`}
                    placeholder="Meta description for SEO"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-3 pt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
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
                      ? "Banner is visible on site"
                      : "Banner is hidden"}
                  </span>
                </div>

                {/* Read-only Mode Message */}
                {!isEditing && bannerData && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You are in view mode. Click "Edit Banner" to make changes.
                    </p>
                  </div>
                )}

                {/* First-time Add Message */}
                {!isEditing && !bannerData && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      No banner found. Click "Add Banner" to create a new
                      banner.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        )}

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
              • Upload both web and mobile versions for optimal display on all
              devices
            </li>
            <li>• Web image recommended size: 1920x600px, Mobile: 600x800px</li>
            <li>• Image alt text improves accessibility and SEO</li>
            <li>
              • Use the preview mode to see how the banner will look on the site
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HandleBanner;