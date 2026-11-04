import { Planta } from '../models/planta.model';

export const PLANTAS_MOCK: Planta[] = [
  {
    id: 1, nome: 'Rosa', nomeCientifico: 'Rosa × hybrida', categoria: 'Flores',
    descricao: 'Uma das flores mais conhecidas do mundo, a rosa encanta pelas pétalas delicadas e pela enorme variedade de cores.',
    cuidados: 'Use substrato fértil e bem drenado. Faça podas leves para estimular novas flores e mantenha boa ventilação.',
    luz: 'Sol direto por 4 a 6 horas', rega: '3 vezes por semana', temperatura: '15–28 °C',
    origem: 'Cultivares de diversas origens', dificuldade: 'Moderada', imagem: 'assets/planta-rosa.svg',
    destaque: true, tags: ['jardim', 'floração', 'romântica'], criadoEm: '2026-08-10'
  },
  {
    id: 2, nome: 'Costela-de-adão', nomeCientifico: 'Monstera deliciosa', categoria: 'Folhagens',
    descricao: 'Folhagem tropical de folhas grandes e recortadas, muito utilizada para trazer verde aos ambientes internos.',
    cuidados: 'Mantenha o substrato levemente úmido sem encharcar. Limpe as folhas e ofereça apoio conforme a planta cresce.',
    luz: 'Luz indireta intensa', rega: '1 a 2 vezes por semana', temperatura: '18–30 °C',
    origem: 'América Central', dificuldade: 'Fácil', imagem: 'assets/planta-monstera.svg',
    destaque: true, tags: ['interior', 'tropical', 'sombra'], criadoEm: '2026-08-11'
  },
  {
    id: 3, nome: 'Echeveria', nomeCientifico: 'Echeveria elegans', categoria: 'Suculentas',
    descricao: 'Suculenta compacta em formato de roseta, conhecida pelas folhas espessas e pela manutenção simples.',
    cuidados: 'Prefira vasos com furos e substrato próprio para suculentas. Deixe o solo secar entre as regas.',
    luz: 'Sol suave ou luz intensa', rega: 'A cada 10 a 14 dias', temperatura: '12–28 °C',
    origem: 'México', dificuldade: 'Fácil', imagem: 'assets/planta-suculenta.svg',
    destaque: true, tags: ['vaso', 'fácil', 'compacta'], criadoEm: '2026-08-12'
  },
  {
    id: 4, nome: 'Lavanda', nomeCientifico: 'Lavandula angustifolia', categoria: 'Ervas',
    descricao: 'Planta aromática de flores roxas, apreciada em jardins ensolarados pelo perfume característico.',
    cuidados: 'Cultive em solo leve e drenante. Evite excesso de água e mantenha em local bem iluminado.',
    luz: 'Sol direto', rega: '1 a 2 vezes por semana', temperatura: '10–27 °C',
    origem: 'Região mediterrânea', dificuldade: 'Moderada', imagem: 'assets/planta-lavanda.svg',
    destaque: true, tags: ['aromática', 'floração', 'jardim'], criadoEm: '2026-08-13'
  },
  {
    id: 5, nome: 'Girassol', nomeCientifico: 'Helianthus annuus', categoria: 'Flores',
    descricao: 'Flor de grande destaque visual, com pétalas amarelas e preferência por ambientes ensolarados.',
    cuidados: 'Regue a base da planta e proteja mudas de ventos fortes. Utilize solo fértil com boa drenagem.',
    luz: 'Sol pleno', rega: '2 a 3 vezes por semana', temperatura: '18–32 °C',
    origem: 'América do Norte', dificuldade: 'Fácil', imagem: 'assets/planta-girassol.svg',
    destaque: false, tags: ['sol', 'jardim', 'amarela'], criadoEm: '2026-08-14'
  },
  {
    id: 6, nome: 'Antúrio', nomeCientifico: 'Anthurium andraeanum', categoria: 'Flores',
    descricao: 'Espécie tropical ornamental com brácteas vistosas e folhas verdes brilhantes.',
    cuidados: 'Evite sol direto forte e correntes frias. Regue quando a superfície do substrato começar a secar.',
    luz: 'Luz indireta', rega: '2 vezes por semana', temperatura: '18–29 °C',
    origem: 'Colômbia e Equador', dificuldade: 'Moderada', imagem: 'assets/planta-anturio.svg',
    destaque: false, tags: ['tropical', 'interior', 'ornamental'], criadoEm: '2026-08-15'
  },
  {
    id: 7, nome: 'Cacto orelha-de-coelho', nomeCientifico: 'Opuntia microdasys', categoria: 'Suculentas',
    descricao: 'Cacto de segmentos ovais que armazena água e se desenvolve muito bem sob boa luminosidade.',
    cuidados: 'Regue apenas quando o substrato estiver seco e nunca toque diretamente nos gloquídeos.',
    luz: 'Sol direto ou luz intensa', rega: 'A cada 15 a 20 dias', temperatura: '16–32 °C',
    origem: 'México', dificuldade: 'Fácil', imagem: 'assets/planta-cacto.svg',
    destaque: false, tags: ['sol', 'resistente', 'vaso'], criadoEm: '2026-08-16'
  },
  {
    id: 8, nome: 'Manjericão', nomeCientifico: 'Ocimum basilicum', categoria: 'Ervas',
    descricao: 'Erva aromática muito utilizada na culinária, com folhas verdes e crescimento rápido.',
    cuidados: 'Colha as pontas para estimular novos brotos. Evite encharcar as raízes e proteja de geadas.',
    luz: 'Sol direto por 4 horas', rega: '3 a 4 vezes por semana', temperatura: '18–30 °C',
    origem: 'Ásia tropical', dificuldade: 'Fácil', imagem: 'assets/planta-manjericao.svg',
    destaque: false, tags: ['culinária', 'aromática', 'horta'], criadoEm: '2026-08-17'
  }
];
