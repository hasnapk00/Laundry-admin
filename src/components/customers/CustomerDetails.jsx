import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  Wallet,
  BadgeIndianRupee,
  RotateCcw,
  Hash,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useCustomers } from "../../context/CustomerContext";
import { useEffect, useState } from "react";

// ============== Main Component ==============

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCustomerById } = useCustomers();

  // Find customer by ID
const [customer, setCustomer] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadCustomer = async () => {
    setLoading(true);

    const data = await getCustomerById(id);

    setCustomer(data);

    setLoading(false);
  };

  loadCustomer();
}, [id]);

  // Navigation handler
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-2  md:space-y-2 ">
      {/* Page Header */}
      <PageHeader customerId={id} onGoBack={handleGoBack} />

      {/* Content */}
      {!customer ? (
        <EmptyState />
      ) : (
        <CustomerProfile customer={customer} />
      )}
    </div>
  );
};

// ============== Sub-Components ==============

const PageHeader = ({ customerId, onGoBack }) => (
  <div className="flex flex-wrap items-center justify-between gap-2">
    <div className="flex items-center gap-2.5">
      <button
        onClick={onGoBack}
        className="rounded-lg border border-gray-300 dark:border-gray-700 p-1.5 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Go back"
      >
        <ArrowLeft size={16} />
      </button>

      <div>
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#231F20] dark:text-white">
          Customer Details
        </h1>
        <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Hash size={12} />
          <span className="font-medium text-gray-700 dark:text-gray-300">{customerId || "N/A"}</span>
        </p>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-8 sm:p-12 text-center text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
      <User size={22} className="text-gray-400 dark:text-zinc-500" />
    </div>
    <h2 className="mt-3 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
      Customer information will appear here.
    </h2>
    <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
      Connect this page with your backend API.
    </p>
  </div>
);

const CustomerProfile = ({ customer }) => (
  <div className="grid items-start gap-2 md:gap-2 lg:grid-cols-3">
    {/* Left Column - Personal Information */}
    <PersonalInfoCard customer={customer} />

    {/* Right Column - Orders & Payments */}
    <div className="space-y-3 md:space-y-5 lg:col-span-2">
      <StatisticsSection customer={customer} />
      <RecentOrdersTable orders={customer.recentOrders} />
      <PaymentSummary customer={customer} />
    </div>
  </div>
);

// ============== Personal Information Card ==============

const PersonalInfoCard = ({ customer }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200 text-gray-900 dark:text-gray-100">
    {/* Cover accent */}
    <div className="h-8 sm:h-10" />

    {/* Avatar & Name */}
    <div className="flex flex-col items-center px-3 sm:px-4 pb-3 sm:pb-4">
      <div className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white dark:border-[#1a1a1a] bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-base font-bold text-[#231F20] dark:text-[#E8A843] shadow-sm">
        {customer.details.fullName?.charAt(0).toUpperCase()}
      </div>

      <h2 className="mt-1.5 text-sm font-bold text-gray-900 dark:text-white">{customer.details.fullName}</h2>

      <StatusBadge status={customer.details.status} />

      {/* Contact Information */}
      <div className="mt-3 w-full space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
        <InfoRow icon={<Phone size={13} />} label="Phone" value={customer.details.phone} />
        <InfoRow icon={<Mail size={13} />} label="Email" value={customer.details.email} />

        <div className="py-2">
          <div className="mb-1.5 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
              <MapPin size={13} />
            </div>

            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Addresses
            </p>
          </div>

          <div className="py-2">
  <div className="mb-1.5 flex items-center gap-2">
    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
      <MapPin size={13} />
    </div>

    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
      Address
    </p>
  </div>

  <div className="pl-8">
    <p className="text-sm text-gray-900 dark:text-white">
      {customer.details.address || "No address available"}
    </p>
  </div>
</div>
        </div>

        <InfoRow icon={<Calendar size={13} />} label="Member Since" value={new Date(customer.details.createdDate).toLocaleDateString()} />
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/10 dark:ring-green-400/10",
    Inactive:
      "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-600/10 dark:ring-red-400/10",
    Pending:
      "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 ring-1 ring-inset ring-yellow-600/10 dark:ring-yellow-400/10",
  };

  return (
    <span
      className={`mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${
        statusStyles[status] ||
        "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-600/10"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 py-2">
    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]">
      {icon}
    </div>
    <div className="min-w-0 text-left">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{value || "N/A"}</p>
    </div>
  </div>
);
// ============== Statistics Section ==============

const StatisticsSection = ({ customer }) => {
  const stats = [
    { title: "Total Orders", value: customer.details.totalOrders, icon: ShoppingBag, tone: "amber" },
    { title: "Completed", value: customer.completed_orders, icon: CheckCircle2, tone: "green" },
    { title: "Pending", value: customer.pending_orders, icon: Clock3, tone: "yellow" },
    { title: "Total Spent", value: `₹ ${customer.details.totalSpent ?? 0}`, icon: Wallet, tone: "slate" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const toneStyles = {
  amber: "bg-[#F4EFD9] dark:bg-[#E8A843]/10 text-[#E8A843]",
  green: "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400",
  yellow: "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400",
  slate: "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300",
  blue: "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
};

const StatCard = ({ title, value, icon: Icon, tone = "amber" }) => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-2.5 sm:p-3 shadow-sm transition-all duration-200 text-gray-900 dark:text-gray-100 hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center justify-between gap-2">
      <p className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{title}</p>
      {Icon && (
        <div className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg ${toneStyles[tone]}`}>
          <Icon size={14} />
        </div>
      )}
    </div>
    <h3 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-[#231F20] dark:text-white">{value ?? 0}</h3>
  </div>
);

// ============== Recent Orders Table ==============

const RecentOrdersTable = ({ orders }) => {
  const columns = [
    { key: "id", label: "Order ID" },
    { key: "service", label: "Service" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-3 py-2.5">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        {orders?.length > 0 && (
          <span className="rounded-full bg-gray-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[560px] w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              {columns.map((col) => (
                <th key={col.key} className="px-3 py-2 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.orderID}
                  className={`border-t border-gray-100 dark:border-gray-800/80 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 ${
                    index % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-800/10" : ""
                  }`}
                >
                  <td className="px-3 py-2 font-semibold text-[#231F20] dark:text-white text-sm whitespace-nowrap">{order.orderID}</td>
                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{order.service}</td>
                  <td className="px-3 py-2 font-semibold whitespace-nowrap">₹ {order.totalAmount}</td>
                  <td className="px-3 py-2">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderStatusBadge = ({ status }) => {
  const statusStyles = {
    Completed: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Pending: "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400",
    Processing: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
    Cancelled: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

// ============== Payment Summary ==============

const PaymentSummary = ({ customer }) => {
  const paymentStats = [
    {
      title: "Paid",
      value: `₹${customer.details.paidAmount}`,
      icon: BadgeIndianRupee,
      tone: "green",
    },
    {
      title: "Pending",
      value: `₹${customer.details.pendingAmount}`,
      icon: Clock3,
      tone: "yellow",
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-3">
      <h2 className="mb-3 text-base font-semibold">
        Payment Summary
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {paymentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;