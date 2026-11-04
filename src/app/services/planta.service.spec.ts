import { TestBed } from '@angular/core/testing';
import { PlantaService } from './planta.service';
import { PLANTAS_MOCK } from '../data/plantas.mock';
import { PlantaDraft } from '../models/planta.model';

const NOVA_PLANTA: PlantaDraft = {
  nome: 'Samambaia', nomeCientifico: 'Nephrolepis exaltata', categoria: 'Folhagens',
  descricao: 'Folhagem de interior.', cuidados: 'Manter solo úmido.',
  luz: 'Luz indireta', rega: '2 vezes por semana', temperatura: '18–26 °C',
  origem: 'Trópicos', dificuldade: 'Fácil', imagem: 'assets/planta-monstera.svg',
  destaque: false, tags: ['interior']
};

describe('PlantaService', () => {
  let service: PlantaService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantaService);
  });

  it('deve carregar os dados simulados (mock) quando não há nada salvo', () => {
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

  it('deve cadastrar uma planta nova com id incremental', () => {
    const total = service.listar().length;
    const criada = service.cadastrar(NOVA_PLANTA);
    expect(service.listar().length).toBe(total + 1);
    expect(criada.id).toBeGreaterThan(0);
    expect(service.obterPorId(criada.id)?.nome).toBe('Samambaia');
  });

  it('deve editar uma planta existente e retornar false para id inexistente', () => {
    expect(service.editar(1, { ...service.obterPorId(1)!, nome: 'Rosa Editada' })).toBeTrue();
    expect(service.obterPorId(1)?.nome).toBe('Rosa Editada');
    expect(service.editar(9999, NOVA_PLANTA)).toBeFalse();
  });

  it('deve excluir uma planta e remover dos favoritos', () => {
    service.alternarFavorita(2);
    expect(service.ehFavorita(2)).toBeTrue();
    expect(service.excluir(2)).toBeTrue();
    expect(service.obterPorId(2)).toBeUndefined();
    expect(service.ehFavorita(2)).toBeFalse();
    expect(service.excluir(2)).toBeFalse();
  });

  it('deve alternar o estado de favorita', () => {
    expect(service.ehFavorita(3)).toBeFalse();
    expect(service.alternarFavorita(3)).toBeTrue();
    expect(service.ehFavorita(3)).toBeTrue();
    expect(service.alternarFavorita(3)).toBeFalse();
    expect(service.ehFavorita(3)).toBeFalse();
  });

  it('deve restaurar os exemplos originais', () => {
    service.excluir(1);
    service.restaurarExemplos();
    expect(service.listar().length).toBe(PLANTAS_MOCK.length);
    expect(service.obterPorId(1)).toBeTruthy();
  });
});
