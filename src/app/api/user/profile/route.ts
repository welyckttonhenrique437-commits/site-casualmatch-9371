import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userId, nome, apelido, idade, bio, preferencias, perfilAnonimo, fotoPerfil } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Atualizar perfil do usuário
    const { data: user, error } = await supabase
      .from('usuarios')
      .update({
        nome: nome || undefined,
        apelido: apelido || undefined,
        idade: idade ? parseInt(idade) : undefined,
        bio: bio || undefined,
        preferencias: preferencias || undefined,
        perfil_anonimo: perfilAnonimo !== undefined ? perfilAnonimo : undefined,
        foto_perfil: fotoPerfil || undefined,
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar perfil:', error);
      return NextResponse.json(
        { error: 'Erro ao atualizar perfil' },
        { status: 500 }
      );
    }

    // Remover senha do retorno
    const { senha_hash, ...userSemSenha } = user;

    return NextResponse.json({
      success: true,
      user: userSemSenha,
      message: 'Perfil atualizado com sucesso',
    });
  } catch (error: any) {
    console.error('Erro na API de atualização de perfil:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
