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
  ChevronDown,
  ChevronUp,
  Hash,
  Type,
  MessageSquare,
  Tag,
  Link,
  Check,
  AlertCircle,
  Lock
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleFaq = () => {
  // State for FAQ list
  const [faqList, setFaqList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // State for form (add/edit)
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    faq_type: '',
    faq_slug: '',
    faq_question: '',
    question_meta: '',
    faq_answer: '',
    faq_answer_meta: '',
    is_active: true
  });
  
  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for expanded FAQ items
  const [expandedItems, setExpandedItems] = useState([]);

  // Fetch FAQ list
  const fetchFaqList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/faqs/all');
      if (response.data.status) {
        setFaqList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching FAQ list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = faqList;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.faq_question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.faq_answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.faq_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(item => item.is_active === isActive);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.faq_type === typeFilter);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, typeFilter, faqList]);

  // Get unique FAQ types for filter
  const uniqueTypes = [...new Set(faqList.map(item => item.faq_type))];

  // Toggle FAQ item expansion
  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Generate slug from FAQ type
  const generateSlug = (type) => {
    return type
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  // Handle add new FAQ
  const handleAddNew = () => {
    setFormMode('add');
    setFormData({
      faq_type: '',
      faq_slug: '',
      faq_question: '',
      question_meta: '',
      faq_answer: '',
      faq_answer_meta: '',
      is_active: true
    });
    setFormErrors({});
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle edit FAQ
  const handleEdit = (faq) => {
    setFormMode('edit');
    setCurrentId(faq.id);
    setFormData({
      faq_type: faq.faq_type || '',
      faq_slug: faq.faq_slug || '',
      faq_question: faq.faq_question || '',
      question_meta: faq.question_meta || '',
      faq_answer: faq.faq_answer || '',
      faq_answer_meta: faq.faq_answer_meta || '',
      is_active: faq.is_active
    });
    setFormErrors({});
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete FAQ
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await api.delete(`/admin/faqs/${id}`);
        fetchFaqList(); // Refresh list
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Auto-generate slug when FAQ type changes (slug is read-only)
      if (name === 'faq_type') {
        const slug = generateSlug(value);
        newData.faq_slug = slug.substring(0, 50); // Limit slug length
      }
      
      return newData;
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.faq_type.trim()) {
      errors.faq_type = 'FAQ type is required';
    }
    
    if (!formData.faq_question.trim()) {
      errors.faq_question = 'Question is required';
    }
    
    if (!formData.faq_answer.trim()) {
      errors.faq_answer = 'Answer is required';
    }
    
    if (!formData.faq_slug.trim()) {
      errors.faq_slug = 'Slug is required';
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
      let response;
      if (formMode === 'add') {
        response = await api.post('/admin/faqs', formData);
      } else {
        response = await api.put(`/admin/faqs/${currentId}`, formData);
      }

      if (response.data.status) {
        setShowForm(false);
        fetchFaqList(); // Refresh list
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
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
      await api.patch(`/faq/${id}/status`, {
        is_active: !currentStatus
      });
      fetchFaqList(); // Refresh list
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading FAQs...</p>
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
            FAQ Management
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage Frequently Asked Questions for your website
          </p>
        </div>
        
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New FAQ
        </button>
      </div>

      {/* Form Section (Top) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-[#0A0A0A]">
                {formMode === 'add' ? 'Add New FAQ' : 'Edit FAQ'}
              </h3>
              <p className="text-[#4B5563] text-sm mt-1">
                {formMode === 'add' 
                  ? 'Create a new frequently asked question' 
                  : 'Update the FAQ details'}
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
                {/* FAQ Type */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Tag size={16} className="inline mr-2" />
                    FAQ Type *
                  </label>
                  <input
                    type="text"
                    name="faq_type"
                    value={formData.faq_type}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.faq_type 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                    }`}
                    placeholder="e.g., Web Development, Blog, Pricing, Support"
                  />
                  {formErrors.faq_type && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.faq_type}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Category for grouping FAQs (slug will be auto-generated from this)
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

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <Type size={16} className="inline mr-2" />
                  Question *
                </label>
                <textarea
                  name="faq_question"
                  value={formData.faq_question}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full p-3 rounded-xl border ${
                    formErrors.faq_question 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                  }`}
                  placeholder="Enter the frequently asked question"
                />
                {formErrors.faq_question && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.faq_question}</p>
                )}
              </div>

              {/* Question Meta */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  Question Meta
                </label>
                <input
                  type="text"
                  name="question_meta"
                  value={formData.question_meta}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  placeholder="Meta information for SEO (optional)"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  <MessageSquare size={16} className="inline mr-2" />
                  Answer *
                </label>
                <textarea
                  name="faq_answer"
                  value={formData.faq_answer}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full p-3 rounded-xl border ${
                    formErrors.faq_answer 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20'
                  }`}
                  placeholder="Provide a clear and helpful answer"
                />
                {formErrors.faq_answer && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.faq_answer}</p>
                )}
              </div>

              {/* Answer Meta */}
              <div>
                <label className="block text-sm font-medium text-[#4B5563] mb-2">
                  Answer Meta
                </label>
                <input
                  type="text"
                  name="faq_answer_meta"
                  value={formData.faq_answer_meta}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                  placeholder="Meta information for SEO (optional)"
                />
              </div>
            </div>

            {/* Slug Section - Read Only */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#0A0A0A] border-b border-[#E5E7EB] pb-2">
                URL Slug (Auto-generated)
              </h4>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lock className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <p className="text-blue-700 text-sm mb-2">
                      The slug is automatically generated from the FAQ type and cannot be edited manually.
                      It's used in the URL for this FAQ.
                    </p>
                    <p className="text-blue-600 text-xs">
                      Example: If FAQ type is "Web Development", slug will be: <strong>web-development</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <Link size={16} className="inline mr-2" />
                    FAQ Slug
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="faq_slug"
                      value={formData.faq_slug}
                      readOnly
                      className={`flex-1 p-3 rounded-xl border bg-gray-100 text-gray-600 ${
                        formErrors.faq_slug 
                          ? 'border-red-300' 
                          : 'border-[#E5E7EB]'
                      }`}
                      placeholder="Auto-generated from FAQ type"
                    />
                    <div className="px-4 py-3 bg-gray-200 text-gray-600 rounded-xl flex items-center">
                      <Lock size={16} />
                    </div>
                  </div>
                  {formErrors.faq_slug && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.faq_slug}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    This field is read-only. It updates automatically when you change the FAQ type.
                  </p>
                </div>

                <div className="flex items-end">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-full">
                    <p className="text-xs text-gray-500 mb-1">Preview URL:</p>
                    <p className="text-sm text-gray-700 font-mono truncate">
                      {formData.faq_slug || 'auto-generated-slug'}
                    </p>
                  </div>
                </div>
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
                      {formMode === 'add' ? 'Create FAQ' : 'Update FAQ'}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]" size={20} />
              <input
                type="text"
                placeholder="Search by question, answer, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Tag size={20} className="text-[#4B5563]" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Total FAQs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">{faqList.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active FAQs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {faqList.filter(item => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive FAQs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {faqList.filter(item => !item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Unique Types</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {uniqueTypes.length}
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredList.length > 0 ? (
          filteredList.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        faq.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {faq.is_active ? (
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
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {faq.faq_type}
                      </span>
                      <span className="text-sm text-[#4B5563]">
                        ID: {faq.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A] pr-4">
                      {faq.faq_question}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActiveStatus(faq.id, faq.is_active)}
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition whitespace-nowrap"
                    >
                      {faq.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title={expandedItems.includes(faq.id) ? 'Collapse' : 'Expand'}
                    >
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(faq.id) && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-6">
                    {/* Answer */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <MessageSquare size={16} className="inline mr-2" />
                        Answer
                      </label>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 whitespace-pre-line">
                        {faq.faq_answer}
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Question Meta
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {faq.question_meta || <span className="text-gray-400 italic">Not set</span>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Answer Meta
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          {faq.faq_answer_meta || <span className="text-gray-400 italic">Not set</span>}
                        </div>
                      </div>
                    </div>

                    {/* Slug and Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          <Link size={16} className="inline mr-2" />
                          URL Slug
                        </label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <Lock size={14} className="text-gray-400" />
                            <p className="text-sm font-mono text-gray-700 break-all">
                              /faq/{faq.faq_slug}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Full URL: https://yourwebsite.com/faq/{faq.faq_slug}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 italic">
                            Auto-generated from FAQ type: {faq.faq_type}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4B5563] mb-2">
                          Timestamps
                        </label>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <p className="text-sm text-gray-600">
                            Created: {new Date(faq.created_at).toLocaleDateString()} {new Date(faq.created_at).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Updated: {new Date(faq.updated_at).toLocaleDateString()} {new Date(faq.updated_at).toLocaleTimeString()}
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
                <MessageSquare className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No FAQs Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'No FAQs match your search criteria' 
                  : 'Get started by creating your first FAQ'}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First FAQ
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
            <h4 className="font-semibold text-blue-800 mb-2">About FAQ Management</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>FAQs help reduce customer support requests and improve user experience</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Group FAQs by type for better organization and navigation</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>URL slugs are <strong>automatically generated</strong> from the FAQ type and cannot be edited</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Example: "Web Development" → "web-development", "Pricing Plans" → "pricing-plans"</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Meta fields are optional but help with SEO and internal organization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleFaq;