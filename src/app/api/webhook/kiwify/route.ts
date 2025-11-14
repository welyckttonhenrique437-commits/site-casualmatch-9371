import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Webhook da Kiwify para processar eventos de assinatura
 * 
 * Eventos esperados:
 * - subscription.created: Nova assinatura criada
 * - subscription.paid: Pagamento confirmado
 * - subscription.canceled: Assinatura cancelada
 * - subscription.expired: Assinatura expirada
 * - subscription.failed: Falha no pagamento
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📥 Webhook Kiwify recebido:', body);

    const { event, data } = body;

    // Validar estrutura básica
    if (!event || !data) {
      return NextResponse.json(
        { error: 'Payload inválido' },
        { status: 400 }
      );
    }

    // Processar evento baseado no tipo
    switch (event) {
      case 'subscription.created':
        await handleSubscriptionCreated(data);
        break;

      case 'subscription.paid':
        await handleSubscriptionPaid(data);
        break;

      case 'subscription.canceled':
        await handleSubscriptionCanceled(data);
        break;

      case 'subscription.expired':
        await handleSubscriptionExpired(data);
        break;

      case 'subscription.failed':
        await handleSubscriptionFailed(data);
        break;

      default:
        console.log(`⚠️ Evento não tratado: ${event}`);
    }

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Nova assinatura criada (ainda não paga)
 */
async function handleSubscriptionCreated(data: any) {
  const { subscription_id, customer_email, amount } = data;

  console.log('🆕 Assinatura criada:', subscription_id);

  // Buscar usuário pelo email
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customer_email)
    .single();

  if (!user) {
    console.error('❌ Usuário não encontrado:', customer_email);
    return;
  }

  // Criar registro de assinatura
  await supabase.from('subscriptions').insert([
    {
      user_id: user.id,
      kiwify_subscription_id: subscription_id,
      status: 'pending',
      valor: amount / 100, // Kiwify envia em centavos
    },
  ]);

  // Criar registro de transação
  await supabase.from('transactions').insert([
    {
      user_id: user.id,
      kiwify_transaction_id: subscription_id,
      tipo: 'subscription',
      valor: amount / 100,
      status: 'pending',
    },
  ]);
}

/**
 * Pagamento confirmado - LIBERAR ACESSO
 */
async function handleSubscriptionPaid(data: any) {
  const { subscription_id, customer_email, next_payment_date } = data;

  console.log('✅ Pagamento confirmado:', subscription_id);

  // Buscar usuário pelo email
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customer_email)
    .single();

  if (!user) {
    console.error('❌ Usuário não encontrado:', customer_email);
    return;
  }

  // Atualizar status da assinatura
  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      proximo_pagamento: next_payment_date,
      atualizado_em: new Date().toISOString(),
    })
    .eq('kiwify_subscription_id', subscription_id);

  // Atualizar status do usuário para ATIVO
  await supabase
    .from('users')
    .update({
      status: 'ativo',
      atualizado_em: new Date().toISOString(),
    })
    .eq('id', user.id);

  // Atualizar transação
  await supabase
    .from('transactions')
    .update({
      status: 'approved',
      aprovado_em: new Date().toISOString(),
    })
    .eq('kiwify_transaction_id', subscription_id);

  console.log('🎉 Acesso liberado para:', customer_email);

  // TODO: Enviar email de boas-vindas
}

/**
 * Assinatura cancelada pelo usuário
 */
async function handleSubscriptionCanceled(data: any) {
  const { subscription_id, customer_email } = data;

  console.log('❌ Assinatura cancelada:', subscription_id);

  // Atualizar status da assinatura
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      atualizado_em: new Date().toISOString(),
    })
    .eq('kiwify_subscription_id', subscription_id);

  // Buscar usuário e atualizar status
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customer_email)
    .single();

  if (user) {
    await supabase
      .from('users')
      .update({
        status: 'suspenso',
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', user.id);
  }
}

/**
 * Assinatura expirada (não renovada)
 */
async function handleSubscriptionExpired(data: any) {
  const { subscription_id, customer_email } = data;

  console.log('⏰ Assinatura expirada:', subscription_id);

  // Atualizar status da assinatura
  await supabase
    .from('subscriptions')
    .update({
      status: 'expired',
      atualizado_em: new Date().toISOString(),
    })
    .eq('kiwify_subscription_id', subscription_id);

  // Buscar usuário e atualizar status
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customer_email)
    .single();

  if (user) {
    await supabase
      .from('users')
      .update({
        status: 'suspenso',
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', user.id);
  }
}

/**
 * Falha no pagamento da renovação
 */
async function handleSubscriptionFailed(data: any) {
  const { subscription_id, customer_email } = data;

  console.log('⚠️ Falha no pagamento:', subscription_id);

  // Atualizar status da assinatura
  await supabase
    .from('subscriptions')
    .update({
      status: 'failed',
      atualizado_em: new Date().toISOString(),
    })
    .eq('kiwify_subscription_id', subscription_id);

  // Criar transação de falha
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', customer_email)
    .single();

  if (user) {
    await supabase.from('transactions').insert([
      {
        user_id: user.id,
        kiwify_transaction_id: `${subscription_id}_failed_${Date.now()}`,
        tipo: 'renewal',
        valor: 19.90,
        status: 'refused',
      },
    ]);

    // Manter usuário ativo por período de carência (7 dias)
    // TODO: Implementar lógica de carência
  }
}
