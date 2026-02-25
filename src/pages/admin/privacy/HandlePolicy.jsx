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
  FileText,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';
import { api } from '../../../utils/app';
import CustomTextEditor from '../../../component/form/CustomTextEditor';

const HandlePolicy = () => {
  // State management
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    page_name: '',
    title: '',
    title_meta: '',
    description: '',
    desc_meta: '',
    is_active: true
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch policies on component mount
  useEffect(() => {
    fetchPolicies();
  }, []);

  // Fetch policies from API
  const fetchPolicies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/privacy-terms');
      if (response.data && response.data.data) {
        setPolicies(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch policies');
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
    if (!formData.page_name?.trim()) errors.page_name = "Page name is required";
    if (!formData.title?.trim()) errors.title = "Title is required";
    if (!formData.description?.trim()) errors.description = "Description is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      page_name: '',
      title: '',
      title_meta: '',
      description: '',
      desc_meta: '',
      is_active: true
    });
    setValidationErrors({});
    setEditingPolicy(null);
  };

  // Handle add new policy
  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // Handle edit policy
  const handleEditClick = (policy) => {
    setFormData({
      page_name: policy.page_name || '',
      title: policy.title || '',
      title_meta: policy.title_meta || '',
      description: policy.description || '',
      desc_meta: policy.desc_meta || '',
      is_active: policy.is_active !== undefined ? policy.is_active : true
    });
    setEditingPolicy(policy);
    setShowModal(true);
    document.body.style.overflow = "hidden";
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
      // Prepare data for submission
      const submitData = {
        page_name: formData.page_name,
        title: formData.title,
        title_meta: formData.title_meta || '',
        description: formData.description,
        desc_meta: formData.desc_meta || '',
        is_active: formData.is_active ? 1 : 0
      };

      let response;

      if (editingPolicy) {
        // Update existing policy
        response = await api.put(`/admin/privacy-terms/${editingPolicy.id}`, submitData);
      } else {
        // Add new policy
        response = await api.post('/admin/privacy-terms', submitData);
      }

      if (response.data) {
        await fetchPolicies(); // Refresh the list
        setSuccess(
          editingPolicy
            ? "Policy updated successfully!"
            : "Policy added successfully!",
        );
        handleCloseModal();

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save policy");
      console.error("Error saving policy:", err);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete policy
  const handleDelete = async (policyId) => {
    setSaving(true);
    setError(null);

    try {
      await api.delete(`/admin/privacy-terms/${policyId}`);
      await fetchPolicies(); // Refresh the list
      setSuccess("Policy deleted successfully!");
      setDeleteConfirm(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete policy");
    } finally {
      setSaving(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
    setError(null);
    document.body.style.overflow = "unset";
  };

  // Filter policies based on search and status
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.page_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? policy.is_active
          : filterStatus === "inactive"
            ? !policy.is_active
            : true;

    return matchesSearch && matchesFilter;
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Policy Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage Privacy Policy, Terms of Use, and other legal pages
                </p>
              </div>
            </div>

            <button
              onClick={handleAddClick}
              className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Policy</span>
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

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
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
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredPolicies.length} of {policies.length} policies
          </p>
        </div>

        {/* Policies List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading policies...</p>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No policies found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first policy"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={handleAddClick}
                className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Policy</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Policy Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Badges and Status */}
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {policy.page_name}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            policy.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {policy.is_active ? "Active" : "Inactive"}
                        </span>
                        {policy.slug && (
                          <span className="text-xs text-gray-500">
                            Slug: {policy.slug}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {policy.title}
                      </h3>

                      {/* Title Meta */}
                      {policy.title_meta && (
                        <p className="text-sm text-gray-500 mb-3">
                          {policy.title_meta}
                        </p>
                      )}

                      {/* Description Preview */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {policy.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Created: {formatDate(policy.created_at)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Updated: {formatDate(policy.updated_at)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditClick(policy)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit policy"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {deleteConfirm === policy.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(policy.id)}
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
                          onClick={() => setDeleteConfirm(policy.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete policy"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === policy.id ? null : policy.id,
                          )
                        }
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedId === policy.id ? (
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
                  {expandedId === policy.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-4">
                        {/* Full Description */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Full Description
                          </h4>
                          <div 
                            className="text-sm text-gray-600 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: policy.description }}
                          />
                        </div>

                        {/* Description Meta */}
                        {policy.desc_meta && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Meta Description
                            </h4>
                            <p className="text-sm text-gray-500 italic">
                              {policy.desc_meta}
                            </p>
                          </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                              Page Name
                            </h4>
                            <p className="text-sm text-gray-600">{policy.page_name}</p>
                          </div>
                          {policy.slug && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Slug
                              </h4>
                              <p className="text-sm text-gray-600">{policy.slug}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
                      {editingPolicy ? "Edit Policy" : "Add New Policy"}
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <form onSubmit={handleSubmit} id="policy-form">
                      <div className="space-y-4">
                        {/* Page Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Page Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="page_name"
                            value={formData.page_name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.page_name
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="e.g., Terms of Use, Privacy Policy"
                          />
                          {validationErrors.page_name && (
                            <p className="mt-1 text-sm text-red-500">
                              {validationErrors.page_name}
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
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                              validationErrors.title
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                            placeholder="Enter policy title"
                          />
                          {validationErrors.title && (
                            <p className="mt-1 text-sm text-red-500">
                              {validationErrors.title}
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Meta title for SEO"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <CustomTextEditor
                            value={formData.description || ""}
                            height={400}
                            placeholder="Enter policy content..."
                            onChange={(content) =>
                              setFormData((prev) => ({
                                ...prev,
                                description: content,
                              }))
                            }
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
                          <textarea
                            name="desc_meta"
                            value={formData.desc_meta || ""}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder="Meta description for SEO"
                          />
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
                            {formData.is_active
                              ? "Policy is visible on site"
                              : "Policy is hidden"}
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
                      form="policy-form"
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
                          <span>
                            {editingPolicy ? "Update Policy" : "Save Policy"}
                          </span>
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

export default HandlePolicy;