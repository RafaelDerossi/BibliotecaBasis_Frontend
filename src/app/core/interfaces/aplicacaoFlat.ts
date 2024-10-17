import { int } from "@zxing/library/esm/customTypings";


export interface AplicacaoFlat {
  organizacaoId: string;
  aplicacaoId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;  
  codigo: number;  
  
  produtoId: string;  
  descricaoDaAplicacao: string;
  montadoraId: string;
  montadoraCodigo: number;
  montadoraNome: string;  
  
  produtoDataDeCadastro: string;
  produtoDataDeAlteracao: string;  
  produtoCodigo: number;
  
  gtin: string;
  cif: string;  
  descricaoDePDV: string;
  descricaoCompleta: string;
  genuino: string;
  grupoId: string;
  grupoCodigo: number;
  grupoNome: string;
  subgrupoId: string;
  subgrupoCodigo: number;
  subgrupoNome: string;
  fabricaId: string;
  fabricaCodigo: number;
  fabricaNome: string;
  unidadeId: string;
  unidadeCodigo: number;
  unidadeAbreviacao: string;
  preco: number;
  porcentagemDeDesconto: number;
  quantidadeParaAtacado: number;
  precoParaAtacado: number;
  precoDeCusto: number;
  markup: number;
  precoSugerido: number;
  tipoDaAlteracaoDoPreco: int;
  tipoDaAlteracaoDoPrecoDescricao: string;
  dataDaAlteracaoDoPreco: string;
  porcentagemDeDescontoDois: number;
  precoComDesconto: number;
  precoComDescontoDois: number;
  fatorMultiplicador: int;
  caixaDeEmbarque: number;
  estoqueTotal: number;
  valorEstoqueTotal: number;
  estoques: EstoqueFlat[]
  ncm: string;
  cest: string;
  cfopSaida: string;
  aliquotaId: string;
  aliquotaCodigo: number;
  aliquotaNome: string;
  aliquotaCstTributacaoNormal: int;
  aliquotaCstSimplesNacional: int;
  origem: int;
  modalidadeDeterminacaoDaBC: int;
  porcentagemDeReducaoDaBC: number;
  modalidadeDeterminacaoDaBCSt: int;
  porcentagemDeReducaoDaBCSt: number;
  margemDeValorAgregadoDaBCSt: number;
  cstPis: int;
  aliquotaDoPis: number;
  tipoDeCalculoDoPis: int;
  cstCofins: int;
  aliquotaDoCofins: number;
  tipoDeCalculoDoCofins: int;
  gradeId: string;
  gradeCodigo: number;
  gradeDescricao: string;
  corOuTipo: string;
  tamanhoOuLado: string;
  descricaoComGrade: string;  
  ativo: boolean;  
  codigoANP: string;
  descricaoANP: string;
  pglp: number;
  pgnn: number;
  pgni: number;
  valorPartida: number;
  imprimirEtiqueta: boolean;
  curva: string;
  dataDaAlteracaoDaCurva:string;
  qtdMesesGarantia: int;
  ultimoFornecedorId: string;
  nomeFantasiaUltimoFornecedor: string;  
  fotos: FotoDeProdutoFlat[]
  fotoPrincipalURl: string;  
}


export interface EstoqueFlat {    
  estoqueId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;  
  codigo: number;
  
  lojaId: string;  
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

export interface FotoDeProdutoFlat {    
  fotoDeProdutoId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;  
  codigo: number;
  
  fotoNomeArquivo: string;
  fotoPrincipal: boolean;  
}