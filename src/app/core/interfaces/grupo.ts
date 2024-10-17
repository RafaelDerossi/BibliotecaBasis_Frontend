import { int } from "@zxing/library/esm/customTypings";
import { Subgrupo } from "./subgrupo";

export interface Grupo {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  nome: string;  
  subgrupos: Subgrupo[]
  quantidadeDeSubgrupos:number;
}