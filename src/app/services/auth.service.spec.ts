import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService, ResultadoCadastro } from './auth.service';
import { API_BASE_URL } from '../core/api-config';

const URL_USUARIOS = `${API_BASE_URL}/usuarios`;
const ADMIN = { id: 1, nome: 'Admin FlorScan', email: 'admin@florscan.com', senha: 'FlorScan123', perfil: 'admin' as const };

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => httpMock.verify());

  it('deve iniciar sem usuário autenticado', () => {
    expect(service.estaAutenticado).toBeFalse();
    expect(service.usuarioAtual).toBeNull();
  });

  it('deve autenticar com as credenciais de demonstração do admin', () => {
    let sucesso: boolean | undefined;
    service.login('admin@florscan.com', 'FlorScan123').subscribe(resultado => sucesso = resultado);
    httpMock.expectOne(`${URL_USUARIOS}?email=admin%40florscan.com`).flush([ADMIN]);
    expect(sucesso).toBeTrue();
    expect(service.estaAutenticado).toBeTrue();
    expect(service.ehAdmin).toBeTrue();
  });

  it('deve rejeitar credenciais inválidas', () => {
    let sucesso: boolean | undefined;
    service.login('admin@florscan.com', 'senhaErrada').subscribe(resultado => sucesso = resultado);
    httpMock.expectOne(`${URL_USUARIOS}?email=admin%40florscan.com`).flush([ADMIN]);
    expect(sucesso).toBeFalse();
    expect(service.estaAutenticado).toBeFalse();
  });

  it('deve cadastrar um novo visitante via POST e autenticá-lo automaticamente', () => {
    let resultado: ResultadoCadastro | undefined;
    service.cadastrar('Maria Silva', 'maria@teste.com', 'segredo123').subscribe(r => resultado = r);
    httpMock.expectOne(`${URL_USUARIOS}?email=maria%40teste.com`).flush([]);
    const reqPost = httpMock.expectOne(URL_USUARIOS);
    expect(reqPost.request.method).toBe('POST');
    reqPost.flush({ id: 2, nome: 'Maria Silva', email: 'maria@teste.com', senha: 'segredo123', perfil: 'visitante' });
    expect(resultado?.sucesso).toBeTrue();
    expect(service.estaAutenticado).toBeTrue();
    expect(service.ehAdmin).toBeFalse();
  });

  it('não deve permitir e-mail duplicado', () => {
    let resultado: ResultadoCadastro | undefined;
    service.cadastrar('Outra Maria', 'maria@teste.com', 'outrasenha').subscribe(r => resultado = r);
    httpMock.expectOne(`${URL_USUARIOS}?email=maria%40teste.com`)
      .flush([{ id: 2, nome: 'Maria Silva', email: 'maria@teste.com', senha: 'segredo123', perfil: 'visitante' }]);
    expect(resultado?.sucesso).toBeFalse();
  });

  it('deve validar nome, e-mail e senha mínimos sem chamar a API', () => {
    let resultado: ResultadoCadastro | undefined;
    service.cadastrar('M', 'email-invalido', '123').subscribe(r => resultado = r);
    expect(resultado?.sucesso).toBeFalse();
    httpMock.expectNone(req => req.url.startsWith(URL_USUARIOS));
  });

  it('deve encerrar a sessão ao chamar sair()', () => {
    service.login('admin@florscan.com', 'FlorScan123').subscribe();
    httpMock.expectOne(`${URL_USUARIOS}?email=admin%40florscan.com`).flush([ADMIN]);
    service.sair();
    expect(service.estaAutenticado).toBeFalse();
  });
});
