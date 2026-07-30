import { NavLink } from "react-router-dom";
import { WashingMachine, X } from "lucide-react";
import { navigation } from "../../constants/navigation";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-60
          bg-white dark:bg-[#1a1a1a]
          border-r border-gray-200 dark:border-gray-800
          shadow-lg
          flex flex-col
          transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="h-14 md:h-14 flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
            <div className="p-2 rounded-xl bg-[#E8A843]/10">
            <WashingMachine
              size={18}
              className="text-[#E8A843]"
            />
          </div>

          <div>
            <h1 className="text-base font-bold text-gray-800 dark:text-white">
              Cleaneo
            </h1>

           
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200

                  ${
                    isActive
                      ? "bg-[#E8A843]/10 text-[#E8A843] font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      className={
                        isActive
                          ? "text-[#E8A843]"
                          : "text-gray-400"
                      }
                    />

                    <span className="text-sm">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4">
          <p className="text-xs text-gray-400">
            Laundry Admin v1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;