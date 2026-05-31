// components/history/TransactionTable.tsx
"use client";

import { Table, Badge } from "@/components/ui";
import type { Column } from "@/components/ui/Table";
import type { Transaction } from "@/models/transaction";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet } from "lucide-react";

interface TransactionTableProps {
  data: Transaction[];
  loading?: boolean;
  onRowClick?: (transaction: Transaction) => void;
  currentWalletId?: string;
}

function getDisplayType(tx: Transaction, currentWalletId?: string): string {
  if (tx.type === "transfer" || tx.type === "TRANSFER") {
    return tx.fromWalletId === currentWalletId ? "send" : "receive";
  }
  if (tx.type === "deposit" || tx.type === "DEPOSIT") return "topup";
  if (tx.type === "payment" || tx.type === "PAYMENT") return "payment";
  return tx.type as string;
}

const getTypeIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "send":
      return <ArrowUpRight size={14} className="text-danger" />;
    case "receive":
      return <ArrowDownLeft size={14} className="text-success" />;
    case "topup":
      return <Wallet size={14} className="text-info" />;
    case "payment":
      return <CreditCard size={14} className="text-warning" />;
    default:
      return null;
  }
};

const getTypeLabel = (displayType: string) => {
  const map: Record<string, string> = {
    send: "Send",
    receive: "Receive",
    topup: "Topup",
    payment: "Payment",
  };
  return map[displayType] ?? displayType;
};

function buildColumns(currentWalletId?: string): Column<Transaction>[] {
  return [
    {
      key: "type",
      header: "Type",
      accessor: (row) => {
        const displayType = getDisplayType(row, currentWalletId);
        return (
          <div className="flex items-center gap-1.5">
            {getTypeIcon(displayType)}
            <span className="text-sm">{getTypeLabel(displayType)}</span>
          </div>
        );
      },
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      accessor: (row) => {
        const displayType = getDisplayType(row, currentWalletId);
        const isNegative = displayType === "send" || displayType === "payment";
        return (
          <span
            className={`font-mono font-medium ${isNegative ? "text-danger" : "text-success"}`}
          >
            {isNegative ? "−" : "+"} {row.amount.toLocaleString()}{" "}
            {row.currency}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      accessor: (row) => {
        const variantMap: Record<
          string,
          "success" | "warning" | "danger" | "default"
        > = {
          completed: "success",
          success: "success",
          pending: "warning",
          failed: "danger",
        };
        return (
          <Badge
            variant={variantMap[row.status as string] ?? "default"}
            size="sm"
          >
            {row.status as string}
          </Badge>
        );
      },
    },
    {
      key: "description",
      header: "Description",
      accessor: (row) => (
        <div className="max-w-45 truncate text-sm" title={row.description}>
          {row.description || "—"}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      align: "right",
      accessor: (row) => {
        const date = new Date(row.createdAt);
        return (
          <span className="text-xs text-secondary whitespace-nowrap">
            {date.toLocaleDateString("vi-VN")}{" "}
            {date.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
  ];
}

export function TransactionTable({
  data,
  loading = false,
  onRowClick,
  currentWalletId,
}: TransactionTableProps) {
  return (
    <Table
      columns={buildColumns(currentWalletId)}
      data={data}
      keyExtractor={(row) => row.id}
      loading={loading}
      emptyMessage="No transactions found"
      onRowClick={onRowClick}
      stickyHeader={false}
    />
  );
}
