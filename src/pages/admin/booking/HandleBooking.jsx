import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Trash2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Building,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleBooking = () => {
  // State for bookings
  const [bookingList, setBookingList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for expanded booking details
  const [expandedId, setExpandedId] = useState(null);
  
  // State for status update
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  // Items per page options
  const perPageOptions = [5, 10, 25, 50, 100];

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/demo-bookings');
      if (response.data.status) {
        setBookingList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = bookingList;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone_number.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredList(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, bookingList]);

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredList.slice(startIndex, endIndex));
  }, [filteredList, currentPage, itemsPerPage]);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      const response = await api.patch(`admin/demo-bookings/status/${id}`, {
        status: newStatus
      });
      
      if (response.data.status) {
        fetchBookings(); // Refresh list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await api.delete(`/admin/demo-bookings/${id}`);
        if (response.data.status) {
          fetchBookings();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  // Get status color
  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.color : 'bg-gray-100 text-gray-800';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} />;
      case 'contacted':
        return <Phone size={14} />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'cancelled':
        return <XCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (timeString) => {
    return timeString;
  };

  // Calculate pagination
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading bookings...</p>
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
            Demo Bookings
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage and track all demo booking requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, company, email, or phone..."
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
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white min-w-[150px]"
            >
              <option value="all">All Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Items Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#4B5563] whitespace-nowrap">Show:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white"
            >
              {perPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Total Bookings</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {bookingList.length}
          </p>
        </div>
        {statusOptions.map((option) => (
          <div key={option.value} className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
            <p className="text-[#4B5563] text-sm">{option.label}</p>
            <p className="text-2xl font-semibold text-[#0A0A0A]">
              {bookingList.filter((item) => item.status === option.value).length}
            </p>
          </div>
        ))}
      </div>

      {/* Results Info */}
      {filteredList.length > 0 && (
        <div className="mb-4 text-sm text-[#4B5563]">
          Showing {startItem} to {endItem} of {totalItems} bookings
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {paginatedData.length > 0 ? (
          paginatedData.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              {/* Header - Always Visible */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#0A0A0A]">
                        {booking.full_name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {statusOptions.find(opt => opt.value === booking.status)?.label || booking.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                      <span className="flex items-center gap-1">
                        <Building size={14} />
                        {booking.company_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        <a href={`mailto:${booking.email}`} className="hover:text-[#0A0A0A]">
                          {booking.email}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        <a href={`tel:${booking.phone_number}`} className="hover:text-[#0A0A0A]">
                          {booking.phone_number}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(booking.preferred_date)} at {formatTime(booking.preferred_time)}
                      </span>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex items-center gap-2">
                    {/* Status Update Dropdown */}
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                      disabled={updatingStatus === booking.id}
                      className="px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20 bg-white disabled:opacity-50"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title={expandedId === booking.id ? 'Show less' : 'Show more'}
                    >
                      {expandedId === booking.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 text-[#4B5563] hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === booking.id && (
                <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563]">
                        <MessageSquare size={16} />
                        Additional Notes
                      </div>
                      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                        <p className="text-[#0A0A0A] whitespace-pre-line">
                          {booking.additional_notes || 'No additional notes provided.'}
                        </p>
                      </div>
                    </div>

                    {/* Booking Information */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563]">
                        <Calendar size={16} />
                        Booking Information
                      </div>
                      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4B5563]">Booking ID:</span>
                            <span className="text-sm font-medium text-[#0A0A0A]">#{booking.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4B5563]">Requested On:</span>
                            <span className="text-sm font-medium text-[#0A0A0A]">
                              {new Date(booking.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4B5563]">Last Updated:</span>
                            <span className="text-sm font-medium text-[#0A0A0A]">
                              {new Date(booking.updated_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-[#4B5563]">Quick Actions:</span>
                        {/* <a
                          href={`mailto:${booking.email}?subject=Demo Booking Request - ${booking.company_name}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <Mail size={14} />
                          Send Email
                        </a> */}
                        {/* <a
                          href={`tel:${booking.phone_number}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm"
                        >
                          <Phone size={14} />
                          Call Client
                        </a> */}
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'contacted')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <Phone size={14} />
                          Mark as Contacted
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'completed')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm"
                        >
                          <CheckCircle size={14} />
                          Mark as Completed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Bookings Found
              </h3>
              <p className="text-[#4B5563]">
                {searchTerm || statusFilter !== 'all'
                  ? 'No bookings match your search criteria'
                  : 'No demo bookings have been submitted yet.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="First Page"
            >
              <ChevronsLeft size={18} />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`dots-${index}`} className="px-3 py-2 text-[#4B5563]">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? 'bg-[#0A0A0A] text-white'
                        : 'text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Last Page"
            >
              <ChevronsRight size={18} />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-sm text-[#4B5563]">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleBooking;