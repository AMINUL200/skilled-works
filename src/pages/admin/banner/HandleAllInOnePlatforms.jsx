import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Grid,
  Link as LinkIcon,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Globe,
  Calendar,
  Clock
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleAllInOnePlatforms = () => {
  // State management
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    badged_text: '',
    heading: '',
    heading_meta: '',
    small_desc: '',
    small_desc_meta: '',
    desc: '',
    desc_meta: '',
    button_name: '',
    button_url: '',
    is_active: true
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch platforms on component mount
  useEffect(() => {
    fetchPlatforms();
  }, []);

  // Fetch platforms from API
  const fetchPlatforms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/all-in-one-platforms');
      if (response.data && response.data.data) {
        setPlatforms(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch platforms');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.badged_text?.trim()) errors.badged_text = 'Badge text is required';
    if (!formData.heading?.trim()) errors.heading = 'Heading is required';
    if (!formData.small_desc?.trim()) errors.small_desc = 'Short description is required';
    if (!formData.desc?.trim()) errors.desc = 'Description is required';
    
    // Validate URL if provided
    if (formData.button_url && !isValidUrl(formData.button_url)) {
      errors.button_url = 'Please enter a valid URL';
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

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      badged_text: '',
      heading: '',
      heading_meta: '',
      small_desc: '',
      small_desc_meta: '',
      desc: '',
      desc_meta: '',
      button_name: '',
      button_url: '',
      is_active: true
    });
    setValidationErrors({});
    setEditingPlatform(null);
  };

  // Handle add new platform
  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle edit platform
  const handleEditClick = (platform) => {
    setFormData({
      badged_text: platform.badged_text || '',
      heading: platform.heading || '',
      heading_meta: platform.heading_meta || '',
      small_desc: platform.small_desc || '',
      small_desc_meta: platform.small_desc_meta || '',
      desc: platform.desc || '',
      desc_meta: platform.desc_meta || '',
      button_name: platform.button_name || '',
      button_url: platform.button_url || '',
      is_active: platform.is_active !== undefined ? platform.is_active : true
    });
    setEditingPlatform(platform);
    setShowModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      
      if (editingPlatform) {
        // Update existing platform
        response = await api.post(`/admin/all-in-one-platforms/update/${editingPlatform.id}`, formData);
      } else {
        // Add new platform
        response = await api.post('/admin/all-in-one-platforms', formData);
      }

      if (response.data) {
        await fetchPlatforms(); // Refresh the list
        setSuccess(editingPlatform ? 'Platform updated successfully!' : 'Platform added successfully!');
        handleCloseModal();
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to save platform');
      console.error('Error saving platform:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete platform
  const handleDelete = async (platformId) => {
    setSaving(true);
    setError(null);
    
    try {
      await api.delete(`/admin/all-in-one-platforms/delete/${platformId}`);
      await fetchPlatforms(); // Refresh the list
      setSuccess('Platform deleted successfully!');
      setDeleteConfirm(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete platform');
    } finally {
      setSaving(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
    setError(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Filter platforms based on search and status
  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = 
      platform.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.badged_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.small_desc?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'active' ? platform.is_active :
      filterStatus === 'inactive' ? !platform.is_active : true;
    
    return matchesSearch && matchesFilter;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Grid className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All-in-One Platforms</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your platform features and descriptions
                </p>
              </div>
            </div>
            
            <button
              onClick={handleAddClick}
              className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Platform</span>
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
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
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
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full md:w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
          
          <p className="text-sm text-gray-600">
            Showing {filteredPlatforms.length} of {platforms.length} platforms
          </p>
        </div>

        {/* Platforms List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading platforms...</p>
          </div>
        ) : filteredPlatforms.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Grid className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first platform'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={handleAddClick}
                className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Platform</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlatforms.map((platform) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Platform Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Badge and Status */}
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {platform.badged_text}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          platform.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {platform.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {platform.slug && (
                          <span className="text-xs text-gray-500">
                            Slug: {platform.slug}
                          </span>
                        )}
                      </div>
                      
                      {/* Heading */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {platform.heading}
                      </h3>
                      
                      {/* Heading Meta */}
                      {platform.heading_meta && (
                        <p className="text-sm text-gray-500 mb-3">
                          {platform.heading_meta}
                        </p>
                      )}
                      
                      {/* Short Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {platform.small_desc}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Created: {formatDate(platform.created_at)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Updated: {formatDate(platform.updated_at)}
                        </span>
                        {platform.button_name && (
                          <span className="flex items-center">
                            <LinkIcon className="w-3 h-3 mr-1" />
                            Button: {platform.button_name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditClick(platform)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit platform"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      
                      {deleteConfirm === platform.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(platform.id)}
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
                        <button
                          onClick={() => setDeleteConfirm(platform.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete platform"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setExpandedId(expandedId === platform.id ? null : platform.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedId === platform.id ? (
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
                  {expandedId === platform.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-4">
                        {/* Full Description */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Full Description</h4>
                          <p className="text-sm text-gray-600">{platform.desc}</p>
                        </div>
                        
                        {/* Meta Descriptions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {platform.small_desc_meta && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">Short Description Meta</h4>
                              <p className="text-sm text-gray-500 italic">{platform.small_desc_meta}</p>
                            </div>
                          )}
                          
                          {platform.desc_meta && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">Description Meta</h4>
                              <p className="text-sm text-gray-500 italic">{platform.desc_meta}</p>
                            </div>
                          )}
                        </div>

                        {/* Button Info */}
                        {platform.button_name && platform.button_url && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Button Configuration</h4>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-600">{platform.button_name}</span>
                              <a 
                                href={platform.button_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                {platform.button_url}
                              </a>
                            </div>
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

      {/* Add/Edit Modal - Fixed with proper z-index and positioning */}
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
                      {editingPlatform ? 'Edit Platform' : 'Add New Platform'}
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body - Scrollable */}
                  <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <form onSubmit={handleSubmit} id="platform-form">
                      <div className="space-y-4">
                        {/* Badge Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Badge Text <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="badged_text"
                            value={formData.badged_text}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.badged_text ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="e.g., 60% faster hiring"
                          />
                          {validationErrors.badged_text && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.badged_text}</p>
                          )}
                        </div>

                        {/* Heading */}
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
                              validationErrors.heading ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="e.g., Intelligent Recruitment"
                          />
                          {validationErrors.heading && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.heading}</p>
                          )}
                        </div>

                        {/* Heading Meta */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heading Meta (Subtitle)
                          </label>
                          <input
                            type="text"
                            name="heading_meta"
                            value={formData.heading_meta || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="e.g., Comprehensive HRMS Features"
                          />
                        </div>

                        {/* Short Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Short Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="small_desc"
                            value={formData.small_desc}
                            onChange={handleInputChange}
                            rows={3}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.small_desc ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="Brief description of the platform..."
                          />
                          {validationErrors.small_desc && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.small_desc}</p>
                          )}
                        </div>

                        {/* Short Description Meta */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Short Description Meta (Optional)
                          </label>
                          <input
                            type="text"
                            name="small_desc_meta"
                            value={formData.small_desc_meta || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Meta description for short description"
                          />
                        </div>

                        {/* Full Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Description <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.desc ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="Detailed description of the platform..."
                          />
                          {validationErrors.desc && (
                            <p className="mt-1 text-sm text-red-500">{validationErrors.desc}</p>
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
                            value={formData.desc_meta || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Meta description for full description"
                          />
                        </div>

                        {/* Button Configuration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Name
                            </label>
                            <input
                              type="text"
                              name="button_name"
                              value={formData.button_name || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              placeholder="e.g., Explore Feature"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button URL
                            </label>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="url"
                                name="button_url"
                                value={formData.button_url || ''}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                                  validationErrors.button_url ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="https://example.com"
                              />
                            </div>
                            {validationErrors.button_url && (
                              <p className="mt-1 text-sm text-red-500">{validationErrors.button_url}</p>
                            )}
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
                            {formData.is_active ? 'Platform is visible on site' : 'Platform is hidden'}
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
                      form="platform-form"
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
                          <span>{editingPlatform ? 'Update Platform' : 'Save Platform'}</span>
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

export default HandleAllInOnePlatforms;