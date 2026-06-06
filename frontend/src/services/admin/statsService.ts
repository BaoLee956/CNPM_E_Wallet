// ============================================================
// Admin Statistics Service — API calls for dashboard & reports
// ============================================================

import http from '@/lib/http';
import type { AdminStatisticsResponse } from '@/types/admin/statistics';

export interface GetStatisticsParams {
  range?: 'today' | '7d' | '30d' | 'custom';
  startDate?: string;
  endDate?: string;
}

export const adminStatsService = {
  async getStatistics(params?: GetStatisticsParams) {
    const res = await http.get<AdminStatisticsResponse>('/api/v1/admin/reports/statistics', {
      params: {
        range: params?.range ?? 'today',
        startDate: params?.startDate,
        endDate: params?.endDate,
      },
    });
    return res.data;
  },
};
