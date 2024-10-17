import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from 'src/app/core/interfaces/grupo';
import { Subgrupo } from 'src/app/core/interfaces/subgrupo';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { GrupoService } from 'src/app/core/services/gestao-produtos/grupo.service';
import { SubgrupoService } from 'src/app/core/services/gestao-produtos/subgrupo.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { NovoEditarGrupoComponent } from '../grupos/novo-editar-grupo/novo-editar-grupo.component';

@Component({
  selector: 'app-subgrupos',
  templateUrl: './subgrupos.component.html',
  styleUrls: ['./subgrupos.component.scss']
})
export class SubgruposComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  grupo: Grupo;
  subgrupos: Subgrupo[] = [];
  subgruposCopy: Subgrupo[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private subgrupoService: SubgrupoService, 
              private grupoService: GrupoService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.subgrupoService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.subgrupoService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarSubgrupos();    
  }

  carregarSubgrupos()
  {
    this.errorMessage = [];
    this.loading = true;
    this.subgrupoService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.subgrupos = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarGruposCarregadosComSucesso()
      });
  }

  processarGruposCarregadosComSucesso(){
    this.loading = false;
    this.subgruposCopy = this.subgrupos;
  }


  filtrar(term: string) {
    const termo = this.app.normalizeText(term);
    this.subgruposCopy = this.subgrupos.map((item: Subgrupo) => {
      let itemBuscado = this.app.normalizeText(item.nome);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.grupoDescricao);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }
  
 

 /*  novo() {
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
  } */

  editar(subgrupo: Subgrupo) {
    this.errorMessage = [];
    this.loading = true;

    this.grupoService.obterPorId(subgrupo.grupoId)
      .subscribe({
        next:  (s) => this.grupo = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarGrupoEncontradoComSucesso()
      });    
  }
 
  processarGrupoEncontradoComSucesso(){
    this.loading = false;
    const modalRef =  this.modal.open(NovoEditarGrupoComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.actionRequested = 'Editar Grupo';    
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;    
    modalRef.componentInstance.grupo = this.grupo;
    
    modalRef.result.then(result => {
      if (result == 'Editar Grupo') {
        this.carregarSubgrupos();
      }
    })

  }

  excluir(subgrupo) {    
    this.app
      .confirm(
        'Excluir Subgrupo',
        `O subgrupo ${subgrupo.nome} do grupo ${subgrupo.grupo} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.subgrupoService.excluir(subgrupo.id)
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
    this.app.toast('Subgrupo excluído com sucesso', 'success');
    this.carregarSubgrupos();
  }

  processarFalha(fail: any){
    this.loading = false;       
    const { errors } = fail.error;        
    errors.map((item) => {
        this.app.toast(item, 'error');
        });
  }
}
