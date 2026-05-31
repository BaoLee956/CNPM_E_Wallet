// components/history/TransactionTable.tsx
"use client";

import { Table, Badge } from "@/components/ui";
import type { Column } from "@/components/ui/Table";
import type { Transaction } from "@/models/transaction";
import { TransactionType, TransactionStatus } from "@/models/common";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet } from "lucide-react";

interface TransactionTableProps {
  data: Transaction[];
  loading?: boolean;
  onRowClick?: (transaction: Transaction) => void;
}

const TYPE_LABELS: Partial<Record<TransactionType, string>> = {
  [TransactionType.TRANSFER]: "Send",
  [TransactionType.DEPOSIT]: "Receive",
  [TransactionType.PAYMENT]: "Payment",
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed",
};

const getTypeIcon = (type: TransactionType) => {
  switch (type) {
    case TransactionType.TRANSFER:
      return <ArrowUpRight size={14} className="text-danger" />;
    case TransactionType.DEPOSIT:
      return <ArrowDownLeft size={14} className="text-success" />;
    case TransactionType.PAYMENT:
      return <CreditCard size={14} className="text-warning" />;
    default:
      return null;
  }
};

const getStatusVariant = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.SUCCESS:
      return "success";
    case TransactionStatus.PENDING:
      return "warning";
    case TransactionStatus.FAILED:
      return "danger";
    default:
      return "default";
  }
};

const columns: Column<Transaction>[] = [
  {
    key: "type",
    header: "Type",
    accessor: (row) => (
      <div className="flex items-center gap-1.5">
        {getTypeIcon(row.type)}
        <span className="text-sm">{TYPE_LABELS[row.type] ?? row.type}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    accessor: (row) => {
      const isNegative = row.type === TransactionType.TRANSFER || row.type === TransactionType.PAYMENT;
      const color = isNegative ? "text-danger" : "text-success";
      const sign = isNegative ? "-" : "+";
      return (
        <span className={`font-mono font-medium ${color}`}>
          {sign} {row.amount.toLocaleString()} {row.currency}
        </span>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    accessor: (row) => {
      return (
        <Badge variant={getStatusVariant(row.status)} size="sm">
          {STATUS_LABELS[row.status] ?? row.status}
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

export function TransactionTable({
  data,
  loading = false,
  onRowClick,
}: TransactionTableProps) {
  return (
    <Table
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      loading={loading}
      emptyMessage="No transactions found"
      onRowClick={onRowClick}
      stickyHeader={false}
    />
  );
}
