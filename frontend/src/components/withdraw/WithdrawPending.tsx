// components/withdraw/WithdrawPending.tsx
import { Card } from "@/components/ui";
import { Clock, X } from "lucide-react";
import { formatVND } from "@/utils/format";

interface WithdrawPendingProps {
  state: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
  };
  onCancel: () => void;
}

export function WithdrawPending({ state, onCancel }: WithdrawPendingProps) {
  return (
    <Card>
      <div className="p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-info/10 flex items-center justify-center text-info animate-pulse">
            <Clock size={32} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary">Đang xử lý</h2>
          <p className="text-sm text-secondary mt-1">
            Giao dịch rút tiền đang được xử lý
          </p>
        </div>
        <div className="rounded-xl bg-surface-sunken p-4 space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-sm text-secondary">Số tiền rút</span>
            <span className="text-sm font-semibold text-primary">
              {formatVND(state.amount)}
            </span>
          </div>
          {state.bankName && state.accountNumber && (
            <div className="flex justify-between">
              <span className="text-sm text-secondary">Tài khoản nhận</span>
              <span className="text-sm font-medium text-primary">
                {state.bankName} *{state.accountNumber.slice(-4)}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onCancel}
          className="w-full rounded-xl border border-subtle px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-surface-sunken flex items-center justify-center gap-2"
        >
          <X size={16} />
          Hủy giao dịch
        </button>
      </div>
    </Card>
  );
}
