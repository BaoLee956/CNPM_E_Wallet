// components/withdraw/WithdrawSuccess.tsx
import { Card } from "@/components/ui";
import { CheckCircle } from "lucide-react";
import { formatVND } from "@/utils/format";

interface WithdrawSuccessProps {
  state: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
    transactionId?: string;
  };
  onReset: () => void;
}

export function WithdrawSuccess({ state, onReset }: WithdrawSuccessProps) {
  return (
    <Card>
      <div className="p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center text-success">
            <CheckCircle size={32} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary">
            Rút tiền thành công
          </h2>
          <p className="text-sm text-secondary mt-1">
            Tiền sẽ về tài khoản ngân hàng trong vài phút
          </p>
        </div>
        <div className="rounded-xl bg-surface-sunken p-4 space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-sm text-secondary">Số tiền rút</span>
            <span className="text-sm font-semibold text-primary">
              {formatVND(state.amount)}
            </span>
          </div>
          {state.bankName && (
            <div className="flex justify-between">
              <span className="text-sm text-secondary">Ngân hàng</span>
              <span className="text-sm font-medium text-primary">
                {state.bankName}
                {state.accountNumber && ` *${state.accountNumber.slice(-4)}`}
              </span>
            </div>
          )}
          {state.transactionId && (
            <div className="flex justify-between">
              <span className="text-sm text-secondary">Mã giao dịch</span>
              <span className="text-sm font-mono text-secondary">
                {state.transactionId.slice(0, 8)}...
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onReset}
          className="w-full rounded-xl bg-brand-default px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Rút tiếp
        </button>
      </div>
    </Card>
  );
}
