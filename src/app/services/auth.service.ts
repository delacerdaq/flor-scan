import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, UsuarioRegistro } from '../models/usuario.model';

const CHAVE_USUARIOS = 'florscan_usuarios_v1';
const CHAVE_SESSAO = 'florscan_sessao_v1';
const ADMIN_DEMO: UsuarioRegistro = {
  id: 1, nome: 'Admin FlorScan', email: 'admin@florscan.com', senha: 'FlorScan123', perfil: 'admin'
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: UsuarioRegistro[] = this.carregarUsuarios();
  private readonly atualSubject = new BehaviorSubject<Usuario | null>(this.carregarSessao());
  readonly usuario$ = this.atualSubject.asObservable();

  get usuarioAtual(): Usuario | null { return this.atualSubject.value; }
  get estaAutenticado(): boolean { return this.usuarioAtual !== null; }
  get ehAdmin(): boolean { return this.usuarioAtual?.perfil === 'admin'; }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(pessoa => pessoa.email.toLowerCase() === email.trim().toLowerCase() && pessoa.senha === senha);
    if (!usuario) return false;
    this.definirSessao(this.semSenha(usuario));
    return true;
  }

  cadastrar(nome: string, email: string, senha: string): { sucesso: boolean; mensagem: string } {
    const emailNormalizado = email.trim().toLowerCase();
    if (this.usuarios.some(usuario => usuario.email.toLowerCase() === emailNormalizado)) {
      return { sucesso: false, mensagem: 'Este e-mail já está cadastrado.' };
    }
    if (nome.trim().length < 2 || senha.length < 6 || !/^\S+@\S+\.\S+$/.test(emailNormalizado)) {
      return { sucesso: false, mensagem: 'Verifique nome, e-mail e senha (mínimo de 6 caracteres).' };
    }
    const usuario: UsuarioRegistro = {
      id: Math.max(...this.usuarios.map(pessoa => pessoa.id), 0) + 1,
      nome: nome.trim(), email: emailNormalizado, senha, perfil: 'visitante'
    };
    this.usuarios = [...this.usuarios, usuario];
    this.gravar('localStorage', CHAVE_USUARIOS, JSON.stringify(this.usuarios));
    this.definirSessao(this.semSenha(usuario));
    return { sucesso: true, mensagem: 'Conta criada com sucesso.' };
  }

  sair(): void {
    this.definirSessao(null);
  }

  private definirSessao(usuario: Usuario | null): void {
    this.atualSubject.next(usuario);
    if (usuario) this.gravar('sessionStorage', CHAVE_SESSAO, JSON.stringify(usuario));
    else {
      try { if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(CHAVE_SESSAO); } catch { /* no-op */ }
    }
  }

  private semSenha(usuario: UsuarioRegistro): Usuario {
    return { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil };
  }

  private carregarUsuarios(): UsuarioRegistro[] {
    try {
      const salvo = typeof localStorage !== 'undefined' ? localStorage.getItem(CHAVE_USUARIOS) : null;
      const dados: unknown = salvo ? JSON.parse(salvo) : [];
      if (Array.isArray(dados)) {
        const clientes = (dados as UsuarioRegistro[]).filter(usuario => usuario.email !== ADMIN_DEMO.email);
        return [ADMIN_DEMO, ...clientes];
      }
    } catch { /* mantém conta de demonstração */ }
    return [ADMIN_DEMO];
  }

  private carregarSessao(): Usuario | null {
    try {
      const salvo = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(CHAVE_SESSAO) : null;
      return salvo ? JSON.parse(salvo) as Usuario : null;
    } catch { return null; }
  }

  private gravar(tipo: 'sessionStorage' | 'localStorage', chave: string, valor: string): void {
    try { if (typeof window !== 'undefined') window[tipo].setItem(chave, valor); } catch { /* sem persistência */ }
  }
}
