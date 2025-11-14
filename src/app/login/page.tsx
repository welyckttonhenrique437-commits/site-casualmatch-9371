"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro do campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "E-mail inválido";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Implementar chamada real à API de login
      // Por enquanto, simular login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar sessão
        localStorage.setItem("casualmatch_user", JSON.stringify(data.user));
        
        // Redirecionar para dashboard
        router.push("/dashboard");
      } else {
        const error = await response.json();
        setErrors({ geral: error.message || "Erro ao fazer login" });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrors({ geral: "Erro ao conectar com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-red-900/20 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <Flame className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              CasualMatch
            </h1>
          </Link>
        </div>
      </header>

      {/* Form */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">Bem-vindo de volta 🔥</h2>
            <p className="text-gray-400">
              Entre e continue suas conexões picantes
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8 space-y-6"
          >
            {errors.geral && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {errors.geral}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-semibold mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors pr-12"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="text-red-400 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Esqueceu a senha */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            {/* Cadastro */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Ainda não tem conta?{" "}
                <Link
                  href="/cadastro"
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Cadastre-se agora
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
