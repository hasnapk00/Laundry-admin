import { useEffect, useState } from "react";
import { X } from "lucide-react";

const SERVICES = [
  "Wash & Fold",
  "Dry Cleaning",
  "Ironing",
  "Steam Press",
  "Premium Wash",
  "Shoe Cleaning",
  "Carpet Cleaning",
  "Curtain Cleaning",
];

const PackageModal = ({ isOpen, data, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    services: [],
    originalPrice: "",
    packagePrice: "",
    status: "Active",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        description: data.description || "",
        services: data.services || [],
        originalPrice: data.originalPrice || "",
        packagePrice: data.packagePrice || "",
        status: data.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        services: [],
        originalPrice: "",
        packagePrice: "",
        status: "Active",
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend API

    onClose();
  };

  const savings =
    Number(formData.originalPrice || 0) -
    Number(formData.packagePrice || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm sm:p-4">
      <div className="max-h-[92vh] sm:max-h-[90vh] w-full max-w-lg sm:max-w-2xl md:max-w-3xl overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-base sm:text-lg font-semibold text-[#231F20] dark:text-white">
            {data ? "Edit Package" : "Add Package"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 sm:space-y-5 sm:p-5"
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">

            <Input
              label="Package Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Family Package"
            />

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />

            <Input
              label="Original Price (₹)"
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="1200"
            />

            <Input
              label="Package Price (₹)"
              type="number"
              name="packagePrice"
              value={formData.packagePrice}
              onChange={handleChange}
              placeholder="999"
            />
          </div>

          {/* Savings */}

          {formData.originalPrice &&
            formData.packagePrice && (
              <div className="rounded-lg bg-green-50 dark:bg-green-500/10 p-3">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  Customer Saves ₹{savings}
                </p>
              </div>
            )}

          {/* Services */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Included Services
            </label>

            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm transition ${
                    formData.services.includes(service)
                      ? "border-[#231F20] dark:border-[#E8A843] bg-[#231F20] dark:bg-[#E8A843] text-white"
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter package description..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />
          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-2 border-t border-gray-200 dark:border-gray-800 pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#231F20] dark:bg-[#E8A843] px-4 py-2 text-sm text-white hover:opacity-90"
            >
              {data ? "Update Package" : "Save Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- Reusable Components ---------------- */

const Input = ({
  label,
  type = "text",
  ...props
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <input
      type={type}
      {...props}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
    />
  </div>
);

const Select = ({
  label,
  options,
  ...props
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <select
      {...props}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-[#E8A843] cursor-pointer"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default PackageModal;