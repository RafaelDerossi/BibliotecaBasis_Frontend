import { int } from "@zxing/library/esm/customTypings";
import { Autor } from "./autor";
import { Assunto } from "./assunto";


export interface Livro {
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string; 
  
  titulo: string;
  editora: string;  
  edicao: string;
  anoPublicacao: string;  
  autores: Autor[];
  assuntos: Assunto[];
}
