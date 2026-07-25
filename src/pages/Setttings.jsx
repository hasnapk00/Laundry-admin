import { useState } from "react";
import { Building2, User, ShieldCheck, Settings as SettingsIcon } from "lucide-react";

import BusinessSettings from "../components/settings/BusinessSettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";

// ============== Constants ==============

const MENU_ITEMS = [
  {
    id: "business",
    label: "Business Information",
    icon: Building2,
    description: "Manage your business details and preferences",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Update your personal information",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    description: "Manage your password and security settings",
  },
];

// ============== Main Component ==============

const Settings = () => {
  const [activeSection, setActiveSection] = useState("business");

  // Handlers
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Find active menu item for header
  const activeMenuItem = MENU_ITEMS.find((item) => item.id === activeSection);

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Page Header */}
      <PageHeader />

      {/* Settings Navigation */}
      <SettingsNavigation
        menuItems={MENU_ITEMS}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Settings Content */}
      <SettingsContent activeSection={activeSection} />
    </div>
  );
};

// ============== Page Header ==============

const PageHeader = () => (
  <div>
    <div className="flex items-center gap-3">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
      </div>
    </div>
  </div>
);

// ============== Settings Navigation ==============

const SettingsNavigation = ({
  menuItems,
  activeSection,
  onSectionChange,
}) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-1 shadow-sm transition-colors duration-200">
    <div className="flex flex-wrap gap-1.5">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              group relative flex items-center gap-2 rounded-xl px-4 py-2 
              text-xs font-semibold transition-all duration-200
              ${
                isActive
                  ? "bg-[#E8A843] text-white shadow-md shadow-[#E8A843]/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#231F20] dark:hover:text-white"
              }
            `}
            aria-label={`Switch to ${item.label}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              size={15}
              className={`transition-transform duration-200 ${
                isActive ? "scale-110" : "group-hover:scale-105"
              }`}
            />
            <span>{item.label}</span>

            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white/80" />
            )}
          </button>
        );
      })}
    </div>
  </div>
);

// ============== Settings Content ==============

const SettingsContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "business":
        return <BusinessSettings />;
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <BusinessSettings />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {renderContent()}
    </div>
  );
};

export default Settings;