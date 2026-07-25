import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerCard from "./CustomerCard";
import OrderInfoCard from "./OrderInfoCard";
import ServicesCard from "./ServicesCard";
import PaymentSummary from "./PaymentSummary";
import ItemsTable from "./ItemsTable";



const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary data
  // Replace this with API response later
  const order = {
    id,
    customer: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    address: "Malappuram, Kerala",

    orderDate: "17 Jul 2026",
    pickupDate: "18 Jul 2026",
    deliveryDate: "20 Jul 2026",

    status: "Pending",

    paymentMethod: "UPI",
    paymentStatus: "Paid",

    subtotal: 570,
    discount: 50,
    tax: 18,
    total: 538,

    services: [
      {
        service: "Wash & Iron",
        quantity: 8,
        amount: 420,
      },
      {
        service: "Dry Clean",
        quantity: 2,
        amount: 150,
      },
    ],

    items: [
  {
    id: 1,
    item: "Shirt",
    service: "Wash & Iron",
    quantity: 5,
    price: 30,
    total: 150,
  },
  {
    id: 2,
    item: "Pant",
    service: "Dry Clean",
    quantity: 2,
    price: 75,
    total: 150,
  },
  {
    id: 3,
    item: "Bedsheet",
    service: "Wash Only",
    quantity: 2,
    price: 60,
    total: 120,
  },
]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#E8A843]"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id}
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              {order.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            View complete information about this order.
          </p>
        </div>

        
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CustomerCard order={order} />
        <OrderInfoCard order={order} />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ServicesCard order={order} />
        <PaymentSummary order={order} />
      </div>

      {/* Row 3 */}
      <ItemsTable order={order} />
    </div>
  );
};

export default OrderDetails;