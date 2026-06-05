"use client";

import { useState, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, DollarSign, Activity, RefreshCw, FileDown } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminStats } from "@/hooks/useAdminStats";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("vi-VN");
};

type RangeOption = "today" | "7d" | "30d" | "custom";

const RANGE_CONFIG: Record<RangeOption, { label: string }> = {
  today: { label: "Hôm nay" },
  "7d": { label: "7 ngày qua" },
  "30d": { label: "30 ngày qua" },
  custom: { label: "Tùy chỉnh" },
};

export default function ReportsPage() {
  const { showToast } = useAdminStore();
  const { statistics, isLoadingStats, errorStats, fetchStatistics } = useAdminStats();
  const [dateRange, setDateRange] = useState<RangeOption>("30d");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchStatistics({ range: "30d" });
  }, [fetchStatistics]);

  const loadStats = async (range: RangeOption, start?: string, end?: string) => {
    await fetchStatistics({ range, startDate: start, endDate: end });
  };

  const handleApplyRange = async () => {
    if (dateRange === "custom") {
      if (!startDate || !endDate) {
        showToast("Vui lòng chọn ngày bắt đầu và kết thúc.", "error");
        return;
      }
      await loadStats("custom", startDate, endDate);
      return;
    }
    await loadStats(dateRange);
  };

  const handleExportPdf = () => {
    if (!statistics) {
      showToast("Chưa có dữ liệu để xuất PDF.", "error");
      return;
    }

    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    const addSectionTitle = (title: string) => {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 18;
      }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(title, margin, y);
      y += 7;
    };

    const addLine = (label: string, value: string) => {
      if (y > pageHeight - 12) {
        pdf.addPage();
        y = 18;
      }
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      const text = `${label}: ${value}`;
      const lines = pdf.splitTextToSize(text, contentWidth);
      pdf.text(lines, margin, y);
      y += lines.length * 5;
    };

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("E-Wallet Admin Report", margin, y);
    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Generated at: ${formatDateTime(new Date().toISOString())}`, margin, y);
    y += 6;
    pdf.text(`Range: ${formatDateTime(statistics.range.startDate)} - ${formatDateTime(statistics.range.endDate)}`, margin, y);
    y += 10;

    addSectionTitle("User Summary");
    addLine("Total users", String(statistics.totalUsers));
    addLine("Active users", String(statistics.activeUsers));
    addLine("Locked users", String(statistics.lockedUsers));
    addLine("New users in range", String(statistics.newUsersCurrent));
    addLine("New users previous range", String(statistics.newUsersPrevious));

    addSectionTitle("Revenue Summary");
    addLine("Total deposit", formatVND(statistics.totalDeposit));
    addLine("Total withdraw", formatVND(statistics.totalWithdraw));
    addLine("Total fee", formatVND(statistics.totalFee));

    addSectionTitle("Transaction Summary");
    addLine("Total transactions", String(statistics.totalTransactionCount));
    addLine("Total transaction value", formatVND(statistics.totalTransactionValue));
    addLine("Success count", String(statistics.successCount));
    addLine("Failed count", String(statistics.failedCount));
    addLine("Success rate", `${statistics.successRate}%`);
    addLine("Failed rate", `${statistics.failedRate}%`);

    addSectionTitle("Daily Breakdown");
    statistics.dailySeries.forEach((item) => {
      addLine(
        new Date(item.date).toLocaleDateString("vi-VN"),
        `Nap ${formatVND(item.revenue)} | Rut ${formatVND(item.withdraw)} | GD ${item.transactionCount}`
      );
    });

    const safeStart = new Date(statistics.range.startDate).toISOString().slice(0, 10);
    const safeEnd = new Date(statistics.range.endDate).toISOString().slice(0, 10);
    pdf.save(`admin-report-${safeStart}-to-${safeEnd}.pdf`);
    showToast("Xuất file PDF thành công.", "success");
  };

  const chartData = useMemo(() => {
    return (statistics?.dailySeries ?? []).map((item) => ({
      date: new Date(item.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
      revenue: item.revenue,
      withdraw: item.withdraw,
      fee: item.fee,
      newUsers: item.newUsers,
      transactionCount: item.transactionCount,
      transactionValue: item.transactionValue,
      successCount: item.successCount,
      failedCount: item.failedCount,
    }));
  }, [statistics]);

  const userDelta = useMemo(() => {
    if (!statistics) return 0;
    if (statistics.newUsersPrevious === 0) return statistics.newUsersCurrent > 0 ? 100 : 0;
    return ((statistics.newUsersCurrent - statistics.newUsersPrevious) / statistics.newUsersPrevious) * 100;
  }, [statistics]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Báo cáo & Thống kê</h1>
          <p className="text-sm text-slate-400 mt-1">Báo cáo tổng quan doanh thu, người dùng và lưu lượng giao dịch</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleExportPdf}
            disabled={!statistics || isLoadingStats}
            className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
          >
            <FileDown size={14} />
            Xuất PDF
          </button>
          <button
            onClick={handleApplyRange}
            className="h-10 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw size={14} className={isLoadingStats ? "animate-spin" : ""} />
            Làm mới
          </button>
        </div>
      </div>

      {errorStats && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {errorStats}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Khoảng thời gian</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as RangeOption)}
            className="h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200"
          >
            {Object.entries(RANGE_CONFIG).map(([value, cfg]) => (
              <option key={value} value={value}>{cfg.label}</option>
            ))}
          </select>
        </div>

        {dateRange === "custom" && (
          <>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Từ ngày</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Đến ngày</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200"
              />
            </div>
          </>
        )}

        <button
          onClick={handleApplyRange}
          className="h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors"
        >
          Áp dụng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <DollarSign size={18} className="text-emerald-400" />
            <span className="text-xs text-slate-500">Doanh thu</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-400">Tổng tiền nạp</span><span className="text-white font-mono">{formatVND(statistics?.totalDeposit ?? 0)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Tổng tiền rút</span><span className="text-white font-mono">{formatVND(statistics?.totalWithdraw ?? 0)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Phí giao dịch</span><span className="text-white font-mono">{formatVND(statistics?.totalFee ?? 0)}</span></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <Users size={18} className="text-indigo-400" />
            <span className="text-xs text-slate-500">Người dùng mới</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-400">Đăng ký trong kỳ</span><span className="text-white font-mono">{statistics?.newUsersCurrent ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Kỳ trước</span><span className="text-white font-mono">{statistics?.newUsersPrevious ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">So sánh</span><span className={userDelta >= 0 ? "text-emerald-400 font-mono" : "text-rose-400 font-mono"}>{userDelta.toFixed(1)}%</span></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <Activity size={18} className="text-cyan-400" />
            <span className="text-xs text-slate-500">Lưu lượng giao dịch</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-slate-400">Số lượng giao dịch</span><span className="text-white font-mono">{statistics?.totalTransactionCount ?? 0}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Tổng giá trị</span><span className="text-white font-mono">{formatVND(statistics?.totalTransactionValue ?? 0)}</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-400">Tỉ lệ thành công/thất bại</span><span className="text-white font-mono">{statistics?.successRate ?? 0}% / {statistics?.failedRate ?? 0}%</span></div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white">Biểu đồ theo ngày</h2>
            <p className="text-xs text-slate-500 mt-0.5">Hover để xem chi tiết từng ngày</p>
          </div>
          <TrendingUp size={18} className="text-indigo-400" />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Nạp" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="withdraw" name="Rút" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="transactionCount" name="Số GD" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
