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

const getTypeLabel = (type: Transaction["type"]) => {
  const map = {
    send: "Send",
    receive: "Receive",
    topup: "Topup",
    payment: "Payment",
  };
  return map[type] || type;
};

const columns: Column<Transaction>[] = [
  {
    key: "type",
    header: "Type",
    accessor: (row) => (
      <div className="flex items-center gap-1.5">
        {getTypeIcon(row.type)}
        <span className="text-sm">{getTypeLabel(row.type)}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    accessor: (row) => {
      const isNegative = row.type === "send" || row.type === "payment";
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
      const variantMap = {
        completed: "success",
        pending: "warning",
        failed: "danger",
      } as const;
      return (
        <Badge variant={variantMap[row.status] || "default"} size="sm">
          {row.status}
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
