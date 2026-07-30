import { Edit, Trash2, FolderOpen, ImageOff } from "lucide-react";
import { useServices } from "../../context/ServiceContext";
import { SkeletonRows } from "../TableSkeleton";

const CategoriesTable = ({ onEdit, categories = [] }) => {
  const { deleteCategory, loading } = useServices();

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Image
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Description
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <SkeletonRows rows={5} columns={5} />
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <tr
key={category.categoryID}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      {category.imageUrl ? (
  <img
    src={`${import.meta.env.VITE_API_BASE_URL}/${category.imageUrl}`}
    alt={category.categoryName}
    className="h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.style.display = "none";
      e.currentTarget.nextSibling.style.display = "flex";
    }}
  />
) : null}

<div
  className={`h-full w-full items-center justify-center ${
    category.imageUrl ? "hidden" : "flex"
  }`}
>
  <ImageOff
    size={14}
    className="text-gray-400 dark:text-gray-500"
  />
</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                    {category.categoryName}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {category.description || "-"}
                  </td>
                  <td className="px-3 py-2">
                   <span
  className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${
    category.status
      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
  }`}
>
  {category.status ? "Active" : "Inactive"}
</span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(category)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-[#E8A843]/10 hover:text-[#E8A843] transition-colors"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.categoryId)}   // ✅ correct
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <FolderOpen size={24} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      No Categories Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Click <span className="font-medium text-[#E8A843]">"Add Category"</span> to
                      create your first category.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default CategoriesTable;