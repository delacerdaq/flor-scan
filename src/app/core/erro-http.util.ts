import { HttpErrorResponse } from '@angular/common/http';

/** `acao` deve ser um verbo no infinitivo, ex.: "carregar o catálogo", "cadastrar a planta". */
export function mensagemErroHttp(erro: HttpErrorResponse, acao: string): string {
  if (erro.status === 0) {
    return `Não foi possível conectar à API para ${acao}. Verifique se o servidor está em execução (npm run api) e tente novamente.`;
  }
  if (erro.status === 404) {
    return `Não foi possível ${acao}: registro não encontrado.`;
  }
  return `Ocorreu um erro ao tentar ${acao}. Tente novamente em instantes.`;
}
