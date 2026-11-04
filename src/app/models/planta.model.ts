export type CategoriaPlanta = 'Flores' | 'Folhagens' | 'Suculentas' | 'Ervas';
export type Dificuldade = 'Fácil' | 'Moderada' | 'Avançada';

export interface Planta {
  id: number;
  nome: string;
  nomeCientifico: string;
  categoria: CategoriaPlanta;
  descricao: string;
  cuidados: string;
  luz: string;
  rega: string;
  temperatura: string;
  origem: string;
  dificuldade: Dificuldade;
  imagem: string;
  destaque: boolean;
  tags: string[];
  criadoEm: string;
}

export type PlantaDraft = Omit<Planta, 'id' | 'criadoEm'>;

export const CATEGORIAS: CategoriaPlanta[] = ['Flores', 'Folhagens', 'Suculentas', 'Ervas'];
export const ILUSTRACOES = [
  'assets/planta-rosa.svg',
  'assets/planta-monstera.svg',
  'assets/planta-suculenta.svg',
  'assets/planta-lavanda.svg',
  'assets/planta-girassol.svg',
  'assets/planta-anturio.svg',
  'assets/planta-cacto.svg',
  'assets/planta-manjericao.svg'
];
