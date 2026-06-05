/**
 * frontend/src/hooks/useTopUp.ts  (UPDATED)
 *
 * Thêm polling khi topUp qua gateway (status: pending).
 * Instant topUp (không có linkedBankId) giữ nguyên flow cũ.
 */

import { useState, useRef } from 'react';
import { useAuth } from './useAuth';
import { walletService, type TopUpPayload } from '@/services/walletService';
import { useToast } from './useToast';
import http from '@/lib/http';

export type TopUpStatus = 'idle' | 'loading' | 'pending' | 'success' | 'error';

export interface TopUpState {
  transactionId?: string;
  status: TopUpStatus;
  amount?: number;
  newBalance?: number;
  bankCode?: string;
}

export function useTopUp() {
  const { refreshWallet } = useAuth();
  const { showToast } = useToast();

  const [state, setState] = useState<TopUpState>({ status: 'idle' });
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Polling: check transaction status mỗi 1.5s ──────────────────────
  const startPolling = (transactionId: string) => {
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // 30s timeout

    pollingRef.current = setInterval(async () => {
      attempts++;
      try {
        const { data } = await http.get<{ data: { status: string } }>(
          `/api/v1/wallets/me/transactions/${transactionId}`,
        );
        const txStatus = data.data.status;

        if (txStatus === 'success') {
          clearInterval(pollingRef.current!);
          await refreshWallet().catch(() => {});
          setState((prev) => ({ ...prev, status: 'success' }));
          showToast('Nạp tiền thành công!', 'success');
        } else if (txStatus === 'failed') {
          clearInterval(pollingRef.current!);
          setState({ status: 'error' });
          setError('Giao dịch thất bại. Vui lòng thử lại.');
          showToast('Nạp tiền thất bại', 'error');
        } else if (attempts >= MAX_ATTEMPTS) {
          clearInterval(pollingRef.current!);
          setState({ status: 'error' });
          setError('Giao dịch đang xử lý. Vui lòng kiểm tra lại sau.');
        }
      } catch {
        // Bỏ qua lỗi mạng tạm thời, tiếp tục poll
      }
    }, 1500);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // ─── Execute top-up ──────────────────────────────────────────────────
  const executeTopUp = async (data: TopUpPayload) => {
    setState({ status: 'loading' });
    setError(null);
    stopPolling();

    try {
      const result = await walletService.topUp(data);

      if (result.data.status === 'pending') {
        // Gateway flow: bắt đầu polling
        setState({
          status: 'pending',
          transactionId: result.data.transactionId,
          amount: data.amount,
          bankCode: result.data.bankCode,
        });
        showToast('Đang xử lý giao dịch...', 'info');
        startPolling(result.data.transactionId);
      } else {
        // Instant flow: done
        await refreshWallet().catch(() => {});
        setState({
          status: 'success',
          transactionId: result.data.transactionId,
          amount: data.amount,
          newBalance: result.data.wallet?.balance,
        });
        showToast(result.message, 'success');
      }

      return result;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Nạp tiền thất bại';
      setError(msg);
      setState({ status: 'error' });
      showToast(msg, 'error');
      throw err;
    }
  };

  const reset = () => {
    stopPolling();
    setState({ status: 'idle' });
    setError(null);
  };

  return {
    executeTopUp,
    isLoading: state.status === 'loading',
    isPending: state.status === 'pending',  // đang chờ gateway webhook
    isSuccess: state.status === 'success',
    error,
    state,
    reset,
  };
}