import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Planta } from '../models/planta.model';
import { OrgaoPlanta, ResultadoIdentificacao } from '../models/identificacao.model';
import { PlantaService } from './planta.service';
import { IDENTIFICACAO_API_URL } from '../core/api-config';

interface EspeciePlantNet {
  scientificNameWithoutAuthor: string;
  scientificName: string;
  commonNames?: string[];
  family?: { scientificNameWithoutAuthor: string };
}

interface ResultadoPlantNet {
  score: number;
  species: EspeciePlantNet;
}

interface RespostaPlantNet {
  results?: ResultadoPlantNet[];
}

interface ErroProxy {
  erro: string;
  mensagem: string;
}

const URL_IDENTIFICAR = `${IDENTIFICACAO_API_URL}/identificar`;

@Injectable({ providedIn: 'root' })
export class IdentificacaoService {
  constructor(private readonly http: HttpClient, private readonly plantas: PlantaService) {}

  /**
   * Envia a foto para o proxy local, que consulta a API real do Pl@ntNet.
   * Em caso de "espécie não identificada" (404), resolve com lista vazia em vez de erro,
   * para o chamador tratar como resultado inconclusivo e não como falha de comunicação.
   */
  identificar(imagem: File, organo: OrgaoPlanta = 'auto'): Observable<ResultadoIdentificacao[]> {
    const formulario = new FormData();
    formulario.append('imagem', imagem, imagem.name);
    formulario.append('organo', organo);

    return this.http.post<RespostaPlantNet>(URL_IDENTIFICAR, formulario).pipe(
      map(resposta => (resposta.results ?? [])
        // Abaixo de 0,05% a própria API já considera o palpite irrelevante; exibir "0,0%" só confundiria o usuário.
        .filter(resultado => resultado.score >= 0.0005)
        // A API já devolve ordenado por confiança; mantemos só os 5 melhores para não poluir a lista.
        .slice(0, 5)
        .map(resultado => this.converter(resultado))),
      catchError((erro: HttpErrorResponse) => erro.status === 404 ? of<ResultadoIdentificacao[]>([]) : throwError(() => new Error(this.mensagemErro(erro))))
    );
  }

  private converter(resultado: ResultadoPlantNet): ResultadoIdentificacao {
    const nomeCientifico = resultado.species.scientificNameWithoutAuthor;
    return {
      nomeCientifico,
      nomeCientificoCompleto: resultado.species.scientificName,
      nomesPopulares: resultado.species.commonNames ?? [],
      familia: resultado.species.family?.scientificNameWithoutAuthor ?? '',
      pontuacao: resultado.score,
      plantaCorrespondente: this.buscarNoCatalogo(nomeCientifico)
    };
  }

  private buscarNoCatalogo(nomeCientifico: string): Planta | undefined {
    const normalizado = nomeCientifico.trim().toLocaleLowerCase('pt-BR');
    if (!normalizado) return undefined;
    return this.plantas.listar().find(planta => {
      const nomeCatalogo = planta.nomeCientifico.trim().toLocaleLowerCase('pt-BR');
      return nomeCatalogo === normalizado || nomeCatalogo.startsWith(normalizado) || normalizado.startsWith(nomeCatalogo);
    });
  }

  private mensagemErro(erro: HttpErrorResponse): string {
    if (erro.status === 0) {
      return 'Não foi possível conectar ao serviço de identificação. Verifique se a API está em execução (npm run api:identificacao) e tente novamente.';
    }
    const corpo = erro.error as ErroProxy | null;
    if (corpo?.mensagem) return corpo.mensagem;
    if (erro.status === 429) return 'O limite diário de identificações foi atingido. Tente novamente mais tarde.';
    return 'Ocorreu um erro ao identificar a planta. Tente novamente.';
  }
}
