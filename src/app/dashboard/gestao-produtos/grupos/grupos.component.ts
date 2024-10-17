import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AppService } from 'src/app/core/services/global/app.service';
import { GrupoService } from 'src/app/core/services/gestao-produtos/grupo.service';
import { Grupo } from 'src/app/core/interfaces/grupo';
import { NovoEditarGrupoComponent } from './novo-editar-grupo/novo-editar-grupo.component';


@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  grupos: Grupo[] = [];
  gruposCopy: Grupo[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private grupoService: GrupoService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.grupoService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.grupoService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarGrupos();    
  }

  carregarGrupos()
  {
    this.errorMessage = [];
    this.loading = true;
    this.grupoService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.grupos = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarGruposCarregadosComSucesso()
      });
  }

  processarGruposCarregadosComSucesso(){
    this.loading = false;
    this.gruposCopy = this.grupos;
  }

  processarFalhaEmCarregarLista(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrar(term: string) {
    const termo = this.app.normalizeText(term);
    this.gruposCopy = this.grupos.map((item: Grupo) => {
      let itemBuscado = this.app.normalizeText(item.nome);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  } 
 


  novo() {
    const modalRef =  this.modal.open(NovoEditarGrupoComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Novo Grupo';
    modalRef.componentInstance.grupo = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarGrupos();
      }
    })
  }

  editar(grupo: Grupo) {
    const modalRef =  this.modal.open(NovoEditarGrupoComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.actionRequested = 'Editar Grupo';    
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;    
    modalRef.componentInstance.grupo = grupo;
    
    modalRef.result.then(result => {
      if (result == 'saved' || result == 'Editar Grupo') {
        this.carregarGrupos();
      }
    })
  }
 
  excluir(grupo) {    
    this.app
      .confirm(
        'Excluir Grupo',
        `O grupo ${grupo.nome} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.grupoService.excluir(grupo.id)
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
    this.app.toast('Grupo excluído com sucesso', 'success');
    this.carregarGrupos();
  }

  processarFalha(fail: any){
    this.loading = false;       
    const { errors } = fail.error;        
    errors.map((item) => {
        this.app.toast(item, 'error');
        });
  }
}
