import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { DetalhesComponent } from './detalhes.component';

describe('DetalhesComponent', () => {
  function criarComponente(id: string) {
    TestBed.configureTestingModule({
      providers: [
        DetalhesComponent,
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id })) } }
      ]
    });
    return TestBed.inject(DetalhesComponent);
  }

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('deve carregar a planta correspondente ao id da rota', () => {
    const componente = criarComponente('2');
    componente.ngOnInit();
    expect(componente.planta?.nome).toBe('Costela-de-adão');
  });

  it('deve ficar indefinido quando o id não existe no catálogo', () => {
    const componente = criarComponente('9999');
    componente.ngOnInit();
    expect(componente.planta).toBeUndefined();
    expect(componente.relacionadas).toEqual([]);
  });

  it('deve listar plantas relacionadas da mesma categoria, excluindo a atual', () => {
    const componente = criarComponente('1');
    componente.ngOnInit();
    expect(componente.relacionadas.every(p => p.categoria === 'Flores' && p.id !== 1)).toBeTrue();
  });
});
