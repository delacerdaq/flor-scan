import { Component, OnInit } from '@angular/core';
import { CategoriaPlanta, CATEGORIAS, ILUSTRACOES, Planta, PlantaDraft } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';

const FORMULARIO_INICIAL = (): PlantaDraft => ({
  nome: '', nomeCientifico: '', categoria: 'Flores', descricao: '', cuidados: '',
  luz: '', rega: '', temperatura: '', origem: '', dificuldade: 'Fácil',
  imagem: ILUSTRACOES[0], destaque: false, tags: []
});

@Component({ selector: 'app-administracao', standalone: false, templateUrl: './administracao.component.html' })
export class AdministracaoComponent implements OnInit {
  readonly categorias: CategoriaPlanta[] = CATEGORIAS;
  readonly ilustracoes = ILUSTRACOES;
  registros: Planta[] = [];
  textoBusca = '';
  formularioAberto = false;
  editandoId: number | null = null;
  exclusaoPendente: number | null = null;
  formulario: PlantaDraft = FORMULARIO_INICIAL();
  tagsTexto = '';
  mensagem = '';
  erro = '';

  constructor(public readonly plantas: PlantaService) {}
  ngOnInit(): void { this.atualizar(); }
  get filtradas(): Planta[] {
    const termo = this.textoBusca.toLocaleLowerCase('pt-BR').trim();
    return termo ? this.registros.filter(p => `${p.nome} ${p.nomeCientifico} ${p.categoria}`.toLocaleLowerCase('pt-BR').includes(termo)) : this.registros;
  }
  atualizar(): void { this.registros = this.plantas.listar(); }
  novo(): void {
    this.formulario = FORMULARIO_INICIAL(); this.tagsTexto = ''; this.editandoId = null;
    this.formularioAberto = true; this.exclusaoPendente = null; this.mensagem = ''; this.erro = '';
  }
  editar(planta: Planta): void {
    const { id, criadoEm, ...dados } = planta;
    this.formulario = { ...dados, tags: [...dados.tags] };
    this.tagsTexto = planta.tags.join(', '); this.editandoId = id;
    this.formularioAberto = true; this.exclusaoPendente = null; this.mensagem = ''; this.erro = '';
    setTimeout(() => document.getElementById('formulario-planta')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }
  cancelar(): void { this.formularioAberto = false; this.editandoId = null; this.erro = ''; }
  salvar(): void {
    this.erro = ''; this.mensagem = '';
    if (!this.formulario.nome.trim() || !this.formulario.nomeCientifico.trim() || !this.formulario.descricao.trim() || !this.formulario.cuidados.trim()) {
      this.erro = 'Preencha nome, nome científico, descrição e cuidados.'; return;
    }
    const dados: PlantaDraft = { ...this.formulario, tags: this.tagsTexto.split(',').map(tag => tag.trim()).filter(Boolean) };
    if (this.editandoId !== null) {
      this.plantas.editar(this.editandoId, dados);
      this.mensagem = 'Planta atualizada com sucesso.';
    } else {
      this.plantas.cadastrar(dados);
      this.mensagem = 'Planta cadastrada com sucesso.';
    }
    this.atualizar(); this.formularioAberto = false; this.editandoId = null;
  }
  solicitarExclusao(id: number): void { this.exclusaoPendente = id; this.formularioAberto = false; }
  confirmarExclusao(): void {
    if (this.exclusaoPendente === null) return;
    this.plantas.excluir(this.exclusaoPendente);
    this.exclusaoPendente = null; this.atualizar(); this.mensagem = 'Planta excluída com sucesso.';
  }
  restaurar(): void {
    this.plantas.restaurarExemplos(); this.atualizar(); this.formularioAberto = false;
    this.exclusaoPendente = null; this.mensagem = 'Catálogo de demonstração restaurado.';
  }
}
