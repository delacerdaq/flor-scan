import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DetalhesComponent } from './detalhes.component';
import { PLANTAS_MOCK } from '../../data/plantas.mock';
import { API_BASE_URL } from '../../core/api-config';

const URL_PLANTAS = `${API_BASE_URL}/plantas`;

describe('DetalhesComponent', () => {
  let httpMock: HttpTestingController;

  function criarComponente(id: string) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        DetalhesComponent,
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id })) } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    return TestBed.inject(DetalhesComponent);
  }

  beforeEach(() => sessionStorage.clear());
  afterEach(() => httpMock.verify());

  it('deve carregar a planta correspondente ao id da rota', () => {
    const componente = criarComponente('2');
    componente.ngOnInit();
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK);
    expect(componente.planta?.nome).toBe('Costela-de-adão');
  });

  it('deve ficar indefinido quando o id não existe no catálogo', () => {
    const componente = criarComponente('9999');
    componente.ngOnInit();
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK);
    expect(componente.planta).toBeUndefined();
    expect(componente.relacionadas).toEqual([]);
  });

  it('deve listar plantas relacionadas da mesma categoria, excluindo a atual', () => {
    const componente = criarComponente('1');
    componente.ngOnInit();
    httpMock.expectOne(URL_PLANTAS).flush(PLANTAS_MOCK);
    expect(componente.relacionadas.every(p => p.categoria === 'Flores' && p.id !== 1)).toBeTrue();
  });
});
