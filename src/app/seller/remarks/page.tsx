// src/app/seller-remarks/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import PaymentRemarks, { Remark } from "../../components/PaymentRemarks";
import GlobalRemarks from "../../components/GlobalRemarks";
import { Button } from "../../../components/ui/button";

interface Task {
  id: string;
  title: string;
  amount: number;
  status: string;
  taskType?: string;
  shopName?: string;
  phone?: string;
  customerName?: string;
  outletName?: string;
  remarks?: Remark[];
}

export default function SellerRemarksPage() {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<"task" | "global">("task");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const limit = 10;

  const loadTasks = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/tasks/paginated?page=${pageNumber}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();

      // Include phone, customerName, and outletName
      setPendingTasks(data.tasks || []);
      setTotalTasks(data.total || data.tasks.length || 0);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === "task") loadTasks(1);
  }, [viewMode]);

  const totalPages = Math.ceil(totalTasks / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 Pending Payment Remarks</h1>
        <div className="space-x-2">
          <Button
            variant={viewMode === "task" ? "default" : "outline"}
            onClick={() => setViewMode("task")}
          >
            Per Task View
          </Button>
          <Button
            variant={viewMode === "global" ? "default" : "outline"}
            onClick={() => setViewMode("global")}
          >
            Global View
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : viewMode === "task" ? (
        pendingTasks.length === 0 ? (
          <p className="text-gray-500">No pending payments right now</p>
        ) : (
          <div className="space-y-4">
            {pendingTasks.map((task, idx) => (
              <div
                key={task.id}
                className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    #{(page - 1) * limit + idx + 1} {task.title}{" "}
                    {task.taskType && (
                      <span className="text-sm text-gray-500">
                        ({task.taskType})
                      </span>
                    )}
                  </h2>
                  <span className="text-red-600">Pending ₹{task.amount}</span>
                </div>

                {(task.shopName || task.phone || task.customerName || task.outletName) && (
                  <div className="text-sm text-gray-600 space-x-4">
                    {task.shopName && <span>🏬 {task.shopName}</span>}
                    {task.phone && <span>📞 {task.phone}</span>}
                    {task.customerName && <span>👤 {task.customerName}</span>}
                    {task.outletName && <span>🏪 {task.outletName}</span>}
                  </div>
                )}

                <PaymentRemarks remarks={task.remarks || []} taskId={task.id} />
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-4">
                <Button
                  disabled={page <= 1 || loading}
                  onClick={() => loadTasks(page - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages} | Total: {totalTasks} tasks
                </span>
                <Button
                  disabled={page >= totalPages || loading}
                  onClick={() => loadTasks(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )
      ) : (
        <GlobalRemarks />
      )}
    </div>
  );
}
