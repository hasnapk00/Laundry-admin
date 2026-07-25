import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { useCoupon } from "../../context/CouponContext";

const initialState = {
  code: "",
  name: "",
  description: "",
  discountType: "Flat",
  discountValue: "",
  minimumOrder: "",
  maximumDiscount: "",
  usageLimit: "",
  customerLimit: "",
  customerType: "All",
  applicableServices: [],
  startDate: "",
  endDate: "",
  status: "Active",
};

const SERVICES = [
  "Wash & Fold",
  "Dry Cleaning",
  "Premium Wash",
  "Steam Press",
  "Ironing",
];

const CouponModal = ({ isOpen, coupon, onClose }) => {
  const {
    addCoupon,
    updateCoupon,
    generateCouponCode,
  } = useCoupon();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    } else {
      setFormData(initialState);
    }
  }, [coupon]);

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
      applicableServices:
        prev.applicableServices.includes(service)
          ? prev.applicableServices.filter(
              (item) => item !== service
            )
          : [...prev.applicableServices, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (coupon) {
      updateCoupon({
        ...coupon,
        ...formData,
      });
    } else {
      addCoupon(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {coupon ? "Edit Coupon" : "Add Coupon"}
          </h2>

          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Coupon Code */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Coupon Code
              </label>

              <div className="flex gap-2">

                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
                  placeholder="Coupon Code"
                />

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      code: generateCouponCode(),
                    }))
                  }
                  className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RefreshCw size={18} />
                </button>

              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Coupon Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
              />
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />
          </div>

          {/* Discount */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Discount Type
              </label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
              >
                <option>Flat</option>
                <option>Percentage</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
              />
            </div>

          </div>

          {/* Rules */}

          <div className="grid gap-5 md:grid-cols-2">

            <input
              type="number"
              name="minimumOrder"
              value={formData.minimumOrder}
              onChange={handleChange}
              placeholder="Minimum Order"
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

            <input
              type="number"
              name="maximumDiscount"
              value={formData.maximumDiscount}
              onChange={handleChange}
              placeholder="Maximum Discount"
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              placeholder="Usage Limit"
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

            <input
              type="number"
              name="customerLimit"
              value={formData.customerLimit}
              onChange={handleChange}
              placeholder="Per Customer Limit"
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

          </div>

          {/* Customer */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Customer Type
            </label>

            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            >
              <option>All</option>
              <option>New</option>
              <option>Existing</option>
            </select>
          </div>

          {/* Services */}

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
              Applicable Services
            </label>

            <div className="flex flex-wrap gap-3">
              {SERVICES.map((service) => (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`rounded-full border px-4 py-2 text-sm ${
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

          {/* Dates */}

          <div className="grid gap-5 md:grid-cols-2">

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
            />

          </div>

          {/* Status */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#E8A843]"
          >
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>
          </select>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-5 py-3 text-white"
            >
              {coupon ? "Update Coupon" : "Save Coupon"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CouponModal;