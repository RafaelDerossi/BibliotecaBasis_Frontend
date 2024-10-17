import { int } from "@zxing/library/esm/customTypings";
import { Aplicacao, NovaAplicacaoDeNovoProduto } from "./aplicacao";
import { Estoque, NovoEstoqueDeNovoProduto } from "./estoque";
import { FotoDeProduto, NovaFotoDeProdutoBase64 } from "./fotoDeProduto";


export interface Produto {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  lixeira: boolean;
  codigo: number;
  
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
  estoques: Estoque[]
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
  aplicacoes: Aplicacao[]
  fotos: FotoDeProduto[]
  fotoPrincipalURl: string;  
  fotosBase64: string[]; 
  markupAtual: number; 
  markupAtualComDesconto: number; 
  markupAtualComDescontoDois: number; 
}



export interface NovoProduto {  
  organizacaoId: string;

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
  porcentagemDeDescontoDois: number;
  precoComDesconto: number;
  precoComDescontoDois: number;
  fatorMultiplicador: int;
  caixaDeEmbarque: number;    
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
  qtdMesesGarantia: int;    
  estoques: NovoEstoqueDeNovoProduto[];
  fotosBase64: NovaFotoDeProdutoBase64[];
  aplicacoes: NovaAplicacaoDeNovoProduto[];    
}

