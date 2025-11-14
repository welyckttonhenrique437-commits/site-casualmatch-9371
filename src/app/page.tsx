"use client";

import Link from "next/link";
import { Heart, Flame, Lock, Users } from "lucide-react";

export default function Home() {
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
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              prefetch={false}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              prefetch={false}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4">
            🔥 Mais de 10.000 membros ativos
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Conexões{" "}
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Sem Limites
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            A rede social adulta para encontros reais, intensos e sem filtros.
            Liberdade, prazer e discrição em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/cadastro"
              prefetch={false}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-red-500/50 w-full sm:w-auto"
            >
              Entre agora e descubra quem está online perto de você 🔥
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Assinatura mensal por apenas <span className="text-red-400 font-bold">R$ 19,90/mês</span> • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Encontros Reais</h3>
            <p className="text-gray-400">
              Conheça pessoas de mente aberta perto de você. Conexões autênticas e intensas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Total Discrição</h3>
            <p className="text-gray-400">
              Sua privacidade é nossa prioridade. Ambiente seguro e protegido para você se expressar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Comunidade Ativa</h3>
            <p className="text-gray-400">
              Feed livre, chat privado, fotos e vídeos. Uma rede social sem censura para adultos.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Plano Simples e Transparente
            </h3>
            <p className="text-gray-400">
              Sem taxas ocultas. Cancele quando quiser.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-2 border-red-500/40 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4">
                ⭐ Mais Popular
              </div>
              <h4 className="text-2xl font-bold mb-2">Assinatura Mensal</h4>
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  R$ 19,90
                </span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-gray-400 text-sm">
                Renovação automática • Cancele quando quiser
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Acesso total ao feed de conexões",
                "Chat privado ilimitado",
                "Upload de fotos e vídeos",
                "Busca avançada por localização",
                "Perfil completo e personalizável",
                "Notificações em tempo real",
                "Suporte prioritário",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/cadastro"
              prefetch={false}
              className="block w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg text-center transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl shadow-red-500/50">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Aqui, o prazer é sem filtros.
          </h3>
          <p className="text-xl mb-8 text-red-100">
            Crie seu perfil e libere o acesso completo em segundos.
          </p>
          <Link
            href="/cadastro"
            prefetch={false}
            className="inline-block px-10 py-4 bg-black hover:bg-gray-900 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
          >
            Começar Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-900/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" />
              <span className="font-bold">CasualMatch</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-red-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-red-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-red-400 transition-colors">Contato</a>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 CasualMatch. Conteúdo adulto +18.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
