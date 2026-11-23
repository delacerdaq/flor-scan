import { Planta } from './planta.model';

export type OrgaoPlanta = 'auto' | 'leaf' | 'flower' | 'fruit' | 'bark';

export const ORGAOS_PLANTA: { valor: OrgaoPlanta; rotulo: string }[] = [
  { valor: 'auto', rotulo: 'Detectar automaticamente' },
  { valor: 'leaf', rotulo: 'Folha' },
  { valor: 'flower', rotulo: 'Flor' },
  { valor: 'fruit', rotulo: 'Fruto' },
  { valor: 'bark', rotulo: 'Casca ou tronco' }
];

export interface ResultadoIdentificacao {
  nomeCientifico: string;
  nomeCientificoCompleto: string;
  nomesPopulares: string[];
  familia: string;
  pontuacao: number;
  plantaCorrespondente?: Planta;
}
