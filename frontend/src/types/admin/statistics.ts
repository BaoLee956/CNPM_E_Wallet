// ============================================================
// Admin Statistics Types — BE response shapes
// ============================================================

export type StatisticsRange = 'today' | '7d' | '30d' | 'custom';

export interface AdminStatisticsResponse {
  message: string;
  data: {
    range: {
      type: StatisticsRange;
      startDate: string;
      endDate: string;
    };
    users: {
      total: number;
      active: number;
      locked: number;
      newCurrent: number;
      newPrevious: number;
    };
    revenue: {
      totalDeposit: number;
      totalWithdraw: number;
      totalFee: number;
    };
    transactions: {
      totalCount: number;
      totalValue: number;
      successCount: number;
      failedCount: number;
      successRate: number;
      failedRate: number;
    };
    dailySeries: Array<{
      date: string;
      revenue: number;
      withdraw: number;
      fee: number;
      newUsers: number;
      transactionCount: number;
      transactionValue: number;
      successCount: number;
      failedCount: number;
    }>;
    recentTransactions: Array<Record<string, unknown>>;
  };
}
