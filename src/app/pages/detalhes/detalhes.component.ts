import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-detalhes', standalone: false, templateUrl: './detalhes.component.html' })
export class DetalhesComponent implements OnInit {
  planta: Planta | undefined;
  relacionadas: Planta[] = [];
  constructor(private readonly rota: ActivatedRoute, public readonly plantas: PlantaService) {}
  ngOnInit(): void {
    this.rota.paramMap.subscribe((parametros: ParamMap) => {
      const id = Number(parametros.get('id'));
      this.planta = this.plantas.obterPorId(id);
      this.relacionadas = this.planta ? this.plantas.listar().filter(planta => planta.id !== id && planta.categoria === this.planta?.categoria).slice(0, 3) : [];
    });
  }
  favoritar(): void {
    if (this.planta) this.plantas.alternarFavorita(this.planta.id);
  }
}
