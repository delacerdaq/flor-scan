import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-detalhes', standalone: false, templateUrl: './detalhes.component.html' })
export class DetalhesComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  planta: Planta | undefined;
  relacionadas: Planta[] = [];
  carregando = true;
  erro = '';

  constructor(private readonly rota: ActivatedRoute, public readonly plantas: PlantaService) {}

  ngOnInit(): void {
    combineLatest([this.rota.paramMap, this.plantas.plantas$]).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([parametros, lista]: [ParamMap, Planta[]]) => {
        const id = Number(parametros.get('id'));
        this.planta = lista.find(planta => planta.id === id);
        this.relacionadas = this.planta ? lista.filter(planta => planta.id !== id && planta.categoria === this.planta?.categoria).slice(0, 3) : [];
      });
    this.plantas.carregando$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(carregando => this.carregando = carregando);
    this.plantas.erro$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(erro => this.erro = erro ?? '');
  }

  favoritar(): void {
    if (this.planta) this.plantas.alternarFavorita(this.planta.id);
  }
}
