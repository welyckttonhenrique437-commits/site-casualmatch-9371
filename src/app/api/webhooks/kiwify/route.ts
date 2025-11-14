import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Webhook da Kiwify para processar pagamentos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📩 Webhook Kiwify recebido:', body);

    // Validar se é um evento da Kiwify
    if (!body.order_id || !body.order_status) {
      return NextResponse.json(
        { error: 'Dados inválidos do webhook' },
        { status: 400 }
      );
    }

    const {
      order_id,
      order_status,
      customer_email,
      customer_name,
      product_name,
      order_amount,
      subscription_id,
    } = body;

    // Buscar usuário pelo email
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', customer_email)
      .single();

    if (userError || !usuario) {
      console.error('❌ Usuário não encontrado:', customer_email);
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Processar diferentes status de pagamento
    switch (order_status) {
      case 'paid':
      case 'approved':
        // Pagamento aprovado - liberar acesso
        await supabase
          .from('usuarios')
          .update({
            status: 'ativo',
            pagamentoId: order_id,
            pagamentoData: new Date().toISOString(),
            atualizadoEm: new Date().toISOString(),
          })
          .eq('id', usuario.id);

        // Registrar pagamento
        await supabase.from('pagamentos').insert({
          usuarioId: usuario.id,
          kiwifyTransactionId: order_id,
          kiwifySubscriptionId: subscription_id,
          valor: order_amount || 19.90,
          status: 'aprovado',
          criadoEm: new Date().toISOString(),
          aprovadoEm: new Date().toISOString(),
        });

        console.log('✅ Pagamento aprovado para:', customer_email);
        break;

      case 'refused':
      case 'refunded':
      case 'chargedback':
        // Pagamento recusado/reembolsado - bloquear acesso
        await supabase
          .from('usuarios')
          .update({
            status: 'pendente_pagamento',
            atualizadoEm: new Date().toISOString(),
          })
          .eq('id', usuario.id);

        // Atualizar registro de pagamento
        await supabase
          .from('pagamentos')
          .update({
            status: order_status === 'refunded' ? 'reembolsado' : 'recusado',
          })
          .eq('kiwifyTransactionId', order_id);

        console.log('❌ Pagamento recusado/reembolsado para:', customer_email);
        break;

      case 'canceled':
        // Assinatura cancelada
        await supabase
          .from('usuarios')
          .update({
            status: 'suspenso',
            atualizadoEm: new Date().toISOString(),
          })
          .eq('id', usuario.id);

        console.log('⚠️ Assinatura cancelada para:', customer_email);
        break;

      default:
        console.log('⚠️ Status desconhecido:', order_status);
    }

    return NextResponse.json({ success: true, message: 'Webhook processado' });
  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// Método GET para verificar se o webhook está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Webhook Kiwify está ativo',
    endpoint: '/api/webhooks/kiwify',
  });
}
