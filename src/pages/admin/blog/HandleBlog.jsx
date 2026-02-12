import React, { useState, useEffect } from "react";
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
  Type,
  Youtube,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleBlog = () => {
  // State for blog list
  const [blogList, setBlogList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State for popup
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    title_slug: "",
    title_meta: "",
    short_desc: "",
    short_desc_meta: "",
    long_desc: "",
    long_desc_meta: "",
    image_alt: "",
    youtube_link: "",
    is_active: true,
  });

  // State for image files and previews
  const [imageFiles, setImageFiles] = useState({
    web: null,
    mobile: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    web: null,
    mobile: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch blog list
  const fetchBlogList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/admin/blogs");
      if (response.data.status) {
        setBlogList(response.data.data);
        setFilteredList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blog list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = blogList;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.short_desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title_slug.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter((item) => item.is_active === isActive);
    }

    setFilteredList(filtered);
  }, [searchTerm, statusFilter, blogList]);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  // Handle popup open for add
  const handleAddNew = () => {
    setFormMode("add");
    setFormData({
      title: "",
      title_slug: "",
      title_meta: "",
      short_desc: "",
      short_desc_meta: "",
      long_desc: "",
      long_desc_meta: "",
      image_alt: "",
      youtube_link: "",
      is_active: true,
    });
    setImageFiles({ web: null, mobile: null });
    setImagePreviews({ web: null, mobile: null });
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle popup open for edit
  const handleEdit = (item) => {
    setFormMode("edit");
    setCurrentId(item.id);
    setFormData({
      title: item.title || "",
      title_slug: item.title_slug || "",
      title_meta: item.title_meta || "",
      short_desc: item.short_desc || "",
      short_desc_meta: item.short_desc_meta || "",
      long_desc: item.long_desc || "",
      long_desc_meta: item.long_desc_meta || "",
      image_alt: item.image_alt || "",
      youtube_link: item.youtube_link || "",
      is_active: item.is_active,
    });
    setImageFiles({ web: null, mobile: null });
    setImagePreviews({
      web: item.web_image_url || null,
      mobile: item.mobile_image_url || null,
    });
    setFormErrors({});
    setShowFormPopup(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await api.delete(`/admin/blogs/${id}`);
        fetchBlogList();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Auto-generate slug from title
    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        title_slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setFormErrors((prev) => ({
          ...prev,
          [type]: "Please upload a valid image (JPG, JPEG, PNG, or WebP)",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          [type]: "Image size should be less than 5MB",
        }));
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        [type]: previewUrl,
      }));

      setImageFiles((prev) => ({
        ...prev,
        [type]: file,
      }));

      if (formErrors[type]) {
        setFormErrors((prev) => ({ ...prev, [type]: "" }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.title_slug.trim()) {
      errors.title_slug = "Slug is required";
    }

    if (!formData.short_desc.trim()) {
      errors.short_desc = "Short description is required";
    }

    if (!formData.long_desc.trim()) {
      errors.long_desc = "Long description is required";
    }

    if (formMode === "add" && !imageFiles.web && !imageFiles.mobile) {
      errors.web_image = "At least one image (web or mobile) is required";
    }

    // Validate YouTube URL if provided
    if (formData.youtube_link) {
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      if (!youtubeRegex.test(formData.youtube_link)) {
        errors.youtube_link = "Please enter a valid YouTube URL";
      }
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
      const formDataObj = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== null &&
          formData[key] !== undefined &&
          formData[key] !== ""
        ) {
          // Convert is_active to boolean string format expected by Laravel
          if (key === "is_active") {
            formDataObj.append(key, formData[key] ? "1" : "0");
          } else {
            formDataObj.append(key, formData[key]);
          }
        }
      });

      if (imageFiles.web) {
        formDataObj.append("web_image", imageFiles.web);
      }
      if (imageFiles.mobile) {
        formDataObj.append("mobile_image", imageFiles.mobile);
      }

    //   if (formMode === "edit") {
    //     formDataObj.append("_method", "PUT");
    //   }

      let response;
      if (formMode === "add") {
        response = await api.post("/admin/blogs", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await api.post(`/admin/blogs/${currentId}`, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.status) {
        setShowFormPopup(false);
        fetchBlogList();
      }
    } catch (error) {
      console.error("Error saving blog:", error);
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
      await api.patch(`/admin/blogs/${id}/status`, {
        is_active: !currentStatus,
      });
      fetchBlogList();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Close form popup
  const closeFormPopup = () => {
    if (imagePreviews.web && imagePreviews.web.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews.web);
    }
    if (imagePreviews.mobile && imagePreviews.mobile.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews.mobile);
    }

    setShowFormPopup(false);
    setFormErrors({});
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreviews.web && imagePreviews.web.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviews.web);
      }
      if (imagePreviews.mobile && imagePreviews.mobile.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviews.mobile);
      }
    };
  }, [imagePreviews]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading blog posts...</p>
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
            Blog Management
          </h2>
          <p className="text-[#4B5563] mt-2">Create and manage blog posts</p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
        >
          <Plus size={20} />
          Add New Blog Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B5563]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title, slug, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
              />
            </div>
          </div>

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
          <p className="text-[#4B5563] text-sm">Total Blogs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {blogList.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Active Blogs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {blogList.filter((item) => item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">Inactive Blogs</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {blogList.filter((item) => !item.is_active).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border border-[#E5E7EB] p-4">
          <p className="text-[#4B5563] text-sm">With YouTube</p>
          <p className="text-2xl font-semibold text-[#0A0A0A]">
            {blogList.filter((item) => item.youtube_link).length}
          </p>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-6">
        {filteredList.length > 0 ? (
          filteredList.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow border border-[#E5E7EB] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-1">
                      {blog.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          blog.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {blog.is_active ? (
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
                        Slug: {blog.title_slug}
                      </span>
                      <span className="text-sm text-[#4B5563]">
                        Last updated:{" "}
                        {new Date(blog.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleActiveStatus(blog.id, blog.is_active)
                      }
                      className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition"
                    >
                      {blog.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6] rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
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
                        {blog.web_image_url ? (
                          <img
                            src={blog.web_image_url}
                            alt={blog.image_alt || blog.title}
                            className="w-full h-48 object-cover"
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
                        {blog.mobile_image_url ? (
                          <img
                            src={blog.mobile_image_url}
                            alt={blog.image_alt || blog.title}
                            className="w-full h-48 object-cover"
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
                    {/* Short Description */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Type size={16} />
                        Short Description
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                        {blog.short_desc}
                      </div>
                    </div>

                    {/* Long Description */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                        <Type size={16} />
                        Long Description
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 max-h-48 overflow-y-auto">
                        {blog.long_desc}
                      </div>
                    </div>

                    {/* YouTube Link */}
                    {blog.youtube_link && (
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-[#4B5563] mb-2">
                          <Youtube size={16} />
                          YouTube Video
                        </div>
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                          <a
                            href={blog.youtube_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-2"
                          >
                            <Youtube size={16} />
                            {blog.youtube_link}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {blog.title_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Title Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {blog.title_meta}
                          </p>
                        </div>
                      )}
                      {blog.short_desc_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Short Desc Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {blog.short_desc_meta}
                          </p>
                        </div>
                      )}
                      {blog.long_desc_meta && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Long Desc Meta:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {blog.long_desc_meta}
                          </p>
                        </div>
                      )}
                      {blog.image_alt && (
                        <div>
                          <label className="text-sm font-medium text-[#4B5563]">
                            Image Alt Text:
                          </label>
                          <p className="text-[#0A0A0A] mt-1 text-sm">
                            {blog.image_alt}
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
                <ImageIcon className="text-gray-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                No Blog Posts Found
              </h3>
              <p className="text-[#4B5563] mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "No blog posts match your search criteria"
                  : "Get started by creating your first blog post"}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl hover:bg-[#1F2937] transition-all font-semibold"
              >
                <Plus size={20} />
                Create Your First Blog Post
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
                  {formMode === "add" ? "Add New Blog Post" : "Edit Blog Post"}
                </h3>
                <p className="text-[#4B5563] text-sm mt-1">
                  Create and manage blog content
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
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Basic Information
                  </h4>

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
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        }`}
                        placeholder="Enter blog post title"
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        name="title_slug"
                        value={formData.title_slug}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.title_slug
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        }`}
                        placeholder="auto-generated-from-title"
                      />
                      {formErrors.title_slug && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.title_slug}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Short Description *
                      </label>
                      <textarea
                        name="short_desc"
                        value={formData.short_desc}
                        onChange={handleInputChange}
                        rows="3"
                        className={`w-full p-3 rounded-xl border ${
                          formErrors.short_desc
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        }`}
                        placeholder="Brief summary of the blog post"
                      />
                      {formErrors.short_desc && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.short_desc}
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
                          Active (Publish on website)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      Long Description *
                    </label>
                    <textarea
                      name="long_desc"
                      value={formData.long_desc}
                      onChange={handleInputChange}
                      rows="6"
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.long_desc
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder="Full blog post content"
                    />
                    {formErrors.long_desc && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.long_desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Images
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
                            <img
                              src={imagePreviews.web}
                              alt="Web preview"
                              className="w-full h-48 object-contain mx-auto"
                            />
                            <div className="space-y-2">
                              <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                                Change Image
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(e, "web")}
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    web: null,
                                  }));
                                  setImageFiles((prev) => ({
                                    ...prev,
                                    web: null,
                                  }));
                                }}
                                className="block w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                              <ImageIcon
                                className="text-gray-400 mb-2"
                                size={32}
                              />
                              <p className="text-sm text-gray-500">
                                No image selected
                              </p>
                            </div>
                            <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                              Upload Web Image
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, "web")}
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {formErrors.web_image && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.web_image}
                        </p>
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
                            <img
                              src={imagePreviews.mobile}
                              alt="Mobile preview"
                              className="w-full h-48 object-contain mx-auto"
                            />
                            <div className="space-y-2">
                              <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                                Change Image
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(e, "mobile")
                                  }
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreviews((prev) => ({
                                    ...prev,
                                    mobile: null,
                                  }));
                                  setImageFiles((prev) => ({
                                    ...prev,
                                    mobile: null,
                                  }));
                                }}
                                className="block w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="w-full h-48 bg-gray-50 rounded-lg flex flex-col items-center justify-center mb-4">
                              <ImageIcon
                                className="text-gray-400 mb-2"
                                size={32}
                              />
                              <p className="text-sm text-gray-500">
                                No image selected
                              </p>
                            </div>
                            <label className="block px-4 py-2 bg-[#0A0A0A] text-white rounded-xl cursor-pointer hover:bg-[#1F2937] transition">
                              Upload Mobile Image
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, "mobile")}
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      {formErrors.mobile_image && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.mobile_image}
                        </p>
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
                      placeholder="Descriptive text for images (SEO)"
                    />
                  </div>
                </div>

                {/* YouTube Link */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#0A0A0A]">
                    Video
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-[#4B5563] mb-2">
                      <Youtube size={16} className="inline mr-2" />
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      name="youtube_link"
                      value={formData.youtube_link}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border ${
                        formErrors.youtube_link
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                      }`}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    {formErrors.youtube_link && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.youtube_link}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#4B5563]">
                      Optional: Add a YouTube video to embed in the blog post
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
                        Title Meta
                      </label>
                      <input
                        type="text"
                        name="title_meta"
                        value={formData.title_meta}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="SEO title (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#4B5563] mb-2">
                        Short Description Meta
                      </label>
                      <input
                        type="text"
                        name="short_desc_meta"
                        value={formData.short_desc_meta}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-[#E5E7EB] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/20"
                        placeholder="SEO meta description (optional)"
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
                      placeholder="SEO meta description for long content (optional)"
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
                        {formMode === "add"
                          ? "Create Blog Post"
                          : "Update Blog Post"}
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

export default HandleBlog;
