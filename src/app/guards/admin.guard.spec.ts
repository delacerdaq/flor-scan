import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [Router] });
  });

  it('deve redirecionar para /login quando o usuário não é admin', () => {
    const resultado = TestBed.runInInjectionContext(() =>
      adminGuard({} as any, { url: '/dashboard' } as any));
    expect(resultado instanceof UrlTree).toBeTrue();
  });

  it('deve permitir acesso quando o usuário é admin', () => {
    const auth = TestBed.inject(AuthService);
    auth.login('admin@florscan.com', 'FlorScan123');
    const resultado = TestBed.runInInjectionContext(() =>
      adminGuard({} as any, { url: '/dashboard' } as any));
    expect(resultado).toBeTrue();
  });
});
