// components/transfer/TransferSkeleton.tsx
import { Card } from "@/components/ui";

export function TransferSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <Card padding="lg">
        <div className="space-y-4">
          <div className="h-10 bg-surface-sunken rounded" />
          <div className="h-10 bg-surface-sunken rounded" />
          <div className="h-10 bg-surface-sunken rounded" />
          <div className="h-12 bg-surface-sunken rounded mt-4" />
        </div>
      </Card>
    </div>
  );
}
