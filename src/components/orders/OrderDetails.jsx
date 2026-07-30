import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerCard from "./CustomerCard";
import OrderInfoCard from "./OrderInfoCard";
import ServicesCard from "./ServicesCard";
import PaymentSummary from "./PaymentSummary";
import ItemsTable from "./ItemsTable";
import { useOrders } from "../../context/OrderContext";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const navigate = useNavigate();

const { id } = useParams();
const { getOrderById } = useOrders();

const [order, setOrder] = useState(null);
const [items, setItems] = useState(null);
const [services, setServices] = useState(null);
const [paymentSummary, setPaymentSummary] = useState(null);


// useEffect(() => {
//   const loadOrder = async () => {
//     const res = await getOrderById(id);

//     if (res.success) {
//       setOrder(res.data.order);
//       setItems(res.data.items);
//       setServices(res.data.services);
//     }
//   };

//   loadOrder();
// }, [id]);

useEffect(() => {
  const loadOrder = async () => {
  const res = await getOrderById(id);

  console.log("Returned:", res);

  if (res?.success) {
    setOrder(res.data.order);
    setItems(res.data.items);
    setServices(res.data.services);
    setPaymentSummary(res.data.paymentSummary);

  }
};

  loadOrder();
}, [id]);

  if (!order) {
    return null;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="mb-2 sm:mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition hover:text-[#E8A843] dark:hover:text-[#E8A843]"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white break-words">
              Order #{order.orderID}
            </h1>

            <span className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 px-3 py-1 text-xs font-semibold text-yellow-700 dark:text-yellow-400 shrink-0">
              {order.status}
            </span>
          </div>

          <p className="mt-1.5 sm:mt-2 text-sm text-gray-500 dark:text-gray-400">
            View complete information about this order.
          </p>
        </div>

        
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-4 xl:grid-cols-2">
        <CustomerCard order={order} />
        <OrderInfoCard order={order} />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-4 xl:grid-cols-2">
        <ServicesCard order={order} services={services} />
        <PaymentSummary order={order} payment={paymentSummary} />
      </div>

      {/* Row 3 */}
      <ItemsTable order={items} />
    </div>
  );
};

export default OrderDetails;