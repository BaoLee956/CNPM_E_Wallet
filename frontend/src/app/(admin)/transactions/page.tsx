"use client";

import { useState, useMemo } from "react";
import { Search, AlertTriangle, CheckCircle2, Clock, RefreshCw, Ban, Eye, X } from "lucide-react";
import { useAdminStore, type AdminTransaction, type TxStatus } from "@/stores/adminStore";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

const STATUS_CONFIG: Record<TxStatus, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Pending: {
    label: "Pending",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    icon: <Clock size={12} className="animate-pulse" />,
  },
  Timeout: {
    label: "Timeout",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    icon: <AlertTriangle size={12} />,
  },
  Processing: {
    label: "Processing",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    icon: <RefreshCw size={12} className="animate-spin" />,
  },
  Resolved: {
    label: "Resolved",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    icon: <CheckCircle2 size={12} />,
  },
  Refunded: {
    label: "Refunded",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    icon: <Ban size={12} />,
  },
};

function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 }).format(n);
}

function StatusBadge({ status }: { status: TxStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function AuditModal({
  tx,
  onClose,
  onRequestAction,
}: {
  tx: AdminTransaction;
  onClose: () => void;
  onRequestAction: (txId: string, action: "resolve" | "refund") => void;
}) {
  const mockPayload = {
    transaction: {
      txId: tx.txId,
      userId: tx.userId,
      userName: tx.userName,
      amount: tx.amount,
      currency: "VND",
      channel: tx.paymentChannel,
      status: tx.status,
      timestamp: tx.timestamp,
    },
    internalLogs: [
      { time: tx.timestamp, level: "INFO", message: `Transaction ${tx.txId} initiated` },
      { time: tx.timestamp, level: "DEBUG", message: `Validating user ${tx.userId} balance` },
      { time: tx.timestamp, level: tx.status === "Timeout" || tx.status === "Pending" ? "WARN" : "INFO", message: tx.status === "Timeout" ? `Gateway timeout — no response from ${tx.paymentChannel}` : `Request forwarded to ${tx.paymentChannel} API` },
      { time: tx.timestamp, level: tx.status === "Timeout" || tx.status === "Pending" ? "ERROR" : "INFO", message: tx.status === "Timeout" ? "Connection reset by peer after 30s" : `${tx.paymentChannel} responded successfully` },
    ],
    externalResponse: tx.status === "Timeout"
      ? { success: false, error: "504 Gateway Timeout", provider: tx.paymentChannel, rawBody: `{ "code": "TIMEOUT", "message": "Request timed out after 45s" }` }
      : { success: true, code: "00", message: "Approved", refId: `REF-${Math.floor(Math.random() * 900000 + 100000)}` },
  };

  const isActionable = tx.status === "Pending" || tx.status === "Timeout" || tx.status === "Processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Transaction Audit</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{tx.txId}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={tx.status} />
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Amount", value: formatVND(tx.amount) },
              { label: "User", value: tx.userName },
              { label: "Channel", value: tx.paymentChannel },
              { label: "Time", value: tx.timestamp },
            ].map((item) => (
              <div key={item.label} className="bg-slate-800/70 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-slate-200 leading-tight">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Error logs */}
          {tx.errorLogs !== "—" && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-rose-400" />
                <span className="text-xs font-bold text-rose-400">Error / Warning</span>
              </div>
              <p className="text-xs text-rose-300/80 font-mono leading-relaxed">{tx.errorLogs}</p>
            </div>
          )}

          {/* Technical payload */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technical Payload</h3>

            {/* Internal logs */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Internal Logs</span>
              </div>
              <div className="p-4 space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto">
                {mockPayload.internalLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-slate-600 shrink-0">{log.time.split(" ")[1]}</span>
                    <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      log.level === "ERROR" ? "bg-rose-500/20 text-rose-400" :
                      log.level === "WARN" ? "bg-amber-500/20 text-amber-400" :
                      "bg-slate-800 text-slate-400"
                    }`}>{log.level}</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* External API response */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">External API Response</span>
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-300/80 overflow-x-auto leading-relaxed">
                {JSON.stringify(mockPayload.externalResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        {isActionable && (
          <div className="p-6 border-t border-slate-700 bg-slate-900/80 shrink-0">
            <div className="flex gap-3">
              <button
                onClick={() => { onRequestAction(tx.txId, "resolve"); }}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20"
              >
                <CheckCircle2 size={16} />
                Force Success / Re-sync
              </button>
              <button
                onClick={() => { onRequestAction(tx.txId, "refund"); }}
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/20"
              >
                <Ban size={16} />
                Refund / Cancel
              </button>
            </div>
          </div>
        )}
        {!isActionable && (
          <div className="p-6 border-t border-slate-700 bg-slate-900/80 shrink-0">
            <button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { transactions, resolveTransaction } = useAdminStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TxStatus | "All">("All");
  const [selectedTx, setSelectedTx] = useState<AdminTransaction | null>(null);
  const [pendingAction, setPendingAction] = useState<{ txId: string; action: "resolve" | "refund"; txName: string } | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        !search ||
        tx.txId.toLowerCase().includes(search.toLowerCase()) ||
        tx.userId.toLowerCase().includes(search.toLowerCase()) ||
        tx.userName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || tx.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [transactions, search, statusFilter]);

  const counts = useMemo(() => ({
    pending: transactions.filter((t) => t.status === "Pending").length,
    timeout: transactions.filter((t) => t.status === "Timeout").length,
    processing: transactions.filter((t) => t.status === "Processing").length,
    resolved: transactions.filter((t) => t.status === "Resolved").length,
  }), [transactions]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Transaction Audit</h1>
        <p className="text-sm text-slate-400 mt-1">
          Track and resolve stuck, pending, or timed-out transactions
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: counts.pending, icon: <Clock size={20} />, color: "amber", border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", pulse: true },
          { label: "Timeout", value: counts.timeout, icon: <AlertTriangle size={20} />, color: "rose", border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", pulse: false },
          { label: "Processing", value: counts.processing, icon: <RefreshCw size={20} />, color: "blue", border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", pulse: false },
          { label: "Avg Resolution", value: "4.2 min", icon: <CheckCircle2 size={20} />, color: "emerald", border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", pulse: false },
        ].map((card) => (
          <div key={card.label} className={`relative overflow-hidden rounded-2xl border ${card.border} ${card.bg} p-5`}>
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-10 bg-current" />
            <div className="flex items-center justify-between mb-3">
              <span className={`${card.text} ${card.pulse ? "animate-pulse" : ""}`}>{card.icon}</span>
            </div>
            <p className={`text-3xl font-bold font-mono ${card.text}`}>{card.value}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by TxID, User ID, name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["All", "Pending", "Timeout", "Processing", "Resolved", "Refunded"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={[
                "h-9 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 whitespace-nowrap",
                statusFilter === s
                  ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {["TxID", "Time", "User", "Amount", "Channel", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-slate-500 text-sm">
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => {
                  const actionable = tx.status === "Pending" || tx.status === "Timeout" || tx.status === "Processing";
                  return (
                    <tr key={tx.txId} className={[
                      "transition-colors group",
                      tx.status === "Pending" ? "bg-amber-500/5 hover:bg-amber-500/10" :
                      tx.status === "Timeout" ? "bg-rose-500/5 hover:bg-rose-500/10" :
                      tx.status === "Processing" ? "bg-blue-500/5 hover:bg-blue-500/10" :
                      "hover:bg-slate-800/50",
                    ].join(" ")}>
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono font-semibold text-slate-200">{tx.txId}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400 whitespace-nowrap">{tx.timestamp}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-semibold text-slate-200">{tx.userName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{tx.userId}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-mono font-bold text-white">{formatVND(tx.amount)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">{tx.paymentChannel}</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className={[
                            "flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold border transition-all duration-150",
                            actionable
                              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/30"
                              : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700",
                          ].join(" ")}
                        >
                          <Eye size={12} />
                          Investigate
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800">
            <p className="text-xs text-slate-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                ‹
              </button>
              {Array.from({ length: Math.ceil(filtered.length / PAGE_SIZE) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={[
                    "h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold border transition-colors",
                    p === page
                      ? "bg-indigo-600 border-indigo-500/50 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700",
                  ].join(" ")}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(Math.ceil(filtered.length / PAGE_SIZE), p + 1))}
                disabled={page === Math.ceil(filtered.length / PAGE_SIZE)}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audit Modal */}
      {selectedTx && (
        <AuditModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
          onRequestAction={(txId, action) => {
            const tx = transactions.find((t) => t.txId === txId);
            setPendingAction({ txId, action, txName: tx?.userName ?? txId });
          }}
        />
      )}

      {/* Force Success / Refund Confirmation */}
      {pendingAction && (
        <ConfirmDialog
          open
          title={pendingAction.action === "resolve" ? "Force Success" : "Refund Transaction"}
          message={
            pendingAction.action === "resolve"
              ? `This will mark transaction "${pendingAction.txId}" as successfully completed. Use this only if you have confirmed with the payment gateway that the transaction succeeded but was not synced.`
              : `This will refund and cancel transaction "${pendingAction.txId}". The amount will be returned to the user's wallet. This action cannot be undone.`
          }
          confirmLabel={pendingAction.action === "resolve" ? "Force Success" : "Refund"}
          variant={pendingAction.action === "resolve" ? "warning" : "danger"}
          onConfirm={() => {
            resolveTransaction(
              pendingAction.txId,
              pendingAction.action === "resolve" ? "Resolved" : "Refunded"
            );
            setPendingAction(null);
            setSelectedTx(null);
          }}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}
