"use client";

import { useState, useEffect } from "react";
import { Save, Lock, Bell, Eye, CreditCard, Shield, Link as LinkIcon } from "lucide-react";

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState({
    notificacoes: {
      mensagens: true,
      curtidas: true,
      comentarios: true,
      seguidores: true,
    },
    privacidade: {
      perfilPublico: true,
      mostrarOnline: true,
      permitirMensagens: true,
    },
    linkPagamento: "https://pay.kiwify.com.br/45SDQNS",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar se é admin
    const userData = localStorage.getItem("casualmatch_user");
    if (userData) {
      const user = JSON.parse(userData);
      setIsAdmin(user.role === "admin" || user.email === "admin@casualmatch.com");
    }
  }, []);

  const handleToggle = (section: string, key: string) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !prev[section as keyof typeof prev][key as keyof typeof prev[typeof section]],
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implementar API de atualização de configurações
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Configurações ⚙️</h1>
        <p className="text-gray-400">
          Gerencie suas preferências e privacidade
        </p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400">
          ✓ Configurações salvas com sucesso!
        </div>
      )}

      {/* Notificações */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold">Notificações</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(config.notificacoes).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div>
                <p className="font-semibold capitalize">
                  {key === "mensagens"
                    ? "Novas mensagens"
                    : key === "curtidas"
                    ? "Curtidas em posts"
                    : key === "comentarios"
                    ? "Comentários"
                    : "Novos seguidores"}
                </p>
                <p className="text-sm text-gray-500">
                  Receber notificações de {key}
                </p>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? "bg-red-600" : "bg-gray-700"
                }`}
                onClick={() => handleToggle("notificacoes", key)}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    value ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Privacidade */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold">Privacidade</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(config.privacidade).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div>
                <p className="font-semibold capitalize">
                  {key === "perfilPublico"
                    ? "Perfil público"
                    : key === "mostrarOnline"
                    ? "Mostrar status online"
                    : "Permitir mensagens de todos"}
                </p>
                <p className="text-sm text-gray-500">
                  {key === "perfilPublico"
                    ? "Seu perfil será visível para todos"
                    : key === "mostrarOnline"
                    ? "Outros usuários verão quando você está online"
                    : "Qualquer usuário pode te enviar mensagens"}
                </p>
              </div>
              <div
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? "bg-red-600" : "bg-gray-700"
                }`}
                onClick={() => handleToggle("privacidade", key)}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    value ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold">Segurança</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-left transition-colors">
            Alterar Senha
          </button>
          <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-left transition-colors">
            Autenticação em Dois Fatores
          </button>
          <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-left transition-colors">
            Dispositivos Conectados
          </button>
        </div>
      </div>

      {/* Assinatura */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold">Assinatura</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
            <div>
              <p className="font-semibold">Plano Mensal</p>
              <p className="text-sm text-gray-500">R$ 19,90/mês</p>
            </div>
            <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm font-semibold">
              Ativo
            </span>
          </div>
          <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
            Gerenciar Assinatura
          </button>
          <button className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-semibold transition-colors">
            Cancelar Assinatura
          </button>
        </div>
      </div>

      {/* Painel Administrativo - Link de Pagamento */}
      {isAdmin && (
        <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <LinkIcon className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold">Painel Administrativo</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Link de Checkout Kiwify
              </label>
              <input
                type="url"
                value={config.linkPagamento}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    linkPagamento: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-black/50 border border-yellow-700 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="https://pay.kiwify.com.br/..."
              />
              <p className="text-sm text-yellow-500/80 mt-2">
                Este link será usado para redirecionar novos usuários após o cadastro
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botão Salvar */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        {loading ? "Salvando..." : "Salvar Configurações"}
      </button>
    </div>
  );
}
