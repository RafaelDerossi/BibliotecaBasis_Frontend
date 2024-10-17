import { float, int } from "@zxing/library/esm/customTypings";

export interface Subgrupo {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  grupoId: string;
  grupoDescricao: string;
  nome: string;
  markup: number;
  quantidadeDeProdutos: number;
}