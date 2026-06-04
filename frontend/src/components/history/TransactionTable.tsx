// components/history/TransactionTable.tsx
"use client";

import { Table, Badge } from "@/components/ui";
import type { Column } from "@/components/ui/Table";
import type { Transaction } from "@/models/transaction";
import { TransactionType, TransactionStatus } from "@/models/common";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Banknote,
} from "lucide-react";

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
  if (tx.type === "withdraw" || tx.type === "WITHDRAW") return "withdraw";
  return tx.type as string;
}

const TYPE_LABELS: Partial<Record<TransactionType, string>> = {
  [TransactionType.TRANSFER]: "Send",
  [TransactionType.DEPOSIT]: "Receive",
  [TransactionType.PAYMENT]: "Payment",
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "send":
      return <ArrowUpRight size={14} className="text-danger" />;
    case "receive":
      return <ArrowDownLeft size={14} className="text-success" />;
    case "topup":
      return <ArrowDownLeft size={14} className="text-success" />;
    case "payment":
      return <CreditCard size={14} className="text-warning" />;
    case "withdraw":
      return <Banknote size={14} className="text-danger" />;
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
    withdraw: "Withdraw",
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
        const isNegative =
          displayType === "send" ||
          displayType === "payment" ||
          displayType === "withdraw";
        return (
          <span
            className={`whitespace-nowrap font-mono font-medium ${isNegative ? "text-danger" : "text-success"}`}
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
        const labelMap: Record<string, string> = {
          completed: "Completed",
          success: "Completed",
          pending: "Pending",
          failed: "Failed",
        };
        return (
          <Badge
            variant={variantMap[row.status as string] ?? "default"}
            size="sm"
          >
            {labelMap[row.status as string] ?? row.status}
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
