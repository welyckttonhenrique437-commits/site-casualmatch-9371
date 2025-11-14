// Tipos para o sistema CasualMatch

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha_hash?: string; // Não retornar em queries públicas
  cidade: string;
  uf: string;
  data_nascimento: string;
  genero: "masculino" | "feminino" | "casal" | "outro";
  bio?: string;
  foto_perfil?: string;
  fotos_capa?: string[];
  status: "pendente_pagamento" | "ativo" | "suspenso" | "banido";
  criado_em: string;
  atualizado_em: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  kiwify_subscription_id?: string;
  status: "pending" | "active" | "canceled" | "expired" | "failed";
  valor: number;
  proximo_pagamento?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  subscription_id?: string;
  kiwify_transaction_id?: string;
  tipo: "subscription" | "renewal" | "refund";
  valor: number;
  status: "pending" | "approved" | "refused" | "refunded";
  criado_em: string;
  aprovado_em?: string;
}

export interface Post {
  id: string;
  usuario_id: string;
  usuario?: Usuario;
  conteudo: string;
  midia?: {
    tipo: "foto" | "video";
    url: string;
  }[];
  curtidas: number;
  comentarios: number;
  criado_em: string;
}

export interface Comentario {
  id: string;
  post_id: string;
  usuario_id: string;
  usuario?: Usuario;
  conteudo: string;
  criado_em: string;
}

export interface Mensagem {
  id: string;
  remetente_id: string;
  destinatario_id: string;
  conteudo: string;
  midia?: {
    tipo: "foto" | "video";
    url: string;
  };
  lida: boolean;
  criado_em: string;
}

export interface Notificacao {
  id: string;
  usuario_id: string;
  tipo: "curtida" | "comentario" | "seguidor" | "mensagem";
  remetente_id: string;
  remetente?: Usuario;
  post_id?: string;
  lida: boolean;
  criado_em: string;
}

export interface Denuncia {
  id: string;
  denunciante_id: string;
  denunciado_id?: string;
  post_id?: string;
  motivo: string;
  descricao: string;
  status: "pendente" | "analisando" | "resolvida" | "rejeitada";
  criado_em: string;
}
