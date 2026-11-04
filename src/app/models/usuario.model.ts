export type Perfil = 'admin' | 'visitante';
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
}
export interface UsuarioRegistro extends Usuario {
  senha: string;
}
