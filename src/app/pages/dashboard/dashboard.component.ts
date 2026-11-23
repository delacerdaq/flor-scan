import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriaPlanta, CATEGORIAS, Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-dashboard', standalone: false, templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  plantas: Planta[] = [];
  categorias: { nome: CategoriaPlanta; quantidade: number; percentual: number }[] = [];
  recentes: Planta[] = [];
  totalDestaques = 0;
  carregando = true;
  erro = '';
  constructor(public readonly service: PlantaService) {}
  ngOnInit(): void {
    this.service.plantas$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(plantas => {
      this.plantas = plantas;
      this.totalDestaques = plantas.filter(planta => planta.destaque).length;
      this.recentes = [...plantas].sort((a, b) => b.criadoEm.localeCompare(a.criadoEm)).slice(0, 5);
      this.categorias = CATEGORIAS.map(nome => {
        const quantidade = plantas.filter(planta => planta.categoria === nome).length;
        return { nome, quantidade, percentual: plantas.length ? Math.round(100 * quantidade / plantas.length) : 0 };
      });
    });
    this.service.carregando$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(carregando => this.carregando = carregando);
    this.service.erro$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(erro => this.erro = erro ?? '');
  }
}
