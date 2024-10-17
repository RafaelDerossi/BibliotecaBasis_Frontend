import { int } from "@zxing/library/esm/customTypings";

export interface Aplicacao {    
  aplicacaoId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;  
  codigo: number;  
  
  produtoId: string;  
  descricao: string;
  montadoraId: string;
  montadoraCodigo: number;
  montadoraNome: string;  
}

export interface NovaAplicacao {
  produtoId: string;  
  descricao: string;
  montadoraId: string;  
}

export interface AtualizaAplicacao {
  aplicacaoId: string;
  descricao: string;
  montadoraId: string;  
}

export interface NovaAplicacaoDeNovoProduto {   
  descricao: string;
  montadoraId: string;  
}
