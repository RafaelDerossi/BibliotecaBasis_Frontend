import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Unidade } from 'src/app/core/interfaces/unidade';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { UnidadeService } from 'src/app/core/services/gestao-produtos/unidade.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { NovoEditarUnidadeComponent } from './novo-editar-unidade/novo-editar-unidade.component';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  unidades: Unidade[] = [];
  unidadesCopy: Unidade[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private unidadeService: UnidadeService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.unidadeService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.unidadeService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarUnidades();    
  }

  carregarUnidades()
  {
    this.errorMessage = [];
    this.loading = true;
    this.unidadeService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.unidades = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarUnidadesCarregadasComSucesso()
      });
  }

  processarUnidadesCarregadasComSucesso(){
    this.loading = false;
    this.unidadesCopy = this.unidades;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrar(term: string) {
    const termo = this.app.normalizeText(term);
    this.unidadesCopy = this.unidades.map((item: Unidade) => {
      let itemBuscado = this.app.normalizeText(item.descricao);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.abreviacao);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }  
  

  novo() {
    const modalRef =  this.modal.open(NovoEditarUnidadeComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Nova Unidade';
    modalRef.componentInstance.unidade = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarUnidades();
      }
    })
  }

  editar(unidade: Unidade) {
    const modalRef =  this.modal.open(NovoEditarUnidadeComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Editar Unidade';
    modalRef.componentInstance.unidade = unidade;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarUnidades();
      }
    })
  }
 
  excluir(unidade) {    
    this.app
      .confirm(
        'Excluir Unidade',
        `A unidade ${unidade.descricao} será excluída do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.unidadeService.excluir(unidade.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarExcluirComSucesso()
            });

        }
      });
  }  

  processarExcluirComSucesso(){
    this.loading = false;
    this.app.toast('Unidade excluída com sucesso', 'success');
    this.carregarUnidades();
  }

}
