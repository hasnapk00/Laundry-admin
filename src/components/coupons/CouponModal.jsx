import { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { useCoupon } from "../../context/CouponContext";

const initialState = {
  couponCode: "",
  couponName: "",
  description: "",
  discountType: "Flat",
  discountValue: "",
  minimumOrderAmount: "",
  maximumDiscount: "",
  usageLimit: "",
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

// Convert any ISO / datetime string into "yyyy-MM-dd" for <input type="date">
const toDateInputValue = (value) => {
  if (!value) return "";
  return value.split("T")[0];
};

const CouponModal = ({ isOpen, coupon, onClose }) => {
  const {
    addCoupon,
    updateCoupon,
    generateCouponCode,
  } = useCoupon();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        startDate: toDateInputValue(coupon.startDate),
        endDate: toDateInputValue(coupon.endDate),
      });
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

    const payload = {
      ...formData,
      discountValue: Number(formData.discountValue) || 0,
      minimumOrderAmount: Number(formData.minimumOrderAmount) || 0,
      maximumDiscount: Number(formData.maximumDiscount) || 0,
      usageLimit: Number(formData.usageLimit) || 0,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      status: coupon.status ?? "Active", // or whatever your enum/string values are

    };

    if (coupon) {
      updateCoupon({
        ...coupon,
        ...payload,
      });
    } else {
      addCoupon(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 sm:p-4">
      <div className="max-h-[95vh] w-full max-w-sm sm:max-w-lg lg:max-w-3xl overflow-y-auto rounded-lg sm:rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-lg sm:shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
            {coupon ? "Edit Coupon" : "Add Coupon"}
          </h2>

          <button onClick={onClose} className="flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 p-3 sm:p-4"
        >

          {/* Coupon Code */}

          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                Coupon Code
              </label>

              <div className="flex gap-1.5 sm:gap-2">

                <input
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  className="flex-1 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
                  placeholder="Coupon Code"
                />

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      couponCode: generateCouponCode(),
                    }))
                  }
                  className="flex-shrink-0 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 px-2.5 sm:px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <RefreshCw size={16} />
                </button>

              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                Coupon Name
              </label>

              <input
                name="couponName"
                value={formData.couponName}
                onChange={handleChange}
                className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
              />
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843] resize-none"
            />
          </div>

          {/* Discount */}

          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                Discount Type
              </label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] cursor-pointer"
              >
                <option>Flat</option>
                <option>Percentage</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                Discount Value
              </label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
              />
            </div>

          </div>

          {/* Rules */}

          <div className="grid gap-3 sm:grid-cols-2">

            <input
              type="number"
              name="minimumOrderAmount"
              value={formData.minimumOrderAmount}
              onChange={handleChange}
              placeholder="Minimum Order"
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
            />

            <input
              type="number"
              name="maximumDiscount"
              value={formData.maximumDiscount}
              onChange={handleChange}
              placeholder="Maximum Discount"
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
            />

            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              placeholder="Usage Limit"
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:border-[#E8A843]"
            />

          </div>

          {/* Customer */}

          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              Customer Type
            </label>

            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] cursor-pointer"
            >
              <option>All</option>
              <option>New</option>
              <option>Existing</option>
            </select>
          </div>

          {/* Services */}

          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              Applicable Services
            </label>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {SERVICES.map((service) => (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition ${
                    formData.applicableServices.includes(service)
                      ? "border-[#231F20] dark:border-[#E8A843] bg-[#231F20] dark:bg-[#E8A843] text-white dark:text-[#231F20]"
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}

          <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843]"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843]"
            />

          </div>

          {/* Status */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-white outline-none transition-colors focus:border-[#E8A843] cursor-pointer"
          >
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>
          </select>

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
              {coupon ? "Update Coupon" : "Save Coupon"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CouponModal;