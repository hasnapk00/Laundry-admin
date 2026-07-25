import { useEffect, useState } from "react";
import { X, Check, Loader2, IndianRupee } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "Paid", dot: "bg-green-500", ring: "ring-green-500", bg: "bg-green-50 dark:bg-green-900/10" },
  { value: "Pending", dot: "bg-yellow-500", ring: "ring-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/10" },
  { value: "Failed", dot: "bg-red-500", ring: "ring-red-500", bg: "bg-red-50 dark:bg-red-900/10" },
  { value: "Refunded", dot: "bg-blue-500", ring: "ring-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
];

/**
 * Slide-in side panel for reviewing a payment and changing its status.
 * Controlled from the parent: pass the payment being edited (or null) and
 * isOpen drives the enter/exit transition independently of unmounting, so
 * the panel animates closed instead of just disappearing.
 */
const PaymentStatusPanel = ({ isOpen, payment, onClose, onSave }) => {
  const [selected, setSelected] = useState("Pending");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (payment) setSelected(payment.status);
  }, [payment]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!payment) return null;

  const hasChanged = selected !== payment.status;

  const handleSave = async () => {
    if (!hasChanged) {
      onClose();
      return;
    }
    setSaving(true);
    try {
      await onSave(selected);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={saving ? undefined : onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Update payment status"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-white dark:bg-[#1a1a1a] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Update Payment Status
            </h2>
            <button
              onClick={onClose}
              disabled={saving}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {/* Payment summary */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Payment ID</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.paymentId}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.orderId}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Customer</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.customer}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Amount</span>
                <span className="flex items-center gap-0.5 font-semibold text-[#E8A843]">
                  <IndianRupee size={13} />
                  {payment.amount}
                </span>
              </div>
            </div>

            {/* Status options */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Select New Status
              </p>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((opt) => {
                  const isActive = selected === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setSelected(opt.value)}
                      disabled={saving}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-150 disabled:opacity-60 ${
                        isActive
                          ? `border-transparent ${opt.bg} ring-2 ${opt.ring} text-gray-900 dark:text-white`
                          : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`h-2 w-2 rounded-full ${opt.dot}`} />
                        {opt.value}
                      </span>
                      {isActive && <Check size={16} className="text-[#E8A843]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t border-gray-200 dark:border-gray-800 px-5 py-4">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasChanged}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E8A843] py-2.5 text-sm font-semibold text-white hover:bg-[#d49a3a] transition-colors disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStatusPanel;