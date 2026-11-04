import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('deve iniciar sem usuário autenticado', () => {
    expect(service.estaAutenticado).toBeFalse();
    expect(service.usuarioAtual).toBeNull();
  });

  it('deve autenticar com as credenciais de demonstração do admin', () => {
    expect(service.login('admin@florscan.com', 'FlorScan123')).toBeTrue();
    expect(service.estaAutenticado).toBeTrue();
    expect(service.ehAdmin).toBeTrue();
  });

  it('deve rejeitar credenciais inválidas', () => {
    expect(service.login('admin@florscan.com', 'senhaErrada')).toBeFalse();
    expect(service.estaAutenticado).toBeFalse();
  });

  it('deve cadastrar um novo visitante e autenticá-lo automaticamente', () => {
    const resultado = service.cadastrar('Maria Silva', 'maria@teste.com', 'segredo123');
    expect(resultado.sucesso).toBeTrue();
    expect(service.estaAutenticado).toBeTrue();
    expect(service.ehAdmin).toBeFalse();
  });

  it('não deve permitir e-mail duplicado', () => {
    service.cadastrar('Maria Silva', 'maria@teste.com', 'segredo123');
    service.sair();
    const resultado = service.cadastrar('Outra Maria', 'maria@teste.com', 'outrasenha');
    expect(resultado.sucesso).toBeFalse();
  });

  it('deve validar nome, e-mail e senha mínimos', () => {
    const resultado = service.cadastrar('M', 'email-invalido', '123');
    expect(resultado.sucesso).toBeFalse();
  });

  it('deve encerrar a sessão ao chamar sair()', () => {
    service.login('admin@florscan.com', 'FlorScan123');
    service.sair();
    expect(service.estaAutenticado).toBeFalse();
  });
});
