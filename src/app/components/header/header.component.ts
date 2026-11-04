import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-header', standalone: false, templateUrl: './header.component.html' })
export class HeaderComponent {
  menuAberto = false;
  constructor(public readonly auth: AuthService, private readonly router: Router) {}
  fecharMenu(): void { this.menuAberto = false; }
  sair(): void {
    this.auth.sair();
    this.fecharMenu();
    void this.router.navigateByUrl('/');
  }
}
