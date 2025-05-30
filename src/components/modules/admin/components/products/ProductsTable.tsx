'use client'

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import formatDate from "@/utils/formatDate";
import { ReadCategoriesData } from "@/api/types/types";
import Link from "next/link";

interface ProductsTableProps {
  items: any[];
  categories: ReadCategoriesData;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export default function ProductsTable({ items, onDelete, deletingId, categories }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Назва
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Слаг
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Категорія
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Зображень
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
              Створено
            </th>
            <th scope="col" className="relative py-3 px-4">
              <span className="sr-only">Дії</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {items.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-indigo-50 transition-colors duration-150"
            >
              <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link
                    href={`/admin-panel/products/update/${product.slug}`}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Редагувати"
                  >
                    {product.name}
                  </Link>
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">
                {product.slug}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">
                {Array.isArray(categories)
                  ? categories.find(category => category.id === product.category_id)?.name || 'Невідома'
                  : 'Невідома'}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 text-center">
                {product.images?.length || 0}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">
                {formatDate(product.created_at)}
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-4">
                  <Link
                    href={`/admin-panel/products/update/${product.slug}`}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Редагувати"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => onDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors duration-150"
                    title="Видалити"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
