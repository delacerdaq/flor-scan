import { Component, Input } from '@angular/core';
import { Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-planta-card', standalone: false, templateUrl: './planta-card.component.html' })
export class PlantaCardComponent {
  @Input({ required: true }) planta!: Planta;
  constructor(public readonly plantas: PlantaService) {}
  favoritar(evento: MouseEvent): void {
    evento.preventDefault();
    evento.stopPropagation();
    this.plantas.alternarFavorita(this.planta.id);
  }
}
