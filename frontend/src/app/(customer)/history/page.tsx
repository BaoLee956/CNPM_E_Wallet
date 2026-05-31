// app/(customer)/history/page.tsx
"use client";

import { CustomerPage } from "@/components/ui";
import { TransactionFilters } from "@/components/history/TransactionFilters";
import { TransactionTable } from "@/components/history/TransactionTable";
import { TransactionSkeleton } from "@/components/history/TransactionSkeleton";
import { Pagination } from "@/components/ui/Table";
import { useTransactions } from "@/hooks/useTransactions";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function HistoryPage() {
  // ✅ Dùng useRequireAuth thay vì useAuth
  const { isAuthenticated, isLoading: authLoading } = useRequireAuth();

  const {
    transactions,
    total,
    loading,
    error,
    page,
    pageSize,
    filters,
    setPage,
    setFilters,
    resetFilters,
  } = useTransactions();

  if (authLoading) {
    return (
      <CustomerPage>
        <TransactionSkeleton />
      </CustomerPage>
    );
  }

  if (!isAuthenticated) {
    return (
      <CustomerPage>
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <p className="text-secondary">
            Please login to view your transaction history.
          </p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </CustomerPage>
    );
  }

  return (
    <CustomerPage>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Transaction History
          </h1>
          <p className="text-sm text-secondary">
            View all your transfers, topups, and payments
          </p>
        </div>

        <TransactionFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
        />

        {loading ? (
          <TransactionSkeleton />
        ) : error ? (
          <div className="rounded-xl border border-danger-light bg-danger-light/10 p-4 text-center text-danger">
            <p>{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <TransactionTable data={transactions} loading={false} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </CustomerPage>
  );
}
