import { createContext, useContext, useMemo, useState } from "react";
import { couponsData } from "../coupons";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/coupons"))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCoupons(couponsData);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [discountTypeFilter, setDiscountTypeFilter] = useState("All");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("All");

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------------------------- Statistics ---------------------------- */

  const stats = useMemo(() => {
    return {
      total: coupons.length,
      active: coupons.filter((c) => c.status === "Active").length,
      scheduled: coupons.filter((c) => c.status === "Scheduled").length,
      expired: coupons.filter((c) => c.status === "Expired").length,
      redeemed: coupons.reduce(
        (total, coupon) => total + coupon.usedCount,
        0
      ),
    };
  }, [coupons]);

  /* ---------------------------- Filtering ---------------------------- */

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const searchMatch =
        coupon.name.toLowerCase().includes(search.toLowerCase()) ||
        coupon.code.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        coupon.status === statusFilter;

      const discountMatch =
        discountTypeFilter === "All" ||
        coupon.discountType === discountTypeFilter;

      const customerMatch =
        customerTypeFilter === "All" ||
        coupon.customerType === customerTypeFilter;

      return (
        searchMatch &&
        statusMatch &&
        discountMatch &&
        customerMatch
      );
    });
  }, [
    coupons,
    search,
    statusFilter,
    discountTypeFilter,
    customerTypeFilter,
  ]);

  /* ---------------------------- CRUD ---------------------------- */

  const addCoupon = (coupon) => {
    setCoupons((prev) => [
      {
        ...coupon,
        id: `CPN${Date.now()}`,
      },
      ...prev,
    ]);
  };

  const updateCoupon = (updatedCoupon) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === updatedCoupon.id
          ? updatedCoupon
          : coupon
      )
    );
  };

  const deleteCoupon = (id) => {
    setCoupons((prev) =>
      prev.filter((coupon) => coupon.id !== id)
    );
  };

  /* ---------------------------- Modal ---------------------------- */

  const openAddModal = () => {
    setSelectedCoupon(null);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCoupon(null);
    setIsModalOpen(false);
  };

  /* ------------------------- Generate Code ------------------------- */

  const generateCouponCode = () => {
    const prefix = "LDY";
    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    return `${prefix}-${random}`;
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        filteredCoupons,
        stats,
        loading,
        fetchCoupons,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        discountTypeFilter,
        setDiscountTypeFilter,

        customerTypeFilter,
        setCustomerTypeFilter,

        selectedCoupon,
        setSelectedCoupon,

        isModalOpen,
        setIsModalOpen,

        openAddModal,
        openEditModal,
        closeModal,

        addCoupon,
        updateCoupon,
        deleteCoupon,

        generateCouponCode,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCoupon must be used within CouponProvider"
    );
  }

  return context;
};