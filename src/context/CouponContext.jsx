import { createContext, useContext, useMemo, useState } from "react";
import {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon as updateCouponApi,
  deleteCoupon as deleteCouponApi,
  updateCouponStatus as updateCouponStatusApi,
} from "../api/couponApi";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await getCoupons();
      if (res.data.isSuccess) {
        setCoupons(res.data.data);
      } else {
        setCoupons([]);
      }
    } catch (error) {
      console.error(error);
      setCoupons([]);
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
      redeemed: coupons.reduce((total, coupon) => total + coupon.usedCount, 0),
    };
  }, [coupons]);

  /* ---------------------------- Filtering ---------------------------- */

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const searchMatch =
        coupon.couponName?.toLowerCase().includes(search.toLowerCase()) ||
        coupon.couponCode?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter === "All" || coupon.status === statusFilter;

      const discountMatch =
        discountTypeFilter === "All" || coupon.discountType === discountTypeFilter;

      const customerMatch =
        customerTypeFilter === "All" || coupon.customerType === customerTypeFilter;

      return searchMatch && statusMatch && discountMatch && customerMatch;
    });
  }, [coupons, search, statusFilter, discountTypeFilter, customerTypeFilter]);

  /* ---------------------------- CRUD ---------------------------- */

  const addCoupon = async (coupon) => {
    try {
      await createCoupon(coupon);
      await fetchCoupons();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // const updateCoupon = async (coupon) => {
  //   try {
  //     await updateCouponApi(coupon.couponID, coupon);
  //     await fetchCoupons();
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  const updateCoupon = async (coupon) => {
  try {
    await updateCouponApi(coupon.couponID, coupon);
    await fetchCoupons();
    return true;
  } catch (error) {
    console.error("Update coupon failed:", error.response?.data || error.message);
    return false;
  }
};

  const deleteCoupon = async (couponID) => {
    try {
      await deleteCouponApi(couponID);
      await fetchCoupons();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateCouponStatus = async (couponID, status) => {
    try {
      await updateCouponStatusApi(couponID, status);
      await fetchCoupons();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
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
        updateCouponStatus,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error("useCoupon must be used within CouponProvider");
  }

  return context;
};