// ============================================================
// Admin Statistics Types — BE response shapes
// ============================================================

export interface AdminStatisticsResponse {
  message: string;
  data: {
    users: {
      total: number;
      newToday: number;
      newThisMonth: number;
    };
    transactions: {
      total: number;
      today: number;
      pending: number;
    };
    revenue: {
      totalAmount: number;
      totalFee: number;
      todayAmount: number;
      todayFee: number;
    };
  };
}
