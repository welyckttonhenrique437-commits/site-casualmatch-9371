"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Heart, MessageCircle, Users, Settings, LogOut, Lock } from "lucide-react";

export default function FeedPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificar se usuário tem assinatura ativa
    const subscriptionActive = localStorage.getItem("casualmatch_subscription_active");
    
    if (subscriptionActive === "true") {
      setHasAccess(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSubscribe = () => {
    window.location.href = 'https://pay.kiwify.com.br/45SDQNS';
  };

  if (showModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/30 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-400" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Acesso Restrito
          </h2>
          
          <p className="text-gray-400 mb-8">
            Para acessar o feed e todas as funcionalidades da CasualMatch, você precisa de uma assinatura ativa.
          </p>

          <button
            onClick={handleSubscribe}
            className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 mb-4"
          >
            Assinar por R$ 19,90/mês
          </button>

          <Link
            href="/"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-red-900/20 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Flame className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              CasualMatch
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/feed" className="text-red-400 hover:text-red-300 transition-colors">
              <Heart className="w-6 h-6" />
            </Link>
            <Link href="/mensagens" className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </Link>
            <Link href="/explorar" className="text-gray-400 hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </Link>
            <Link href="/perfil" className="text-gray-400 hover:text-white transition-colors">
              <Settings className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">
              Bem-vindo à CasualMatch! 🔥
            </h2>
            <p className="text-red-100">
              Explore conexões, converse com pessoas interessantes e aproveite ao máximo sua experiência.
            </p>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {/* Post Example 1 */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                  M
                </div>
                <div>
                  <h3 className="font-semibold">Maria Silva</h3>
                  <p className="text-sm text-gray-400">São Paulo, SP • Online agora</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Procurando por conexões reais e intensas. Sem enrolação, apenas diversão! 🔥
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>234 curtidas</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>45 comentários</span>
                </button>
              </div>
            </div>

            {/* Post Example 2 */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                  J
                </div>
                <div>
                  <h3 className="font-semibold">João Santos</h3>
                  <p className="text-sm text-gray-400">Rio de Janeiro, RJ • Online há 2h</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Alguém afim de um encontro casual hoje à noite? Manda DM! 😈
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>189 curtidas</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>67 comentários</span>
                </button>
              </div>
            </div>

            {/* Post Example 3 */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold">
                  C
                </div>
                <div>
                  <h3 className="font-semibold">Casal Aventura</h3>
                  <p className="text-sm text-gray-400">Belo Horizonte, MG • Online agora</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Casal liberal procurando novas experiências. Interessados, chamem no chat! 💋
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>412 curtidas</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>98 comentários</span>
                </button>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Carregar mais posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
