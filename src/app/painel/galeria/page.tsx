"use client";

import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, Video, Lock, Unlock, Trash2, Grid, List } from "lucide-react";

interface Midia {
  id: string;
  tipo: "foto" | "video";
  url: string;
  categoria: string;
  publico: boolean;
  criado_em: string;
}

export default function GaleriaPage() {
  const [midias, setMidias] = useState<Midia[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // TODO: Carregar mídias do banco
    // Por enquanto, galeria vazia
    setMidias([]);
  }, []);

  const categorias = [
    "Todas",
    "Perfil",
    "Casual",
    "Sensual",
    "Festas",
    "Viagens",
    "Outros",
  ];

  const handleUpload = async () => {
    setUploading(true);
    try {
      // TODO: Implementar upload de arquivo
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleVisibilidade = (id: string) => {
    setMidias((prev) =>
      prev.map((m) => (m.id === id ? { ...m, publico: !m.publico } : m))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta mídia?")) {
      setMidias((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const midiasFiltered =
    filtroCategoria === "todas"
      ? midias
      : midias.filter((m) => m.categoria.toLowerCase() === filtroCategoria.toLowerCase());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Galeria 📸</h1>
        <p className="text-gray-400">
          Organize suas fotos e vídeos por categorias
        </p>
      </div>

      {/* Upload */}
      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
        <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-red-500/50 transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Enviar Fotos ou Vídeos</h3>
          <p className="text-gray-400 mb-4">
            Arraste arquivos aqui ou clique para selecionar
          </p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {uploading ? "Enviando..." : "Selecionar Arquivos"}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            JPG, PNG, GIF, MP4. Máximo 50MB por arquivo.
          </p>
        </div>
      </div>

      {/* Filtros e Visualização */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat.toLowerCase())}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filtroCategoria === cat.toLowerCase()
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modo de Visualização */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Galeria */}
      {midiasFiltered.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            Nenhuma mídia na galeria ainda
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Faça upload de fotos e vídeos para começar
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {midiasFiltered.map((midia) => (
            <div
              key={midia.id}
              className="group relative aspect-square bg-gray-900 rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500/40 transition-all"
            >
              {midia.tipo === "foto" ? (
                <img
                  src={midia.url}
                  alt="Galeria"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={midia.url}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleToggleVisibilidade(midia.id)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title={midia.publico ? "Tornar privado" : "Tornar público"}
                >
                  {midia.publico ? (
                    <Unlock className="w-5 h-5" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(midia.id)}
                  className="p-2 bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Badge de Tipo */}
              <div className="absolute top-2 left-2">
                {midia.tipo === "video" ? (
                  <div className="px-2 py-1 bg-black/80 rounded-lg flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span className="text-xs font-semibold">Vídeo</span>
                  </div>
                ) : null}
              </div>

              {/* Badge de Visibilidade */}
              <div className="absolute top-2 right-2">
                <div
                  className={`px-2 py-1 rounded-lg flex items-center gap-1 ${
                    midia.publico
                      ? "bg-green-600/80"
                      : "bg-gray-800/80"
                  }`}
                >
                  {midia.publico ? (
                    <Unlock className="w-3 h-3" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                  <span className="text-xs font-semibold">
                    {midia.publico ? "Público" : "Privado"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {midiasFiltered.map((midia) => (
            <div
              key={midia.id}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-xl p-4 flex items-center gap-4 hover:border-red-500/40 transition-all"
            >
              <div className="w-20 h-20 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                {midia.tipo === "foto" ? (
                  <img
                    src={midia.url}
                    alt="Galeria"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={midia.url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {midia.tipo === "video" ? (
                    <Video className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="font-semibold capitalize">
                    {midia.categoria}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(midia.criado_em).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleVisibilidade(midia.id)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                    midia.publico
                      ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {midia.publico ? (
                    <span className="flex items-center gap-1">
                      <Unlock className="w-4 h-4" />
                      Público
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Privado
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(midia.id)}
                  className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
