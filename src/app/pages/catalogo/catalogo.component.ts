import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriaPlanta, Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-catalogo', standalone: false, templateUrl: './catalogo.component.html' })
export class CatalogoComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  busca = '';
  categoria: CategoriaPlanta | 'Todas' = 'Todas';
  favoritas = false;
  plantasFiltradas: Planta[] = [];
  readonly categorias = this.plantas.categorias;

  constructor(public readonly plantas: PlantaService, private readonly rota: ActivatedRoute) {}

  ngOnInit(): void {
    this.rota.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((parametros: ParamMap) => {
      this.busca = parametros.get('busca') ?? '';
      const categoriaParametro = parametros.get('categoria');
      this.categoria = this.categorias.find(categoria => categoria === categoriaParametro) ?? 'Todas';
      this.filtrar();
    });
    this.plantas.plantas$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.filtrar());
    this.plantas.favoritos$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.filtrar());
  }

  filtrar(): void {
    this.plantasFiltradas = this.plantas.buscar(this.busca, this.categoria, this.favoritas);
  }

  limpar(): void {
    this.busca = ''; this.categoria = 'Todas'; this.favoritas = false;
    this.filtrar();
  }
}
