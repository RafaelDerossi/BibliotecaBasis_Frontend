import { int } from "@zxing/library/esm/customTypings";

interface LoginRequest {
  login: string;
  senha: string;
}

interface Usuario {
  organizacaoId: string;
  id: string;  
  nome: string;  
  email: string;
  telefone: string;
  celular: string;  
  fotoURl: string;    
  tipoDeUsuarioEnum: string;
  tipoDeUsuarioDescricao: string;
}

interface AtualizaUsuario {
  id: string;  
  nome: string;    
  telefone: string;
  celular: string;  
  tipoDeUsuarioEnum: int;
}

interface NovoUsuarioComOrganizacao {
  nome: string;  
  email: string;
  senha: string;
  senhaConfirmacao: string;
  telefone: string;
  celular: string;  
  tpUsuario: int;
  arquivoFoto: File;
  preCadastro: boolean;
  nomeDaOrganizacao : string;
  emailDaOrganizacao : string;
  organizacaoId: string;
}

interface NovoUsuario {
  nome: string;  
  email: string;
  senha: string;
  senhaConfirmacao: string;
  telefone: string;
  celular: string;  
  tpUsuario: int;
  arquivoFoto: File;
  preCadastro: boolean;  
  organizacaoId: string;
}


//TODO: Retirar esta interface
interface Funcionario {
  id: string;
  dataDeCadastro: string;
  dataDeAlteracao: string;
  dataDeCadastroFormatada: string;
  dataDeAlteracaoFormatada: string;
  lixeira: boolean;
  usuarioId: string;
  condominioId: string;
  nomeCondominio: string;
  nome: string;
  sobrenome: string;
  nomeCompleto: string;
  cpfFormatado: string;
  telefoneFormatado: string;
  celularFormatado: string;
  url: string;
  rg: string;
  cpf: string;
  celular: string;
  telefone: string;
  email: string;
  foto: string;
  ativo: boolean;
  dataNascimento: string;
  logradouro: string;
  complemento: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  atribuicao: string;
  funcao: string;
  permissao: number;
  descricaoPermissao: string;
  acessoAPortaria: boolean;
  acessoAReservas: boolean;
  acessoACorrespondencias: boolean;
  acessoAControleDeAcesso: boolean;
  permiteCadastrarVisitanteFixo: boolean;
  acessoAVeiculos: boolean;
  acessoARecados: boolean;
  acessoAEnquetes: boolean;
  acessoAComunicados: boolean;
  acessoAOcorrencias: boolean;
  acessoAPublicacoes: boolean;
  acessoAArquivoDigital: boolean;
  acessoAAreasDeAcesso: boolean;
  acessoTotalAListaDeTarefas: boolean;
  acessoParcialAListaDeTarefas: boolean; //Mudar somente o status
  acessoAUsuarios: boolean;
  acessoAFornecedores: boolean;
  acessoAOrcamentos: boolean;
  acessoAAutomacao: boolean;
  acessoAConfiguracoes: boolean;
  tipoDeUsuario: string //auxiliar
}


export {
  LoginRequest,
  Usuario,
  Funcionario,
  NovoUsuarioComOrganizacao,
  NovoUsuario,
  AtualizaUsuario
}
