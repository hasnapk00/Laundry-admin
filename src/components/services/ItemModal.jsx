import { X, Upload, ImageOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useServices } from "../../context/ServiceContext";

const ItemModal = ({ isOpen, data, onClose }) => {
  const { categories, addItem, updateItem } = useServices();

  const [formData, setFormData] = useState({
    itemName: "",
    categoryID: "",
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
        itemName: data.itemName || "",
        categoryID: data.categoryId ?? "", // matches API casing (categoryId)
        description: data.description || "",
        status: data.status ?? true,
      });
      setImagePreview(
        data.imageUrl
          ? `${import.meta.env.VITE_API_BASE_URL}/${data.imageUrl}`
          : data.image || null
      );
      setImageFile(null);
    } else {
      setFormData({
        itemName: "",
        categoryID: "",
        description: "",
        status: true,
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [data, categories, isOpen]);

  // Clean up object URLs created for local previews
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  const isEditing = !!data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value,
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

    const categoryIdNum = Number(formData.categoryID);

    if (!formData.categoryID || Number.isNaN(categoryIdNum)) {
      alert("Please select a valid category.");
      return;
    }

    // Always send FormData, since the API accepts multipart/form-data
    // even when no image is selected.
    const payload = new FormData();
    payload.append("itemName", formData.itemName);
    payload.append("categoryID", categoryIdNum);
    payload.append("description", formData.description);
    payload.append("status", formData.status);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    let success = false;

    if (data) {
      success = await updateItem(data.itemId, payload);
    } else {
      success = await addItem(payload);
    }

    if (success) {
      setImageFile(null);
      setImagePreview(null);
      onClose();
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClass =
    "mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider";

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
              {isEditing ? "Edit Item" : "Add Item"}
            </h2>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {isEditing
                ? "Update item details"
                : "Add a new item under a category (e.g. Shirt, Pant)"}
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
              <label className={labelClass}>Item Image</label>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Item preview"
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
                    id="itemImageInput"
                  />
                  <label
                    htmlFor="itemImageInput"
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
              <label className={labelClass}>Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="e.g. Shirt, Pant, Bedsheet"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>

              <select
                name="categoryID"
                value={formData.categoryID}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder="Enter description"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
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
              {isEditing ? "Update Item" : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;