import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Planta } from '../../models/planta.model';
import { PlantaService } from '../../services/planta.service';
import { IdentificacaoService } from '../../services/identificacao.service';

@Component({ selector: 'app-home', standalone: false, templateUrl: './home.component.html' })
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  busca = '';
  previaImagem: string | null = null;
  arquivoNome = '';
  sugestao: Planta | undefined;
  erroArquivo = '';
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
    this.sugestao = undefined;
    this.previaImagem = null;
    this.erroArquivo = '';
    if (!arquivo) return;
    if (!arquivo.type.startsWith('image/')) { this.erroArquivo = 'Selecione um arquivo de imagem.'; return; }
    if (arquivo.size > 5 * 1024 * 1024) { this.erroArquivo = 'A imagem deve ter até 5 MB.'; return; }
    this.arquivoNome = arquivo.name;
    const leitor = new FileReader();
    leitor.onload = () => { this.previaImagem = typeof leitor.result === 'string' ? leitor.result : null; };
    leitor.readAsDataURL(arquivo);
  }

  identificar(): void {
    if (!this.previaImagem) return;
    this.sugestao = this.identificacao.sugerirExemplo(this.arquivoNome);
  }
}
