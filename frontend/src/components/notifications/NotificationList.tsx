// components/notifications/NotificationList.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, Badge } from "@/components/ui";
import { notificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/useToast";
import { NotificationSkeleton } from "./NotificationSkeleton";
import { Bell, Check, CheckCheck, Filter, X } from "lucide-react";
import type { Notification } from "@/models/notification";

const notificationIcons = {
  success: <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success"><Check size={18} /></div>,
  error: <div className="h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center text-danger"><X size={18} /></div>,
  warning: <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning"><Bell size={18} /></div>,
  info: <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center text-info"><Bell size={18} /></div>,
};

const notificationTypeColors = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-info",
};

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  const fetchNotifications = async (currentPage = 1, currentFilter = filter) => {
    setLoading(true);
    try {
      const params: any = { page: currentPage, limit: 10 };
      if (currentFilter !== "all") {
        params.type = currentFilter;
      }
      const response = await notificationService.getNotifications(params);
      setNotifications(response.data);
      setUnreadCount(response.unreadCount);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      showToast("Không thể tải thông báo", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      showToast("Không thể đánh dấu đã đọc", "error");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
      showToast("Đã đánh dấu tất cả là đã đọc", "success");
    } catch (error) {
      showToast("Không thể đánh dấu tất cả đã đọc", "error");
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-primary">Thông báo</h2>
          {unreadCount > 0 && (
            <Badge variant="brand" size="sm">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1 text-xs font-medium text-brand-default hover:text-brand-subtle transition-colors"
          >
            <CheckCheck size={14} />
            Đọc tất cả
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => handleFilterChange("all")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            filter === "all"
              ? "bg-brand-default text-white"
              : "bg-surface-sunken text-secondary hover:text-primary"
          }`}
        >
          <Filter size={14} />
          Tất cả
        </button>
        {["success", "info", "warning", "error"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors capitalize ${
              filter === type
                ? "bg-brand-default text-white"
                : "bg-surface-sunken text-secondary hover:text-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <Bell size={48} className="mx-auto text-tertiary mb-3" />
            <p className="text-sm text-secondary">Không có thông báo nào</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.isRead ? "border-l-4 border-l-brand-default" : ""
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    {notificationIcons[notification.type as keyof typeof notificationIcons] || notificationIcons.info}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`text-sm font-semibold ${!notification.isRead ? "text-primary" : "text-secondary"}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="shrink-0 text-brand-default hover:text-brand-subtle transition-colors"
                          title="Đánh dấu đã đọc"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-secondary mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-tertiary mt-2">{formatTime(notification.createdAt)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      {page < totalPages && notifications.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="w-full py-3 text-sm font-medium text-brand-default hover:text-brand-subtle transition-colors"
        >
          Tải thêm
        </button>
      )}
    </div>
  );
}
