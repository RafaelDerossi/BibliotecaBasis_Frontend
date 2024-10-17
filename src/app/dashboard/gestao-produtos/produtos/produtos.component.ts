import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AppService } from 'src/app/core/services/global/app.service';
import { ProdutoService } from 'src/app/core/services/gestao-produtos/produto.service';
import { Produto } from 'src/app/core/interfaces/produto';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  produtos: Produto[] = [];
  produtosCopy: Produto[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private produtoService: ProdutoService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.produtoService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.produtoService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarProdutos();    
  }

  carregarProdutos()
  {
    this.errorMessage = [];
    this.loading = true;
    this.produtoService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.produtos = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarProdutosCarregadosComSucesso()
      });
  }

  processarProdutosCarregadosComSucesso(){
    this.loading = false;
    this.produtosCopy = this.produtos;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrarProdutos(term: string) {
    const termo = this.app.normalizeText(term);
    this.produtosCopy = this.produtos.map((item: Produto) => {
      let itemBuscado = this.app.normalizeText(item.descricaoCompleta);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.descricaoDePDV);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }
  
  setAvatar(img) {
    if (!img) {
      return `background-image: url("assets/user_avatar.png")`;
    }

    return `background-image: url("${img}")`;    
  }


  novo() {
    const modalRef =  this.modal.open(NovoProdutoComponent, { backdrop: 'static', size: 'xl' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarProdutos();
      }
    })
  }

  editar(produto: Produto) {
    /* const modalRef =  this.modal.open(EditarUsuarioComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.usuario = usuario;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarUsuarios();
      }
    }) */
  }
 
  excluir(produto) {    
    /* this.app
      .confirm(
        'Excluir Produto',
        `O produto ${produto.descricaoCompleta} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.produtoService.excluirUsuario(produto.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarExcluirUsuariosComSucesso()
            });

        }
      }); */
  }

  processarExcluirComSucesso(){
    this.loading = false;
    this.app.toast('Produto excluído com sucesso', 'success');
    this.carregarProdutos();
  }


  detalhesDoProduto(produto: Produto) {
    const modalRef =  this.modal.open(DetalhesProdutoComponent, { backdrop: 'static', size: 'xl' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.produtoId = produto.id;    
    
    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarProdutos();
      }
    })
  }
}
