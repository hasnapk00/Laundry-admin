import { useEffect, useState } from "react";
import { X } from "lucide-react";

const OfferModal = ({ isOpen, data, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Percentage",
    discount: "",
    minOrderAmount: "",
    applicableServices: [],
    startDate: "",
    endDate: "",
    status: "Active",
    description: "",
  });

  const services = [
    "Wash & Fold",
    "Dry Cleaning",
    "Ironing",
    "Steam Press",
    "Premium Wash",
    "Shoe Cleaning",
  ];

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        applicableServices: data.applicableServices || [],
      });
    } else {
      setFormData({
        name: "",
        type: "Percentage",
        discount: "",
        minOrderAmount: "",
        applicableServices: [],
        startDate: "",
        endDate: "",
        status: "Active",
        description: "",
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
      applicableServices: prev.applicableServices.includes(service)
        ? prev.applicableServices.filter((item) => item !== service)
        : [...prev.applicableServices, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend API
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-[#231F20] dark:text-white">
            {data ? "Edit Offer" : "Add Offer"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Input
              label="Offer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Select
              label="Offer Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={["Percentage", "Flat"]}
            />

            <Input
              label="Discount Value"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />

            <Input
              label="Minimum Order Amount"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={handleChange}
            />

            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                "Active",
                "Scheduled",
                "Expired",
              ]}
            />
          </div>

          {/* Services */}

          <div>
            <label className="mb-3 block font-medium text-gray-900 dark:text-white">
              Applicable Services
            </label>

            <div className="flex flex-wrap gap-3">
              {services.map((service) => (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    formData.applicableServices.includes(service)
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
            <label className="mb-2 block font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Offer description..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-6 py-2 text-white hover:opacity-90"
            >
              {data ? "Update Offer" : "Save Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Input = ({
  label,
  type = "text",
  ...props
}) => (
  <div>
    <label className="mb-2 block font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <input
      type={type}
      {...props}
      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
    />
  </div>
);

const Select = ({
  label,
  options,
  ...props
}) => (
  <div>
    <label className="mb-2 block font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <select
      {...props}
      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
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

export default OfferModal;