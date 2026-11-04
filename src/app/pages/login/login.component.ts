import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', standalone: false, templateUrl: './login.component.html' })
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  mostrarSenha = false;

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly rota: ActivatedRoute) {}

  entrar(): void {
    this.erro = '';
    if (!this.auth.login(this.email, this.senha)) {
      this.erro = 'E-mail ou senha incorretos. Confira os dados e tente novamente.';
      return;
    }
    const retorno = this.rota.snapshot.queryParamMap.get('retorno');
    const destino = retorno?.startsWith('/') && !retorno.startsWith('//') ? retorno : (this.auth.ehAdmin ? '/dashboard' : '/catalogo');
    void this.router.navigateByUrl(destino);
  }
  usarDemo(): void { this.email = 'admin@florscan.com'; this.senha = 'FlorScan123'; this.erro = ''; }
}
