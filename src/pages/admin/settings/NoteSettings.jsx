import React, { useState, useEffect } from 'react'
import { api } from '../../../utils/app'

const NoteSettings = () => {
  const [noteData, setNoteData] = useState({
    id: '',
    note: '',
    note_meta: '',
    is_active: false
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch note data from API
  useEffect(() => {
    fetchNoteData();
  }, []);

  const fetchNoteData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/notes"); // Adjust endpoint as needed
      if (response.data.status && response.data.data) {
        setNoteData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching note data:", error);
      setMessage({ type: 'error', text: 'Failed to load note settings' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setNoteData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setNoteData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // If canceling edit, refetch original data
      fetchNoteData();
      setMessage({ type: '', text: '' });
    }
  };

  // Save note data
  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const response = await api.put(
        `/admin/notes/${noteData.id}`, // Adjust endpoint as needed
        noteData
      );
      
      if (response.data.status) {
        setMessage({ type: 'success', text: 'Note settings updated successfully!' });
        setIsEditing(false);
        fetchNoteData(); // Refresh data
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Update failed' });
      }
    } catch (error) {
      console.error("Error saving note settings:", error);
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

  // Toggle active status
  const toggleActiveStatus = () => {
    if (isEditing) {
      setNoteData(prev => ({
        ...prev,
        is_active: !prev.is_active
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading note settings...</p>
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
            Note Settings
          </h2>
          <p className="text-[#4B5563] mt-2">
            Manage website note content and visibility
          </p>
        </div>
        
        {/* Active Status and Edit Button */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className={`text-sm font-medium mr-2 ${noteData.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {noteData.is_active ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={toggleActiveStatus}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                noteData.is_active ? 'bg-green-500' : 'bg-gray-300'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  noteData.is_active ? 'translate-x-6' : 'translate-x-1'
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

      {/* Status Banner */}
      <div className={`mb-6 p-4 rounded-xl border ${
        noteData.is_active 
          ? 'bg-green-50 border-green-200 text-green-700' 
          : 'bg-yellow-50 border-yellow-200 text-yellow-700'
      }`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${noteData.is_active ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <p className="font-medium">
            {noteData.is_active 
              ? 'Note is currently active and visible on the website' 
              : 'Note is currently inactive and hidden from the website'}
          </p>
        </div>
        {!isEditing && (
          <p className="text-sm mt-1 ml-6">
            Toggle the switch above to change the status (Edit mode required)
          </p>
        )}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8">
        <div className="space-y-8">
          {/* Note Content Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
              <h3 className="text-xl font-semibold text-[#0A0A0A]">
                Note Content
              </h3>
              <span className="text-sm text-[#6B7280] bg-gray-100 px-3 py-1 rounded-lg">
                ID: {noteData.id}
              </span>
            </div>

            {/* Note Meta (Short Description) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-[#4B5563]">
                  Note Meta Description
                </label>
                <span className="text-xs text-gray-500">
                  For internal reference
                </span>
              </div>
              <input
                type="text"
                name="note_meta"
                value={noteData.note_meta || ""}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full p-3 rounded-xl border ${
                  isEditing 
                    ? "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20" 
                    : "border-[#F3F4F6] bg-[#F9FAFB]"
                }`}
                placeholder="Enter a short description for this note"
              />
            </div>

            {/* Main Note Content */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-[#4B5563]">
                  Note Content
                </label>
                <span className="text-xs text-gray-500">
                  Rich text content with HTML support
                </span>
              </div>
              <div className={`rounded-xl border overflow-hidden ${
                isEditing 
                  ? "border-[#E5E7EB] focus-within:border-[#0A0A0A] focus-within:ring-2 focus-within:ring-[#0A0A0A]/20" 
                  : "border-[#F3F4F6]"
              }`}>
                <textarea
                  name="note"
                  value={noteData.note || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  rows={8}
                  className={`w-full p-4 resize-none focus:outline-none ${
                    !isEditing ? "bg-[#F9FAFB]" : "bg-white"
                  }`}
                  placeholder="Enter your note content here. HTML tags are supported."
                />
                {isEditing && (
                  <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      <strong>Tip:</strong> Use HTML tags for formatting (e.g., &lt;strong&gt;, &lt;em&gt;, &lt;a href=""&gt;, &lt;br&gt;)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-[#4B5563]">
                  Content Preview
                </label>
                <span className="text-xs text-gray-500">
                  How it will appear on the website
                </span>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: noteData.note || 'No content to preview' }}
                />
                {!noteData.note && (
                  <p className="text-gray-400 italic">Preview will appear here</p>
                )}
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="pt-6 border-t border-[#E5E7EB]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="space-y-1">
                <p className="font-medium text-gray-600">Created</p>
                <p>{new Date(noteData.created_at).toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-600">Last Updated</p>
                <p>{new Date(noteData.updated_at).toLocaleString()}</p>
              </div>
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

      {/* Information Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-800 mb-2">About Note Settings</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>This note content will appear on specific pages of your website</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Use HTML formatting for rich text content (links, bold, italics, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Meta description is for internal reference only and won't be displayed publicly</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Toggle the active status to show/hide the note on the website</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteSettings