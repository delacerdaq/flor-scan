import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaPlanta, CATEGORIAS, Dificuldade, ILUSTRACOES, Planta, PlantaDraft } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

@Component({ selector: 'app-administracao', standalone: false, templateUrl: './administracao.component.html' })
export class AdministracaoComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly categorias: CategoriaPlanta[] = CATEGORIAS;
  readonly ilustracoes = ILUSTRACOES;
  registros: Planta[] = [];
  carregandoLista = true;
  erroLista = '';
  salvando = false;
  textoBusca = '';
  formularioAberto = false;
  editandoId: number | null = null;
  exclusaoPendente: number | null = null;
  mensagem = '';
  erro = '';
  tentouEnviar = false;

  readonly formulario = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    nomeCientifico: ['', Validators.required],
    categoria: this.fb.nonNullable.control<CategoriaPlanta>(this.categorias[0]),
    descricao: ['', Validators.required],
    cuidados: ['', Validators.required],
    luz: [''],
    rega: [''],
    temperatura: [''],
    origem: [''],
    dificuldade: this.fb.nonNullable.control<Dificuldade>('Fácil'),
    imagem: this.fb.nonNullable.control(this.ilustracoes[0]),
    destaque: false,
    tagsTexto: ['']
  });

  get nome() { return this.formulario.controls.nome; }
  get nomeCientifico() { return this.formulario.controls.nomeCientifico; }
  get descricao() { return this.formulario.controls.descricao; }
  get cuidados() { return this.formulario.controls.cuidados; }

  constructor(private readonly fb: FormBuilder, public readonly plantas: PlantaService) {}

  ngOnInit(): void {
    this.plantas.plantas$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(registros => this.registros = registros);
    this.plantas.carregando$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(carregando => this.carregandoLista = carregando);
    this.plantas.erro$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(erro => this.erroLista = erro ?? '');
  }

  get filtradas(): Planta[] {
    const termo = this.textoBusca.toLocaleLowerCase('pt-BR').trim();
    return termo ? this.registros.filter(p => `${p.nome} ${p.nomeCientifico} ${p.categoria}`.toLocaleLowerCase('pt-BR').includes(termo)) : this.registros;
  }

  novo(): void {
    this.formulario.reset({
      nome: '', nomeCientifico: '', categoria: this.categorias[0], descricao: '', cuidados: '',
      luz: '', rega: '', temperatura: '', origem: '', dificuldade: 'Fácil',
      imagem: this.ilustracoes[0], destaque: false, tagsTexto: ''
    });
    this.editandoId = null;
    this.formularioAberto = true; this.exclusaoPendente = null; this.mensagem = ''; this.erro = ''; this.tentouEnviar = false;
  }

  editar(planta: Planta): void {
    this.formulario.reset({
      nome: planta.nome, nomeCientifico: planta.nomeCientifico, categoria: planta.categoria,
      descricao: planta.descricao, cuidados: planta.cuidados, luz: planta.luz, rega: planta.rega,
      temperatura: planta.temperatura, origem: planta.origem, dificuldade: planta.dificuldade,
      imagem: planta.imagem, destaque: planta.destaque, tagsTexto: planta.tags.join(', ')
    });
    this.editandoId = planta.id;
    this.formularioAberto = true; this.exclusaoPendente = null; this.mensagem = ''; this.erro = ''; this.tentouEnviar = false;
    setTimeout(() => document.getElementById('formulario-planta')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  cancelar(): void { this.formularioAberto = false; this.editandoId = null; this.erro = ''; }

  salvar(): void {
    this.erro = ''; this.mensagem = ''; this.tentouEnviar = true;
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; }
    const valores = this.formulario.getRawValue();
    const dados: PlantaDraft = {
      nome: valores.nome, nomeCientifico: valores.nomeCientifico, categoria: valores.categoria,
      descricao: valores.descricao, cuidados: valores.cuidados, luz: valores.luz, rega: valores.rega,
      temperatura: valores.temperatura, origem: valores.origem, dificuldade: valores.dificuldade,
      imagem: valores.imagem, destaque: valores.destaque,
      tags: valores.tagsTexto.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    this.salvando = true;
    const operacao$ = this.editandoId !== null ? this.plantas.editar(this.editandoId, dados) : this.plantas.cadastrar(dados);
    operacao$.subscribe({
      next: () => {
        this.salvando = false;
        this.mensagem = this.editandoId !== null ? 'Planta atualizada com sucesso.' : 'Planta cadastrada com sucesso.';
        this.formularioAberto = false; this.editandoId = null;
      },
      error: (erro: Error) => { this.salvando = false; this.erro = erro.message; }
    });
  }

  solicitarExclusao(id: number): void { this.exclusaoPendente = id; this.formularioAberto = false; }

  confirmarExclusao(): void {
    if (this.exclusaoPendente === null) return;
    const id = this.exclusaoPendente;
    this.salvando = true;
    this.plantas.excluir(id).subscribe({
      next: () => { this.salvando = false; this.exclusaoPendente = null; this.mensagem = 'Planta excluída com sucesso.'; },
      error: (erro: Error) => { this.salvando = false; this.exclusaoPendente = null; this.erro = erro.message; }
    });
  }

  restaurar(): void {
    this.salvando = true; this.mensagem = ''; this.erro = '';
    this.plantas.restaurarExemplos().subscribe({
      next: () => {
        this.salvando = false; this.formularioAberto = false;
        this.exclusaoPendente = null; this.mensagem = 'Catálogo de demonstração restaurado.';
      },
      error: (erro: Error) => { this.salvando = false; this.erro = erro.message; }
    });
  }
}
