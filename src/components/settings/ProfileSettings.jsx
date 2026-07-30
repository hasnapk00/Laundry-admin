import { useState, useRef } from "react";
import { Save, User, Camera } from "lucide-react";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "Administrator",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log({ ...formData, image });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials =
    formData.fullName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "A";

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-4 transition-colors sm:px-6 sm:py-5">
        <h2 className="text-lg font-semibold text-[#231F20] dark:text-white sm:text-xl">
          Profile Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your profile information.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:p-6">
        {/* Profile Image */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-2xl font-bold text-[#231F20] dark:text-[#E8A843] sm:h-24 sm:w-24 sm:text-3xl">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <label
              htmlFor="profile-image"
              className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-[#E8A843] p-1.5 shadow-md hover:bg-[#d79a2d]"
            >
              <Camera size={14} className="text-white" />
            </label>
            <input
              ref={fileInputRef}
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click the camera icon to upload
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              JPEG, PNG, WEBP (Max 2MB)
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Admin Name"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
          />
          <InputField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Administrator"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#231F20] dark:bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 dark:hover:bg-zinc-700 disabled:opacity-50 sm:w-auto sm:py-3"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save size={17} />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#E8A843]"
    />
  </div>
);

export default ProfileSettings;