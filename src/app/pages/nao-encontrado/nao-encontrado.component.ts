import { Component } from '@angular/core';
@Component({ selector: 'app-nao-encontrado', standalone: false, template: '<section class="container empty-state page-empty"><img src="assets/planta-suculenta.svg" alt=""/><h1>Ops! Essa página não floresceu.</h1><p>O endereço que você procurou não existe.</p><a routerLink="/" class="btn btn-primary">Voltar ao início</a></section>' })
export class NaoEncontradoComponent {}
