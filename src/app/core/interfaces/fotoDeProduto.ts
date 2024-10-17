
export interface FotoDeProduto {    
  fotoDeProdutoId: string;  
  dataDeCadastro: string;
  dataDeAlteracao: string;

  organizacaoId: string;
  produtoId: string;    
  fotoNomeArquivo: string;
  fotoPrincipal: boolean; 
  fotoURl: string; 
}

export interface NovaFotoDeProdutoBase64 {    
  arquivoBase64: string;  
  nomeOriginalArquivo: string;
}