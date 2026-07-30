import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  getOffers,
  createOffer,
  updateOffer as updateOfferApi,
  deleteOffer as deleteOfferApi,
} from "../api/offerApi";


const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

const fetchOffers = async () => {
  setLoading(true);

  try {
    const res = await getOffers();

    if (res.data.success || res.data.isSuccess) {
      setOffers(res.data.data);
    } else {
      setOffers([]);
    }
  } catch (error) {
    console.error(error);
    setOffers([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchOffers();
}, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
     const searchMatch =
  offer.offerName?.toLowerCase().includes(search.toLowerCase()) ||
  offer.offerCode?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        offer.status === statusFilter;

      const typeMatch =
        typeFilter === "All" ||
offer.offerType === typeFilter
      return searchMatch && statusMatch && typeMatch;
    });
  }, [offers, search, statusFilter, typeFilter]);

 const stats = {
  total: offers.length,
  active: offers.filter((o) => o.status === "Active").length,
  inactive: offers.filter((o) => o.status !== "Active").length,
  totalDiscount: offers.reduce(
    (sum, o) => sum + (Number(o.discountValue) || 0),
    0
  ),
};

const addOffer = async (offer) => {
  try {
    await createOffer(offer);
    await fetchOffers();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateOffer = async (offer) => {
  try {
    await updateOfferApi(offer.offerID, offer);
    await fetchOffers();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const deleteOffer = async (offerID) => {
  try {
    await deleteOfferApi(offerID);
    await fetchOffers();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const openAddModal = () => {
  setSelectedOffer(null);
  setIsModalOpen(true);
};

const openEditModal = (offer) => {
  setSelectedOffer(offer);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedOffer(null);
  setIsModalOpen(false);
};

  const value = {
  offers,
  filteredOffers,
  stats,
  loading,
  fetchOffers,

  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  typeFilter,
  setTypeFilter,

  selectedOffer,
  isModalOpen,

  openAddModal,
  openEditModal,
  closeModal,

  addOffer,
  updateOffer,
  deleteOffer,
};

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = () => useContext(OfferContext);