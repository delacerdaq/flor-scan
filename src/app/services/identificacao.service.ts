import { Injectable } from '@angular/core';
import { Planta } from '../models/planta.model';
import { PlantaService } from './planta.service';

@Injectable({ providedIn: 'root' })
export class IdentificacaoService {
  constructor(private readonly plantas: PlantaService) {}

  /** Simulação acadêmica: NÃO analisa os pixels da fotografia. */
  sugerirExemplo(nomeArquivo: string): Planta | undefined {
    const nome = nomeArquivo.toLocaleLowerCase('pt-BR');
    const correspondencia = this.plantas.listar().find(planta => {
      const palavra = planta.nome.toLocaleLowerCase('pt-BR').split(' ')[0];
      return nome.includes(palavra);
    });
    return correspondencia ?? this.plantas.destaques(1)[0] ?? this.plantas.listar()[0];
  }
}
