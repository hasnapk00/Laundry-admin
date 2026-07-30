import DeliveryDetailsCard from "./DeliveryDetailsCard";
import LocationMap from "./LocationMap";
import TrackingHeader from "./TrackingHeader";
import UpdateStatusCard from "./UpdateStatusCard";

const OrderTracking = () => {
  // Temporary data (Replace with API response later)
  const order = {
    id: "ORD001",
    status: "Washing",
    pickupAddress: "ABC Laundry, Calicut, Kerala",
    deliveryAddress: "Rahul Sharma, Kottakkal, Malappuram, Kerala",
    expectedDelivery: "20 Jul 2026",
    latitude: 11.2588,
    longitude: 75.7804,
  };

  return (
    <div className="space-y-3 sm:space-y-3">
      {/* Header */}
      <TrackingHeader order={order} />

      {/* Details + Status */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2">
        <DeliveryDetailsCard order={order} />
        <UpdateStatusCard order={order} />
      </div>

      {/* Map */}
      <LocationMap order={order} />
    </div>
  );
};

export default OrderTracking;