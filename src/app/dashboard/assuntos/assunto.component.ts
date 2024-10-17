import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { Assunto } from 'src/app/core/interfaces/assunto';
import { AssuntoService } from 'src/app/core/services/assuntos/assunto.service';
import { NovoEditarAssuntoComponent } from './novo-editar-assunto/novo-editar-assunto.component';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.scss']
})
export class AssuntoComponent implements OnInit {
  assuntos: Assunto[] = [];
  assuntosCopy: Assunto[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;

  constructor(private assuntoService: AssuntoService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarAssuntos();    
  }

  carregarAssuntos()
  {
    this.errorMessage = [];
    this.loading = true;
    this.assuntoService.obterTodos()
      .subscribe({
        next:  (s) => this.assuntos = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarObterAssuntosComSucesso()
      });
  }

  processarObterAssuntosComSucesso(){
    this.loading = false;
    this.assuntosCopy = this.assuntos;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrarAssuntos(term: string) {
    const termo = this.app.normalizeText(term);
    this.assuntosCopy = this.assuntos.map((item: Assunto) => {
      let itemBuscado = this.app.normalizeText(item.descricao);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }

  novoAssunto() {
    const modalRef =  this.modal.open(NovoEditarAssuntoComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Novo Assunto';
    modalRef.componentInstance.assunto = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAssuntos();
      }
    })
  }

  editarAssunto(assunto: Assunto) {
    const modalRef =  this.modal.open(NovoEditarAssuntoComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Editar Assunto';
    modalRef.componentInstance.assunto = assunto;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAssuntos();
      }
    })

  }

  detalhesAssunto(assunto: Assunto) {
    const modalRef =  this.modal.open(NovoEditarAssuntoComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Detalhes do Assunto';    
    modalRef.componentInstance.assunto = assunto;

    modalRef.result.then(result => {
      if (result == 'new') {
        this.novoAssunto();
        return;
      }
      if (result == 'edit') {
        this.editarAssunto(assunto);
      }
      if (result == 'del') {
        this.excluirAssunto(assunto);
      }
    })
  }
 
  excluirAssunto(assunto) {    
    this.app
      .confirm(
        'Excluir Assunto',
        `O Assunto ${assunto.descricao} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.assuntoService.excluir(assunto.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarExcluirAssuntoComSucesso()
            });

        }
      });
  }

  processarExcluirAssuntoComSucesso(){
    this.loading = false;
    this.app.toast('Assunto excluído com sucesso', 'success');
    this.carregarAssuntos();
  } 

}
