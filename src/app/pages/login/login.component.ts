import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', standalone: false, templateUrl: './login.component.html' })
export class LoginComponent {
  mostrarSenha = false;
  enviando = false;
  tentouEnviar = false;
  erro = '';

  readonly formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

  get email() { return this.formulario.controls.email; }
  get senha() { return this.formulario.controls.senha; }

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly rota: ActivatedRoute
  ) {}

  entrar(): void {
    this.erro = '';
    this.tentouEnviar = true;
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; }
    this.enviando = true;
    const { email, senha } = this.formulario.getRawValue();
    this.auth.login(email, senha).subscribe({
      next: sucesso => {
        this.enviando = false;
        if (!sucesso) { this.erro = 'E-mail ou senha incorretos. Confira os dados e tente novamente.'; return; }
        const retorno = this.rota.snapshot.queryParamMap.get('retorno');
        const destino = retorno?.startsWith('/') && !retorno.startsWith('//') ? retorno : (this.auth.ehAdmin ? '/dashboard' : '/catalogo');
        void this.router.navigateByUrl(destino);
      },
      error: (erro: Error) => { this.enviando = false; this.erro = erro.message; }
    });
  }

  usarDemo(): void {
    this.formulario.setValue({ email: 'admin@florscan.com', senha: 'FlorScan123' });
    this.erro = '';
  }
}
