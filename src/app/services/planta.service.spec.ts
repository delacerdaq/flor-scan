import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlantaService } from './planta.service';
import { PLANTAS_MOCK } from '../data/plantas.mock';
import { Planta, PlantaDraft } from '../models/planta.model';
import { API_BASE_URL } from '../core/api-config';

const URL_PLANTAS = `${API_BASE_URL}/plantas`;

const NOVA_PLANTA: PlantaDraft = {
  nome: 'Samambaia', nomeCientifico: 'Nephrolepis exaltata', categoria: 'Folhagens',
  descricao: 'Folhagem de interior.', cuidados: 'Manter solo úmido.',
  luz: 'Luz indireta', rega: '2 vezes por semana', temperatura: '18–26 °C',
  origem: 'Trópicos', dificuldade: 'Fácil', imagem: 'assets/planta-monstera.svg',
  destaque: false, tags: ['interior']
};

describe('PlantaService', () => {
  let service: PlantaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlantaService);
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK.map(planta => ({ ...planta, tags: [...planta.tags] })));
  });

  afterEach(() => httpMock.verify());

  it('deve carregar os dados a partir da API ao iniciar', () => {
    expect(service.listar().length).toBe(PLANTAS_MOCK.length);
  });

  it('deve localizar uma planta por id', () => {
    expect(service.obterPorId(1)?.nome).toBe('Rosa');
    expect(service.obterPorId(9999)).toBeUndefined();
  });

  it('deve buscar por texto, categoria e favoritas', () => {
    expect(service.buscar('rosa').map(p => p.id)).toEqual([1]);
    expect(service.buscar('', 'Suculentas').every(p => p.categoria === 'Suculentas')).toBeTrue();
    expect(service.buscar('', 'Todas', true)).toEqual([]);
  });

  it('deve cadastrar uma planta nova via POST e atualizar a lista local', () => {
    let criada: Planta | undefined;
    service.cadastrar(NOVA_PLANTA).subscribe(planta => criada = planta);
    const req = httpMock.expectOne(URL_PLANTAS);
    expect(req.request.method).toBe('POST');
    req.flush({ ...NOVA_PLANTA, id: 9, criadoEm: '2026-11-23' });
    expect(criada?.id).toBe(9);
    expect(service.obterPorId(9)?.nome).toBe('Samambaia');
  });

  it('deve editar uma planta existente via PUT e atualizar a lista local', () => {
    const dados: PlantaDraft = { ...service.obterPorId(1)!, nome: 'Rosa Editada' };
    let sucesso = false;
    service.editar(1, dados).subscribe(() => sucesso = true);
    const req = httpMock.expectOne(`${URL_PLANTAS}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...dados, id: 1 });
    expect(sucesso).toBeTrue();
    expect(service.obterPorId(1)?.nome).toBe('Rosa Editada');
  });

  it('deve retornar erro ao editar uma planta inexistente, sem chamar a API', () => {
    let erro: Error | undefined;
    service.editar(9999, NOVA_PLANTA).subscribe({ error: e => erro = e });
    expect(erro).toBeTruthy();
    httpMock.expectNone(`${URL_PLANTAS}/9999`);
  });

  it('deve excluir uma planta via DELETE e remover dos favoritos', () => {
    service.alternarFavorita(2);
    expect(service.ehFavorita(2)).toBeTrue();
    let concluido = false;
    service.excluir(2).subscribe(() => concluido = true);
    const req = httpMock.expectOne(`${URL_PLANTAS}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
    expect(concluido).toBeTrue();
    expect(service.obterPorId(2)).toBeUndefined();
    expect(service.ehFavorita(2)).toBeFalse();
  });

  it('deve alternar o estado de favorita (recurso apenas de sessão)', () => {
    expect(service.ehFavorita(3)).toBeFalse();
    expect(service.alternarFavorita(3)).toBeTrue();
    expect(service.ehFavorita(3)).toBeTrue();
    expect(service.alternarFavorita(3)).toBeFalse();
    expect(service.ehFavorita(3)).toBeFalse();
  });

  it('deve restaurar os exemplos originais excluindo e recriando via API', () => {
    let resultado: Planta[] | undefined;
    service.restaurarExemplos().subscribe(plantas => resultado = plantas);

    const exclusoes = httpMock.match(req => req.method === 'DELETE' && req.url.startsWith(URL_PLANTAS));
    expect(exclusoes.length).toBe(PLANTAS_MOCK.length);
    exclusoes.forEach(req => req.flush(null));

    const criacoes = httpMock.match(req => req.method === 'POST' && req.url === URL_PLANTAS);
    expect(criacoes.length).toBe(PLANTAS_MOCK.length);
    criacoes.forEach(req => req.flush(req.request.body));

    expect(resultado?.length).toBe(PLANTAS_MOCK.length);
    expect(service.obterPorId(1)).toBeTruthy();
  });
});
