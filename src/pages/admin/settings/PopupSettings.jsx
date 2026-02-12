import React, { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Link,
  Type
} from 'lucide-react';
import { api } from '../../../utils/app';

const PopupSettings = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  // State for popup list
  const [popupList, setPopupList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for popup
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);
  
  // State for form data (without image fields)
  const [formData, setFormData] = useState({
    title: '',
    title_meta: '',
    desc: '',
    desc_meta: '',
    image_alt: '',
    button1_name: '',
    button1_url: '',
    button2_name: '',
    button2_url: '',
    is_active: true
  });
  
  // Store actual file objects separately
  const [files, setFiles] = useState({
    web_image: null,
    mobile_image: null
  });
  
  // State for image previews
  const [imagePreviews, setImagePreviews] = useState({
    web: null,
    mobile: null
  });
  
  // State for existing image paths (when editing)
  const [existingImages, setExistingImages] = useState({
    web: null,
    mobile: null
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch popup list
  const fetchPopupList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/popup');
      if (response.data.status) {
        setPopupList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching popup settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopupList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = popupList;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.button1_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(item => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, popupList]);

  // Handle popup open for add
  const handleAddNew = () => {
    setFormMode('add');
    setFormData({
      title: '',
      title_meta: '',
      desc: '',
      desc_meta: '',
      image_alt: '',
      button1_name: '',
      button1_url: '',
      button2_name: '',
      button2_url: '',
      is_active: true
    });
    setFiles({
      web_image: null,
      mobile_image: null
    });
    setImagePreviews({ web: null, mobile: null });
    setExistingImages({ web: null, mobile: null });
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle popup open for edit
  const handleEdit = (item) => {
    setFormMode('edit');
    setCurrentId(item.id);
    setFormData({
      title: item.title || '',
      title_meta: item.title_meta || '',
      desc: item.desc || '',
      desc_meta: item.desc_meta || '',
      image_alt: item.image_alt || '',
      button1_name: item.button1_name || '',
      button1_url: item.button1_url || '',
      button2_name: item.button2_name || '',
      button2_url: item.button2_url || '',
      is_active: item.is_active
    });
    setFiles({
      web_image: null,
      mobile_image: null
    });
    // Set image previews using the image path with storage URL
    setImagePreviews({
      web: item.web_image || null,
      mobile: item.mobile_image || null
    });
    setExistingImages({
      web: item.web_image || null,
      mobile: item.mobile_image || null
    });
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this popup?')) {
      try {
        await api.delete(`/admin/popup/${id}`);
        fetchPopupList(); // Refresh list
      } catch (error) {
        console.error('Error deleting popup:', error);
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({
          ...prev,
          [`${type}_image`]: 'Please upload a valid image file'
        }));
        return;
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          [`${type}_image`]: 'Image size should be less than 2MB'
        }));
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(prev => ({
        ...prev,
        [type]: previewUrl
      }));
      
      // Store the file object with the appropriate field name
      let fieldName = '';
      switch(type) {
        case 'web': fieldName = 'web_image'; break;
        case 'mobile': fieldName = 'mobile_image'; break;
      }
      
      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
      
      // Clear existing image path if new file is uploaded
      if (existingImages[type]) {
        setExistingImages(prev => ({
          ...prev,
          [type]: null
        }));
      }

      // Clear error
      if (formErrors[`${type}_image`]) {
        setFormErrors(prev => ({ ...prev, [`${type}_image`]: '' }));
      }
    }
  };

  // Remove uploaded image
  const handleRemoveImage = (type) => {
    setImagePreviews(prev => ({
      ...prev,
      [type]: null
    }));
    setFiles(prev => ({
      ...prev,
      [type === 'web' ? 'web_image' : 'mobile_image']: null
    }));
    
    // In edit mode, mark existing image for removal
    if (formMode === 'edit' && existingImages[type]) {
      setExistingImages(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  // Prepare FormData for submission
  const prepareFormData = () => {
    const formDataToSend = new FormData();
    
    // Add all text fields
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (typeof formData[key] === 'boolean') {
          formDataToSend.append(key, formData[key] ? '1' : '0');
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });
    
    // Add files if they exist
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });
    
    // For edit mode: if existing images were removed, send empty to delete
    if (formMode === 'edit') {
      if (!existingImages.web && !files.web_image) {
        formDataToSend.append('web_image', ''); // Empty to delete existing
      }
      if (!existingImages.mobile && !files.mobile_image) {
        formDataToSend.append('mobile_image', ''); // Empty to delete existing
      }
    }
    
    return formDataToSend;
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.desc.trim()) {
      errors.desc = 'Description is required';
    }
    
    if (formData.button1_name && !formData.button1_url) {
      errors.button1_url = 'URL is required when button name is provided';
    }
    
    if (formData.button2_name && !formData.button2_url) {
      errors.button2_url = 'URL is required when button name is provided';
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
      // Prepare form data with files
      const formDataToSend = prepareFormData();
      
      let response;
      if (formMode === 'add') {
        response = await api.post('/admin/popup', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await api.post(`/admin/popup/${currentId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setShowFormPopup(false);
        fetchPopupList(); // Refresh list
      }
    } catch (error) {
      console.error('Error saving popup:', error);
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
      await api.patch(`/admin/popup/${id}/status`, {
        is_active: !currentStatus
      });
      fetchPopupList(); // Refresh list
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Close form popup
  const closeFormPopup = () => {
    setShowFormPopup(false);
    setFormErrors({});
    
    // Clean up object URLs
    if (files.web_image && imagePreviews.web && imagePreviews.web.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviews.web);
    }
    if (files.mobile_image && imagePreviews.mobile && imagePreviews.mobile.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviews.mobile);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading popup settings...</p>
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
            Popup Settings
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage website popups and notifications
          </p>
        </div>
        
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Popup
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]" size={20} />
              <input
                type="text"
                placeholder="Search by title, description, or button text..."
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
          <p className="text-[#4B5563] text-sm">Total Popups</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">{popupList.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Popups</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {popupList.filter(item => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Popups</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {popupList.filter(item => !item.is_active).length}
          </p>
        </div>
      </div>

      {/* Popup List */}
      <div className="space-y-6">
        {filteredList.length > 0 ? (
          filteredList.map((popup) => (
            <div 
              key={popup.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-1">
                      {popup.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        popup.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {popup.is_active ? (
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
                        Last updated: {new Date(popup.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActiveStatus(popup.id, popup.is_active)}
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition"
                    >
                      {popup.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(popup)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(popup.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Images */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Monitor size={16} />
                        Web Image
                      </div>
                      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                        {popup.web_image ? (
                          <img 
                            src={`${STORAGE_URL}${popup.web_image}`} 
                            alt={popup.image_alt || 'Web image'} 
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="text-gray-400" size={32} />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Smartphone size={16} />
                        Mobile Image
                      </div>
                      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                        {popup.mobile_image ? (
                          <img 
                            src={`${STORAGE_URL}${popup.mobile_image}`} 
                            alt={popup.image_alt || 'Mobile image'} 
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="text-gray-400" size={32} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Type size={16} />
                        Description
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 whitespace-pre-line">
                        {popup.desc}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {popup.button1_name && (
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                            <Link size={16} />
                            Primary Button
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#0A0A0A]">{popup.button1_name}</span>
                            <span className="text-sm text-[#4B5563] truncate">{popup.button1_url}</span>
                          </div>
                        </div>
                      )}

                      {popup.button2_name && (
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                            <Link size={16} />
                            Secondary Button
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-[#0A0A0A]">{popup.button2_name}</span>
                            <span className="text-sm text-[#4B5563] truncate">{popup.button2_url}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {popup.title_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">Title Meta:</label>
                          <p className="text-[#0A0A0A] mt-1">{popup.title_meta}</p>
                        </div>
                      )}
                      {popup.desc_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">Description Meta:</label>
                          <p className="text-[#0A0A0A] mt-1">{popup.desc_meta}</p>
                        </div>
                      )}
                      {popup.image_alt && (
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-[#4B5563]">Image Alt Text:</label>
                          <p className="text-[#0A0A0A] mt-1">{popup.image_alt}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Popups Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No popups match your search criteria' 
                  : 'Get started by creating your first website popup'}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First Popup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Popup */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-xl font-semibold text-[#0A0A0A]">
                  {formMode === 'add' ? 'Add New Popup' : 'Edit Popup'}
                </h3>
                <p className="text-[#4B5563] text-sm mt-1">
                  Configure website popup content and appearance
                </p>
              </div>
              <button
                onClick={closeFormPopup}
                className="p-2 hover:bg-[#F3F4F6] rounded-lg transition"
              >
                <X size={24} className="text-[#4B5563]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.title 
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                        }`}
                        placeholder="Popup headline or title"
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
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
                          Active (Show on website)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Description *
                    </label>
                    <textarea
                      name="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.desc 
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                      }`}
                      placeholder="Main popup content. Use \n for line breaks."
                    />
                    {formErrors.desc && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.desc}</p>
                    )}
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Images
                    <span className="text-sm text-gray-500 font-normal ml-2">
                      (Accepted: JPG, JPEG, PNG, WebP)
                    </span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Web Image */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <Monitor size={16} className="inline mr-2" />
                        Web Image
                      </label>
                      <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center">
                        {imagePreviews.web ? (
                          <div className="space-y-4">
                            <div className="relative">
                              <img 
                                src={imagePreviews.web.startsWith('blob:') 
                                  ? imagePreviews.web 
                                  : `${STORAGE_URL}${imagePreviews.web}`
                                } 
                                alt="Web preview" 
                                className="w-full h-48 object-contain mx-auto"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage('web')}
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
                                onChange={(e) => handleImageUpload(e, 'web')}
                                accept=".jpg,.jpeg,.png,.webp"
                              />
                            </label>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                              <ImageIcon className="text-gray-400 mb-2" size={32} />
                              <p className="text-sm text-gray-500">No image selected</p>
                              {formMode === 'edit' && existingImages.web && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Existing image will be kept
                                </p>
                              )}
                            </div>
                            <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                              Upload Web Image
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, 'web')}
                                accept=".jpg,.jpeg,.png,.webp"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {formErrors.web_image && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.web_image}</p>
                      )}
                    </div>

                    {/* Mobile Image */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <Smartphone size={16} className="inline mr-2" />
                        Mobile Image
                      </label>
                      <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center">
                        {imagePreviews.mobile ? (
                          <div className="space-y-4">
                            <div className="relative">
                              <img 
                                src={imagePreviews.mobile.startsWith('blob:') 
                                  ? imagePreviews.mobile 
                                  : `${STORAGE_URL}${imagePreviews.mobile}`
                                } 
                                alt="Mobile preview" 
                                className="w-full h-48 object-contain mx-auto"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage('mobile')}
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
                                onChange={(e) => handleImageUpload(e, 'mobile')}
                                accept=".jpg,.jpeg,.png,.webp"
                              />
                            </label>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                              <ImageIcon className="text-gray-400 mb-2" size={32} />
                              <p className="text-sm text-gray-500">No image selected</p>
                              {formMode === 'edit' && existingImages.mobile && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Existing image will be kept
                                </p>
                              )}
                            </div>
                            <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                              Upload Mobile Image
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, 'mobile')}
                                accept=".jpg,.jpeg,.png,.webp"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {formErrors.mobile_image && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.mobile_image}</p>
                      )}
                    </div>
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
                      placeholder="Descriptive text for accessibility and SEO"
                    />
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">Action Buttons</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Button 1 */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-[#4B5563]">Primary Button</h5>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          name="button1_name"
                          value={formData.button1_name}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                          placeholder="e.g., Get Started, Learn More"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Button URL
                        </label>
                        <input
                          type="url"
                          name="button1_url"
                          value={formData.button1_url}
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-xl border ${
                            formErrors.button1_url 
                              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                          }`}
                          placeholder="https://example.com/action"
                        />
                        {formErrors.button1_url && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.button1_url}</p>
                        )}
                      </div>
                    </div>

                    {/* Button 2 */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-[#4B5563]">Secondary Button</h5>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          name="button2_name"
                          value={formData.button2_name}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                          placeholder="e.g., No Thanks, Close"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Button URL
                        </label>
                        <input
                          type="url"
                          name="button2_url"
                          value={formData.button2_url}
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-xl border ${
                            formErrors.button2_url 
                              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                          }`}
                          placeholder="https://example.com/action"
                        />
                        {formErrors.button2_url && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.button2_url}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">Meta Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Title Meta
                      </label>
                      <input
                        type="text"
                        name="title_meta"
                        value={formData.title_meta}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="Meta title for SEO (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Description Meta
                      </label>
                      <input
                        type="text"
                        name="desc_meta"
                        value={formData.desc_meta}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="Meta description for SEO (optional)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#E5E7EB] p-6 bg-[#F9FAFB]">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeFormPopup}
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
                        {formMode === 'add' ? 'Create Popup' : 'Update Popup'}
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

export default PopupSettings;