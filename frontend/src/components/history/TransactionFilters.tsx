"use client";

import { Input, Button } from "@/components/ui";
import { Search, X } from "lucide-react";
import type { TransactionFilters } from "@/services/transactionService";

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onReset: () => void;
}

export function TransactionFilters({
  filters,
  onFiltersChange,
  onReset,
}: TransactionFiltersProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      type: e.target.value as TransactionFilters["type"],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Loại giao dịch - dùng select native */}
        <div className="flex-1 min-w-35">
          <label className="block text-xs font-semibold tracking-wide uppercase text-secondary mb-1.5">
            Type
          </label>
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="input-base h-9 text-sm"
          >
            <option value="all">All</option>
            <option value="send">Send</option>
            <option value="receive">Receive</option>
            <option value="topup">Topup</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex-1 min-w-45">
          <Input
            label="Search"
            placeholder="Description, name..."
            value={filters.search}
            onChange={handleSearchChange}
            iconLeft={<Search size={14} />}
          />
        </div>

        {/* Nút reset */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconLeft={<X size={14} />}
            className="mt-5"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
