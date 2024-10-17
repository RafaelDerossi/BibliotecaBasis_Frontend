import { int } from "@zxing/library/esm/customTypings";

export interface Grade {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
  descricaoCompleta: string;
  descricaoDePDV: string;
  ativo: boolean;  
  fotoPrincipalURl: string;  
}