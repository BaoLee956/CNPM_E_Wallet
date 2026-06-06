"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, AlertTriangle, CheckCircle2, Clock, Ban, Eye, X } from "lucide-react";
import { type AdminTransaction, type TxStatus } from "@/stores/adminStore";
import { useAdminTransactions } from "@/hooks/useAdminTransactions";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 rounded bg-slate-800 w-full max-w-[100px]" />
        </td>
      ))}
    </tr>
  );
}

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
  const canResolve = tx.status === "Pending" || tx.status === "Timeout";
  const canRefund = tx.status === "Resolved" || tx.status === "Timeout";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Chi tiết giao dịch</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{tx.txId}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={tx.status} />
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Mã giao dịch", value: tx.txId },
              { label: "Người thực hiện", value: tx.userName },
              { label: "Số tiền", value: formatVND(tx.amount) },
              { label: "Loại giao dịch", value: tx.type },
              { label: "Thời gian tạo", value: tx.timestamp },
              { label: "Mã tham chiếu", value: tx.referenceCode },
              { label: "Ví nguồn", value: tx.fromWalletId },
              { label: "Ví đích", value: tx.toWalletId },
            ].map((item) => (
              <div key={item.label} className="bg-slate-800/70 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-slate-200 leading-tight break-all">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/70 rounded-xl p-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">Thông tin gửi / nhận</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3"><span className="text-slate-400">Người gửi</span><span className="text-slate-200">{tx.senderName}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="text-slate-400">Người nhận</span><span className="text-slate-200">{tx.recipientName}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="text-slate-400">Tài khoản ví</span><span className="text-slate-200 font-mono">{tx.walletAccountNumber}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="text-slate-400">Mô tả</span><span className="text-slate-200 text-right">{tx.description}</span></div>
              </div>
            </div>

            <div className="bg-slate-800/70 rounded-xl p-4">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">Thông báo lỗi hệ thống</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{tx.errorLogs}</p>
            </div>
          </div>

          <div className="bg-slate-800/70 rounded-xl p-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Log xử lý từng bước</h3>
            <div className="space-y-2">
              {tx.processingLogs.map((log, index) => (
                <div key={`${log}-${index}`} className="text-sm text-slate-300 border-l-2 border-emerald-500/40 pl-3 py-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {(canResolve || canRefund) ? (
          <div className="p-6 border-t border-slate-700 bg-slate-900/80 shrink-0">
            <div className="flex gap-3">
              {canResolve && (
                <button
                  onClick={() => onRequestAction(tx.originalId, "resolve")}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle2 size={16} />
                  Đánh dấu đã xử lý
                </button>
              )}
              {canRefund && (
                <button
                  onClick={() => onRequestAction(tx.originalId, "refund")}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-rose-600/20"
                >
                  <Ban size={16} />
                  Hoàn tiền
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 border-t border-slate-700 bg-slate-900/80 shrink-0">
            <button onClick={onClose} className="w-full h-11 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors">
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { transactions, transactionsTotal, transactionsPage, transactionsTotalPages, isLoadingTransactions, errorTransactions } = useAdminTransactions();
  const { fetchTransactions, refundTransaction, resolveTransaction } = useAdminTransactions();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TxStatus | "All">("All");
  const [selectedTx, setSelectedTx] = useState<AdminTransaction | null>(null);
  const [pendingAction, setPendingAction] = useState<{ txId: string; action: "resolve" | "refund"; txName: string } | null>(null);

  const loadTransactions = useCallback((page: number, nextStatus = statusFilter, nextSearch = search) => {
    const beStatus = nextStatus === "All" ? undefined : mapFilterStatus(nextStatus);
    fetchTransactions({ page, limit: 20, status: beStatus, search: nextSearch || undefined });
  }, [fetchTransactions, search, statusFilter]);

  useEffect(() => {
    loadTransactions(1);
  }, [loadTransactions]);

  const handleStatusFilter = useCallback((s: TxStatus | "All") => {
    setStatusFilter(s);
    loadTransactions(1, s, search);
  }, [loadTransactions, search]);

  const handlePageChange = useCallback((p: number) => {
    loadTransactions(p);
  }, [loadTransactions]);

  const filtered = useMemo(() => transactions, [transactions]);

  const counts = useMemo(() => ({
    pending: transactions.filter((t) => t.status === "Pending").length,
    timeout: transactions.filter((t) => t.status === "Timeout").length,
    resolved: transactions.filter((t) => t.status === "Resolved").length,
    refunded: transactions.filter((t) => t.status === "Refunded").length,
  }), [transactions]);

  const handleConfirmAction = async (reason?: string) => {
    if (!pendingAction) return;
    const ok = pendingAction.action === "resolve"
      ? await resolveTransaction(pendingAction.txId)
      : await refundTransaction(pendingAction.txId, reason || "Refunded by admin");

    if (ok) {
      setPendingAction(null);
      setSelectedTx(null);
      loadTransactions(transactionsPage);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Quản lý giao dịch</h1>
        <p className="text-sm text-slate-400 mt-1">
          Tra soát giao dịch bất thường, xem chi tiết và hoàn tiền khi cần thiết
        </p>
      </div>

      {errorTransactions && (
        <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl px-5 py-4">
          <AlertTriangle size={16} className="text-rose-400 shrink-0" />
          <p className="text-sm text-rose-400">{errorTransactions}</p>
          <button onClick={() => loadTransactions(1)} className="ml-auto text-xs text-rose-400 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: counts.pending, icon: <Clock size={20} />, border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", pulse: true },
          { label: "Timeout", value: counts.timeout, icon: <AlertTriangle size={20} />, border: "border-rose-500/30", bg: "bg-rose-500/10", text: "text-rose-400", pulse: false },
          { label: "Refunded", value: counts.refunded, icon: <Ban size={20} />, border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", pulse: false },
          { label: "Matched Transactions", value: transactionsTotal, icon: <CheckCircle2 size={20} />, border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", pulse: false },
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

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by TxID, User ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadTransactions(1, statusFilter, search);
            }}
            className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
        <button onClick={() => loadTransactions(1, statusFilter, search)} className="h-10 px-4 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors">
          Search
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          {(["All", "Pending", "Timeout", "Resolved", "Refunded"] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusFilter(s)}
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

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {["TxID", "User", "Amount", "Type", "Time", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoadingTransactions ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-slate-500 text-sm">
                    {errorTransactions ? "Failed to load transactions." : "No transactions match your filters."}
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  const actionable = tx.status === "Pending" || tx.status === "Timeout" || tx.status === "Resolved";
                  return (
                    <tr key={tx.originalId} className={[
                      "transition-colors group",
                      tx.status === "Pending" ? "bg-amber-500/5 hover:bg-amber-500/10" :
                      tx.status === "Timeout" ? "bg-rose-500/5 hover:bg-rose-500/10" :
                      "hover:bg-slate-800/50",
                    ].join(" ")}>
                      <td className="px-5 py-4"><span className="text-xs font-mono font-semibold text-slate-200">{tx.txId.slice(0, 16)}...</span></td>
                      <td className="px-5 py-4"><p className="text-xs font-semibold text-slate-200">{tx.userName}</p><p className="text-[10px] text-slate-500 font-mono">{tx.userId}</p></td>
                      <td className="px-5 py-4"><span className="text-sm font-mono font-bold text-white">{formatVND(tx.amount)}</span></td>
                      <td className="px-5 py-4"><span className="text-xs text-slate-400 capitalize">{tx.type}</span></td>
                      <td className="px-5 py-4"><span className="text-xs text-slate-400 whitespace-nowrap">{tx.timestamp}</span></td>
                      <td className="px-5 py-4"><StatusBadge status={tx.status} /></td>
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

        {transactionsTotalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800">
            <p className="text-xs text-slate-500">
              Showing {(transactionsPage - 1) * 20 + 1}–{Math.min(transactionsPage * 20, transactionsTotal)} of {transactionsTotal}
            </p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => handlePageChange(transactionsPage - 1)} disabled={transactionsPage === 1} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors">‹</button>
              {Array.from({ length: Math.min(5, transactionsTotalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(transactionsPage - 2, transactionsTotalPages - 4)) + i;
                return (
                  <button key={p} onClick={() => handlePageChange(p)} className={[
                    "h-8 w-8 flex items-center justify-center rounded-lg text-xs font-semibold border transition-colors",
                    p === transactionsPage ? "bg-indigo-600 border-indigo-500/50 text-white" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700",
                  ].join(" ")}>{p}</button>
                );
              })}
              <button onClick={() => handlePageChange(transactionsPage + 1)} disabled={transactionsPage >= transactionsTotalPages} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 transition-colors">›</button>
            </div>
          </div>
        )}
      </div>

      {selectedTx && (
        <AuditModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
          onRequestAction={(txId, action) => {
            setPendingAction({ txId, action, txName: selectedTx.userName });
          }}
        />
      )}

      {pendingAction && (
        <ConfirmDialog
          open
          title={pendingAction.action === "resolve" ? "Đánh dấu giao dịch đã xử lý" : "Hoàn tiền giao dịch"}
          message={
            pendingAction.action === "resolve"
              ? `Xác nhận đánh dấu giao dịch "${pendingAction.txId.slice(0, 16)}..." đã được xử lý.`
              : `Nhập lý do hoàn tiền cho giao dịch "${pendingAction.txId.slice(0, 16)}...".`
          }
          confirmLabel={pendingAction.action === "resolve" ? "Xác nhận" : "Xác nhận Hoàn tiền"}
          variant={pendingAction.action === "resolve" ? "warning" : "danger"}
          reasonRequired={pendingAction.action === "refund"}
          reasonLabel="Lý do hoàn tiền"
          reasonPlaceholder="Ví dụ: Đã trừ tiền nhưng dịch vụ không cung cấp thành công"
          onConfirm={handleConfirmAction}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}

function mapFilterStatus(s: TxStatus): string {
  switch (s) {
    case "Pending": return "pending";
    case "Resolved": return "success";
    case "Timeout": return "failed";
    case "Refunded": return "refunded";
    default: return "pending";
  }
}
