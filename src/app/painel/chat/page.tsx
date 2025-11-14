"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Image as ImageIcon, Video, Search, MoreVertical, Ban } from "lucide-react";

interface Conversa {
  id: string;
  usuario: {
    id: string;
    nome: string;
    foto_perfil?: string;
    online: boolean;
  };
  ultimaMensagem: string;
  naoLidas: number;
  atualizado_em: string;
}

interface Mensagem {
  id: string;
  remetente_id: string;
  conteudo: string;
  midia?: { tipo: "foto" | "video"; url: string };
  lida: boolean;
  criado_em: string;
}

export default function ChatPage() {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [conversaSelecionada, setConversaSelecionada] = useState<string | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [busca, setBusca] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Carregar conversas do banco
    // Por enquanto, conversas de exemplo
    setConversas([
      {
        id: "1",
        usuario: {
          id: "user1",
          nome: "Usuário Exemplo",
          foto_perfil: "",
          online: true,
        },
        ultimaMensagem: "Olá! Como vai?",
        naoLidas: 0,
        atualizado_em: new Date().toISOString(),
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll para última mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const handleSelecionarConversa = (conversaId: string) => {
    setConversaSelecionada(conversaId);
    // TODO: Carregar mensagens da conversa
    setMensagens([
      {
        id: "1",
        remetente_id: "user1",
        conteudo: "Olá! Como vai?",
        lida: true,
        criado_em: new Date().toISOString(),
      },
    ]);
  };

  const handleEnviarMensagem = () => {
    if (!novaMensagem.trim() || !conversaSelecionada) return;

    const userData = localStorage.getItem("casualmatch_user");
    const user = userData ? JSON.parse(userData) : null;

    const mensagem: Mensagem = {
      id: Date.now().toString(),
      remetente_id: user?.id || "me",
      conteudo: novaMensagem,
      lida: false,
      criado_em: new Date().toISOString(),
    };

    setMensagens([...mensagens, mensagem]);
    setNovaMensagem("");
  };

  const conversaAtual = conversas.find((c) => c.id === conversaSelecionada);
  const userData = localStorage.getItem("casualmatch_user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Chat 💬</h1>
        <p className="text-gray-400">
          Converse de forma privada e discreta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
        {/* Lista de Conversas */}
        <div className="lg:col-span-1 bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl overflow-hidden flex flex-col">
          {/* Busca */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar conversas..."
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Conversas */}
          <div className="flex-1 overflow-y-auto">
            {conversas.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nenhuma conversa ainda
              </div>
            ) : (
              conversas
                .filter((c) =>
                  c.usuario.nome.toLowerCase().includes(busca.toLowerCase())
                )
                .map((conversa) => (
                  <button
                    key={conversa.id}
                    onClick={() => handleSelecionarConversa(conversa.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-red-900/10 transition-colors border-b border-gray-800 ${
                      conversaSelecionada === conversa.id
                        ? "bg-red-900/20"
                        : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                        {conversa.usuario.foto_perfil ? (
                          <img
                            src={conversa.usuario.foto_perfil}
                            alt={conversa.usuario.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-600">
                            {conversa.usuario.nome.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      {conversa.usuario.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{conversa.usuario.nome}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {conversa.ultimaMensagem}
                      </p>
                    </div>
                    {conversa.naoLidas > 0 && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {conversa.naoLidas}
                      </div>
                    )}
                  </button>
                ))
            )}
          </div>
        </div>

        {/* Área de Mensagens */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl overflow-hidden flex flex-col">
          {conversaSelecionada && conversaAtual ? (
            <>
              {/* Header da Conversa */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                      {conversaAtual.usuario.foto_perfil ? (
                        <img
                          src={conversaAtual.usuario.foto_perfil}
                          alt={conversaAtual.usuario.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-600">
                          {conversaAtual.usuario.nome.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {conversaAtual.usuario.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{conversaAtual.usuario.nome}</p>
                    <p className="text-sm text-gray-500">
                      {conversaAtual.usuario.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                    <Ban className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mensagens.map((msg) => {
                  const isMine = msg.remetente_id === user?.id || msg.remetente_id === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                          isMine
                            ? "bg-gradient-to-r from-red-600 to-pink-600"
                            : "bg-gray-800"
                        }`}
                      >
                        <p className="text-sm">{msg.conteudo}</p>
                        <p className="text-xs text-gray-300 mt-1">
                          {new Date(msg.criado_em).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {isMine && msg.lida && " • Lida"}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de Mensagem */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-gray-400" />
                  </button>
                  <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleEnviarMensagem()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={handleEnviarMensagem}
                    disabled={!novaMensagem.trim()}
                    className="p-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecione uma conversa para começar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
