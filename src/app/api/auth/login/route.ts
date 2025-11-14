import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await signIn({ email, senha });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Erro ao fazer login' },
        { status: 401 }
      );
    }

    // Criar resposta com cookie de sessão
    const response = NextResponse.json({
      success: true,
      user: result.user,
    });

    // Definir cookie de sessão (7 dias)
    response.cookies.set('casualmatch_session', JSON.stringify(result.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Erro na API de login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
