// components/notifications/NotificationSkeleton.tsx
import { Card } from "@/components/ui";

export function NotificationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-surface-sunken rounded" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-surface-sunken shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-surface-sunken rounded" />
                  <div className="h-3 w-full bg-surface-sunken rounded" />
                </div>
              </div>
              <div className="h-3 w-1/2 bg-surface-sunken rounded ml-13" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
