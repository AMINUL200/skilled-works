import React, { useState, useEffect } from "react";
import { api } from "../../../utils/app";

const SiteSettings = () => {
const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  const [settings, setSettings] = useState({
    site_name: "",
    site_logo_alt: "",
    phone: "",
    landline: "",
    email: "",
    fax: "",
    street_address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    pinterest: "",
    sitemap_url: "",
    is_active: true // Added is_active field
  });
  
  // Store actual file objects
  const [files, setFiles] = useState({
    site_web_logo: null,
    site_mobile_logo: null,
    site_favicon: null
  });
  
  const [logoPreview, setLogoPreview] = useState({
    web: null,
    mobile: null,
    favicon: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch settings from API
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/website-settings");
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setSettings(data);
        console.log(data);
        
        setLogoPreview({
          web: data.site_web_logo || null,
          mobile: data.site_mobile_logo || null,
          favicon: data.site_favicon || null
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle logo upload
  const handleLogoUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(prev => ({
        ...prev,
        [type]: previewUrl
      }));
      
      // Store the file object with the appropriate field name
      let fieldName = '';
      switch(type) {
        case 'web': fieldName = 'site_web_logo'; break;
        case 'mobile': fieldName = 'site_mobile_logo'; break;
        case 'favicon': fieldName = 'site_favicon'; break;
      }
      
      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If canceling edit, refetch original data and clear file selections
      fetchSettings();
      setFiles({
        site_web_logo: null,
        site_mobile_logo: null,
        site_favicon: null
      });
    }
  };

  // Toggle active status
  const toggleActiveStatus = () => {
    if (isEditing) {
      setSettings(prev => ({
        ...prev,
        is_active: !prev.is_active
      }));
    }
  };

  // Prepare form data for API submission
  const prepareFormData = () => {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(settings).forEach(key => {
      if (settings[key] !== null && settings[key] !== undefined) {
        // Convert boolean to string for FormData
        if (typeof settings[key] === 'boolean') {
          formData.append(key, settings[key] ? '1' : '0');
        } else {
          formData.append(key, settings[key]);
        }
      }
    });
    
    // Add files if they exist
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });
    
    return formData;
  };

  // Save settings
  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Prepare form data
      const formData = prepareFormData();
      
      // Get the settings ID (assuming it's in the settings object)
      const settingsId = settings?.id || '';
      
      // Use FormData for the request
      const response = await api.post(
        `/admin/website-settings-update/${settingsId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data.status) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setIsEditing(false);
        // Clear file selections after successful save
        setFiles({
          site_web_logo: null,
          site_mobile_logo: null,
          site_favicon: null
        });
        fetchSettings(); // Refresh data
      } else {
        // Handle validation errors
        if (response.data.errors) {
          const errorMessages = Object.values(response.data.errors)
            .flat()
            .join(', ');
          setMessage({ type: 'error', text: errorMessages });
        } else {
          setMessage({ type: 'error', text: response.data.message || 'Update failed' });
        }
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      let errorMessage = error.message || 'Failed to save settings';
      
      // Check for validation errors in the response
      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        errorMessage = validationErrors;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6]">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-[#0A0A0A]">
            Site Settings
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage your website configuration and appearance
          </p>
        </div>
        
        {/* Active Status Toggle (Always visible) */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className={`text-sm font-medium mr-2 ${settings.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {settings.is_active ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={toggleActiveStatus}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.is_active ? 'bg-green-500' : 'bg-gray-300'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.is_active ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <button
            onClick={handleEditToggle}
            className={`
              px-6 py-3 rounded-xl font-semibold border transition-all
              ${isEditing 
                ? "bg-white text-[#0A0A0A] border-[#E5E7EB] hover:bg-[#0A0A0A] hover:text-white" 
                : "bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A]"}
            `}
          >
            {isEditing ? "Cancel Edit" : "Edit Settings"}
          </button>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* File upload guidelines */}
      {isEditing && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <p className="font-semibold mb-1">File Upload Guidelines:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Web & Mobile Logos: PNG, JPG, JPEG, SVG, WebP</li>
            <li>Favicon: PNG or ICO format</li>
            <li>Leave file fields empty to keep existing files</li>
          </ul>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 space-y-10">
        
        {/* Status Banner */}
        <div className={`p-4 rounded-xl border ${
          settings.is_active 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-yellow-50 border-yellow-200 text-yellow-700'
        }`}>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${settings.is_active ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <p className="font-medium">
              {settings.is_active 
                ? 'Website is currently active and visible to visitors' 
                : 'Website is currently inactive and hidden from visitors'}
            </p>
          </div>
          {!isEditing && (
            <p className="text-sm mt-1 ml-6">
              Toggle the switch above to change the status (Edit mode required)
            </p>
          )}
        </div>

        {/* Logo Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-3">
            Logos & Branding
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Web Logo */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#1F2937]">Web Logo</h4>
              <div className="w-full h-48 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden p-4">
                {logoPreview.web ? (
                  <img 
                    src={`${STORAGE_URL}${logoPreview.web}`} 
                    alt={settings.site_logo_alt || "Logo Preview"} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#4B5563] text-sm">No Logo</span>
                )}
              </div>
              {isEditing && (
                <>
                  <label className="block w-full px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition text-center">
                    {files.site_web_logo ? "Change Logo" : "Upload Logo"}
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleLogoUpload(e, 'web')}
                      accept=".png,.jpg,.jpeg,.svg,.webp"
                    />
                  </label>
                  {files.site_web_logo && (
                    <p className="text-xs text-green-600 text-center">
                      New logo selected: {files.site_web_logo.name}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Mobile Logo */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#1F2937]">Mobile Logo</h4>
              <div className="w-full h-48 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden p-4">
                {logoPreview.mobile ? (
                  <img 
                    src={`${STORAGE_URL}${logoPreview.mobile}`} 
                    alt={settings.site_logo_alt || "Mobile Logo"} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#4B5563] text-sm">No Logo</span>
                )}
              </div>
              {isEditing && (
                <>
                  <label className="block w-full px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition text-center">
                    {files.site_mobile_logo ? "Change Logo" : "Upload Logo"}
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleLogoUpload(e, 'mobile')}
                      accept=".png,.jpg,.jpeg,.svg,.webp"
                    />
                  </label>
                  {files.site_mobile_logo && (
                    <p className="text-xs text-green-600 text-center">
                      New logo selected: {files.site_mobile_logo.name}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Favicon */}
            <div className="space-y-4">
              <h4 className="font-medium text-[#1F2937]">Favicon</h4>
              <div className="w-full h-48 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden p-4">
                {logoPreview.favicon ? (
                  <img 
                    src={`${STORAGE_URL}${logoPreview.favicon}`} 
                    alt="Favicon Preview" 
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-[#4B5563] text-sm">No Favicon</span>
                )}
              </div>
              {isEditing && (
                <>
                  <label className="block w-full px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition text-center">
                    {files.site_favicon ? "Change Favicon" : "Upload Favicon"}
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleLogoUpload(e, 'favicon')}
                      accept=".png,.ico"
                    />
                  </label>
                  {files.site_favicon && (
                    <p className="text-xs text-green-600 text-center">
                      New favicon selected: {files.site_favicon.name}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Logo Alt Text */}
          <div>
            <label className="block text-sm font-medium text-[#4B5563] mb-2">
              Logo Alt Text
            </label>
            <input
              type="text"
              name="site_logo_alt"
              value={settings.site_logo_alt || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full p-3 rounded-xl border ${
                isEditing 
                  ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                  : "border-[#F3F4F6] bg-[#F9FAFB]"
              }`}
              placeholder="Enter logo alt text for SEO"
            />
          </div>
        </div>

        {/* Website Information */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-3">
            Website Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#4B5563] mb-2">
                Website Name
              </label>
              <input
                type="text"
                name="site_name"
                value={settings.site_name || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-xl border ${
                  isEditing 
                    ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                    : "border-[#F3F4F6] bg-[#F9FAFB]"
                }`}
                placeholder="Enter website name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4B5563] mb-2">
                Support Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-xl border ${
                  isEditing 
                    ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                    : "border-[#F3F4F6] bg-[#F9FAFB]"
                }`}
                placeholder="support@example.com"
              />
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Phone", name: "phone" },
              { label: "Landline", name: "landline" },
              { label: "Fax", name: "fax" },
              { label: "Zip Code", name: "zip" }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={settings[field.name] || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full p-3 rounded-xl border ${
                    isEditing 
                      ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                      : "border-[#F3F4F6] bg-[#F9FAFB]"
                  }`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {/* Address Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4B5563] mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street_address"
                value={settings.street_address || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-xl border ${
                  isEditing 
                    ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                    : "border-[#F3F4F6] bg-[#F9FAFB]"
                }`}
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "City", name: "city" },
                { label: "State", name: "state" },
                { label: "Country", name: "country" },
                { label: "Sitemap URL", name: "sitemap_url" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={settings[field.name] || ""}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-3 rounded-xl border ${
                      isEditing 
                        ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                        : "border-[#F3F4F6] bg-[#F9FAFB]"
                    }`}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-3">
            Social Media Links
          </h3>
          
          <div className="space-y-4">
            {[
              { label: "Facebook", name: "facebook", icon: "📘", placeholder: "https://facebook.com/yourpage" },
              { label: "Twitter", name: "twitter", icon: "🐦", placeholder: "https://twitter.com/yourprofile" },
              { label: "LinkedIn", name: "linkedin", icon: "💼", placeholder: "https://linkedin.com/company/yourcompany" },
              { label: "Instagram", name: "instagram", icon: "📸", placeholder: "https://instagram.com/yourprofile" },
              { label: "Pinterest", name: "pinterest", icon: "📌", placeholder: "https://pinterest.com/yourprofile" }
            ].map((social) => (
              <div key={social.name} className="flex items-center space-x-4">
                <span className="text-2xl w-8">{social.icon}</span>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#4B5563] mb-1">
                    {social.label} URL
                  </label>
                  <input
                    type="url"
                    name={social.name}
                    value={settings[social.name] || ""}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full p-3 rounded-xl border ${
                      isEditing 
                        ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                        : "border-[#F3F4F6] bg-[#F9FAFB]"
                    }`}
                    placeholder={social.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="pt-6 border-t border-[#E5E7EB]">
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleEditToggle}
                className="px-8 py-3 bg-white text-[#0A0A0A] border border-[#E5E7EB] rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteSettings;