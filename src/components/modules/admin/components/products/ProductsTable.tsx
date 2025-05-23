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
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Назва
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Слаг
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Категорія
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Зображень
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Дата
              </th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Дії</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {product.slug}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {
                    Array.isArray(categories)
                      ? categories.find(category => category.id === product.category_id)?.name || 'Unknown'
                      : 'Unknown'
                  }
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {product.images?.length || 0}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(product.updated_at)}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/admin-panel/products/update/${product.slug}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => onDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
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
    </div>
  );
}
