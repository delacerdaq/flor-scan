import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CATEGORIAS, CategoriaPlanta, Planta, PlantaDraft } from '../models/planta.model';
import { PLANTAS_MOCK } from '../data/plantas.mock';

const CHAVE_PLANTAS = 'florscan_plantas_v1';
const CHAVE_FAVORITOS = 'florscan_favoritos_v1';

@Injectable({ providedIn: 'root' })
export class PlantaService {
  private readonly plantasSubject = new BehaviorSubject<Planta[]>(this.carregar());
  readonly plantas$ = this.plantasSubject.asObservable();
  private readonly favoritos = new Set<number>(this.carregarFavoritos());
  private readonly favoritosSubject = new BehaviorSubject<number[]>([...this.favoritos]);
  readonly favoritos$ = this.favoritosSubject.asObservable();
  readonly categorias = CATEGORIAS;

  listar(): Planta[] {
    return [...this.plantasSubject.value];
  }

  buscar(texto = '', categoria: CategoriaPlanta | 'Todas' = 'Todas', somenteFavoritas = false): Planta[] {
    const termo = texto.trim().toLocaleLowerCase('pt-BR');
    return this.listar().filter(planta => {
      const textoEncontrado = !termo || [planta.nome, planta.nomeCientifico, planta.descricao, ...planta.tags]
        .some(valor => valor.toLocaleLowerCase('pt-BR').includes(termo));
      return textoEncontrado && (categoria === 'Todas' || planta.categoria === categoria)
        && (!somenteFavoritas || this.ehFavorita(planta.id));
    });
  }

  obterPorId(id: number): Planta | undefined {
    return this.plantasSubject.value.find(planta => planta.id === id);
  }

  destaques(limite = 4): Planta[] {
    return this.listar().filter(planta => planta.destaque).slice(0, limite);
  }

  cadastrar(dados: PlantaDraft): Planta {
    const proximoId = Math.max(0, ...this.plantasSubject.value.map(planta => planta.id)) + 1;
    const planta: Planta = { ...dados, tags: [...dados.tags], id: proximoId, criadoEm: new Date().toISOString().slice(0, 10) };
    this.persistir([...this.plantasSubject.value, planta]);
    return planta;
  }

  editar(id: number, dados: PlantaDraft): boolean {
    if (!this.obterPorId(id)) return false;
    this.persistir(this.plantasSubject.value.map(planta => planta.id === id
      ? { ...planta, ...dados, tags: [...dados.tags] }
      : planta));
    return true;
  }

  excluir(id: number): boolean {
    if (!this.obterPorId(id)) return false;
    this.persistir(this.plantasSubject.value.filter(planta => planta.id !== id));
    this.favoritos.delete(id);
    this.salvarFavoritos();
    return true;
  }

  ehFavorita(id: number): boolean {
    return this.favoritos.has(id);
  }

  alternarFavorita(id: number): boolean {
    if (!this.obterPorId(id)) return false;
    if (this.favoritos.has(id)) this.favoritos.delete(id);
    else this.favoritos.add(id);
    this.salvarFavoritos();
    return this.favoritos.has(id);
  }

  quantidadeFavoritas(): number {
    return this.favoritos.size;
  }

  quantidadePorCategoria(categoria: CategoriaPlanta): number {
    return this.listar().filter(planta => planta.categoria === categoria).length;
  }

  restaurarExemplos(): void {
    this.persistir(PLANTAS_MOCK.map(planta => ({ ...planta, tags: [...planta.tags] })));
    this.favoritos.clear();
    this.salvarFavoritos();
  }

  private persistir(plantas: Planta[]): void {
    this.plantasSubject.next(plantas);
    this.gravar('localStorage', CHAVE_PLANTAS, JSON.stringify(plantas));
  }

  private carregar(): Planta[] {
    try {
      const salvo = typeof localStorage !== 'undefined' ? localStorage.getItem(CHAVE_PLANTAS) : null;
      if (salvo !== null) {
        const lista: unknown = JSON.parse(salvo);
        if (Array.isArray(lista)) return lista as Planta[];
      }
    } catch { /* Dados de demonstração continuam disponíveis */ }
    return PLANTAS_MOCK.map(planta => ({ ...planta, tags: [...planta.tags] }));
  }

  private carregarFavoritos(): number[] {
    try {
      const salvos = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(CHAVE_FAVORITOS) : null;
      const valores: unknown = salvos ? JSON.parse(salvos) : [];
      if (Array.isArray(valores)) return valores.filter((valor): valor is number => typeof valor === 'number');
    } catch { /* A sessão inicia sem favoritos */ }
    return [];
  }

  private salvarFavoritos(): void {
    this.favoritosSubject.next([...this.favoritos]);
    this.gravar('sessionStorage', CHAVE_FAVORITOS, JSON.stringify([...this.favoritos]));
  }

  private gravar(tipo: 'sessionStorage' | 'localStorage', chave: string, valor: string): void {
    try {
      if (typeof window !== 'undefined') window[tipo].setItem(chave, valor);
    } catch { /* Modo sem armazenamento: dados persistem apenas enquanto a página estiver aberta */ }
  }
}
