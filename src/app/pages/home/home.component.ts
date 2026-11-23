import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Planta } from '../../models/planta.model';
import { ORGAOS_PLANTA, OrgaoPlanta, ResultadoIdentificacao } from '../../models/identificacao.model';
import { PlantaService } from '../../services/planta.service';
import { IdentificacaoService } from '../../services/identificacao.service';

const TIPOS_ACEITOS = ['image/jpeg', 'image/png'];
const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024;

@Component({ selector: 'app-home', standalone: false, templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  busca = '';
  previaImagem: string | null = null;
  arquivoSelecionado: File | null = null;
  erroArquivo = '';
  readonly orgaos = ORGAOS_PLANTA;
  organoSelecionado: OrgaoPlanta = 'auto';
  identificando = false;
  resultados: ResultadoIdentificacao[] = [];
  identificacaoInconclusiva = false;
  erroIdentificacao = '';
  destaques: Planta[] = [];
  carregandoDestaques = true;
  erroDestaques = '';

  constructor(private readonly router: Router, public readonly plantas: PlantaService, private readonly identificacao: IdentificacaoService) {}

  ngOnInit(): void {
    this.plantas.plantas$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.destaques = this.plantas.destaques());
    this.plantas.carregando$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(carregando => this.carregandoDestaques = carregando);
    this.plantas.erro$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(erro => this.erroDestaques = erro ?? '');
  }

  pesquisar(): void {
    void this.router.navigate(['/catalogo'], { queryParams: this.busca.trim() ? { busca: this.busca.trim() } : {} });
  }

  selecionarFoto(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    this.previaImagem = null;
    this.arquivoSelecionado = null;
    this.erroArquivo = '';
    this.limparResultado();
    if (!arquivo) return;
    if (!TIPOS_ACEITOS.includes(arquivo.type)) { this.erroArquivo = 'Selecione uma imagem JPEG ou PNG.'; return; }
    if (arquivo.size > TAMANHO_MAXIMO_BYTES) { this.erroArquivo = 'A imagem deve ter até 10 MB.'; return; }
    this.arquivoSelecionado = arquivo;
    const leitor = new FileReader();
    leitor.onload = () => { this.previaImagem = typeof leitor.result === 'string' ? leitor.result : null; };
    leitor.readAsDataURL(arquivo);
  }

  removerFoto(): void {
    this.previaImagem = null;
    this.arquivoSelecionado = null;
    this.erroArquivo = '';
    this.limparResultado();
  }

  identificar(): void {
    if (!this.arquivoSelecionado || this.identificando) return;
    this.limparResultado();
    this.identificando = true;
    this.identificacao.identificar(this.arquivoSelecionado, this.organoSelecionado).subscribe({
      next: resultados => {
        this.identificando = false;
        this.resultados = resultados;
        this.identificacaoInconclusiva = resultados.length === 0;
      },
      error: (erro: Error) => { this.identificando = false; this.erroIdentificacao = erro.message; }
    });
  }

  private limparResultado(): void {
    this.resultados = [];
    this.identificacaoInconclusiva = false;
    this.erroIdentificacao = '';
  }
}
