"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, ArrowLeft, Check } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cidade: "",
    uf: "",
    dataNascimento: "",
    genero: "",
    aceitaTermos: false,
    maior18: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória";
    if (formData.senha.length < 6) newErrors.senha = "Senha deve ter no mínimo 6 caracteres";
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = "As senhas não coincidem";
    if (!formData.cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!formData.uf) newErrors.uf = "Estado é obrigatório";
    if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória";
    if (!formData.genero) newErrors.genero = "Gênero é obrigatório";
    if (!formData.maior18) newErrors.maior18 = "Você deve confirmar que tem mais de 18 anos";
    if (!formData.aceitaTermos) newErrors.aceitaTermos = "Você deve aceitar os termos de uso";

    // Validar idade (18+)
    if (formData.dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(formData.dataNascimento);
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth() - nascimento.getMonth();
      
      if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())) {
        if (idade - 1 < 18) {
          newErrors.dataNascimento = "Você deve ter 18 anos ou mais";
        }
      } else if (idade < 18) {
        newErrors.dataNascimento = "Você deve ter 18 anos ou mais";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simular salvamento (aqui você integraria com seu backend/Supabase)
    setTimeout(() => {
      // Salvar dados no localStorage temporariamente
      localStorage.setItem("cadastro_pendente", JSON.stringify({
        ...formData,
        id: Date.now(),
        status: "pendente_pagamento",
        criadoEm: new Date().toISOString()
      }));

      // Redirecionar para Kiwify
      window.location.href = "https://pay.kiwify.com.br/BZSQnpu";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-red-900/20 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">
              Crie sua conta
            </h2>
            <p className="text-gray-400">
              Preencha os dados abaixo e libere seu acesso em segundos 🔥
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/20 rounded-2xl p-8 space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Seu nome"
              />
              {errors.nome && <p className="text-red-400 text-sm mt-1">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                E-mail *
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
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Senha */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="block text-sm font-semibold mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && <p className="text-red-400 text-sm mt-1">{errors.senha}</p>}
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-semibold mb-2">
                  Confirmar senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Repita a senha"
                />
                {errors.confirmarSenha && <p className="text-red-400 text-sm mt-1">{errors.confirmarSenha}</p>}
              </div>
            </div>

            {/* Localização */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cidade" className="block text-sm font-semibold mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Sua cidade"
                />
                {errors.cidade && <p className="text-red-400 text-sm mt-1">{errors.cidade}</p>}
              </div>

              <div>
                <label htmlFor="uf" className="block text-sm font-semibold mb-2">
                  UF *
                </label>
                <select
                  id="uf"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">UF</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                {errors.uf && <p className="text-red-400 text-sm mt-1">{errors.uf}</p>}
              </div>
            </div>

            {/* Data de Nascimento e Gênero */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-semibold mb-2">
                  Data de nascimento *
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
                {errors.dataNascimento && <p className="text-red-400 text-sm mt-1">{errors.dataNascimento}</p>}
              </div>

              <div>
                <label htmlFor="genero" className="block text-sm font-semibold mb-2">
                  Gênero *
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="casal">Casal</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.genero && <p className="text-red-400 text-sm mt-1">{errors.genero}</p>}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    name="maior18"
                    checked={formData.maior18}
                    onChange={handleChange}
                    className="w-5 h-5 bg-black/50 border-2 border-gray-700 rounded checked:bg-red-500 checked:border-red-500 cursor-pointer"
                  />
                  {formData.maior18 && (
                    <Check className="w-4 h-4 text-white absolute pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Confirmo que tenho <strong className="text-red-400">18 anos ou mais</strong> e estou ciente de que este é um site de conteúdo adulto.
                </span>
              </label>
              {errors.maior18 && <p className="text-red-400 text-sm">{errors.maior18}</p>}

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    name="aceitaTermos"
                    checked={formData.aceitaTermos}
                    onChange={handleChange}
                    className="w-5 h-5 bg-black/50 border-2 border-gray-700 rounded checked:bg-red-500 checked:border-red-500 cursor-pointer"
                  />
                  {formData.aceitaTermos && (
                    <Check className="w-4 h-4 text-white absolute pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Aceito os <a href="#" className="text-red-400 hover:underline">Termos de Uso</a> e a <a href="#" className="text-red-400 hover:underline">Política de Privacidade</a>.
                </span>
              </label>
              {errors.aceitaTermos && <p className="text-red-400 text-sm">{errors.aceitaTermos}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Processando..." : "Continuar para o Pagamento (R$ 19,90)"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Ao clicar em continuar, você será redirecionado para a página de pagamento seguro.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
