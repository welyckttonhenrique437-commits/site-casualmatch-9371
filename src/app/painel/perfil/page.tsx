"use client";

import { useState, useEffect } from "react";
import { Camera, Save, User } from "lucide-react";

export default function PerfilPage() {
  const [formData, setFormData] = useState({
    nome: "",
    apelido: "",
    idade: "",
    bio: "",
    preferencias: [] as string[],
    perfilAnonimo: false,
    fotoPerfil: "",
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem("casualmatch_user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
      setFormData({
        nome: user.nome || "",
        apelido: user.apelido || "",
        idade: user.idade?.toString() || "",
        bio: user.bio || "",
        preferencias: user.preferencias || [],
        perfilAnonimo: user.perfil_anonimo || false,
        fotoPerfil: user.foto_perfil || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePreferenceToggle = (pref: string) => {
    setFormData((prev) => ({
      ...prev,
      preferencias: prev.preferencias.includes(pref)
        ? prev.preferencias.filter((p) => p !== pref)
        : [...prev.preferencias, pref],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      setError("Usuário não identificado");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          nome: formData.nome,
          apelido: formData.apelido,
          idade: formData.idade,
          bio: formData.bio,
          preferencias: formData.preferencias,
          perfilAnonimo: formData.perfilAnonimo,
          fotoPerfil: formData.fotoPerfil,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Atualizar localStorage
        localStorage.setItem("casualmatch_user", JSON.stringify(data.user));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const preferencesOptions = [
    "Encontros casuais",
    "Relacionamento aberto",
    "Amizade colorida",
    "Swing",
    "Festas",
    "Conversas picantes",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-gray-400">
          Configure suas informações e preferências
        </p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400">
          ✓ Perfil atualizado com sucesso!
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto de Perfil */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Foto de Perfil</h2>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
              {formData.fotoPerfil ? (
                <img
                  src={formData.fotoPerfil}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-600" />
              )}
            </div>
            <div>
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                <Camera className="w-5 h-5" />
                Alterar Foto
              </button>
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG ou GIF. Máximo 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8 space-y-6">
          <h2 className="text-xl font-bold">Informações Básicas</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Apelido (opcional)
              </label>
              <input
                type="text"
                name="apelido"
                value={formData.apelido}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Como prefere ser chamado"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Idade</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
              placeholder="Sua idade"
              min="18"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Descrição / Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none"
              placeholder="Conte um pouco sobre você e o que procura..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.bio.length}/500 caracteres
            </p>
          </div>
        </div>

        {/* Preferências */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Preferências</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {preferencesOptions.map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => handlePreferenceToggle(pref)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  formData.preferencias.includes(pref)
                    ? "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Privacidade */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Privacidade</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="perfilAnonimo"
              checked={formData.perfilAnonimo}
              onChange={handleChange}
              className="w-5 h-5 bg-black/50 border-2 border-gray-700 rounded checked:bg-red-500 checked:border-red-500 cursor-pointer"
            />
            <div>
              <p className="font-semibold">Perfil Anônimo</p>
              <p className="text-sm text-gray-400">
                Ocultar seu nome real e mostrar apenas apelido
              </p>
            </div>
          </label>
        </div>

        {/* Botão Salvar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
