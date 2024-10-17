import { int } from "@zxing/library/esm/customTypings";

export interface Estoque {    
  estoqueId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;  
  codigo: number;
  
  lojaId: string;
  lojaNome: string;
  produtoId: any;  
  emEstoque: number;
  localizacao: string;
  ultimaAlteracaoDoEstoque: string;
  estoqueMinimo: int;
  estoqueMaximo: int;
  definirEstoqueMinEMaxAuto: boolean;
  ultimaAlteracaoDoEstoqueMinEMax: string;
  tipoDaUltimaAlteracaoDoEstoque: int;
  tipoDaUltimaAlteracaoDoEstoqueDescricao: string;
  tempoDeReposicaoEmDias: int;
}

export interface NovoEstoqueDeNovoProduto {    
  lojaId: string;
  emEstoque: number;
  localizacao: string;  
  estoqueMinimo: int;
  estoqueMaximo: int;
  definirEstoqueMinEMaxAuto: boolean;
  tempoDeReposicaoEmDias: int;
}
