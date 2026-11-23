import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { PLANTAS_MOCK } from '../../data/plantas.mock';
import { API_BASE_URL, IDENTIFICACAO_API_URL } from '../../core/api-config';

const URL_PLANTAS = `${API_BASE_URL}/plantas`;
const URL_IDENTIFICAR = `${IDENTIFICACAO_API_URL}/identificar`;

function arquivoFalso(nome: string, tipo: string, tamanhoBytes = 1000): File {
  return new File([new Uint8Array(tamanhoBytes)], nome, { type: tipo });
}

function eventoComArquivo(arquivo: File | null): Event {
  return { target: { files: arquivo ? [arquivo] : [] } } as unknown as Event;
}

describe('HomeComponent', () => {
  let httpMock: HttpTestingController;

  function criarComponente(): HomeComponent {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        HomeComponent,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    const componente = TestBed.inject(HomeComponent);
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK.map(planta => ({ ...planta, tags: [...planta.tags] })));
    componente.ngOnInit();
    return componente;
  }

  beforeEach(() => sessionStorage.clear());
  afterEach(() => httpMock.verify());

  it('deve aceitar uma imagem JPEG válida e gerar a prévia', (done) => {
    const componente = criarComponente();
    componente.selecionarFoto(eventoComArquivo(arquivoFalso('foto.jpg', 'image/jpeg')));
    expect(componente.erroArquivo).toBe('');
    expect(componente.arquivoSelecionado?.name).toBe('foto.jpg');
    setTimeout(() => { expect(componente.previaImagem).toContain('data:'); done(); }, 50);
  });

  it('deve rejeitar um formato de arquivo inválido', () => {
    const componente = criarComponente();
    componente.selecionarFoto(eventoComArquivo(arquivoFalso('foto.gif', 'image/gif')));
    expect(componente.erroArquivo).toBe('Selecione uma imagem JPEG ou PNG.');
    expect(componente.arquivoSelecionado).toBeNull();
  });

  it('deve rejeitar um arquivo maior que 10 MB', () => {
    const componente = criarComponente();
    componente.selecionarFoto(eventoComArquivo(arquivoFalso('foto.jpg', 'image/jpeg', 11 * 1024 * 1024)));
    expect(componente.erroArquivo).toBe('A imagem deve ter até 10 MB.');
    expect(componente.arquivoSelecionado).toBeNull();
  });

  it('deve limpar a seleção ao remover a foto', (done) => {
    const componente = criarComponente();
    componente.selecionarFoto(eventoComArquivo(arquivoFalso('foto.jpg', 'image/jpeg')));
    setTimeout(() => {
      componente.removerFoto();
      expect(componente.previaImagem).toBeNull();
      expect(componente.arquivoSelecionado).toBeNull();
      done();
    }, 50);
  });

  it('deve identificar a planta e expor o resultado associado ao catálogo', () => {
    const componente = criarComponente();
    componente.arquivoSelecionado = arquivoFalso('foto.jpg', 'image/jpeg');
    componente.identificar();
    httpMock.expectOne(URL_IDENTIFICAR).flush({
      results: [{ score: 0.9, species: { scientificNameWithoutAuthor: 'Rosa', scientificName: 'Rosa L.' } }]
    });
    expect(componente.resultados.length).toBe(1);
    expect(componente.resultados[0].plantaCorrespondente?.nome).toBe('Rosa');
    expect(componente.identificando).toBeFalse();
  });

  it('deve marcar como inconclusivo quando a API não encontra nenhuma espécie (404)', () => {
    const componente = criarComponente();
    componente.arquivoSelecionado = arquivoFalso('foto.jpg', 'image/jpeg');
    componente.identificar();
    httpMock.expectOne(URL_IDENTIFICAR).flush({ erro: 'especie_nao_identificada', mensagem: 'x' }, { status: 404, statusText: 'Not Found' });
    expect(componente.identificacaoInconclusiva).toBeTrue();
    expect(componente.resultados).toEqual([]);
  });

  it('deve expor mensagem de erro em falha de comunicação e permitir tentar novamente', () => {
    const componente = criarComponente();
    componente.arquivoSelecionado = arquivoFalso('foto.jpg', 'image/jpeg');
    componente.identificar();
    httpMock.expectOne(URL_IDENTIFICAR).error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    expect(componente.erroIdentificacao).toContain('Não foi possível conectar');
    expect(componente.identificando).toBeFalse();

    componente.identificar();
    httpMock.expectOne(URL_IDENTIFICAR).flush({ results: [] });
    expect(componente.erroIdentificacao).toBe('');
  });

  it('não deve permitir envios simultâneos enquanto uma identificação está em andamento', () => {
    const componente = criarComponente();
    componente.arquivoSelecionado = arquivoFalso('foto.jpg', 'image/jpeg');
    componente.identificar();
    expect(componente.identificando).toBeTrue();
    componente.identificar();
    const requisicoes = httpMock.match(URL_IDENTIFICAR);
    expect(requisicoes.length).toBe(1);
    requisicoes[0].flush({ results: [] });
  });
});
