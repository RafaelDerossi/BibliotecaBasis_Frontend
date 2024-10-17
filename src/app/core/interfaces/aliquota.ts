import { int } from "@zxing/library/esm/customTypings";

export interface Aliquota {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  nome: string;
  aliquotaValor: string;
  cstTributacaoNormal: int;  
  cstTributacaoNormalDescricao: string;  
  cstSimplesNacional: int;  
  cstSimplesNacionalDescricao: string; 
  quantidadeDeProduto: number; 
}