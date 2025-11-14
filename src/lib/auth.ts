import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

export interface SignUpData {
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  uf: string;
  dataNascimento: string;
  genero: 'masculino' | 'feminino' | 'casal' | 'outro';
}

export interface SignInData {
  email: string;
  senha: string;
}

/**
 * Registrar novo usuário
 */
export async function signUp(data: SignUpData) {
  try {
    // Hash da senha
    const senhaHash = await bcrypt.hash(data.senha, 10);

    // Inserir usuário no banco
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          email: data.email,
          nome: data.nome,
          senha_hash: senhaHash,
          cidade: data.cidade,
          uf: data.uf,
          data_nascimento: data.dataNascimento,
          genero: data.genero,
          status: 'pendente_pagamento',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, user };
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Login de usuário
 */
export async function signIn(data: SignInData) {
  try {
    // Buscar usuário por email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.email)
      .single();

    if (error || !user) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(data.senha, user.senha_hash);

    if (!senhaValida) {
      return { success: false, error: 'Senha incorreta' };
    }

    // Remover senha do retorno
    const { senha_hash, ...userSemSenha } = user;

    return { success: true, user: userSemSenha };
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verificar se usuário tem assinatura ativa
 */
export async function checkSubscriptionStatus(userId: string) {
  try {
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = não encontrado (ok)
      throw error;
    }

    return {
      hasActiveSubscription: Boolean(subscription),
      subscription,
    };
  } catch (error: any) {
    console.error('Erro ao verificar assinatura:', error);
    return { hasActiveSubscription: false, subscription: null };
  }
}

/**
 * Atualizar status do usuário
 */
export async function updateUserStatus(userId: string, status: string) {
  try {
    const { error } = await supabase
      .from('users')
      .update({ status, atualizado_em: new Date().toISOString() })
      .eq('id', userId);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao atualizar status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Buscar usuário por ID
 */
export async function getUserById(userId: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Remover senha do retorno
    const { senha_hash, ...userSemSenha } = user;

    return { success: true, user: userSemSenha };
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    return { success: false, error: error.message };
  }
}
