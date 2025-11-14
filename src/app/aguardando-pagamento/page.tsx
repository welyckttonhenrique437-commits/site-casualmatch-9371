"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function AguardandoPagamentoPage() {
  const [userData, setUserData] = useState<any>(null);
  const [statusPagamento, setStatusPagamento] = useState<"pendente" | "aprovado" | "recusado">("pendente");

  useEffect(() => {
    // Recuperar dados do usuário do localStorage
    try {
      const data = localStorage.getItem("casualmatch_pending_user");
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }

    // Simular verificação de status (em produção, isso viria do webhook)
    const checkStatus = () => {
      const status = localStorage.getItem("casualmatch_payment_status");
      if (status === "approved") {
        setStatusPagamento("aprovado");
      } else if (status === "declined") {
        setStatusPagamento("recusado");
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000); // Verificar a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const handleTentarNovamente = () => {
    window.location.href = 'https://pay.kiwify.com.br/45SDQNS';
  };

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
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {statusPagamento === "pendente" && (
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-yellow-500/30 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Clock className="w-10 h-10 text-yellow-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Aguardando Confirmação do Pagamento
              </h2>
              
              <p className="text-gray-400 mb-8">
                Estamos processando seu pagamento. Isso pode levar alguns minutos.
                {userData && (
                  <span className="block mt-2 text-sm">
                    Olá, <strong className="text-red-400">{userData.nome}</strong>! Assim que confirmarmos seu pagamento, você receberá um e-mail e terá acesso total à plataforma.
                  </span>
                )}
              </p>

              <div className="bg-black/50 border border-gray-700 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-3 text-left">O que acontece agora?</h3>
                <ul className="space-y-3 text-left text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Seu cadastro foi realizado com sucesso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Estamos aguardando a confirmação do pagamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Você receberá um e-mail de boas-vindas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Acesso total liberado à plataforma</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verificando status automaticamente...</span>
              </div>
            </div>
          )}

          {statusPagamento === "aprovado" && (
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Pagamento Confirmado! 🎉
              </h2>
              
              <p className="text-gray-400 mb-8">
                Bem-vindo à CasualMatch! Seu acesso está liberado.
              </p>

              <Link
                href="/feed"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/50"
              >
                Acessar Plataforma
              </Link>
            </div>
          )}

          {statusPagamento === "recusado" && (
            <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Pagamento Não Aprovado
              </h2>
              
              <p className="text-gray-400 mb-8">
                Infelizmente, não conseguimos processar seu pagamento. Isso pode acontecer por diversos motivos, como saldo insuficiente ou dados incorretos.
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleTentarNovamente}
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50"
                >
                  Tentar Novamente
                </button>

                <Link
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Voltar para a página inicial
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
