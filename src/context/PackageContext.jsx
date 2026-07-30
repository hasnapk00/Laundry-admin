// import { createContext, useContext, useMemo, useState, useEffect } from "react";
// import {
//   getPackages,
//   createPackage,
//   updatePackage as updatePackageApi,
//   deletePackage as deletePackageApi,
// } from "../api/packageApi";


// const PackageContext = createContext();

// export const PackageProvider = ({ children }) => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

// const fetchPackages = async () => {
//   setLoading(true);

//   try {
//     const res = await getPackages();

//     if (res.data.success) {
//       setPackages(res.data.data);
//     } else {
//       setPackages([]);
//     }
//   } catch (error) {
//     console.error(error);
//     setPackages([]);
//   } finally {
//     setLoading(false);
//   }
// };


// useEffect(() => {
//   fetchPackages();
// }, []);

// const addPackage = async (pkg) => {
//   try {
//     await createPackage(pkg);
//     await fetchPackages();
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const updatePackage = async (pkg) => {
//   try {
//     await updatePackageApi(pkg.packageID, pkg);
//     await fetchPackages();
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const deletePackage = async (packageID) => {
//   try {
//     await deletePackageApi(packageID);
//     await fetchPackages();
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// const openAddModal = () => {
//   setSelectedPackage(null);
//   setIsModalOpen(true);
// };

// const openEditModal = (pkg) => {
//   setSelectedPackage(pkg);
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setSelectedPackage(null);
//   setIsModalOpen(false);
// };

//   const filteredPackages = useMemo(() => {
//     return packages.filter((pkg) => {
//       const searchMatch =
//   pkg.packageName?.toLowerCase().includes(search.toLowerCase()) ||
//   pkg.packageCode?.toLowerCase().includes(search.toLowerCase());

//       const statusMatch =
//         statusFilter === "All" ||
//         pkg.status === statusFilter;

//       return searchMatch && statusMatch;
//     });
//   }, [packages, search, statusFilter]);

// const stats = {
//   total: packages.length,
//   active: packages.filter((pkg) => pkg.status === "Active").length,
//   inactive: packages.filter((pkg) => pkg.status !== "Active").length,
//   savings: packages.reduce(
//     (total, pkg) =>
//       total + (pkg.originalPrice - pkg.packagePrice),
//     0
//   ),
// };

// const value = {
//   packages,
//   filteredPackages,
//   stats,
//   loading,
//   fetchPackages,

//   search,
//   setSearch,

//   statusFilter,
//   setStatusFilter,

//   selectedPackage,
//   isModalOpen,

//   openAddModal,
//   openEditModal,
//   closeModal,

//   addPackage,
//   updatePackage,
//   deletePackage,
// };

//   return (
//     <PackageContext.Provider value={value}>
//       {children}
//     </PackageContext.Provider>
//   );
// };

// export const usePackage = () => useContext(PackageContext);


import { createContext, useContext, useMemo, useState, useEffect } from "react";
import mockData from "../mock-data.json";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      // TODO: Replace with backend API call (e.g. axios.get("/api/packages"))
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPackages(mockData.packages);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const searchMatch = pkg.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        pkg.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [packages, search, statusFilter]);

  const stats = {
  total: packages.length,
  active: packages.filter((pkg) => pkg.status === "Active").length,
  inactive: packages.filter((pkg) => pkg.status === "Inactive").length,
  purchased: packages.reduce(
    (total, pkg) => total + (pkg.purchased || 0),
    0
  ),
};

const value = {
  packages,
  filteredPackages,
  stats,
  loading,
  fetchPackages,

  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  selectedPackage,
  setSelectedPackage,

  isModalOpen,
  setIsModalOpen,

  setPackages,
};

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);