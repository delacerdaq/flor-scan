import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { API_BASE_URL } from '../core/api-config';

const URL_USUARIOS = `${API_BASE_URL}/usuarios`;

describe('adminGuard', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [Router, provideHttpClient(), provideHttpClientTesting()] });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve redirecionar para /login quando o usuário não é admin', () => {
    const resultado = TestBed.runInInjectionContext(() =>
      adminGuard({} as any, { url: '/dashboard' } as any));
    expect(resultado instanceof UrlTree).toBeTrue();
  });

  it('deve permitir acesso quando o usuário é admin', () => {
    const auth = TestBed.inject(AuthService);
    auth.login('admin@florscan.com', 'FlorScan123').subscribe();
    httpMock.expectOne(`${URL_USUARIOS}?email=admin%40florscan.com`)
      .flush([{ id: 1, nome: 'Admin FlorScan', email: 'admin@florscan.com', senha: 'FlorScan123', perfil: 'admin' }]);
    const resultado = TestBed.runInInjectionContext(() =>
      adminGuard({} as any, { url: '/dashboard' } as any));
    expect(resultado).toBeTrue();
  });
});
