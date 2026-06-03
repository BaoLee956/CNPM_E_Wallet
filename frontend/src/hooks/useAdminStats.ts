// ============================================================
// useAdminStats — Hook for fetching admin statistics
// ============================================================

import { useCallback } from 'react';
import { useAdminStore } from '@/stores/adminStore';
import { adminStatsService } from '@/services/admin/statsService';

export function useAdminStats() {
  const {
    statistics, isLoadingStats, errorStats,
    setStatistics, setLoadingStats, setErrorStats,
  } = useAdminStore();

  const fetchStatistics = useCallback(async () => {
    setLoadingStats(true);
    setErrorStats(null);
    try {
      const res = await adminStatsService.getStatistics();
      const d = res.data;

      setStatistics({
        totalUsers: d.users.total,
        newUsersToday: d.users.newToday,
        newUsersThisMonth: d.users.newThisMonth,
        totalTransactions: d.transactions.total,
        transactionsToday: d.transactions.today,
        pendingTransactions: d.transactions.pending,
        revenueTotal: d.revenue.totalAmount,
        revenueToday: d.revenue.todayAmount,
        feeTotal: d.revenue.totalFee,
        revenueYesterday: 0,
        revenueDoD: 0,
        transactionsYesterday: 0,
        txDoD: 0,
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.response?.message ??
        'Failed to load statistics.';
      setErrorStats(msg);
    }
  }, [setStatistics, setLoadingStats, setErrorStats]);

  return { statistics, isLoadingStats, errorStats, fetchStatistics };
}
