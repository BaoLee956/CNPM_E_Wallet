// ============================================================
// Admin Statistics Service — API calls for dashboard & reports
// ============================================================

import http from '@/lib/http';
import type { AdminStatisticsResponse } from '@/types/admin/statistics';

export const adminStatsService = {
  async getStatistics() {
    const res = await http.get<AdminStatisticsResponse>('/api/v1/admin/reports/statistics');
    return res.data;
  },
};
