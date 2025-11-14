"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, User, Settings, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  nome: string;
  email: string;
  status: string;
  cidade: string;
  uf: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está autenticado
    const userData = localStorage.getItem("casualmatch_user");
    
    if (!userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("casualmatch_user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-red-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Verificar status da assinatura
  const isActive = user.status === "ativo";
  const isPending = user.status === "pendente_pagamento";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-red-900/20 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              CasualMatch
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Alerta de pagamento pendente */}
      {isPending && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="font-semibold text-yellow-400">
                    Pagamento Pendente
                  </p>
                  <p className="text-sm text-yellow-300/80">
                    Complete seu pagamento para liberar o acesso total
                  </p>
                </div>
              </div>
              <a
                href="https://pay.kiwify.com.br/BZSQnpu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
              >
                Pagar Agora
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Olá, {user.nome.split(" ")[0]} 🔥
            </h2>
            <p className="text-gray-400">
              {isActive
                ? "Bem-vindo de volta! Explore conexões picantes."
                : "Complete seu pagamento para acessar todos os recursos."}
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Status da Conta</h3>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                }`}
              >
                {isActive ? "✓ Ativa" : "⏳ Pendente"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">E-mail</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Localização</p>
                <p className="font-semibold">
                  {user.cidade}, {user.uf}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Plano</p>
                <p className="font-semibold">Assinatura Mensal - R$ 19,90</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Próximo pagamento</p>
                <p className="font-semibold">
                  {isActive ? "Em 30 dias" : "Aguardando primeiro pagamento"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/perfil"
              className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
            >
              <User className="w-8 h-8 text-red-400 mb-3" />
              <h4 className="font-bold mb-1">Meu Perfil</h4>
              <p className="text-sm text-gray-400">
                Edite suas informações e fotos
              </p>
            </Link>

            <Link
              href="/configuracoes"
              className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
            >
              <Settings className="w-8 h-8 text-red-400 mb-3" />
              <h4 className="font-bold mb-1">Configurações</h4>
              <p className="text-sm text-gray-400">
                Privacidade e preferências
              </p>
            </Link>

            <Link
              href="/assinatura"
              className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
            >
              <CreditCard className="w-8 h-8 text-red-400 mb-3" />
              <h4 className="font-bold mb-1">Assinatura</h4>
              <p className="text-sm text-gray-400">
                Gerencie seu plano e pagamentos
              </p>
            </Link>
          </div>

          {/* Feed Preview (apenas se ativo) */}
          {isActive && (
            <div className="mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Feed de Conexões 🔥</h3>
              <p className="text-gray-400 text-center py-8">
                Em breve: Feed com posts, fotos e vídeos da comunidade
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
