import { int } from "@zxing/library/esm/customTypings";

export interface Unidade {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  descricao: string;
  abreviacao: string;
  quantidadeDeProduto: number; 
}