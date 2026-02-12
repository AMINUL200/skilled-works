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
  Link,
  Type,
  List
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleServiceTypeFeature = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  // State for service types and features
  const [serviceTypes, setServiceTypes] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  
  // State for popup
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentId, setCurrentId] = useState(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    service_type_id: '',
    feature_name: '',
    feature_heading: '',
    highlighted_text: '',
    heading_meta: '',
    desc: '',
    desc_meta: '',
    long_desc: '',
    long_desc_meta: '',
    image: null,
    video_link: '',
    image_alt: '',
    is_active: true
  });
  
  // State for image file and preview
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch service types and features
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch service types
      const serviceResponse = await api.get('/admin/service-type');
      if (serviceResponse.data.status) {
        setServiceTypes(serviceResponse.data.data);
      }
      
      // Fetch features
      const featureResponse = await api.get('/admin/service-features');
      if (featureResponse.data.status) {
        setFeatureList(featureResponse.data.data);
        setFilteredFeatures(featureResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = featureList;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.feature_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.feature_heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    if (serviceTypeFilter !== 'all') {
      filtered = filtered.filter((item) => 
        item.service_type_id === parseInt(serviceTypeFilter)
      );
    }

    setFilteredFeatures(filtered);
  }, [searchTerm, statusFilter, serviceTypeFilter, featureList]);

  // Handle popup open for add
  const handleAddNew = () => {
    setFormMode('add');
    setFormData({
      service_type_id: serviceTypes[0]?.id || '',
      feature_name: '',
      feature_heading: '',
      highlighted_text: '',
      heading_meta: '',
      desc: '',
      desc_meta: '',
      long_desc: '',
      long_desc_meta: '',
      image: null,
      video_link: '',
      image_alt: '',
      is_active: true
    });
    setImageFile(null);
    setImagePreview(null);
    setExistingImage(null);
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle popup open for edit
  const handleEdit = (item) => {
    setFormMode('edit');
    setCurrentId(item.id);
    setFormData({
      service_type_id: item.service_type_id || '',
      feature_name: item.feature_name || '',
      feature_heading: item.feature_heading || '',
      highlighted_text: item.highlighted_text || '',
      heading_meta: item.heading_meta || '',
      desc: item.desc || '',
      desc_meta: item.desc_meta || '',
      long_desc: item.long_desc || '',
      long_desc_meta: item.long_desc_meta || '',
      image: null,
      video_link: item.video_link || '',
      image_alt: item.image_alt || '',
      is_active: item.is_active
    });
    setImageFile(null);
    setImagePreview(item.image || null);
    setExistingImage(item.image || null);
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await api.delete(`/admin/service-features/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting feature:', error);
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setFormErrors((prev) => ({
          ...prev,
          image: 'Please upload a valid image (JPG, JPEG, PNG, or WebP)'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setExistingImage(null); // Clear existing image when new file is uploaded

      if (formErrors.image) {
        setFormErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
    setExistingImage(null);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.service_type_id) {
      errors.service_type_id = 'Please select a service type';
    }

    if (!formData.feature_name.trim()) {
      errors.feature_name = 'Feature name is required';
    }

    if (!formData.feature_heading.trim()) {
      errors.feature_heading = 'Feature heading is required';
    }

    if (!formData.desc.trim()) {
      errors.desc = 'Description is required';
    }

    if (!formData.long_desc.trim()) {
      errors.long_desc = 'Long description is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Prepare FormData for submission
  const prepareFormData = () => {
    const formDataObj = new FormData();

    // Add all text fields
    Object.keys(formData).forEach((key) => {
      if (key !== 'image' && formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        if (key === 'is_active') {
          formDataObj.append(key, formData[key] ? '1' : '0');
        } else {
          formDataObj.append(key, formData[key]);
        }
      }
    });

    // Add image file if exists
    if (imageFile) {
      formDataObj.append('image', imageFile);
    }

    // For edit mode: if existing image was removed and no new image uploaded
    if (formMode === 'edit' && !existingImage && !imageFile) {
      formDataObj.append('image', ''); // Send empty to delete existing image
    }

    // if (formMode === 'edit') {
    //   formDataObj.append('_method', 'PUT');
    // }

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
      if (formMode === 'add') {
        response = await api.post('/admin/service-features', formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await api.post(`/admin/service-features/${currentId}`, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setShowFormPopup(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error saving feature:', error);
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
      await api.patch(`/admin/service-features/${id}/status`, {
        is_active: !currentStatus
      });
      fetchData();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Close form popup
  const closeFormPopup = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setShowFormPopup(false);
    setFormErrors({});
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Get service type name by id
  const getServiceTypeName = (id) => {
    const service = serviceTypes.find(s => s.id === id);
    return service ? service.name : 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading features...</p>
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
            Service Features
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage features for different service types
          </p>
        </div>

        <button
          onClick={handleAddNew}
          disabled={serviceTypes.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          Add New Feature
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
                placeholder="Search by feature name, heading, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
              />
            </div>
          </div>

          {/* Service Type Filter */}
          <div className="flex items-center gap-2">
            <List size={20} className="text-[#4B5563]" />
            <select
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white min-w-[180px]"
            >
              <option value="all">All Service Types</option>
              {serviceTypes.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Total Features</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {featureList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Features</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {featureList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Features</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {featureList.filter((item) => !item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Service Types</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {serviceTypes.length}
          </p>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-6">
        {filteredFeatures.length > 0 ? (
          filteredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#0A0A0A]">
                        {feature.feature_name}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {feature.service_type?.name || getServiceTypeName(feature.service_type_id)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          feature.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {feature.is_active ? (
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
                        Heading: {feature.feature_heading} {feature.highlighted_text}
                      </span>
                      <span className="text-sm text-[#4B5563]">
                        Last updated: {new Date(feature.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActiveStatus(feature.id, feature.is_active)}
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition"
                    >
                      {feature.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(feature)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(feature.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <ImageIcon size={16} />
                        Feature Image
                      </div>
                      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                        {feature.image ? (
                          <img
                            src={`${STORAGE_URL}${feature.image}`}
                            alt={feature.image_alt || feature.feature_name}
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
                      {feature.image_alt && (
                        <p className="text-xs text-[#4B5563] mt-1">
                          Alt: {feature.image_alt}
                        </p>
                      )}
                    </div>

                    {/* Video Link */}
                    {feature.video_link && (
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                          <Link size={16} />
                          Video Link
                        </div>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                          <a
                            href={feature.video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm break-all"
                          >
                            {feature.video_link}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Short Description */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Type size={16} />
                        Description
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                        {feature.desc}
                      </div>
                    </div>

                    {/* Long Description */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Type size={16} />
                        Long Description
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 max-h-48 overflow-y-auto">
                        {feature.long_desc}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {feature.heading_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Heading Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {feature.heading_meta}
                          </p>
                        </div>
                      )}
                      {feature.desc_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Description Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {feature.desc_meta}
                          </p>
                        </div>
                      )}
                      {feature.long_desc_meta && (
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-[#4B5563]">
                            Long Description Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {feature.long_desc_meta}
                          </p>
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
                <List className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Features Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== 'all' || serviceTypeFilter !== 'all'
                  ? 'No features match your search criteria'
                  : 'Get started by creating your first service feature'}
              </p>
              <button
                onClick={handleAddNew}
                disabled={serviceTypes.length === 0}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                {serviceTypes.length === 0 
                  ? 'Create a Service Type First' 
                  : 'Create Your First Feature'}
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
                  {formMode === 'add' ? 'Add New Feature' : 'Edit Feature'}
                </h3>
                <p className="text-[#4B5563] text-sm mt-1">
                  Create and manage service features
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
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[calc(90vh-140px)]"
            >
              <div className="p-6 space-y-8">
                {/* Service Type Selection */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Service Type
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Select Service Type *
                    </label>
                    <select
                      name="service_type_id"
                      value={formData.service_type_id}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.service_type_id
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                      }`}
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.service_type_id && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.service_type_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Basic Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Feature Name *
                      </label>
                      <input
                        type="text"
                        name="feature_name"
                        value={formData.feature_name}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.feature_name
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                        }`}
                        placeholder="e.g., Core HR, Payroll, Attendance"
                      />
                      {formErrors.feature_name && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.feature_name}
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
                          Active (Show on website)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Feature Heading *
                      </label>
                      <input
                        type="text"
                        name="feature_heading"
                        value={formData.feature_heading}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.feature_heading
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                        }`}
                        placeholder="e.g., Powerful Features for"
                      />
                      {formErrors.feature_heading && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.feature_heading}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Highlighted Text
                      </label>
                      <input
                        type="text"
                        name="highlighted_text"
                        value={formData.highlighted_text}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="e.g., Modern HRMS Software"
                      />
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
                      rows="3"
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.desc
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                      }`}
                      placeholder="Brief description of the feature"
                    />
                    {formErrors.desc && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.desc}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Long Description *
                    </label>
                    <textarea
                      name="long_desc"
                      value={formData.long_desc}
                      onChange={handleInputChange}
                      rows="5"
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.long_desc
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                      }`}
                      placeholder="Detailed description of the feature"
                    />
                    {formErrors.long_desc && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.long_desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Feature Image
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
                              src={imagePreview.startsWith('blob:') 
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
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                            />
                          </label>
                        </div>
                      ) : (
                        <div>
                          <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                            <ImageIcon className="text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-500">No image selected</p>
                            {formMode === 'edit' && existingImage && (
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
                              accept="image/jpeg,image/jpg,image/png,image/webp"
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
                  </div>

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
                  </div>
                </div>

                {/* Video Link */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Video
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      <Link size={16} className="inline mr-2" />
                      Video Link
                    </label>
                    <input
                      type="url"
                      name="video_link"
                      value={formData.video_link}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    />
                    <p className="mt-1 text-xs text-[#4B5563]">
                      Optional: Add a video link to embed in the feature section
                    </p>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    SEO Meta Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        placeholder="SEO meta for heading (optional)"
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
                        placeholder="SEO meta for description (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Long Description Meta
                    </label>
                    <textarea
                      name="long_desc_meta"
                      value={formData.long_desc_meta}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      placeholder="SEO meta for long description (optional)"
                    />
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
                        {formMode === 'add' ? 'Create Feature' : 'Update Feature'}
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

export default HandleServiceTypeFeature;