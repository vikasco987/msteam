// src/app/kam/page.tsx
"use client";

import React from "react"; // Removed useEffect and useState
import KamTableView from "../components/KamTable";
import { useUser } from "@clerk/nextjs";

export default function KamPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="p-6">Loading user...</div>;

  const role = user?.publicMetadata?.role;

  if (role !== "admin" && role !== "seller" && role !== "master") {
    return (
      <div className="p-6 text-red-500">
        ⛔ Access Denied: You are not authorized to view this page.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <KamTableView />
    </main>
  );
}