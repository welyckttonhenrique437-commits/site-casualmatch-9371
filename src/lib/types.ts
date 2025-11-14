// Tipos para o sistema CasualMatch

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string; // Não retornar em queries públicas
  cidade: string;
  uf: string;
  dataNascimento: string;
  genero: "masculino" | "feminino" | "casal" | "outro";
  bio?: string;
  fotoPerfil?: string;
  fotosCapa?: string[];
  status: "pendente_pagamento" | "ativo" | "suspenso" | "banido";
  pagamentoId?: string;
  pagamentoData?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Post {
  id: string;
  usuarioId: string;
  usuario?: Usuario;
  conteudo: string;
  midia?: {
    tipo: "foto" | "video";
    url: string;
  }[];
  curtidas: number;
  comentarios: number;
  criadoEm: string;
}

export interface Comentario {
  id: string;
  postId: string;
  usuarioId: string;
  usuario?: Usuario;
  conteudo: string;
  criadoEm: string;
}

export interface Mensagem {
  id: string;
  remetenteId: string;
  destinatarioId: string;
  conteudo: string;
  midia?: {
    tipo: "foto" | "video";
    url: string;
  };
  lida: boolean;
  criadoEm: string;
}

export interface Notificacao {
  id: string;
  usuarioId: string;
  tipo: "curtida" | "comentario" | "seguidor" | "mensagem";
  remetenteId: string;
  remetente?: Usuario;
  postId?: string;
  lida: boolean;
  criadoEm: string;
}

export interface Denuncia {
  id: string;
  denuncianteId: string;
  denunciadoId?: string;
  postId?: string;
  motivo: string;
  descricao: string;
  status: "pendente" | "analisando" | "resolvida" | "rejeitada";
  criadoEm: string;
}

export interface Pagamento {
  id: string;
  usuarioId: string;
  kiwifyTransactionId: string;
  valor: number;
  status: "pendente" | "aprovado" | "recusado" | "reembolsado";
  criadoEm: string;
  aprovadomEm?: string;
}
