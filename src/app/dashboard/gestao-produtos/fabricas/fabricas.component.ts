import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AppService } from 'src/app/core/services/global/app.service';
import { Fabrica } from 'src/app/core/interfaces/fabrica';
import { FabricaService } from 'src/app/core/services/gestao-produtos/fabrica.service';
import { NovoEditarFabricaComponent } from './novo-editar-fabrica/novo-editar-fabrica.component';


@Component({
  selector: 'app-fabricas',
  templateUrl: './fabricas.component.html',
  styleUrls: ['./fabricas.component.scss']
})
export class FabricasComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  fabricas: Fabrica[] = [];
  fabricasCopy: Fabrica[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private fabricaService: FabricaService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.fabricaService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.fabricaService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarFabricas();    
  }

  carregarFabricas()
  {
    this.errorMessage = [];
    this.loading = true;
    this.fabricaService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.fabricas = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarFabricasCarregadasComSucesso()
      });
  }

  processarFabricasCarregadasComSucesso(){
    this.loading = false;
    this.fabricasCopy = this.fabricas;
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
    this.fabricasCopy = this.fabricas.map((item: Fabrica) => {
      let itemBuscado = this.app.normalizeText(item.nome);
      if (itemBuscado.includes(termo)) {
        return item;
      }     
    }).filter(item => item != null);
  }  
  


  novo() {
    const modalRef =  this.modal.open(NovoEditarFabricaComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Nova Fábrica';
    modalRef.componentInstance.fabrica = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarFabricas();
      }
    })
  }

  editar(fabrica: Fabrica) {
    const modalRef =  this.modal.open(NovoEditarFabricaComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Editar Fábrica';
    modalRef.componentInstance.fabrica = fabrica;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarFabricas();
      }
    })
  }
 
  excluir(fabrica) {    
    this.app
      .confirm(
        'Excluir Fabrica',
        `A fábrica ${fabrica.nome} será excluída do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.fabricaService.excluir(fabrica.id)
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
    this.app.toast('Fábrica excluída com sucesso', 'success');
    this.carregarFabricas();
  }

}
