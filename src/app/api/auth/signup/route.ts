import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { nome, email, senha, cidade, uf, dataNascimento, genero } = body;

    // Validações básicas
    if (!nome || !email || !senha || !cidade || !uf || !dataNascimento || !genero) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar idade (18+)
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth() - nascimento.getMonth();
    
    let idadeReal = idade;
    if (mesAtual < 0 || (mesAtual === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeReal = idade - 1;
    }

    if (idadeReal < 18) {
      return NextResponse.json(
        { error: 'Você deve ter 18 anos ou mais' },
        { status: 400 }
      );
    }

    // Criar usuário
    const result = await signUp({
      nome,
      email,
      senha,
      cidade,
      uf,
      dataNascimento,
      genero,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Erro ao criar conta' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      message: 'Conta criada com sucesso! Redirecionando para pagamento...',
    });
  } catch (error: any) {
    console.error('Erro na API de cadastro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
