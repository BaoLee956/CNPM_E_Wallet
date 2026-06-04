// components/withdraw/WithdrawSkeleton.tsx
import { Card } from "@/components/ui";

export function WithdrawSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-surface-sunken rounded" />
      <div className="h-4 w-64 bg-surface-sunken rounded" />
      <Card>
        <div className="space-y-4">
          <div className="h-14 bg-surface-sunken rounded" />
          <div className="h-14 bg-surface-sunken rounded" />
          <div className="h-12 bg-brand-subtle rounded" />
        </div>
      </Card>
    </div>
  );
}
