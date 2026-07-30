import { Save, Building2, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";

// ============== Constants ==============

const INITIAL_FORM_DATA = {
  laundryName: "",
  email: "",
  phone: "",
  address: "",
  gstNumber: "",
  website: "",
  logo: null,
};

// ============== Main Component ==============

const BusinessSettings = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          logo: "Please upload a valid image file (JPEG, PNG, or WEBP)",
        }));
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: "File size should be less than 2MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
      setErrors((prev) => ({ ...prev, logo: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.laundryName.trim()) {
      newErrors.laundryName = "Laundry name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement API call
      console.log("Form Data:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSuccessMessage("Business information updated successfully!");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error saving business info:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to save. Please try again.",
      }));
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-all duration-200">
      {/* Header */}
      <FormHeader />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:space-y-5 sm:p-5">
        {/* Success Message */}
        {successMessage && (
          <SuccessAlert message={successMessage} />
        )}

        {/* Error Message */}
        {errors.submit && (
          <ErrorAlert message={errors.submit} />
        )}

        {/* Form Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <InputField
            label="Laundry Name"
            name="laundryName"
            value={formData.laundryName}
            onChange={handleChange}
            placeholder="Enter laundry name"
            required
            error={errors.laundryName}
            icon={<Building2 size={16} />}
          />

          <InputField
            label="Business Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="info@laundry.com"
            required
            error={errors.email}
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            required
            error={errors.phone}
          />

          <InputField
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="GSTIN (Optional)"
            error={errors.gstNumber}
          />

          <div className="md:col-span-2">
            <InputField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.example.com (Optional)"
              error={errors.website}
            />
          </div>

          <div className="md:col-span-2">
            <TextareaField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your business address"
              rows={3}
              error={errors.address}
            />
          </div>
        </div>

        {/* Logo Upload */}
        <LogoUpload
          logo={formData.logo}
          onChange={handleFileChange}
          error={errors.logo}
        />

        {/* Action Buttons */}
        <ActionButtons
          isSubmitting={isSubmitting}
          onReset={handleReset}
        />
      </form>
    </div>
  );
};

// ============== Form Header ==============

const FormHeader = () => (
  <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3 sm:px-5 sm:py-4 transition-colors">
    <div className="flex items-center gap-2.5">
      <div className="rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 p-1.5 sm:p-2">
        <Building2 size={18} className="text-[#E8A843]" />
      </div>
      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-[#231F20] dark:text-white">
          Business Information
        </h2>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          Update your laundry business details.
        </p>
      </div>
    </div>
  </div>
);

// ============== Input Field ==============

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  icon,
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:ring-1 focus:ring-[#E8A843] ${
          icon ? "pl-9" : ""
        } ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-700 focus:border-[#E8A843]"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </div>
    {error && (
      <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle size={13} />
        {error}
      </p>
    )}
  </div>
);

// ============== Textarea Field ==============

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors focus:ring-1 focus:ring-[#E8A843] ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-700 focus:border-[#E8A843]"
      }`}
      aria-invalid={!!error}
    />
    {error && (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle size={13} />
        {error}
      </p>
    )}
  </div>
);

// ============== Logo Upload ==============

const LogoUpload = ({ logo, onChange, error }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Business Logo
    </label>
    <div
      className={`relative rounded-lg border-2 border-dashed p-5 sm:p-6 text-center transition-colors ${
        error
          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
          : "border-gray-300 dark:border-gray-700 hover:border-[#E8A843] dark:hover:border-[#E8A843]"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Upload business logo"
      />
      <div className="flex flex-col items-center gap-1.5">
        {logo ? (
          <>
            <div className="rounded-lg bg-green-100 dark:bg-green-950/20 p-2.5">
              <Upload size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400 break-all px-2">
              {logo.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Click to change logo
            </p>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-gray-100 dark:bg-zinc-800 p-2.5">
              <Upload size={20} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Click to upload logo
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
              Recommended: 200x200px, JPEG, PNG, or WEBP (Max 2MB)
            </p>
          </>
        )}
      </div>
    </div>
    {error && (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle size={13} />
        {error}
      </p>
    )}
  </div>
);

// ============== Action Buttons ==============

const ActionButtons = ({ isSubmitting, onReset }) => (
  <div className="flex flex-col-reverse gap-2 border-t border-gray-100 dark:border-gray-800 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
    <button
      type="button"
      onClick={onReset}
      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      Reset
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex items-center justify-center gap-2 rounded-lg bg-[#231F20] dark:bg-zinc-800 px-4 py-2 text-sm text-white transition-all hover:bg-[#3a3335] dark:hover:bg-zinc-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
    >
      {isSubmitting ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Saving...
        </>
      ) : (
        <>
          <Save size={16} />
          Save Changes
        </>
      )}
    </button>
  </div>
);

// ============== Alert Components ==============

const SuccessAlert = ({ message }) => (
  <div className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700 border border-green-200">
    <div className="flex items-center gap-2">
      <span className="text-base">✅</span>
      {message}
    </div>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700 border border-red-200">
    <div className="flex items-center gap-2">
      <AlertCircle size={16} />
      {message}
    </div>
  </div>
);

export default BusinessSettings;