import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Globe,
  Eye,
  EyeOff,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/CustomTextEditor";

const HandleJobs = () => {
  // State management
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'active', 'inactive'
  const [expandedJob, setExpandedJob] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    urgent_hiring: false,
    job_title: "",
    job_description: "",
    job_desc_long: "",
    desc_meta_long: "",
    location: "",
    salary_range: "",
    salary_period: "per year",
    job_type: "Full-time",
    experience: "",
    remote_available: false,
    visa_sponsorship: false,
    date: new Date().toISOString().split("T")[0],
    is_active: true,
  });

  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming GET endpoint for jobs list
      const response = await api.get("/admin/available-jobs");
      if (response.data && response.data.data) {
        setJobs(response.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch jobs");
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
    if (!formData.category?.trim()) errors.category = "Category is required";
    if (!formData.job_title?.trim()) errors.job_title = "Job title is required";
    if (!formData.job_description?.trim())
      errors.job_description = "Short description is required";
    if (!formData.location?.trim()) errors.location = "Location is required";
    if (!formData.salary_range?.trim())
      errors.salary_range = "Salary range is required";
    if (!formData.experience?.trim())
      errors.experience = "Experience requirement is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      category: "",
      urgent_hiring: false,
      job_title: "",
      job_description: "",
      job_desc_long: "",
      desc_meta_long: "",
      location: "",
      salary_range: "",
      salary_period: "per year",
      job_type: "Full-time",
      experience: "",
      remote_available: false,
      visa_sponsorship: false,
      date: new Date().toISOString().split("T")[0],
      is_active: true,
    });
    setValidationErrors({});
    setEditingJob(null);
  };

  // Handle add new job
  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle edit job
  const handleEditClick = (job) => {
    setFormData({
      category: job.category || "",
      urgent_hiring: job.urgent_hiring || false,
      job_title: job.job_title || "",
      job_description: job.job_description || "",
      job_desc_long: job.job_desc_long || "",
      desc_meta_long: job.desc_meta_long || "",
      location: job.location || "",
      salary_range: job.salary_range || "",
      salary_period: job.salary_period || "per year",
      job_type: job.job_type || "Full-time",
      experience: job.experience || "",
      remote_available: job.remote_available || false,
      visa_sponsorship: job.visa_sponsorship || false,
      date: job.date
        ? new Date(job.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      is_active: job.is_active !== undefined ? job.is_active : true,
    });
    setEditingJob(job);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      if (editingJob) {
        // Update existing job
        response = await api.post(
          `/admin/available-jobs/update/${editingJob.id}`,
          formData,
        );
      } else {
        // Add new job
        response = await api.post("/admin/available-jobs", formData);
      }

      if (response.data) {
        await fetchJobs(); // Refresh the list
        setSuccess(
          editingJob ? "Job updated successfully!" : "Job added successfully!",
        );
        setShowForm(false);
        resetForm();

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  // Handle delete job
  const handleDelete = async (jobId) => {
    setSaving(true);
    setError(null);

    try {
      await api.delete(`/admin/available-jobs/delete/${jobId}`);
      await fetchJobs(); // Refresh the list
      setSuccess("Job deleted successfully!");
      setDeleteConfirm(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete job");
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    resetForm();
    setError(null);
  };

  // Filter jobs based on search and status
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? job.is_active
          : filterStatus === "inactive"
            ? !job.is_active
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

  // Job type colors
  const jobTypeColors = {
    "Full-time": "bg-blue-100 text-blue-700",
    "Part-time": "bg-purple-100 text-purple-700",
    Contract: "bg-orange-100 text-orange-700",
    Freelance: "bg-green-100 text-green-700",
    Internship: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Jobs Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and post job openings
                </p>
              </div>
            </div>

            <button
              onClick={handleAddClick}
              className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center space-x-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
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

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingJob ? "Edit Job" : "Post New Job"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.category
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., Data & Analytics"
                        />
                        {validationErrors.category && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.category}
                          </p>
                        )}
                      </div>

                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="job_title"
                          value={formData.job_title}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.job_title
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., Senior Software Engineer"
                        />
                        {validationErrors.job_title && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.job_title}
                          </p>
                        )}
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.location
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., London, UK"
                        />
                        {validationErrors.location && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.location}
                          </p>
                        )}
                      </div>

                      {/* Salary Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary Range <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="salary_range"
                          value={formData.salary_range}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.salary_range
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., £70,000 - £90,000"
                        />
                        {validationErrors.salary_range && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.salary_range}
                          </p>
                        )}
                      </div>

                      {/* Salary Period */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary Period
                        </label>
                        <select
                          name="salary_period"
                          value={formData.salary_period}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="per hour">Per Hour</option>
                          <option value="per day">Per Day</option>
                          <option value="per week">Per Week</option>
                          <option value="per month">Per Month</option>
                          <option value="per year">Per Year</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Job Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Type
                        </label>
                        <select
                          name="job_type"
                          value={formData.job_type}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      {/* Experience */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.experience
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., 5+ years"
                        />
                        {validationErrors.experience && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.experience}
                          </p>
                        )}
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posted Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="urgent_hiring"
                            checked={formData.urgent_hiring}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">
                            Urgent Hiring
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="remote_available"
                            checked={formData.remote_available}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">
                            Remote Available
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="visa_sponsorship"
                            checked={formData.visa_sponsorship}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">
                            Visa Sponsorship Available
                          </span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                          />
                          <span className="text-sm text-gray-700">
                            Active (Visible on site)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Full Width Fields */}
                    <div className="md:col-span-2 space-y-4">
                      {/* Short Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Short Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="job_description"
                          value={formData.job_description}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                            validationErrors.job_description
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          placeholder="Brief description of the role..."
                        />
                        {validationErrors.job_description && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.job_description}
                          </p>
                        )}
                      </div>

                      {/* Long Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detailed Description
                        </label>

                        <CustomTextEditor
                          value={formData.job_desc_long || ""}
                          height={350}
                          placeholder="Detailed job description, requirements, benefits..."
                          onChange={(content) =>
                            setFormData((prev) => ({
                              ...prev,
                              job_desc_long: content,
                            }))
                          }
                        />
                      </div>

                      {/* Description Meta */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description Meta (Optional)
                        </label>
                        <input
                          type="text"
                          name="desc_meta_long"
                          value={formData.desc_meta_long}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Meta description for SEO"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="mt-6 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
                          <span>{editingJob ? "Update Job" : "Post Job"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
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
                placeholder="Search jobs..."
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
              <option value="all">All Jobs</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by posting your first job"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={handleAddClick}
                className="px-6 py-2 bg-gray-900 text-white border border-gray-900 rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Job</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Job Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {job.urgent_hiring && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            URGENT HIRING
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            job.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.is_active ? "Active" : "Inactive"}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            jobTypeColors[job.job_type] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {job.job_type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {job.job_title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {job.job_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary_range} {job.salary_period}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.experience}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.date)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {job.remote_available && (
                          <span className="flex items-center text-xs text-gray-500">
                            <Globe className="w-3 h-3 mr-1" />
                            Remote Available
                          </span>
                        )}
                        {job.visa_sponsorship && (
                          <span className="flex items-center text-xs text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            Visa Sponsorship
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit job"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {deleteConfirm === job.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDelete(job.id)}
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
                          onClick={() => setDeleteConfirm(job.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete job"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setExpandedJob(expandedJob === job.id ? null : job.id)
                        }
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {expandedJob === job.id ? (
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
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-4">
                        {job.job_desc_long && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Detailed Description
                            </h4>
                            <p className="text-sm text-gray-600">
                              {job.job_desc_long}
                            </p>
                          </div>
                        )}

                        {job.desc_meta_long && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Meta Description
                            </h4>
                            <p className="text-sm text-gray-500 italic">
                              {job.desc_meta_long}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Category
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {job.category}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Created
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(job.created_at)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Last Updated
                            </p>
                            <p className="text-sm text-gray-900">
                              {formatDate(job.updated_at)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Job Slug
                            </p>
                            <p className="text-sm text-gray-600 font-mono">
                              {job.job_slug}
                            </p>
                          </div>
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
    </div>
  );
};

export default HandleJobs;
