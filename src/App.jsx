import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Services from "./pages/Services";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Setttings from "./pages/Setttings";
import PickupDelivery from "./pages/PickupDelivery";
import Offers from "./pages/Offers";
import Packages from "./pages/Packages";
import Notifications from "./pages/Notifications";


// Detail Pages
import OrderDetails from "./components/orders/OrderDetails";
import OrderTracking from "./components/tracking/OrderTracking";
import CustomerDetails from "./components/customers/CustomerDetails";
import PickupDeliveryDetails from "./components/pickup&delivery/PickupDeliveryDetails";
import MonthReportPage from "./pages/MonthReportPage";
import Coupons from "./pages/Coupons";

const App = () => {
  return (
    <Routes>

      {/* Login - No Sidebar / Header */}
      <Route path="/" element={<Login />} />

      {/* Admin Dashboard */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

        {/* Tracking */}
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/tracking/:id" element={<OrderTracking />} />

        {/* Pickup & Delivery */}
        <Route path="/pickup" element={<PickupDelivery />} />
        <Route
          path="/pickup-delivery/:id"
          element={<PickupDeliveryDetails />}
        />

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Payments */}
        <Route path="/payments" element={<Payments />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />
        <Route
          path="/customers/:id"
          element={<CustomerDetails />}
        />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/month/:key" element={<MonthReportPage />} />

        {/* Settings */}
        <Route path="/settings" element={<Setttings />} />

        {/* offers */}
         <Route path="/offers" element={<Offers />} />

         {/* packages */}
          <Route path="/packages" element={<Packages />} />

        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />

        {/* Coupon */}
        <Route path="/coupons" element={<Coupons />} />

      </Route>

    </Routes>
  );
};

export default App;