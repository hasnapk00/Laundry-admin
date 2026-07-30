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
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-sm transition-colors duration-200 text-gray-900 dark:text-gray-100">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full">
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
      <tr className="text-left text-xs sm:text-sm font-semibold text-gray-650 dark:text-gray-400">
        {columns.map((col) => (
          <th
            key={col.key}
            className={`px-3 py-2 whitespace-nowrap ${col.align === "center" ? "text-center" : ""}`}
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
         key={customer.userID}
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
  userID,
  fullName,
  phone,
  email,
  totalOrders,
  totalSpent,
  status,
} = customer;

  return (
    <tr className="border-t border-gray-100 dark:border-gray-800/80 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30 text-sm">
      {/* Customer Info */}
      <td className="px-3 py-2">
        <div>
          <p className="font-semibold text-[#231F20] dark:text-white text-sm whitespace-nowrap">{fullName || "N/A"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {userID}</p>
        </div>
      </td>

      {/* Phone */}
      <td className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap">{phone || "-"}</td>

      {/* Email */}
      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{email || "-"}</td>

      {/* Orders Count */}
      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{totalOrders ?? 0}</td>

      {/* Total Spent */}
      <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white whitespace-nowrap">₹ {totalSpent ?? 0}</td>

      {/* Status */}
      <td className="px-3 py-2">
        <StatusBadge status={status} />
      </td>

      {/* Actions */}
      <td className="px-3 py-2">
        <div className="flex justify-center">
          <button
            onClick={() => onViewCustomer(userID)}
            className="rounded-lg p-1 text-[#E8A843] transition-colors hover:bg-[#F4EFD9] dark:hover:bg-zinc-800 hover:text-[#d4952f]"
            aria-label={`View customer ${fullName}`}
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
  const config =
    status === "Active"
      ? {
          className:
            "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
          label: "Active",
        }
      : {
          className:
            "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
          label: "Inactive",
        };

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

// ============== Empty State ==============

const EmptyTableState = () => (
  <tbody>
    <tr>
      <td colSpan={7} className="px-4 py-10 text-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-gray-100 dark:bg-zinc-800 p-3">
            <Users size={32} className="text-gray-400 dark:text-gray-500" />
          </div>

          <h3 className="mt-3 text-base font-semibold text-gray-700 dark:text-gray-300">
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