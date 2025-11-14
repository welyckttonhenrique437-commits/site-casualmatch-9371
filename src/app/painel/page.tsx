"use client";

import { useEffect, useState } from "react";
import { Flame, Users, MessageCircle, Image as ImageIcon, TrendingUp } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  nome: string;
  email: string;
  status: string;
}

export default function PainelPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("casualmatch_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Flame className="w-12 h-12 text-red-500 animate-pulse" />
      </div>
    );
  }

  const isActive = user.status === "ativo";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Olá, {user.nome.split(" ")[0]} 🔥
        </h1>
        <p className="text-gray-400">
          {isActive
            ? "Bem-vindo de volta! Explore conexões picantes."
            : "Complete seu pagamento para acessar todos os recursos."}
        </p>
      </div>

      {/* Alerta de pagamento pendente */}
      {!isActive && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">
            ⏳ Pagamento Pendente
          </h3>
          <p className="text-yellow-300/80 mb-4">
            Complete seu pagamento para liberar o acesso total à plataforma
          </p>
          <a
            href="https://pay.kiwify.com.br/45SDQNS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
          >
            Pagar Agora (R$ 19,90/mês)
          </a>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6">
          <Users className="w-8 h-8 text-red-400 mb-3" />
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-400">Seguidores</p>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-red-400 mb-3" />
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-400">Posts</p>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6">
          <MessageCircle className="w-8 h-8 text-red-400 mb-3" />
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-400">Mensagens</p>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-xl p-6">
          <ImageIcon className="w-8 h-8 text-red-400 mb-3" />
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-400">Fotos/Vídeos</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/painel/perfil"
            className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
          >
            <h3 className="font-bold mb-2">✏️ Editar Perfil</h3>
            <p className="text-sm text-gray-400">
              Configure sua foto, bio e preferências
            </p>
          </Link>

          <Link
            href="/painel/feed"
            className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
          >
            <h3 className="font-bold mb-2">🔥 Explorar Feed</h3>
            <p className="text-sm text-gray-400">
              Veja posts da comunidade
            </p>
          </Link>

          <Link
            href="/painel/galeria"
            className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
          >
            <h3 className="font-bold mb-2">📸 Adicionar Mídia</h3>
            <p className="text-sm text-gray-400">
              Envie fotos e vídeos para sua galeria
            </p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {isActive && (
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Atividade Recente</h2>
          <p className="text-gray-400 text-center py-8">
            Nenhuma atividade ainda. Comece explorando o feed!
          </p>
        </div>
      )}
    </div>
  );
}
