import { X, Upload, ImageOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useServices } from "../../context/ServiceContext";

const CategoryModal = ({ isOpen, data, onClose }) => {
  const {
    addCategory,
    updateCategory,
  } = useServices();

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    status: true,
  });

  // --- image upload state ---
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setFormData({
        categoryName: data.categoryName || "",
        description: data.description || "",
        status: data.status ?? true,
      });
      // show existing image (if the backend already returns one) when editing
      setImagePreview(data.image || data.imageUrl || null);
      setImageFile(null);
    } else {
      setFormData({
        categoryName: "",
        description: "",
        status: true,
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const isEditing = !!data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;

    // Only switch to FormData when an image is actually attached, so the
    // existing JSON payload/behaviour stays exactly the same otherwise.
    const payload = new FormData();

    payload.append("categoryName", formData.categoryName);
    payload.append("description", formData.description);
    payload.append("status", formData.status);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    if (data) {
      success = await updateCategory(data.categoryId, payload); // fixed: categoryId (lowercase d)
    } else {
      success = await addCategory(payload);
    }

    if (success) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white dark:bg-[#1a1a1a] shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Category" : "Add Category"}
            </h2>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {isEditing ? "Update category details" : "Create a new service category"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 p-4">
            {/* Image upload */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Category Image
              </label>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageOff size={20} className="text-gray-400 dark:text-gray-500" />
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="categoryImageInput"
                  />
                  <label
                    htmlFor="categoryImageInput"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Upload size={13} />
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs font-medium text-red-500 hover:text-red-600 text-left"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder="Enter description"
                className="w-full resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 bg-gray-50/50 dark:bg-gray-800/20 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 dark:border-gray-700 px-3.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#E8A843] px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-[#d49a3a] transition-colors shadow-sm hover:shadow"
            >
              {isEditing ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;