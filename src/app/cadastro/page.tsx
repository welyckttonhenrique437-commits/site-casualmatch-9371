"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, ArrowLeft, Check } from "lucide-react";

// Lista completa de cidades do Brasil por estado
const cidadesPorEstado: Record<string, string[]> = {
  AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó", "Senador Guiomard", "Plácido de Castro", "Brasiléia", "Xapuri", "Epitaciolândia"],
  AL: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo", "União dos Palmares", "São Miguel dos Campos", "Santana do Ipanema", "Delmiro Gouveia", "Coruripe"],
  AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão", "Porto Grande", "Tartarugalzinho", "Vitória do Jari", "Pedra Branca do Amapari", "Calçoene"],
  AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari", "Tefé", "Tabatinga", "Maués", "Humaitá", "São Gabriel da Cachoeira"],
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro", "Lauro de Freitas", "Ilhéus", "Jequié", "Teixeira de Freitas", "Alagoinhas", "Barreiras", "Paulo Afonso", "Simões Filho", "Santo Antônio de Jesus"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá", "Canindé", "Pacajus", "Aquiraz", "Crateús", "Russas"],
  DF: ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina", "Águas Claras", "Gama", "Santa Maria", "Recanto das Emas", "Sobradinho"],
  ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Viana", "Cachoeiro de Itapemirim", "Linhares", "São Mateus", "Colatina", "Guarapari", "Aracruz", "Venda Nova do Imigrante", "Domingos Martins", "Afonso Cláudio", "Santa Teresa"],
  GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama", "Itumbiara", "Senador Canedo", "Catalão", "Jataí", "Planaltina"],
  MA: ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas", "Santa Inês", "Pinheiro", "Pedreiras", "Chapadinha", "Barra do Corda"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Sorriso", "Lucas do Rio Verde", "Barra do Garças", "Primavera do Leste", "Alta Floresta", "Pontes e Lacerda", "Juína", "Colíder", "Nova Mutum"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Aquidauana", "Nova Andradina", "Maracaju", "Sidrolândia", "Naviraí", "Paranaíba", "Coxim", "Rio Brilhante", "Amambai", "São Gabriel do Oeste"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga", "Santa Luzia", "Sete Lagoas", "Divinópolis", "Ibirité", "Poços de Caldas", "Patos de Minas", "Teófilo Otoni", "Sabará", "Pouso Alegre", "Barbacena"],
  PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal", "Parauapebas", "Itaituba", "Cametá", "Bragança", "Abaetetuba", "Marituba", "Altamira", "Tucuruí", "Paragominas", "Redenção"],
  PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cajazeiras", "Guarabira", "Cabedelo", "Mamanguape", "Sapé", "Pombal", "Monteiro", "Princesa Isabel", "Esperança"],
  PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais", "Campo Largo", "Almirante Tamandaré", "Umuarama", "Piraquara", "Cambé", "Paranavaí"],
  PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão", "Igarassu", "São Lourenço da Mata", "Abreu e Lima", "Santa Cruz do Capibaribe", "Ipojuca"],
  PI: ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior", "Barras", "União", "Altos", "Pedro II", "Oeiras", "São Raimundo Nonato", "Esperantina", "Valença do Piauí", "Luís Correia"],
  RJ: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "São João de Meriti", "Petrópolis", "Volta Redonda", "Magé", "Itaboraí", "Macaé", "Cabo Frio", "Nova Friburgo", "Barra Mansa", "Angra dos Reis", "Mesquita", "Teresópolis", "Nilópolis"],
  RN: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Caicó", "Assu", "Currais Novos", "São José de Mipibu", "Nova Cruz", "Pau dos Ferros", "Santa Cruz", "Apodi", "João Câmara"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul", "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba"],
  RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Jaru", "Rolim de Moura", "Guajará-Mirim", "Pimenta Bueno", "Buritis", "Ouro Preto do Oeste", "Espigão d'Oeste", "Colorado do Oeste", "Cerejeiras", "Machadinho d'Oeste"],
  RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Mucajaí", "Alto Alegre", "Bonfim", "Cantá", "Normandia", "Pacaraima", "São João da Baliza"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí", "Jaraguá do Sul", "Lages", "Palhoça", "Balneário Camboriú", "Brusque", "Tubarão", "São Bento do Sul", "Caçador", "Camboriú", "Navegantes", "Concórdia", "Rio do Sul", "Araranguá"],
  SP: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "São José dos Campos", "Ribeirão Preto", "Sorocaba", "Mauá", "São José do Rio Preto", "Santos", "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba", "Piracicaba", "Bauru", "Itaquaquecetuba", "São Vicente", "Franca", "Guarujá", "Taubaté", "Praia Grande", "Limeira", "Suzano", "Taboão da Serra", "Sumaré", "Barueri", "Embu das Artes"],
  SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "São Cristóvão", "Propriá", "Tobias Barreto", "Simão Dias", "Laranjeiras", "Barra dos Coqueiros", "Itabaianinha", "Umbaúba", "Indiaroba", "Poço Verde"],
  TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins", "Guaraí", "Tocantinópolis", "Miracema do Tocantins", "Araguatins", "Dianópolis", "Formoso do Araguaia", "Pedro Afonso", "Augustinópolis", "Taguatinga"]
};

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
      [name]: type === "checkbox" ? checked : value,
      // Limpar cidade quando mudar o estado
      ...(name === "uf" ? { cidade: "" } : {})
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

    try {
      // Chamar API de cadastro
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          cidade: formData.cidade,
          uf: formData.uf,
          dataNascimento: formData.dataNascimento,
          genero: formData.genero,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar dados do usuário temporariamente
        localStorage.setItem("casualmatch_user", JSON.stringify(data.user));
        
        // Redirecionar para Kiwify com link correto
        window.location.href = "https://pay.kiwify.com.br/45SDQNS";
      } else {
        setErrors({ geral: data.error || "Erro ao criar conta" });
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErrors({ geral: "Erro ao conectar com o servidor" });
      setLoading(false);
    }
  };

  // Obter cidades do estado selecionado
  const cidadesDisponiveis = formData.uf ? cidadesPorEstado[formData.uf] || [] : [];

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
            {errors.geral && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {errors.geral}
              </div>
            )}

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
              <div>
                <label htmlFor="uf" className="block text-sm font-semibold mb-2">
                  Estado *
                </label>
                <select
                  id="uf"
                  name="uf"
                  value={formData.uf}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecione</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                {errors.uf && <p className="text-red-400 text-sm mt-1">{errors.uf}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="cidade" className="block text-sm font-semibold mb-2">
                  Cidade *
                </label>
                <select
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  disabled={!formData.uf}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.uf ? "Selecione a cidade" : "Selecione o estado primeiro"}
                  </option>
                  {cidadesDisponiveis.map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
                {errors.cidade && <p className="text-red-400 text-sm mt-1">{errors.cidade}</p>}
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
              {loading ? "Processando..." : "Continuar para o Pagamento (R$ 19,90/mês)"}
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
