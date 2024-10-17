import { int } from "@zxing/library/esm/customTypings";

export interface Organizacao {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  dataDeCadastroFormatada: string;
  dataDeAlteracaoFormatada: string;
  lixeira: boolean;  
  nome: string;
  email: string;
  status: int;
  statusDescricao: string;
  fotoURl: string;
  responsavel: string;
  qtdLojas: int;
}

export interface AtualizaPerfilOrganizacao {
  id: string;  
  nome: string;    
  email: string;
}