import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  Mail,
  User,
  Building2,
  Phone,
  Calendar,
  Tag,
  Check,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Send
} from 'lucide-react';
import { api } from '../../../utils/app';

const HandleContact = () => {
  // State for contact list
  const [contactList, setContactList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for expanded items
  const [expandedItems, setExpandedItems] = useState([]);
  
  // State for view message modal
  const [viewModal, setViewModal] = useState({ show: false, message: null });
  
  // State for status update
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // Fetch contact list
  const fetchContactList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/contacts');
      if (response.data.status) {
        setContactList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching contact list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = contactList;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, contactList]);

  // Toggle item expansion
  const toggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  // Update message status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      await api.patch(`/admin/contacts/status/${id}`, {
        status: newStatus
      });
      fetchContactList(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // View message in modal
  const viewMessage = (message) => {
    setViewModal({ show: true, message });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'new':
        return <Clock size={14} />;
      case 'replied':
        return <Send size={14} />;
      case 'closed':
        return <CheckCircle size={14} />;
      default:
        return <Tag size={14} />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading contact messages...</p>
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
            Contact Messages
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage and respond to contact form submissions
          </p>
        </div>

        <button
          onClick={fetchContactList}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] border border-[#E5E7EB] rounded-xl hover:bg-[#0A0A0A] hover:text-white transition-all font-semibold"
        >
          <RefreshCw size={20} />
          Refresh
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
                placeholder="Search by name, email, subject, or message..."
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
              <option value="new">New</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Total Messages</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">{contactList.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">New</p>
          <p className="text-2xl font-semibold text-blue-600">
            {contactList.filter((item) => item.status === 'new').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Replied</p>
          <p className="text-2xl font-semibold text-green-600">
            {contactList.filter((item) => item.status === 'replied').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Closed</p>
          <p className="text-2xl font-semibold text-gray-600">
            {contactList.filter((item) => item.status === 'closed').length}
          </p>
        </div>
      </div>

      {/* Contact List */}
      <div className="space-y-4">
        {filteredList.length > 0 ? (
          filteredList.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span className="capitalize">{contact.status}</span>
                      </span>
                      <span className="text-sm text-[#4B5563] flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A] mb-1">
                      {contact.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {contact.full_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </span>
                      {contact.phone_number && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          <a href={`tel:${contact.phone_number}`} className="text-blue-600 hover:underline">
                            {contact.phone_number}
                          </a>
                        </span>
                      )}
                      {contact.company_name && (
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {contact.company_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewMessage(contact)}
                      className="px-4 py-2 bg-[#0A0A0A] text-white rounded-lg hover:bg-[#1F2937] transition text-sm font-medium flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => toggleExpand(contact.id)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title={expandedItems.includes(contact.id) ? 'Collapse' : 'Expand'}
                    >
                      {expandedItems.includes(contact.id) ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Brief Message Preview */}
                <div className="text-sm text-[#4B5563] bg-gray-50 p-3 rounded-lg">
                  {contact.message.substring(0, 150)}
                  {contact.message.length > 150 && '...'}
                </div>

                {/* Expanded Content */}
                {expandedItems.includes(contact.id) && (
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-6">
                    {/* Full Message */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2 flex items-center gap-2">
                        <MessageSquare size={16} />
                        Full Message
                      </label>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 whitespace-pre-wrap">
                        {contact.message}
                      </div>
                    </div>

                    {/* Status Update */}
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Update Status
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => updateStatus(contact.id, 'new')}
                          disabled={updatingStatus === contact.id || contact.status === 'new'}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                            contact.status === 'new'
                              ? 'bg-blue-100 text-blue-800 cursor-default'
                              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <Clock size={16} />
                          Mark as New
                        </button>
                        <button
                          onClick={() => updateStatus(contact.id, 'replied')}
                          disabled={updatingStatus === contact.id || contact.status === 'replied'}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                            contact.status === 'replied'
                              ? 'bg-green-100 text-green-800 cursor-default'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <Send size={16} />
                          Mark as Replied
                        </button>
                        <button
                          onClick={() => updateStatus(contact.id, 'closed')}
                          disabled={updatingStatus === contact.id || contact.status === 'closed'}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                            contact.status === 'closed'
                              ? 'bg-gray-100 text-gray-800 cursor-default'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <CheckCircle size={16} />
                          Mark as Closed
                        </button>
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
                <Mail className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Messages Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'No messages match your search criteria'
                  : 'No contact form submissions yet'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {viewModal.show && viewModal.message && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-xl font-semibold text-[#0A0A0A]">
                  Message Details
                </h3>
                <p className="text-[#4B5563] text-sm mt-1">
                  View full message and contact information
                </p>
              </div>
              <button
                onClick={() => setViewModal({ show: false, message: null })}
                className="p-2 hover:bg-[#F3F4F6] rounded-lg transition"
              >
                <X size={24} className="text-[#4B5563]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(viewModal.message.status)}`}>
                    {getStatusIcon(viewModal.message.status)}
                    <span className="capitalize">{viewModal.message.status}</span>
                  </span>
                  <span className="text-sm text-[#4B5563] flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(viewModal.message.created_at)}
                  </span>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    Subject
                  </label>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                    {viewModal.message.subject}
                  </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name
                    </label>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                      {viewModal.message.full_name}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email
                    </label>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                      <a href={`mailto:${viewModal.message.email}`} className="text-blue-600 hover:underline">
                        {viewModal.message.email}
                      </a>
                    </div>
                  </div>

                  {viewModal.message.phone_number && (
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone Number
                      </label>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                        <a href={`tel:${viewModal.message.phone_number}`} className="text-blue-600 hover:underline">
                          {viewModal.message.phone_number}
                        </a>
                      </div>
                    </div>
                  )}

                  {viewModal.message.company_name && (
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        <Building2 size={16} className="inline mr-2" />
                        Company
                      </label>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                        {viewModal.message.company_name}
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Message */}
                <div>
                  <label className="block text-sm font-medium text-[#4B5563] mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Message
                  </label>
                  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 whitespace-pre-wrap">
                    {viewModal.message.message}
                  </div>
                </div>

                {/* Quick Actions */}
                {/* <div className="pt-4 border-t border-[#E5E7EB]">
                  <label className="block text-sm font-medium text-[#4B5563] mb-3">
                    Quick Actions
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${viewModal.message.email}?subject=Re: ${viewModal.message.subject}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#0A0A0A] text-white rounded-lg hover:bg-[#1F2937] transition text-sm font-medium flex items-center gap-2"
                    >
                      <Send size={16} />
                      Reply via Email
                    </a>
                    {viewModal.message.phone_number && (
                      <a
                        href={`tel:${viewModal.message.phone_number}`}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-2"
                      >
                        <Phone size={16} />
                        Call
                      </a>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 mt-1">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-800 mb-2">
              About Contact Messages
            </h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>New</strong> - Messages that haven't been addressed yet</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Replied</strong> - Messages that have been responded to</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span><strong>Closed</strong> - Conversations that are complete</span>
              </li>
              <li className="flex items-start">
                <Check className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Use the status buttons to track your communication progress</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleContact;