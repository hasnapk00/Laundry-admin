import { useState } from "react";
import { Save, ShieldCheck, Eye, EyeOff } from "lucide-react";

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      console.log(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-3 sm:px-5 sm:py-4 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 p-1.5 sm:p-2">
            <ShieldCheck className="text-[#E8A843]" size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-[#231F20] dark:text-white">Security</h2>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">Update your account password.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:space-y-5 sm:p-5">
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          show={showPasswords}
          onToggle={() => setShowPasswords(!showPasswords)}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          show={showPasswords}
          onToggle={() => setShowPasswords(!showPasswords)}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          show={showPasswords}
          onToggle={() => setShowPasswords(!showPasswords)}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#231F20] dark:bg-zinc-800 px-4 py-2 text-sm text-white transition hover:opacity-90 dark:hover:bg-zinc-700 disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save size={16} />
            )}
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, show, onToggle }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-2.5 pr-10 outline-none transition focus:border-[#E8A843]"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-[#E8A843] dark:hover:text-[#E8A843]"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default SecuritySettings;