import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Usuario, UsuarioRegistro } from '../models/usuario.model';
import { API_BASE_URL } from '../core/api-config';
import { mensagemErroHttp } from '../core/erro-http.util';

const URL_USUARIOS = `${API_BASE_URL}/usuarios`;
const CHAVE_SESSAO = 'florscan_sessao_v1';

export interface ResultadoCadastro { sucesso: boolean; mensagem: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly atualSubject = new BehaviorSubject<Usuario | null>(this.carregarSessao());
  readonly usuario$ = this.atualSubject.asObservable();

  get usuarioAtual(): Usuario | null { return this.atualSubject.value; }
  get estaAutenticado(): boolean { return this.usuarioAtual !== null; }
  get ehAdmin(): boolean { return this.usuarioAtual?.perfil === 'admin'; }

  constructor(private readonly http: HttpClient) {}

  /** Retorna true em caso de sucesso, false para credenciais inválidas. Erros de rede são propagados ao observable. */
  login(email: string, senha: string): Observable<boolean> {
    const emailNormalizado = email.trim().toLowerCase();
    return this.http.get<UsuarioRegistro[]>(`${URL_USUARIOS}?email=${encodeURIComponent(emailNormalizado)}`).pipe(
      map(usuarios => {
        const usuario = usuarios.find(pessoa => pessoa.senha === senha);
        if (!usuario) return false;
        this.definirSessao(this.semSenha(usuario));
        return true;
      }),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'entrar na conta'))))
    );
  }

  cadastrar(nome: string, email: string, senha: string): Observable<ResultadoCadastro> {
    const nomeNormalizado = nome.trim();
    const emailNormalizado = email.trim().toLowerCase();
    if (nomeNormalizado.length < 2 || senha.length < 6 || !/^\S+@\S+\.\S+$/.test(emailNormalizado)) {
      return of({ sucesso: false, mensagem: 'Verifique nome, e-mail e senha (mínimo de 6 caracteres).' });
    }
    return this.http.get<UsuarioRegistro[]>(`${URL_USUARIOS}?email=${encodeURIComponent(emailNormalizado)}`).pipe(
      switchMap(existentes => {
        if (existentes.length > 0) return of<ResultadoCadastro>({ sucesso: false, mensagem: 'Este e-mail já está cadastrado.' });
        const novoUsuario: Omit<UsuarioRegistro, 'id'> = { nome: nomeNormalizado, email: emailNormalizado, senha, perfil: 'visitante' };
        return this.http.post<UsuarioRegistro>(URL_USUARIOS, novoUsuario).pipe(
          map(usuarioCriado => {
            this.definirSessao(this.semSenha(usuarioCriado));
            return { sucesso: true, mensagem: 'Conta criada com sucesso.' };
          })
        );
      }),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'criar a conta'))))
    );
  }

  sair(): void {
    this.definirSessao(null);
  }

  private definirSessao(usuario: Usuario | null): void {
    this.atualSubject.next(usuario);
    try {
      if (typeof sessionStorage === 'undefined') return;
      if (usuario) sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
      else sessionStorage.removeItem(CHAVE_SESSAO);
    } catch { /* sessão persiste apenas em memória */ }
  }

  private semSenha(usuario: UsuarioRegistro): Usuario {
    return { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil };
  }

  private carregarSessao(): Usuario | null {
    try {
      const salvo = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(CHAVE_SESSAO) : null;
      return salvo ? JSON.parse(salvo) as Usuario : null;
    } catch { return null; }
  }
}
