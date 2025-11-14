// Constantes da plataforma CasualMatch

export const PLATAFORMA = {
  NOME: "CasualMatch",
  DOMINIO: "casualmatch.com.br",
  DESCRICAO: "A rede social adulta para encontros reais, intensos e sem filtros",
  IDADE_MINIMA: 18,
} as const;

export const ASSINATURA = {
  VALOR_MENSAL: 19.90,
  CHECKOUT_URL: "https://pay.kiwify.com.br/45SDQNS",
  PLANO: "mensal",
} as const;

export const ESTADOS_BRASIL = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
] as const;

export const GENEROS = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "casal", label: "Casal" },
  { value: "outro", label: "Outro" },
] as const;

export const TIPOS_DENUNCIA = [
  { value: "conteudo_inapropriado", label: "Conteúdo Inapropriado" },
  { value: "assedio", label: "Assédio" },
  { value: "spam", label: "Spam" },
  { value: "outro", label: "Outro" },
] as const;

export const STATUS_ASSINATURA = {
  ATIVA: "ativa",
  PENDENTE: "pendente",
  CANCELADA: "cancelada",
  INADIMPLENTE: "inadimplente",
} as const;

export const WEBHOOK_EVENTS = {
  SUBSCRIPTION_CREATED: "subscription.created",
  PAYMENT_APPROVED: "subscription.payment_approved",
  PAYMENT_FAILED: "subscription.payment_failed",
  SUBSCRIPTION_CANCELLED: "subscription.cancelled",
} as const;

export const LIMITES = {
  MAX_FOTOS_PERFIL: 10,
  MAX_TAMANHO_FOTO: 5 * 1024 * 1024, // 5MB
  MAX_TAMANHO_VIDEO: 50 * 1024 * 1024, // 50MB
  MAX_CARACTERES_POST: 1000,
  MAX_CARACTERES_BIO: 500,
} as const;

export const MENSAGENS = {
  ERRO_GENERICO: "Ocorreu um erro. Tente novamente.",
  SUCESSO_CADASTRO: "Cadastro realizado com sucesso!",
  ERRO_MENOR_IDADE: "Você deve ter 18 anos ou mais para se cadastrar.",
  ERRO_EMAIL_INVALIDO: "E-mail inválido.",
  ERRO_SENHA_CURTA: "A senha deve ter no mínimo 6 caracteres.",
  ERRO_SENHAS_NAO_COINCIDEM: "As senhas não coincidem.",
  AGUARDANDO_PAGAMENTO: "Aguardando confirmação do pagamento...",
  PAGAMENTO_APROVADO: "Pagamento aprovado! Bem-vindo à CasualMatch!",
  PAGAMENTO_RECUSADO: "Pagamento não aprovado. Tente novamente.",
  ACESSO_RESTRITO: "Você precisa de uma assinatura ativa para acessar este conteúdo.",
} as const;
