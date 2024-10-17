import { int } from "@zxing/library/esm/customTypings";

export interface Montadora {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  nome: string;
  quantidadeDeProdutos: number;  
}