import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function senhasIguaisValidator(): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const senha = grupo.get('senha')?.value;
    const confirmarSenha = grupo.get('confirmarSenha')?.value;
    return senha && confirmarSenha && senha !== confirmarSenha ? { senhasDiferentes: true } : null;
  };
}

@Component({ selector: 'app-cadastro', standalone: false, templateUrl: './cadastro.component.html' })
export class CadastroComponent {
  enviando = false;
  tentouEnviar = false;
  erro = '';

  readonly formulario = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', [Validators.required]],
    aceitoTermos: [false, [Validators.requiredTrue]]
  }, { validators: senhasIguaisValidator() });

  get nome() { return this.formulario.controls.nome; }
  get email() { return this.formulario.controls.email; }
  get senha() { return this.formulario.controls.senha; }
  get confirmarSenha() { return this.formulario.controls.confirmarSenha; }
  get aceitoTermos() { return this.formulario.controls.aceitoTermos; }

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router) {}

  cadastrar(): void {
    this.erro = '';
    this.tentouEnviar = true;
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; }
    this.enviando = true;
    const { nome, email, senha } = this.formulario.getRawValue();
    this.auth.cadastrar(nome, email, senha).subscribe({
      next: resultado => {
        this.enviando = false;
        if (!resultado.sucesso) { this.erro = resultado.mensagem; return; }
        void this.router.navigateByUrl('/catalogo');
      },
      error: (erro: Error) => { this.enviando = false; this.erro = erro.message; }
    });
  }
}
