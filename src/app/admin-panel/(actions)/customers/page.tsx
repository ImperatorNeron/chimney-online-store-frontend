'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import useCustomers from '@/components/modules/admin/hooks/orders/useCustomers';
import useDebounce from '@/hooks/forms/useDebounce';
import InfiniteScrollSentinel from '@/components/modules/admin/components/InfiniteScrollSentinel';
import SearchFilter from '@/components/shared/AdminTableSearctFilter';
import RefreshButton from '@/components/shared/AdminTableRefreshButton';
import SortableHeader from '@/components/shared/AdminTableSortableHeader';
import EmptyState from '@/components/modules/admin/components/products/EmptyState';
import LoadingState from '@/components/modules/admin/components/products/LoadingState';
import type { ReadCustomerSchema } from '@/api/types/types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { SortOrdering } from '@/constants/orderFields';

type CustomerSortField = 'last_name' | 'first_name' | 'patronymic' | 'phone_number' | 'email' | 'orders_count' | 'total_spent' | 'is_registered' | 'last_order_at';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const selectClass =
    "h-[35px] rounded-lg border border-gray-300 text-sm pl-1.5 pr-5 py-1 bg-white w-full appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_2px_center] bg-no-repeat";

const dateClass = "h-[35px] rounded-lg border border-gray-300 text-sm px-1.5 py-1 bg-white w-full";

const COL = 'repeat(10, minmax(0, 1fr)) 28px';

export default function CustomersPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<CustomerSortField>('last_order_at');
    const [sortOrdering, setSortOrdering] = useState<SortOrdering>('desc');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const debouncedSearch = useDebounce(search, 400);

    const handleSort = (field: CustomerSortField) => {
        if (field === sortField) {
            setSortOrdering(prev => prev === 'asc' ? 'desc' : 'asc');
            return;
        }
        setSortField(field);
        setSortOrdering(field === 'last_order_at' || field === 'orders_count' || field === 'total_spent' ? 'desc' : 'asc');
    };

    const params = useMemo(
        () => ({
            text: debouncedSearch || undefined,
            field: sortField,
            ordering: sortOrdering,
            is_registered: statusFilter || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }),
        [debouncedSearch, sortField, sortOrdering, statusFilter, dateFrom, dateTo],
    );

    const { items, total, loading, loadingMore, hasMore, loadMore } = useCustomers(params);

    useEffect(() => {
        document.title = 'База клієнтів';
    }, []);

    const handleRefresh = () => {
        setSearch('');
        setSortField('last_order_at');
        setSortOrdering('desc');
        setStatusFilter('');
        setDateFrom('');
        setDateTo('');
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">База клієнтів</h1>
                <div className="flex items-center gap-2 w-full">
                    <div className="flex-[2] min-w-0">
                        <SearchFilter
                            value={search}
                            onChange={setSearch}
                            setOffset={() => {}}
                            placeholder="Пошук по імені, телефону або email..."
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <select className={selectClass} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="">Всі клієнти</option>
                            <option value="true">Зареєстровані</option>
                            <option value="false">Гості</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-0">
                        <input type="date" className={dateClass} value={dateFrom ?? ''} onChange={e => setDateFrom(e.target.value)} title="Дата від" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <input type="date" className={dateClass} value={dateTo ?? ''} onChange={e => setDateTo(e.target.value)} title="Дата до" />
                    </div>
                    <RefreshButton onClick={handleRefresh} loading={loading} />
                </div>
            </div>

            {loading && !items.length ? (
                <LoadingState />
            ) : !items.length ? (
                <EmptyState />
            ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-200">
                    <div
                        className="hidden md:grid text-sm text-gray-600 font-semibold bg-gray-100 px-3 py-2 border-b gap-2"
                        style={{ gridTemplateColumns: COL }}
                    >
                        <SortableHeader label="Прізвище" sortField="last_name" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Ім'я" sortField="first_name" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="По батькові" sortField="patronymic" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Телефон" sortField="phone_number" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Email" sortField="email" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Замовлень" sortField="orders_count" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Сума (₴)" sortField="total_spent" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Статус" sortField="is_registered" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <SortableHeader label="Останнє" sortField="last_order_at" activeField={sortField} ordering={sortOrdering} onSort={handleSort} />
                        <div />
                    </div>
                    <div className="divide-y divide-gray-200 text-xs">
                        {items.map((row: ReadCustomerSchema) => (
                            <div
                                key={row.phone_number}
                                className="grid items-center gap-2 px-3 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                style={{ gridTemplateColumns: COL }}
                                onClick={() => router.push(`/admin-panel/customers/${encodeURIComponent(row.phone_number)}`)}
                            >
                                <div className="truncate font-medium">{row.last_name}</div>
                                <div className="truncate">{row.first_name}</div>
                                <div className="truncate text-gray-500">{row.patronymic || '—'}</div>
                                <div className="truncate">{row.phone_number}</div>
                                <div className="truncate">{row.email || <span className="text-gray-400">—</span>}</div>
                                <div>{row.orders_count}</div>
                                <div>{row.total_spent.toFixed(0)}</div>
                                <div>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                        row.is_registered ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {row.is_registered ? 'Зареєстр.' : 'Гість'}
                                    </span>
                                </div>
                                <div>{formatDate(row.last_order_at)}</div>
                                <div className="flex justify-center">
                                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <InfiniteScrollSentinel
                hasMore={hasMore}
                loading={loadingMore}
                onLoadMore={loadMore}
                total={total}
                loaded={items.length}
            />
        </div>
    );
}
