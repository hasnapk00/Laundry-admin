import { Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkeletonRows } from "../TableSkeleton";

// ============== Main Component ==============

const CustomersTable = ({
  customers = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  loading = false,
}) => {
  const navigate = useNavigate();

  // Navigation handler
  const handleViewCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

 
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200 text-gray-900 dark:text-gray-100">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <TableHeader />
          {loading ? (
            <tbody>
              <SkeletonRows rows={5} columns={7} />
            </tbody>
          ) : (
            <TableBody
              customers={customers}
              onViewCustomer={handleViewCustomer}
            />
          )}
        </table>
      </div>

      
    </div>
  );
};

// ============== Table Header ==============

const TableHeader = () => {
  const columns = [
    { key: "customer", label: "Customer" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "orders", label: "Orders" },
    { key: "spent", label: "Total Spent" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action", align: "center" },
  ];

  return (
    <thead className="bg-gray-50 dark:bg-gray-800/50">
      <tr className="text-left text-sm font-semibold text-gray-650 dark:text-gray-400">
        {columns.map((col) => (
          <th
            key={col.key}
            className={`px-4 py-2.5 ${col.align === "center" ? "text-center" : ""}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// ============== Table Body ==============

const TableBody = ({ customers, onViewCustomer }) => {
  if (!customers.length) {
    return <EmptyTableState />;
  }

  return (
    <tbody>
      {customers.map((customer) => (
        <CustomerRow
          key={customer.id}
          customer={customer}
          onViewCustomer={onViewCustomer}
        />
      ))}
    </tbody>
  );
};

// ============== Customer Row ==============

const CustomerRow = ({ customer, onViewCustomer }) => {
  const {
    id,
    name,
    phone,
    email,
    total_orders,
    total_spent,
    status,
  } = customer;

  return (
    <tr className="border-t border-gray-100 dark:border-gray-800/80 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 text-sm">
      {/* Customer Info */}
      <td className="px-4 py-2.5">
        <div>
          <p className="font-semibold text-[#231F20] dark:text-white text-sm">{name || "N/A"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</p>
        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">{phone || "-"}</td>

      {/* Email */}
      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">{email || "-"}</td>

      {/* Orders Count */}
      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">{total_orders ?? 0}</td>

      {/* Total Spent */}
      <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white">₹ {total_spent ?? 0}</td>

      {/* Status */}
      <td className="px-4 py-2.5">
        <StatusBadge status={status} />
      </td>

      {/* Actions */}
      <td className="px-4 py-2.5">
        <div className="flex justify-center">
          <button
            onClick={() => onViewCustomer(id)}
            className="rounded-lg p-1 text-[#E8A843] transition-colors hover:bg-[#F4EFD9] dark:hover:bg-zinc-800 hover:text-[#d4952f]"
            aria-label={`View customer ${name}`}
            title="View Customer Details"
          >
            <Eye size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// ============== Status Badge ==============

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: {
      className: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
      label: "Active",
    },
    Inactive: {
      className: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
      label: "Inactive",
    },
    Pending: {
      className: "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400",
      label: "Pending",
    },
    Suspended: {
      className: "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",
      label: "Suspended",
    },
  };

  const config = statusConfig[status] || statusConfig.Inactive;

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

// ============== Empty State ==============

const EmptyTableState = () => (
  <tbody>
    <tr>
      <td colSpan={7} className="px-6 py-16 text-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-gray-100 dark:bg-zinc-800 p-4">
            <Users size={40} className="text-gray-400 dark:text-gray-500" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            No Customers Found
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Customers will appear here once they register.
          </p>
        </div>
      </td>
    </tr>
  </tbody>
);

export default CustomersTable;