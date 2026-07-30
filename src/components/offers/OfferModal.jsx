import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useOffer } from "../../context/OfferContext";

const OfferModal = ({ isOpen, data, onClose }) => {
const {
  addOffer,
  updateOffer,
} = useOffer();


  const [formData, setFormData] = useState({
  offerCode: "",
  offerName: "",
  offerType: "Percentage",
  applicableServices: [], 
  discountValue: "",
  minimumOrderAmount: "",
  startDate: "",
  endDate: "",
  status: "Active",
  offerDescription: "",
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
  offerCode: data.offerCode || "",
  offerName: data.offerName || "",
  offerType: data.offerType || "Percentage",
    applicableServices: data.applicableServices || [],
  discountValue: data.discountValue || "",
  minimumOrderAmount: data.minimumOrderAmount || "",
  startDate: data.startDate
    ? data.startDate.slice(0, 10)
    : "",
  endDate: data.endDate
    ? data.endDate.slice(0, 10)
    : "",
  status: data.status || "Active",
  offerDescription: data.offerDescription || "",
});
    } else {
      setFormData({
  offerCode: "",
  offerName: "",
  offerType: "Percentage",
  discountValue: "",
  applicableServices: [],
  minimumOrderAmount: "",
  startDate: "",
  endDate: "",
  status: "Active",
  offerDescription: "",
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    discountValue: Number(formData.discountValue),
    minimumOrderAmount: Number(formData.minimumOrderAmount),
    startDate: new Date(formData.startDate).toISOString(),
    endDate: new Date(formData.endDate).toISOString(),
    applicableServices: data?.applicableServices || [],
  };

  let success = false;

  if (data) {
    success = await updateOffer({
      ...data,
      ...payload,
    });
  } else {
    success = await addOffer(payload);
  }

  if (success) {
    onClose();
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
      <div className="max-h-[95vh] w-full max-w-sm sm:max-w-lg lg:max-w-3xl overflow-y-auto rounded-lg sm:rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-lg sm:shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#231F20] dark:text-white truncate">
            {data ? "Edit Offer" : "Add Offer"}
          </h2>

          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 p-3 sm:p-4"
        >
          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">

<Input
  label="Offer Code"
  name="offerCode"
  value={formData.offerCode}
  onChange={handleChange}
/>

            <Input
              label="Offer Name"
             name="offerName"
value={formData.offerName}
              onChange={handleChange}
            />

            <Select
              label="Offer Type"
             name="offerType"
value={formData.offerType}
              onChange={handleChange}
              options={["Percentage", "Flat"]}
            />

            <Input
              label="Discount Value"
name="discountValue"
value={formData.discountValue}
              onChange={handleChange}
            />

            <Input
              label="Minimum Order Amount"
           name="minimumOrderAmount"
value={formData.minimumOrderAmount}
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
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              Applicable Services
            </label>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {services.map((service) => (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition ${
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
            <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={3}
             name="offerDescription"
value={formData.offerDescription}
              onChange={handleChange}
              placeholder="Offer description..."
              className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843] resize-none"
            />
          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3 border-t border-gray-200 dark:border-gray-800 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg sm:rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white dark:text-[#231F20] hover:opacity-90 transition-opacity"
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
    <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <input
      type={type}
      {...props}
      className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843] transition-colors"
    />
  </div>
);

const Select = ({
  label,
  options,
  ...props
}) => (
  <div>
    <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>

    <select
      {...props}
      className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843] cursor-pointer transition-colors"
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