import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { CustomerProvider } from "./context/CustomerContext.jsx";
import { PickupDeliveryProvider } from "./context/PickupDeliveryContext.jsx";
import { ServiceProvider } from "./context/ServiceContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import { OfferProvider } from "./context/OfferContext.jsx";
import { PackageProvider } from "./context/PackageContext.jsx";

import { DashboardProvider } from "./context/DashboardContext.jsx";
import { NotificationsProvider } from "./context/NotificationsContext.jsx";
import { ReportsProvider } from "./context/ReportsContext.jsx";
import { CouponProvider } from "./context/CouponContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotificationsProvider>
          <AuthProvider>
            <OrderProvider>
              <CustomerProvider>
                <PickupDeliveryProvider>
                  <ServiceProvider>
                    <PaymentProvider>

                      <DashboardProvider>
                        <ReportsProvider>
                          <CouponProvider>
                          <OfferProvider>
                            <PackageProvider>
                              <App />
                            </PackageProvider>
                          </OfferProvider>
                          </CouponProvider>

                        </ReportsProvider>
                      </DashboardProvider>

                    </PaymentProvider>
                  </ServiceProvider>
                </PickupDeliveryProvider>
              </CustomerProvider>
            </OrderProvider>
          </AuthProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);