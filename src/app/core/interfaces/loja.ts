import { int } from "@zxing/library/esm/customTypings";

export interface Loja {  
  organizacaoId: string;
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  dataDeCadastroFormatada: string;
  dataDeAlteracaoFormatada: string;  
  codigo: number;
  
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  telefone: string;
  celular: string;
  inscricaoEstadual: string;
  regimeTributario: int;
  regimeTributarioDescricao: string;
  ativa: boolean;  
  fotoURl: string;
  logradouro: string;
  complemento: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
}