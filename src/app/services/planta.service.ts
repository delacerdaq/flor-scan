import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CATEGORIAS, CategoriaPlanta, Planta, PlantaDraft } from '../models/planta.model';
import { PLANTAS_MOCK } from '../data/plantas.mock';
import { API_BASE_URL } from '../core/api-config';
import { mensagemErroHttp } from '../core/erro-http.util';

const URL_PLANTAS = `${API_BASE_URL}/plantas`;
const CHAVE_FAVORITOS = 'florscan_favoritos_v1';

@Injectable({ providedIn: 'root' })
export class PlantaService {
  private readonly plantasSubject = new BehaviorSubject<Planta[]>([]);
  readonly plantas$ = this.plantasSubject.asObservable();
  private readonly carregandoSubject = new BehaviorSubject<boolean>(true);
  readonly carregando$ = this.carregandoSubject.asObservable();
  private readonly erroSubject = new BehaviorSubject<string | null>(null);
  readonly erro$ = this.erroSubject.asObservable();
  private readonly favoritos = new Set<number>(this.carregarFavoritos());
  private readonly favoritosSubject = new BehaviorSubject<number[]>([...this.favoritos]);
  readonly favoritos$ = this.favoritosSubject.asObservable();
  readonly categorias = CATEGORIAS;

  constructor(private readonly http: HttpClient) {
    this.recarregar();
  }

  recarregar(): void {
    this.carregandoSubject.next(true);
    this.erroSubject.next(null);
    this.http.get<Planta[]>(URL_PLANTAS).pipe(
      catchError((erro: HttpErrorResponse) => {
        this.erroSubject.next(mensagemErroHttp(erro, 'carregar o catálogo de plantas'));
        return of<Planta[]>([]);
      })
    ).subscribe(plantas => {
      this.plantasSubject.next(plantas);
      this.carregandoSubject.next(false);
    });
  }

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

  cadastrar(dados: PlantaDraft): Observable<Planta> {
    const corpo = { ...dados, tags: [...dados.tags], criadoEm: new Date().toISOString().slice(0, 10) };
    return this.http.post<Planta>(URL_PLANTAS, corpo).pipe(
      tap(planta => this.plantasSubject.next([...this.plantasSubject.value, planta])),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'cadastrar a planta'))))
    );
  }

  editar(id: number, dados: PlantaDraft): Observable<Planta> {
    const existente = this.obterPorId(id);
    if (!existente) return throwError(() => new Error('Não foi possível editar a planta: registro não encontrado.'));
    const corpo: Planta = { ...existente, ...dados, tags: [...dados.tags] };
    return this.http.put<Planta>(`${URL_PLANTAS}/${id}`, corpo).pipe(
      tap(atualizada => this.plantasSubject.next(this.plantasSubject.value.map(planta => planta.id === id ? atualizada : planta))),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'editar a planta'))))
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${URL_PLANTAS}/${id}`).pipe(
      tap(() => {
        this.plantasSubject.next(this.plantasSubject.value.filter(planta => planta.id !== id));
        this.favoritos.delete(id);
        this.salvarFavoritos();
      }),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'excluir a planta'))))
    );
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

  restaurarExemplos(): Observable<Planta[]> {
    const exclusoes = this.plantasSubject.value.map(planta => this.http.delete(`${URL_PLANTAS}/${planta.id}`));
    const excluirTudo$ = exclusoes.length ? forkJoin(exclusoes) : of([]);
    return excluirTudo$.pipe(
      switchMap(() => forkJoin(PLANTAS_MOCK.map(planta => this.http.post<Planta>(URL_PLANTAS, { ...planta, tags: [...planta.tags] })))),
      tap(plantas => {
        this.plantasSubject.next(plantas);
        this.favoritos.clear();
        this.salvarFavoritos();
      }),
      catchError((erro: HttpErrorResponse) => throwError(() => new Error(mensagemErroHttp(erro, 'restaurar os exemplos'))))
    );
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
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...this.favoritos]));
    } catch { /* Modo sem armazenamento: favoritos persistem apenas em memória */ }
  }
}
