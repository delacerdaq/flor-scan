import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-cadastro', standalone: false, templateUrl: './cadastro.component.html' })
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  aceitoTermos = false;
  erro = '';
  constructor(private readonly auth: AuthService, private readonly router: Router) {}
  cadastrar(): void {
    this.erro = '';
    if (this.senha !== this.confirmarSenha) { this.erro = 'As senhas informadas não coincidem.'; return; }
    if (!this.aceitoTermos) { this.erro = 'Confirme que compreende o caráter demonstrativo da aplicação.'; return; }
    const resultado = this.auth.cadastrar(this.nome, this.email, this.senha);
    if (!resultado.sucesso) { this.erro = resultado.mensagem; return; }
    void this.router.navigateByUrl('/catalogo');
  }
}
