import {
  LayoutDashboard,
  Package,
  Route,
  Users,
  Truck,
  ClipboardList,
  BadgePercent,
  DiamondPercent,
  PackageCheck,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Orders",
    icon: Package,
    path: "/orders",
  },
  {
    name: "Order Tracking",
    icon: Route,
    path: "/tracking",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    name: "Pickup & Delivery",
    icon: Truck,
    path: "/pickup",
  },
  {
    name: "Services",
    icon: ClipboardList,
    path: "/Services",
  },
  {
    name: "Offers",
    icon: BadgePercent,
    path: "/offers",
  },
  {
    name: "Coupons",
    icon: DiamondPercent,
    path: "/coupons"
  },
  {
    name: "Packages",
    icon: PackageCheck,
    path: "/packages"
  },
  {
    name: "Payments",
    icon: Wallet,
    path: "/payments",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];