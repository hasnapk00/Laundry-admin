import { X } from "lucide-react";
import { useState, useEffect } from "react";

const ServiceModal = ({ isOpen, data, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "Per Kg",
    price: "",
    discount: "",
    tax: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        category: data.category || "",
        unit: data.unit || "Per Kg",
        price: data.price ?? "",
        discount: data.discount ?? "",
        tax: data.tax ?? "",
        description: data.description || "",
        status: data.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        unit: "Per Kg",
        price: "",
        discount: "",
        tax: "",
        description: "",
        status: "Active",
      });
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const isEditing = !!data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data:", formData);
    // API call here
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3.5 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 focus:shadow-[0_0_0_3px_rgba(232,168,67,0.1)] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-[#1a1a1a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isEditing ? "Edit Service" : "Add Service"}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {isEditing
                ? "Update service and pricing details"
                : "Create a new laundry service"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 p-5 md:grid-cols-2">
            {/* Left column — service details */}
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter service name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Wash & Iron">Wash & Iron</option>
                  <option value="Dry Clean">Dry Clean</option>
                  <option value="Wash Only">Wash Only</option>
                  <option value="Iron Only">Iron Only</option>
                  <option value="Steam Press">Steam Press</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="Per Kg">Per Kg</option>
                  <option value="Per Piece">Per Piece</option>
                  <option value="Per Pair">Per Pair</option>
                  <option value="Per Item">Per Item</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter description"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Right column — pricing */}
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className={labelClass}>Discount (₹)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tax (₹)</label>
                  <input
                    type="number"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 px-5 py-4 bg-gray-50/50 dark:bg-gray-800/20 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#E8A843] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d49a3a] transition-colors shadow-sm hover:shadow"
            >
              {isEditing ? "Update Service" : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;