import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Filter,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  FileText,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  User,
  Star,
  XCircle,
  CheckCircle,
  Clock as ClockIcon,
  RefreshCw,
  FileDown,
  ExternalLink,
  Import
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleJobsApplication = () => {
    const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  // State management
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // View states
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'details'
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: ClockIcon },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-blue-100 text-blue-700', icon: Eye },
    { value: 'selected', label: 'Selected', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle }
  ];

  // Fetch applications on component mount and when filters/pagination change
  useEffect(() => {
    fetchApplications();
  }, [currentPage, statusFilter, jobFilter]);

  // Fetch applications from API
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = new URLSearchParams({
        page: currentPage,
        per_page: itemsPerPage
      });
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (jobFilter !== 'all') {
        params.append('job_id', jobFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (dateRange.from) {
        params.append('date_from', dateRange.from);
      }
      
      if (dateRange.to) {
        params.append('date_to', dateRange.to);
      }

      const response = await api.get(`/admin/job-applications?${params.toString()}`);
      
      if (response.data && response.data.data) {
        setApplications(response.data.data.data || []);
        setPagination({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
          perPage: response.data.data.per_page,
          from: response.data.data.from,
          to: response.data.data.to
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single application details
  const fetchApplicationDetails = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/job-applications/single/${id}`);
      if (response.data && response.data.data) {
        setSelectedApplication(response.data.data);
        setViewMode('details');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch application details');
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const updateStatus = async (applicationId, newStatus) => {
    setUpdating(true);
    setError(null);
    
    try {
      await api.post(`/admin/job-applications/status/${applicationId}`, {
        status: newStatus
      });
      
      // Refresh the list
      await fetchApplications();
      
      // Update selected application if in details view
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication(prev => ({
          ...prev,
          status: newStatus
        }));
      }
      
      setSuccess(`Application status updated to ${newStatus}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setCurrentPage(1);
        fetchApplications();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle filter reset
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setJobFilter('all');
    setDateRange({ from: '', to: '' });
    setCurrentPage(1);
  };

  // Get status badge component
  const StatusBadge = ({ status }) => {
    const statusOption = statusOptions.find(s => s.value === status) || statusOptions[0];
    const Icon = statusOption.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusOption.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusOption.label}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Download CV
  const downloadCV = (cvUrl, fileName) => {
    window.open(cvUrl, '_blank');
  };

  // Get unique jobs for filter
  const uniqueJobs = [...new Map(
    applications.map(app => [app.job?.id, app.job])
  ).values()].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and review candidate applications
                </p>
              </div>
            </div>
            
            {viewMode === 'details' && (
              <button
                onClick={() => setViewMode('list')}
                className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to List</span>
              </button>
            )}
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

        {/* List View */}
        {viewMode === 'list' ? (
          <>
            {/* Filters Bar */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  {/* Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 border rounded-lg flex items-center space-x-2 transition-colors ${
                      showFilters 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  {/* Reset Filters */}
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Status Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Job Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Position
                        </label>
                        <select
                          value={jobFilter}
                          onChange={(e) => setJobFilter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="all">All Jobs</option>
                          {uniqueJobs.map(job => (
                            <option key={job.id} value={job.id}>
                              {job.job_title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date From */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          From Date
                        </label>
                        <input
                          type="date"
                          value={dateRange.from}
                          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      {/* Date To */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          To Date
                        </label>
                        <input
                          type="date"
                          value={dateRange.to}
                          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Applications List */}
            {loading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-gray-900 mx-auto mb-4" />
                <p className="text-gray-600">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No job applications have been submitted yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Main Content */}
                        <div className="flex-1">
                          {/* Header with Status */}
                          <div className="flex items-center space-x-3 mb-3">
                            <StatusBadge status={application.status} />
                            <span className="text-sm text-gray-500">
                              Applied {formatDate(application.created_at)}
                            </span>
                          </div>

                          {/* Candidate Info */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {application.full_name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {application.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {application.phone_number}
                              </span>
                            </div>
                          </div>

                          {/* Job Details */}
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Briefcase className="w-4 h-4 mr-2" />
                              Applied for: {application.job?.job_title}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <span className="flex items-center text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                {application.job?.location}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {application.job?.salary_range}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <Clock className="w-3 h-3 mr-1" />
                                {application.job?.job_type}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <User className="w-3 h-3 mr-1" />
                                {application.job?.experience}
                              </span>
                            </div>
                          </div>

                          {/* Salary Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-gray-600">
                              Current: {formatCurrency(application.current_salary)}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="text-gray-900 font-medium">
                              Expected: {formatCurrency(application.expected_salary)}
                            </span>
                            <span className="text-gray-500">
                              Notice: {application.notice_period}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={() => fetchApplicationDetails(application.id)}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-colors flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          
                          {application.cv_url && (
                            <button
                              onClick={() => downloadCV(`${STORAGE_URL}${application.cv_document}`, `${application.full_name}_CV.pdf`)}
                              className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center space-x-2"
                            >
                              <FileDown className="w-4 h-4" />
                              <span>CV</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {pagination && pagination.lastPage > 1 && (
                  <div className="mt-6 flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">
                      Showing {pagination.from} to {pagination.to} of {pagination.total} applications
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                        Page {currentPage} of {pagination.lastPage}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.lastPage))}
                        disabled={currentPage === pagination.lastPage}
                        className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Detailed View */
          selectedApplication && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Application Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Details
                  </h2>
                  <StatusBadge status={selectedApplication.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Applied For</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedApplication.job?.job_title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedApplication.job?.location} • {selectedApplication.job?.job_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Applied On</p>
                    <p className="text-gray-900">{formatDate(selectedApplication.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Candidate Information */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="text-gray-900 font-medium">{selectedApplication.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <a href={`mailto:${selectedApplication.email}`} className="text-gray-900 hover:text-gray-700">
                        {selectedApplication.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <a href={`tel:${selectedApplication.phone_number}`} className="text-gray-900">
                        {selectedApplication.phone_number}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Salary</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedApplication.current_salary)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expected Salary</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(selectedApplication.expected_salary)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Notice Period</p>
                      <p className="text-gray-900">{selectedApplication.notice_period}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              {selectedApplication.cover_letter && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}

              {/* CV */}
              {selectedApplication.cv_url && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">CV / Resume</h3>
                  <a
                    href={selectedApplication.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-white hover:text-gray-900 border border-gray-900 transition-colors space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View CV</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              )}

              {/* Job Details */}
              {selectedApplication.job && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <p className="text-sm font-medium text-gray-900">{selectedApplication.job.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-sm text-gray-900">{selectedApplication.job.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Salary Range</p>
                        <p className="text-sm text-gray-900">{selectedApplication.job.salary_range}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Experience</p>
                        <p className="text-sm text-gray-900">{selectedApplication.job.experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.job.urgent_hiring && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Urgent Hiring</span>
                      )}
                      {selectedApplication.job.remote_available && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Remote Available</span>
                      )}
                      {selectedApplication.job.visa_sponsorship && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Visa Sponsorship</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Status Update Section */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Application Status</h3>
                <div className="flex flex-wrap gap-3">
                  {statusOptions.map((option) => {
                    const Icon = option.icon;
                    const isCurrent = selectedApplication.status === option.value;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => updateStatus(selectedApplication.id, option.value)}
                        disabled={updating || isCurrent}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                          isCurrent
                            ? option.color + ' cursor-default'
                            : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-900 hover:text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{option.label}</span>
                        {isCurrent && <CheckCircle2 className="w-4 h-4 ml-1" />}
                      </button>
                    );
                  })}
                </div>
                
                {updating && (
                  <div className="mt-4 flex items-center text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating status...
                  </div>
                )}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default HandleJobsApplication;