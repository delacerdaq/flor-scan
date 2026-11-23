import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IdentificacaoService } from './identificacao.service';
import { PlantaService } from './planta.service';
import { PLANTAS_MOCK } from '../data/plantas.mock';
import { IDENTIFICACAO_API_URL, API_BASE_URL } from '../core/api-config';

const URL_PLANTAS = `${API_BASE_URL}/plantas`;
const URL_IDENTIFICAR = `${IDENTIFICACAO_API_URL}/identificar`;

function imagemFalsa(nome = 'foto.jpg', tipo = 'image/jpeg'): File {
  return new File([new Blob(['conteudo-fake'], { type: tipo })], nome, { type: tipo });
}

describe('IdentificacaoService', () => {
  let service: IdentificacaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    httpMock = TestBed.inject(HttpTestingController);
    TestBed.inject(PlantaService);
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK.map(planta => ({ ...planta, tags: [...planta.tags] })));
    service = TestBed.inject(IdentificacaoService);
  });

  afterEach(() => httpMock.verify());

  it('deve enviar a imagem e o órgão selecionado como FormData para o proxy', () => {
    service.identificar(imagemFalsa(), 'flower').subscribe();
    const req = httpMock.expectOne(URL_IDENTIFICAR);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    const corpo = req.request.body as FormData;
    expect(corpo.get('imagem')).toBeTruthy();
    expect(corpo.get('organo')).toBe('flower');
    req.flush({ results: [] });
  });

  it('deve converter uma resposta com uma única espécie identificada', () => {
    let resultados: any;
    service.identificar(imagemFalsa()).subscribe(r => resultados = r);
    httpMock.expectOne(URL_IDENTIFICAR).flush({
      results: [{
        score: 0.9,
        species: {
          scientificNameWithoutAuthor: 'Rosa', scientificName: 'Rosa L.',
          commonNames: ['Rose'], family: { scientificNameWithoutAuthor: 'Rosaceae' }
        }
      }]
    });
    expect(resultados.length).toBe(1);
    expect(resultados[0].nomeCientifico).toBe('Rosa');
    expect(resultados[0].pontuacao).toBe(0.9);
    expect(resultados[0].familia).toBe('Rosaceae');
    expect(resultados[0].plantaCorrespondente?.nome).toBe('Rosa');
  });

  it('deve converter uma resposta com múltiplas espécies, ordenadas como vierem da API', () => {
    let resultados: any;
    service.identificar(imagemFalsa()).subscribe(r => resultados = r);
    httpMock.expectOne(URL_IDENTIFICAR).flush({
      results: [
        { score: 0.8, species: { scientificNameWithoutAuthor: 'Monstera deliciosa', scientificName: 'Monstera deliciosa Liebm.' } },
        { score: 0.4, species: { scientificNameWithoutAuthor: 'Espécie desconhecida', scientificName: 'Espécie desconhecida X.' } }
      ]
    });
    expect(resultados.length).toBe(2);
    expect(resultados[0].plantaCorrespondente?.nome).toBe('Costela-de-adão');
    expect(resultados[1].plantaCorrespondente).toBeUndefined();
  });

  it('deve resolver com lista vazia quando a API não identifica nenhuma espécie (404)', () => {
    let resultados: any;
    service.identificar(imagemFalsa()).subscribe(r => resultados = r);
    httpMock.expectOne(URL_IDENTIFICAR).flush({ erro: 'especie_nao_identificada', mensagem: 'Não encontrada' }, { status: 404, statusText: 'Not Found' });
    expect(resultados).toEqual([]);
  });

  it('deve propagar erro de limite diário excedido (429) com a mensagem do proxy', () => {
    let erro: Error | undefined;
    service.identificar(imagemFalsa()).subscribe({ error: e => erro = e });
    httpMock.expectOne(URL_IDENTIFICAR).flush(
      { erro: 'limite_excedido', mensagem: 'Limite diário atingido.' }, { status: 429, statusText: 'Too Many Requests' }
    );
    expect(erro?.message).toBe('Limite diário atingido.');
  });

  it('deve propagar erro de conexão quando o proxy não responde', () => {
    let erro: Error | undefined;
    service.identificar(imagemFalsa()).subscribe({ error: e => erro = e });
    httpMock.expectOne(URL_IDENTIFICAR).error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    expect(erro?.message).toContain('Não foi possível conectar');
  });
});
