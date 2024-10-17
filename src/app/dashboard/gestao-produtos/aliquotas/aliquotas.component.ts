import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Aliquota } from 'src/app/core/interfaces/aliquota';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AliquotaService } from 'src/app/core/services/gestao-produtos/aliquota.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { NovoEditarAliquotaComponent } from './novo-editar-aliquota/novo-editar-aliquota.component';

@Component({
  selector: 'app-aliquotas',
  templateUrl: './aliquotas.component.html',
  styleUrls: ['./aliquotas.component.scss']
})
export class AliquotasComponent implements OnInit {    
  usuarioDoLocalStorage: Usuario;
  organizacaoDoLocalStorage: any;
  aliquotas: Aliquota[] = [];
  aliquotasCopy: Aliquota[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  somenteConsulta: boolean = true;

  constructor(private aliquotaService: AliquotaService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.usuarioDoLocalStorage = this.aliquotaService.LocalStorage.obterUsuario();
    this.organizacaoDoLocalStorage = this.aliquotaService.LocalStorage.obterOrganizacao();
    if (this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '1' || this.usuarioDoLocalStorage.tipoDeUsuarioEnum == '2'){
      this.somenteConsulta = false;
    }
    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarAliquotas();    
  }

  carregarAliquotas()
  {
    this.errorMessage = [];
    this.loading = true;
    this.aliquotaService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.aliquotas = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarAliquotasCarregadasComSucesso()
      });
  }

  processarAliquotasCarregadasComSucesso(){
    this.loading = false;
    this.aliquotasCopy = this.aliquotas;
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
    this.aliquotasCopy = this.aliquotas.map((item: Aliquota) => {
      let itemBuscado = this.app.normalizeText(item.nome);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }  
  


  novo() {
    const modalRef =  this.modal.open(NovoEditarAliquotaComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Nova Alíquota';
    modalRef.componentInstance.aliquota = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAliquotas();
      }
    })
  }

  editar(aliquota: Aliquota) {
    const modalRef =  this.modal.open(NovoEditarAliquotaComponent, { backdrop: 'static', size: 'lg' });    
    modalRef.componentInstance.organizacaoDoLocalStorage = this.organizacaoDoLocalStorage;
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;
    modalRef.componentInstance.somenteConsulta = this.somenteConsulta;
    modalRef.componentInstance.actionRequested = 'Editar Alíquota';
    modalRef.componentInstance.aliquota = aliquota;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAliquotas();
      }
    })
  }
 
  excluir(aliquota) {    
    this.app
      .confirm(
        'Excluir Alíquota',
        `A alíquota ${aliquota.nome} será excluída do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.aliquotaService.excluir(aliquota.id)
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
    this.app.toast('Alíquota excluída com sucesso', 'success');
    this.carregarAliquotas();
  }

}
