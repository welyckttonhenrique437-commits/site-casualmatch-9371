"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flame } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o novo painel
    const userData = localStorage.getItem("casualmatch_user");
    
    if (!userData) {
      router.push("/login");
      return;
    }

    // Redirecionar para o painel principal
    router.push("/painel");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <Flame className="w-16 h-16 text-red-500 animate-pulse mx-auto mb-4" />
        <p className="text-gray-400">Redirecionando...</p>
      </div>
    </div>
  );
}
