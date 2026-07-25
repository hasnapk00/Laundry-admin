import { createContext, useContext, useMemo, useState, useEffect } from "react";
import mockData from "../mock-data.json";

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
      // TODO: Replace with backend API call (e.g. axios.get("/api/offers"))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOffers(mockData.offers);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const searchMatch = offer.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        offer.status === statusFilter;

      const typeMatch =
        typeFilter === "All" ||
        offer.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [offers, search, statusFilter, typeFilter]);

  const stats = {
  active: offers.filter((o) => o.status === "Active").length,
  scheduled: offers.filter((o) => o.status === "Scheduled").length,
  expired: offers.filter((o) => o.status === "Expired").length,
  redeemed: offers.reduce((sum, o) => sum + (o.redeemed || 0), 0),
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
  setSelectedOffer,

  isModalOpen,
  setIsModalOpen,

  setOffers,
};

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffer = () => useContext(OfferContext);