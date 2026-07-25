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
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#F4EFD9] dark:bg-[#E8A843]/10 p-2">
            <ShieldCheck className="text-[#E8A843]" size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#231F20] dark:text-white">Security</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Update your account password.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
            className="flex items-center gap-2 rounded-xl bg-[#231F20] dark:bg-zinc-800 px-6 py-3 text-white transition hover:opacity-90 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save size={18} />
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
    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 pr-12 outline-none transition focus:border-[#E8A843]"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-[#E8A843] dark:hover:text-[#E8A843]"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  </div>
);

export default SecuritySettings;