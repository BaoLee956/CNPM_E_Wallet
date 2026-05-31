"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Download, TrendingUp, Users, DollarSign, Activity, Calendar, ChevronDown, RefreshCw } from "lucide-react";
import { YEAR_DATA, DAILY_TARGET, useAdminStore } from "@/stores/adminStore";
import { jsPDF } from "jspdf";

const formatVND = (n: number) =>
  n >= 1_000_000
    ? `₫${(n / 1_000_000).toFixed(1)}M`
    : `₫${n.toLocaleString("vi-VN")}`;

// Determine aggregation strategy from date range
function getAggregation(range: string): "day" | "week" | "month" {
  if (range === "7d") return "day";
  if (range === "30d") return "day";
  if (range === "90d") return "week";
  if (range === "1y") return "month";
  return "day";
}

type RangeOption = "7d" | "30d" | "90d" | "1y";

const RANGE_CONFIG: Record<RangeOption, { label: string; slice: number; agg: "day" | "week" | "month" }> = {
  "7d":  { label: "Last 7 days",  slice: 7,   agg: "day"   },
  "30d": { label: "Last 30 days", slice: 30,  agg: "day"   },
  "90d": { label: "Last 90 days", slice: 90,  agg: "week"  },
  "1y":  { label: "This Year",    slice: 365, agg: "month" },
};

// Aggregate daily data into week/month buckets
type AggEntry = { label: string; revenue: number; transactions: number; newUsers: number; gtv: number };

function aggregateData(data: typeof YEAR_DATA, agg: "day" | "week" | "month"): AggEntry[] {
  if (agg === "day") {
    return data.map((d) => ({
      label: `${d.dayLabel} ${d.date}`,
      revenue: d.revenue,
      transactions: d.transactions,
      newUsers: d.newUsers,
      gtv: d.gtv,
    }));
  }

  if (agg === "week") {
    // Group every 7 days
    const buckets: AggEntry[] = [];
    for (let i = 0; i < data.length; i += 7) {
      const chunk = data.slice(i, i + 7);
      if (chunk.length === 0) continue;
      const weekStart = chunk[0].date;
      const weekEnd = chunk[chunk.length - 1].date;
      buckets.push({
        label: `${weekStart}–${weekEnd}`,
        revenue: chunk.reduce((s, d) => s + d.revenue, 0),
        transactions: chunk.reduce((s, d) => s + d.transactions, 0),
        newUsers: chunk.reduce((s, d) => s + d.newUsers, 0),
        gtv: chunk.reduce((s, d) => s + d.gtv, 0),
      });
    }
    return buckets;
  }

  // agg === "month": group by calendar month
  const buckets: Record<string, AggEntry> = {};
  data.forEach((d) => {
    const monthKey = d.date.split("/")[1] + "/" + d.date.split("/")[2]; // "MM/YYYY"
    if (!buckets[monthKey]) {
      buckets[monthKey] = { label: monthKey, revenue: 0, transactions: 0, newUsers: 0, gtv: 0 };
    }
    buckets[monthKey].revenue += d.revenue;
    buckets[monthKey].transactions += d.transactions;
    buckets[monthKey].newUsers += d.newUsers;
    buckets[monthKey].gtv += d.gtv;
  });
  return Object.values(buckets);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1.5 font-semibold">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.name === "Revenue" || p.name === "GTV" ? formatVND(p.value) : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function CircularGauge({ value, label }: { value: number; label: string }) {
  const circumference = 2 * Math.PI * 48;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = value >= 100 ? "#10b981" : value >= 80 ? "#3b82f6" : "#f59e0b";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg width="112" height="112" className="-rotate-90">
          <circle cx="56" cy="56" r="48" fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="56"
            cy="56"
            r="48"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-white">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 font-medium text-center">{label}</span>
    </div>
  );
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<RangeOption>("7d");
  const [category, setCategory] = useState("revenue");
  const [format, setFormat] = useState<"CSV" | "PDF">("CSV");
  const { transactions, showToast } = useAdminStore();
  const [loading, setLoading] = useState(false);

  const { label: rangeLabel, slice, agg } = RANGE_CONFIG[dateRange];

  // Slice + aggregate data for charts
  const chartData = useMemo(() => {
    const sliced = YEAR_DATA.slice(-slice);
    return aggregateData(sliced, agg);
  }, [dateRange]);

  // KPI cards: always use last 7 days vs previous 7 days
  const kpiData = useMemo(() => {
    const last7 = YEAR_DATA.slice(-7);
    const prev7 = YEAR_DATA.slice(-14, -7);
    const sum = (arr: typeof YEAR_DATA, key: keyof DailyEntry) =>
      arr.reduce((s, d) => s + d[key], 0);

    const revToday = sum(last7, "revenue");
    const revPrev = sum(prev7, "revenue");
    const usersToday = sum(last7, "newUsers");
    const usersPrev = sum(prev7, "newUsers");
    const revPct = ((revToday - revPrev) / revPrev) * 100;
    const usersPct = ((usersToday - usersPrev) / usersPrev) * 100;
    const totalGtv = sum(last7, "gtv");
    const totalTx = sum(last7, "transactions");
    const successRate = ((sum(last7, "transactions") - Math.round(sum(last7, "transactions") * 0.008)) / sum(last7, "transactions")) * 100;

    return { revToday, revPrev, revPct, usersToday, usersPrev, usersPct, totalGtv, totalTx, successRate };
  }, []);

  // Today-only gauge (always from last day vs daily target)
  const todayEntry = YEAR_DATA[YEAR_DATA.length - 1];
  const todayTargetPct = Math.round((todayEntry.revenue / DAILY_TARGET) * 100);

  const handleExport = async () => {
    setLoading(true);

    // Build rows first — used by both CSV and PDF
    const rows: string[][] = [];
    if (category === "revenue") {
      rows.push(["Period", "Revenue (VND)", "Transactions", "Avg Transaction (VND)"]);
      chartData.forEach((d) => {
        rows.push([d.label, d.revenue.toString(), d.transactions.toString(), Math.round(d.revenue / d.transactions).toString()]);
      });
      const totalRevenue = chartData.reduce((s, d) => s + d.revenue, 0);
      const totalTx = chartData.reduce((s, d) => s + d.transactions, 0);
      rows.push(["TOTAL", totalRevenue.toString(), totalTx.toString(), Math.round(totalRevenue / totalTx).toString()]);
    } else if (category === "users") {
      rows.push(["Period", "New Users", "GTV (VND)"]);
      chartData.forEach((d) => {
        rows.push([d.label, d.newUsers.toString(), d.gtv.toString()]);
      });
    } else if (category === "traffic") {
      rows.push(["Period", "New Users", "GTV (VND)", "Revenue (VND)"]);
      chartData.forEach((d) => {
        rows.push([d.label, d.newUsers.toString(), d.gtv.toString(), d.revenue.toString()]);
      });
    } else if (category === "transactions") {
      rows.push(["TxID", "Timestamp", "User ID", "User Name", "Amount (VND)", "Channel", "Status"]);
      transactions.forEach((tx) => {
        rows.push([tx.txId, tx.timestamp, tx.userId, tx.userName, tx.amount.toString(), tx.paymentChannel, tx.status]);
      });
    }

    await new Promise((r) => setTimeout(r, 1200));

    if (format === "PDF") {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();

      // Header bar
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, pageW, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`E-Wallet — ${category.toUpperCase()} Report`, 14, 13);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageW - 14, 13, { align: "right" });

      // Column widths
      const colWidths = rows[0].map(() => (pageW - 28) / rows[0].length);
      let y = 28;

      // Column headers row
      doc.setFillColor(51, 55, 65);
      doc.rect(14, y - 5, pageW - 28, 8, "F");
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      let x = 14;
      rows[0].forEach((col, i) => {
        doc.text(col, x + colWidths[i] / 2, y, { align: "center" });
        x += colWidths[i];
      });

      // Data rows
      y += 8;
      doc.setFont("helvetica", "normal");
      rows.slice(1).forEach((row, rowIdx) => {
        if (rowIdx % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, y - 4.5, pageW - 28, 7, "F");
        }
        x = 14;
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(8);
        row.forEach((cell, i) => {
          const cellStr = String(cell).length > 20 ? String(cell).slice(0, 18) + "…" : String(cell);
          doc.text(cellStr, x + 2, y);
          x += colWidths[i];
        });
        y += 7;
        if (y > doc.internal.pageSize.getHeight() - 15) {
          doc.addPage();
          y = 15;
        }
      });

      // Page number footer
      const pageCount = doc.getNumberOfPages();
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${p} of ${pageCount}`, pageW / 2, doc.internal.pageSize.getHeight() - 8, { align: "center" });
      }

      const dateStr = new Date().toISOString().split("T")[0];
      doc.save(`ewallet_${category}_report_${dateStr}.pdf`);
      setLoading(false);
      showToast(`"ewallet_${category}_report_${dateStr}.pdf" downloaded successfully.`, "success");
      return;
    }

    // Convert to CSV
    const csv = rows
      .map((row) =>
        row.map((cell) => {
          const s = String(cell);
          return s.includes(",") || s.includes('"') || s.includes("\n")
            ? `"${s.replace(/"/g, '""')}"`
            : s;
        }).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `ewallet_${category}_report_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setLoading(false);
    showToast(`"ewallet_${category}_report_${dateStr}.csv" downloaded successfully.`, "success");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Statistics</h1>
          <p className="text-sm text-slate-400 mt-1">Operational financial dashboards and data exports</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
            <Activity size={12} className="animate-pulse" />
            Live data
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Revenue (7d)",
            value: formatVND(kpiData.revToday),
            sub: `vs prev 7d (${formatVND(kpiData.revPrev)})`,
            pct: kpiData.revPct,
            icon: <DollarSign size={20} />,
            border: "border-emerald-500/30",
            iconBg: "bg-emerald-500/20",
            iconColor: "text-emerald-400",
          },
          {
            label: "New Users (7d)",
            value: kpiData.usersToday.toLocaleString(),
            sub: `vs prev 7d (${kpiData.usersPrev.toLocaleString()})`,
            pct: kpiData.usersPct,
            icon: <Users size={20} />,
            border: "border-indigo-500/30",
            iconBg: "bg-indigo-500/20",
            iconColor: "text-indigo-400",
          },
          {
            label: "GTV (7d)",
            value: formatVND(kpiData.totalGtv),
            sub: `${kpiData.totalTx.toLocaleString()} transactions`,
            pct: null,
            icon: <TrendingUp size={20} />,
            border: "border-cyan-500/30",
            iconBg: "bg-cyan-500/20",
            iconColor: "text-cyan-400",
          },
          {
            label: "Success Rate",
            value: `${kpiData.successRate.toFixed(1)}%`,
            sub: "Across all channels",
            pct: null,
            icon: <Activity size={20} />,
            border: "border-violet-500/30",
            iconBg: "bg-violet-500/20",
            iconColor: "text-violet-400",
          },
        ].map((kpi) => (
          <div key={kpi.label} className={`bg-slate-900 border ${kpi.border} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`flex items-center justify-center h-10 w-10 rounded-xl ${kpi.iconBg}`}>
                <span className={kpi.iconColor}>{kpi.icon}</span>
              </span>
              {kpi.pct !== null && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  kpi.pct >= 0
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                    : "text-rose-400 bg-rose-500/10 border-rose-500/30"
                }`}>
                  {kpi.pct >= 0 ? "↑" : "↓"} {Math.abs(Math.round(kpi.pct))}%
                </span>
              )}
            </div>
            <p className="text-2xl font-bold font-mono text-white mb-0.5">{kpi.value}</p>
            <p className="text-xs text-slate-400 font-medium">{kpi.label}</p>
            <p className="text-[10px] text-slate-600 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Revenue Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">{rangeLabel} — in VND</p>
            </div>
            {/* Date range selector */}
            <div className="flex items-center gap-1.5">
              {(Object.keys(RANGE_CONFIG) as RangeOption[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={[
                    "h-7 px-2.5 text-[10px] font-semibold rounded-lg border transition-all",
                    dateRange === r
                      ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
                      : "bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300",
                  ].join(" ")}
                >
                  {RANGE_CONFIG[r].label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatVND(v)}
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#revGradient)"
                name="Revenue"
                dot={{ fill: "#6366f1", r: 3 }}
                activeDot={{ r: 5, fill: "#818cf8" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily target gauge */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
          <div className="self-start mb-4">
            <h3 className="text-sm font-bold text-white">Daily Target</h3>
            <p className="text-xs text-slate-500 mt-0.5">Today · {formatVND(todayEntry.revenue)} / {formatVND(DAILY_TARGET)}</p>
          </div>
          <CircularGauge value={todayTargetPct} label="Target Achievement" />
          <div className="w-full mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Target</span>
              <span className="font-mono font-semibold text-slate-300">{formatVND(DAILY_TARGET)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Achieved</span>
              <span className="font-mono font-semibold text-emerald-400">{formatVND(todayEntry.revenue)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Remaining</span>
              <span className="font-mono font-semibold text-amber-400">
                {formatVND(Math.max(0, DAILY_TARGET - todayEntry.revenue))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User growth + volume chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">User Growth</h3>
              <p className="text-xs text-slate-500 mt-0.5">New registrations — {rangeLabel}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="newUsers" name="New Users" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === chartData.length - 1 ? "#6366f1" : "#6366f180"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Daily GTV</h3>
              <p className="text-xs text-slate-500 mt-0.5">Gross transaction volume — {rangeLabel}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => formatVND(v)}
                tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="gtv" name="GTV" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === chartData.length - 1 ? "#06b6d4" : "#06b6d480"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export control panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-1">Export Report</h3>
        <p className="text-xs text-slate-500 mb-5">Download operational reports for analysis and compliance</p>

        <div className="flex flex-wrap items-end gap-4">
          {/* Date range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Date Range
            </label>
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-9 pr-8 h-10 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">This Year</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Report Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 px-3 pr-8 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
              >
                <option value="revenue">Revenue Report</option>
                <option value="users">User Registration</option>
                <option value="transactions">Transaction Volume</option>
                <option value="traffic">Traffic Logs</option>
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Format */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Format
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-700">
              {(["CSV", "PDF"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={[
                    "h-10 px-4 text-xs font-semibold transition-all",
                    format === f
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Download button */}
          <button
            onClick={() => handleExport(showToast)}
            disabled={loading}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 disabled:shadow-none"
          >
            {loading ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Download size={15} />
            )}
            {loading ? "Generating..." : "Download Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
