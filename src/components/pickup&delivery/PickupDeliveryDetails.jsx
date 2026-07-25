import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  Hash,
  PackageSearch,
  Truck,
  MapPin,
  Calendar,
  Clock,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { usePickupDelivery } from "../../context/PickupDeliveryContext";

const PickupDeliveryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    pickups,
    deliveries,
    loading,
    fetchSchedules,
    getPickupDeliveryById,
    updatePickupStatus,
    updateDeliveryStatus,
  } = usePickupDelivery();

  // Fetch schedules if landing directly on this page (e.g. refresh / deep link)
  useEffect(() => {
    if (pickups.length === 0 && deliveries.length === 0) {
      fetchSchedules();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickupDelivery = getPickupDeliveryById(id);

  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Keep the status dropdown in sync once the record loads
  useEffect(() => {
    if (pickupDelivery) {
      setStatus(pickupDelivery.status || "");
    }
  }, [pickupDelivery]);

  if (loading && !pickupDelivery) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-10 text-center shadow-sm text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">Loading...</h2>
      </div>
    );
  }

  if (!pickupDelivery) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-10 text-center shadow-sm text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
          <PackageSearch size={28} className="text-gray-400 dark:text-zinc-500" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-[#231F20] dark:text-white">
          Pickup / Delivery Not Found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn't find a record matching this ID.
        </p>

        <button
          onClick={() => navigate("/pickup")}
          className="mt-6 rounded-xl bg-[#231F20] dark:bg-zinc-800 px-5 py-3 text-white transition hover:opacity-90 dark:hover:bg-zinc-700"
        >
          Back to Pickup &amp; Delivery
        </button>
      </div>
    );
  }

  const isPickup = pickupDelivery.type === "pickup";
  const isCancelled = pickupDelivery.status === "Cancelled";
  const isDirty = status !== pickupDelivery.status;

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isPickup) {
        await updatePickupStatus(pickupDelivery.id, status);
      } else {
        await updateDeliveryStatus(pickupDelivery.id, status);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/pickup")}
            className="rounded-lg border border-gray-300 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-3xl font-bold tracking-tight text-[#231F20] dark:text-white">
                {isPickup ? "Pickup" : "Delivery"} Details
              </h1>
              <TypeBadge isPickup={isPickup} />
            </div>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Hash size={13} />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {isPickup ? pickupDelivery.pickup_id : pickupDelivery.delivery_id}
              </span>
            </p>
          </div>
        </div>

        <StatusPill status={pickupDelivery.status} large />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer */}
          <Section title="Customer Information" icon={<User size={18} />}>
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoRow icon={<User size={16} />} label="Customer" value={pickupDelivery.customer_name} />
              <InfoRow icon={<Phone size={16} />} label="Phone" value={pickupDelivery.phone} />
              <InfoRow icon={<Hash size={16} />} label="Order ID" value={pickupDelivery.order_id} />
              <InfoRow
                icon={<Hash size={16} />}
                label={isPickup ? "Pickup ID" : "Delivery ID"}
                value={isPickup ? pickupDelivery.pickup_id : pickupDelivery.delivery_id}
              />
            </div>
          </Section>

          {/* Pickup / Delivery Logistics */}
          {isPickup ? (
            <Section title="Pickup Information" icon={<Truck size={18} />}>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoRow icon={<Calendar size={16} />} label="Pickup Date" value={pickupDelivery.pickup_date} />
                <InfoRow icon={<Clock size={16} />} label="Pickup Time" value={pickupDelivery.pickup_time} />
              </div>
              <div className="mt-5">
                <InfoRow icon={<MapPin size={16} />} label="Pickup Address" value={pickupDelivery.pickup_address} />
              </div>
            </Section>
          ) : (
            <Section title="Delivery Information" icon={<Truck size={18} />}>
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoRow icon={<Calendar size={16} />} label="Delivery Date" value={pickupDelivery.delivery_date} />
                <InfoRow icon={<Clock size={16} />} label="Delivery Time" value={pickupDelivery.delivery_time} />
              </div>
              <div className="mt-5">
                <InfoRow icon={<MapPin size={16} />} label="Delivery Address" value={pickupDelivery.delivery_address} />
              </div>
            </Section>
          )}
        </div>

        {/* Right column - Update status */}
        <div className="lg:sticky lg:top-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Update Status</h2>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              Change the current status of this {isPickup ? "pickup" : "delivery"}.
            </p>

            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800/80 text-gray-900 dark:text-white px-4 py-3 outline-none focus:border-[#E8A843] focus:ring-1 focus:ring-[#E8A843] transition-colors"
            >
              <option value="">Select Status</option>
              <option>Scheduled</option>
              <option>Picked Up</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={handleSave}
              disabled={!status || !isDirty || saving}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#231F20] dark:bg-[#E8A843] px-6 py-3 text-white dark:text-[#231F20] font-medium hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {isCancelled && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-950/20 p-3 text-sm text-red-700 dark:text-red-400">
                <XCircle size={16} className="mt-0.5 flex-none" />
                <span>This {isPickup ? "pickup" : "delivery"} has been cancelled.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== Shared Sub-Components ==============

const Section = ({ title, icon, children }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-5 shadow-sm text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <div className="mb-5 flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
      <p className="mt-0.5 truncate font-medium text-gray-900 dark:text-white">{value || "-"}</p>
    </div>
  </div>
);

const TypeBadge = ({ isPickup }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
      isPickup
        ? "bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#8a6a1c] dark:text-[#E8A843]"
        : "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
    }`}
  >
    {isPickup ? "Pickup" : "Delivery"}
  </span>
);

const STATUS_STYLES = {
  Scheduled: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 ring-blue-600/10",
  "Picked Up": "bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#8a6a1c] dark:text-[#E8A843] ring-[#E8A843]/20",
  "Out for Delivery": "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 ring-purple-600/10",
  Delivered: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 ring-green-600/10",
  Cancelled: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 ring-red-600/10",
};

const StatusPill = ({ status, large }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset ${
      large ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs"
    } ${STATUS_STYLES[status] || "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 ring-gray-600/10"}`}
  >
    {status || "Unknown"}
  </span>
);

export default PickupDeliveryDetails;