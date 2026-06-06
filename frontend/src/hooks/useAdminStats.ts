// ============================================================
// useAdminStats — Hook for fetching admin statistics
// ============================================================

import { useCallback } from 'react';
import { useAdminStore, mapTransaction } from '@/stores/adminStore';
import { adminStatsService } from '@/services/admin/statsService';
import type { PaginationParams } from '@/types/admin/notification';

export function useAdminStats() {
  const {
    statistics, isLoadingStats, errorStats,
    setStatistics, setLoadingStats, setErrorStats,
  } = useAdminStore();

  const fetchStatistics = useCallback(async (params?: PaginationParams & { range?: string; startDate?: string; endDate?: string }) => {
    setLoadingStats(true);
    setErrorStats(null);
    try {
      const res = await adminStatsService.getStatistics({
        range: params?.range as 'today' | '7d' | '30d' | 'custom' | undefined,
        startDate: params?.startDate,
        endDate: params?.endDate,
      });
      const d = res.data;

      setStatistics({
        totalUsers: d.users.total,
        activeUsers: d.users.active,
        lockedUsers: d.users.locked,
        newUsersCurrent: d.users.newCurrent,
        newUsersPrevious: d.users.newPrevious,
        totalDeposit: d.revenue.totalDeposit,
        totalWithdraw: d.revenue.totalWithdraw,
        totalFee: d.revenue.totalFee,
        totalTransactionCount: d.transactions.totalCount,
        totalTransactionValue: d.transactions.totalValue,
        successRate: d.transactions.successRate,
        failedRate: d.transactions.failedRate,
        successCount: d.transactions.successCount,
        failedCount: d.transactions.failedCount,
        recentTransactions: (d.recentTransactions ?? []).map(mapTransaction),
        dailySeries: d.dailySeries,
        range: d.range,
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
