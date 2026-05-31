// app/(customer)/banks/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CustomerPage } from "@/components/ui/CustomerLayout";
import { BankList } from "@/components/banks/BankList";
import { LinkBankFlow } from "@/components/banks/LinkBankFlow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { bankService, type LinkedBank } from "@/services/bankService";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

export default function BanksPage() {
  const { isLoading: authLoading } = useRequireAuth();
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLinkFlow, setShowLinkFlow] = useState(false);

  const loadBanks = async () => {
    setLoading(true);
    const banks = await bankService.getLinkedBanks();
    setLinkedBanks(banks);
    setLoading(false);
  };

  useEffect(() => {
    loadBanks();
  }, []);

  const handleLinked = async () => {
    setShowLinkFlow(false);
    await loadBanks();
  };

  if (authLoading)
    return (
      <CustomerPage>
        <div className="h-64 animate-pulse rounded-2xl bg-surface-sunken" />
      </CustomerPage>
    );

  if (showLinkFlow) {
    return (
      <CustomerPage>
        <LinkBankFlow
          onSuccess={handleLinked}
          onCancel={() => setShowLinkFlow(false)}
        />
      </CustomerPage>
    );
  }

  return (
    <CustomerPage>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Tài khoản ngân hàng
          </h1>
          <p className="text-sm text-secondary">
            Liên kết để nạp tiền dễ dàng hơn
          </p>
        </div>
        <Button
          size="sm"
          iconLeft={<Plus size={14} />}
          onClick={() => setShowLinkFlow(true)}
        >
          Liên kết
        </Button>
      </div>

      <BankList banks={linkedBanks} loading={loading} onRefresh={loadBanks} />
    </CustomerPage>
  );
}
