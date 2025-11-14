"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Image as ImageIcon, Video, Send } from "lucide-react";

interface Post {
  id: string;
  usuario: {
    nome: string;
    foto_perfil?: string;
  };
  conteudo: string;
  midia?: { tipo: "foto" | "video"; url: string }[];
  curtidas: number;
  comentarios: number;
  criado_em: string;
  curtido: boolean;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [novoPost, setNovoPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Carregar posts do banco
    // Por enquanto, posts de exemplo
    setPosts([
      {
        id: "1",
        usuario: {
          nome: "Usuário Exemplo",
          foto_perfil: "",
        },
        conteudo: "Bem-vindo ao CasualMatch! 🔥",
        curtidas: 0,
        comentarios: 0,
        criado_em: new Date().toISOString(),
        curtido: false,
      },
    ]);
  }, []);

  const handleCurtir = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              curtido: !post.curtido,
              curtidas: post.curtido ? post.curtidas - 1 : post.curtidas + 1,
            }
          : post
      )
    );
  };

  const handlePublicar = async () => {
    if (!novoPost.trim()) return;

    setLoading(true);
    try {
      // TODO: Implementar API de criação de post
      const userData = localStorage.getItem("casualmatch_user");
      const user = userData ? JSON.parse(userData) : null;

      const newPost: Post = {
        id: Date.now().toString(),
        usuario: {
          nome: user?.nome || "Você",
          foto_perfil: user?.foto_perfil,
        },
        conteudo: novoPost,
        curtidas: 0,
        comentarios: 0,
        criado_em: new Date().toISOString(),
        curtido: false,
      };

      setPosts([newPost, ...posts]);
      setNovoPost("");
    } catch (error) {
      console.error("Erro ao publicar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Feed 🔥</h1>
        <p className="text-gray-400">
          Compartilhe momentos e conecte-se com a comunidade
        </p>
      </div>

      {/* Criar Post */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-6">
        <textarea
          value={novoPost}
          onChange={(e) => setNovoPost(e.target.value)}
          placeholder="O que está acontecendo? 🔥"
          rows={3}
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
              title="Adicionar foto"
            >
              <ImageIcon className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="button"
              className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
              title="Adicionar vídeo"
            >
              <Video className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <button
            onClick={handlePublicar}
            disabled={!novoPost.trim() || loading}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      {/* Lista de Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-12 text-center">
            <p className="text-gray-400">
              Nenhum post ainda. Seja o primeiro a compartilhar! 🔥
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all"
            >
              {/* Header do Post */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                    {post.usuario.foto_perfil ? (
                      <img
                        src={post.usuario.foto_perfil}
                        alt={post.usuario.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-gray-600">
                        {post.usuario.nome.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{post.usuario.nome}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.criado_em).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-900/20 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Conteúdo */}
              <p className="text-gray-200 mb-4 whitespace-pre-wrap">
                {post.conteudo}
              </p>

              {/* Mídia */}
              {post.midia && post.midia.length > 0 && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  {post.midia[0].tipo === "foto" ? (
                    <img
                      src={post.midia[0].url}
                      alt="Post"
                      className="w-full h-auto"
                    />
                  ) : (
                    <video
                      src={post.midia[0].url}
                      controls
                      className="w-full h-auto"
                    />
                  )}
                </div>
              )}

              {/* Ações */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                <button
                  onClick={() => handleCurtir(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    post.curtido
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${post.curtido ? "fill-current" : ""}`}
                  />
                  <span className="text-sm font-semibold">{post.curtidas}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {post.comentarios}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
