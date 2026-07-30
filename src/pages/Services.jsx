// import { useState, useEffect } from "react";
// import { Search, Plus } from "lucide-react";

// import CategoriesTable from "../components/services/CategoriesTable";
// import ServicesTable from "../components/services/ServicesTable";
// import Pagination from "../components/Pagination";

// import CategoryModal from "../components/services/CategoryModal";
// import ServiceModal from "../components/services/ServiceModal";
// import { useServices } from "../context/ServiceContext";
// import { usePagination } from "../hooks/usePagination";
// import ServiceStats from "../components/services/ServiceStats";

// const tabs = ["Categories", "Services"];

// const Services = () => {
//   const { categories, services } = useServices();
//   const [activeTab, setActiveTab] = useState("Categories");
//   const [search, setSearch] = useState("");
//   const [modalType, setModalType] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);



//   // Filter Categories
//   const filteredCategories = (categories || []).filter((category) =>
//     String(category.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
//     String(category.description || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Filter Services
//   const filteredServices = (services || []).filter((service) =>
//     String(service.serviceName || "").toLowerCase().includes(search.toLowerCase()) ||
//     String(service.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
//     String(service.description || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination Hooks
//   const {
//     currentPage: categoriesCurrentPage,
//     setCurrentPage: setCategoriesCurrentPage,
//     totalPages: categoriesTotalPages,
//     paginatedData: paginatedCategories,
//   } = usePagination(filteredCategories, 5);

//   const {
//     currentPage: servicesCurrentPage,
//     setCurrentPage: setServicesCurrentPage,
//     totalPages: servicesTotalPages,
//     paginatedData: paginatedServices,
//   } = usePagination(filteredServices, 5);

//   // Reset to first page when search changes
//   useEffect(() => {
//     setCategoriesCurrentPage(1);
//     setServicesCurrentPage(1);
//   }, [search, setCategoriesCurrentPage, setServicesCurrentPage]);

//   // Reset page when switching tabs
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCategoriesCurrentPage(1);
//     setServicesCurrentPage(1);
//   };

//   const openModal = () => {
//     switch (activeTab) {
//       case "Categories":
//         setModalType("category");
//         break;
//       case "Services":
//         setModalType("service");
//         break;
//       default:
//         setModalType(null);
//     }
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setSelectedItem(null);
//   };

//   const handleEditCategory = (category) => {
//     setSelectedItem(category);
//     setModalType("category");
//   };

//   const handleEditService = (service) => {
//     setSelectedItem(service);
//     setModalType("service");
//   };

//   const getTabLabel = () => {
//     switch (activeTab) {
//       case "Categories":
//         return "Add Category";
//       case "Services":
//         return "Add Service";
      
//       default:
//         return "Add";
//     }
//   };

//   return (
//     <div className="space-y-3 md:space-y-4">
//       {/* Header */}
//       <div>
//         <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
//           Services
//         </h1>
//       </div>

//       {/* Stats */}
//       <ServiceStats categories={categories || []} services={services || []} />

//       {/* Tabs */}
//       <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-1 shadow-sm">
//         <div className="flex flex-wrap gap-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => handleTabChange(tab)}
//               className={`flex-1 sm:flex-none rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
//                 activeTab === tab
//                   ? "bg-[#E8A843] text-white shadow-sm"
//                   : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Search + Add */}
//       <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//         <div className="relative w-full md:max-w-sm">
//           <Search
//             size={15}
//             className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
//           />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder={`Search ${activeTab.toLowerCase()}...`}
//             className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-1.5 pl-8 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-550"
//           />
//         </div>

//         <button
//           onClick={openModal}
//           className="flex items-center justify-center gap-2 rounded-lg bg-[#E8A843] px-3.5 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d49a3a] hover:shadow-md shadow-sm whitespace-nowrap"
//         >
//           <Plus size={15} />
//           {getTabLabel()}
//         </button>
//       </div>

//       {/* Tables */}
//       <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           {activeTab === "Categories" && <CategoriesTable onEdit={handleEditCategory} categories={paginatedCategories} />}
//           {activeTab === "Services" && <ServicesTable onEdit={handleEditService} services={paginatedServices} />}
//           {/* {activeTab === "Pricing" && <PricingTable onEdit={handleEditPricing} search={search} />} */}
//         </div>
//       </div>

//       {/* Pagination - Categories */}
//       {activeTab === "Categories" && (
//         <Pagination
//           currentPage={categoriesCurrentPage}
//           totalPages={categoriesTotalPages}
//           onPageChange={setCategoriesCurrentPage}
//           totalItems={filteredCategories.length}
//           pageSize={5}
//           label="categories"
//         />
//       )}

//       {/* Pagination - Services */}
//       {activeTab === "Services" && (
//         <Pagination
//           currentPage={servicesCurrentPage}
//           totalPages={servicesTotalPages}
//           onPageChange={setServicesCurrentPage}
//           totalItems={filteredServices.length}
//           pageSize={5}
//           label="services"
//         />
//       )}

//       {/* Modals */}
//       <CategoryModal
//         isOpen={modalType === "category"}
//         data={selectedItem}
//         onClose={closeModal}
//       />
//       <ServiceModal
//         isOpen={modalType === "service"}
//         data={selectedItem}
//         onClose={closeModal}
//       />
//       {/* <PricingModal
//         isOpen={modalType === "pricing"}
//         data={selectedItem}
//         onClose={closeModal}
//       /> */}
//     </div>
//   );
// };

// export default Services;


import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";

import CategoriesTable from "../components/services/CategoriesTable";
import ServicesTable from "../components/services/ServicesTable";
import ItemsTable from "../components/services/ItemsTable";
import Pagination from "../components/Pagination";

import CategoryModal from "../components/services/CategoryModal";
import ServiceModal from "../components/services/ServiceModal";
import ItemModal from "../components/services/ItemModal";
import { useServices } from "../context/ServiceContext";
import { usePagination } from "../hooks/usePagination";
import ServiceStats from "../components/services/ServiceStats";

const tabs = ["Categories", "Items", "Services"];

const Services = () => {
  const { categories, services, items } = useServices();
  const [activeTab, setActiveTab] = useState("Categories");
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);



  // Filter Categories
  const filteredCategories = (categories || []).filter((category) =>
    String(category.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(category.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // Filter Services
  const filteredServices = (services || []).filter((service) =>
    String(service.serviceName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(service.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(service.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // Filter Items
  const filteredItems = (items || []).filter((item) =>
    String(item.itemName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(item.categoryName || "").toLowerCase().includes(search.toLowerCase()) ||
    String(item.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Hooks
  const {
    currentPage: categoriesCurrentPage,
    setCurrentPage: setCategoriesCurrentPage,
    totalPages: categoriesTotalPages,
    paginatedData: paginatedCategories,
  } = usePagination(filteredCategories, 5);

  const {
    currentPage: servicesCurrentPage,
    setCurrentPage: setServicesCurrentPage,
    totalPages: servicesTotalPages,
    paginatedData: paginatedServices,
  } = usePagination(filteredServices, 5);

  const {
    currentPage: itemsCurrentPage,
    setCurrentPage: setItemsCurrentPage,
    totalPages: itemsTotalPages,
    paginatedData: paginatedItems,
  } = usePagination(filteredItems, 5);

  // Reset to first page when search changes
  useEffect(() => {
    setCategoriesCurrentPage(1);
    setServicesCurrentPage(1);
    setItemsCurrentPage(1);
  }, [search, setCategoriesCurrentPage, setServicesCurrentPage, setItemsCurrentPage]);

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCategoriesCurrentPage(1);
    setServicesCurrentPage(1);
    setItemsCurrentPage(1);
  };

  const openModal = () => {
    switch (activeTab) {
      case "Categories":
        setModalType("category");
        break;
      case "Services":
        setModalType("service");
        break;
      case "Items":
        setModalType("item");
        break;
      default:
        setModalType(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const handleEditCategory = (category) => {
    setSelectedItem(category);
    setModalType("category");
  };

  const handleEditService = (service) => {
    setSelectedItem(service);
    setModalType("service");
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setModalType("item");
  };

  const getTabLabel = () => {
    switch (activeTab) {
      case "Categories":
        return "Add Category";
      case "Services":
        return "Add Service";
      case "Items":
        return "Add Item";

      default:
        return "Add";
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Services
        </h1>
      </div>

      {/* Stats */}
      <ServiceStats categories={categories || []} services={services ||  []} />

      {/* Tabs */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-1 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 sm:flex-none rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#E8A843] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={15}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-1.5 pl-8 pr-3 text-sm outline-none transition-all duration-200 focus:border-[#E8A843] focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-550"
          />
        </div>

        <button
          onClick={openModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#E8A843] px-3.5 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d49a3a] hover:shadow-md shadow-sm whitespace-nowrap"
        >
          <Plus size={15} />
          {getTabLabel()}
        </button>
      </div>

      {/* Tables */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {activeTab === "Categories" && <CategoriesTable onEdit={handleEditCategory} categories={paginatedCategories} />}
          {activeTab === "Services" && <ServicesTable onEdit={handleEditService} services={paginatedServices} />}
          {activeTab === "Items" && <ItemsTable onEdit={handleEditItem} items={paginatedItems} />}
          {/* {activeTab === "Pricing" && <PricingTable onEdit={handleEditPricing} search={search} />} */}
        </div>
      </div>

      {/* Pagination - Categories */}
      {activeTab === "Categories" && (
        <Pagination
          currentPage={categoriesCurrentPage}
          totalPages={categoriesTotalPages}
          onPageChange={setCategoriesCurrentPage}
          totalItems={filteredCategories.length}
          pageSize={5}
          label="categories"
        />
      )}

      {/* Pagination - Services */}
      {activeTab === "Services" && (
        <Pagination
          currentPage={servicesCurrentPage}
          totalPages={servicesTotalPages}
          onPageChange={setServicesCurrentPage}
          totalItems={filteredServices.length}
          pageSize={5}
          label="services"
        />
      )}

      {/* Pagination - Items */}
      {activeTab === "Items" && (
        <Pagination
          currentPage={itemsCurrentPage}
          totalPages={itemsTotalPages}
          onPageChange={setItemsCurrentPage}
          totalItems={filteredItems.length}
          pageSize={5}
          label="items"
        />
      )}

      {/* Modals */}
      <CategoryModal
        isOpen={modalType === "category"}
        data={selectedItem}
        onClose={closeModal}
      />
      <ServiceModal
        isOpen={modalType === "service"}
        data={selectedItem}
        onClose={closeModal}
      />
      <ItemModal
        isOpen={modalType === "item"}
        data={selectedItem}
        onClose={closeModal}
      />
      {/* <PricingModal
        isOpen={modalType === "pricing"}
        data={selectedItem}
        onClose={closeModal}
      /> */}
    </div>
  );
};

export default Services;