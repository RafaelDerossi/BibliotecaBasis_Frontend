import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { Autor } from 'src/app/core/interfaces/autor';
import { AutorService } from 'src/app/core/services/autores/autor.service';
import { NovoEditarAutorComponent } from './novo-editar-autor/novo-editar-autor.component';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {
  autores: Autor[] = [];
  autoresCopy: Autor[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;

  constructor(private autorService: AutorService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarAutores();    
  }

  carregarAutores()
  {
    this.errorMessage = [];
    this.loading = true;
    this.autorService.obterTodos()
      .subscribe({
        next:  (s) => this.autores = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarObterComSucesso()
      });
  }

  processarObterComSucesso(){
    this.loading = false;
    this.autoresCopy = this.autores;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrarAutores(term: string) {
    const termo = this.app.normalizeText(term);
    this.autoresCopy = this.autores.map((item: Autor) => {
      let itemBuscado = this.app.normalizeText(item.nome);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }

  novoAutor() {
    const modalRef =  this.modal.open(NovoEditarAutorComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Novo Autor';
    modalRef.componentInstance.autor = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAutores();
      }
    })
  }

  editarAutor(autor: Autor) {
    const modalRef =  this.modal.open(NovoEditarAutorComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Editar Autor';
    modalRef.componentInstance.autor = autor;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarAutores();
      }
    })

  }

  detalhesAutor(autor: Autor) {
    const modalRef =  this.modal.open(NovoEditarAutorComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Detalhes do Autor';    
    modalRef.componentInstance.autor = autor;

    modalRef.result.then(result => {
      if (result == 'new') {
        this.novoAutor();
        return;
      }
      if (result == 'edit') {
        this.editarAutor(autor);
      }
      if (result == 'del') {
        this.excluirAutor(autor);
      }
    })
  }
 
  excluirAutor(autor) {    
    this.app
      .confirm(
        'Excluir Autor',
        `O Autor ${autor.nome} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.autorService.excluir(autor.id)
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
    this.app.toast('Autor excluído com sucesso', 'success');
    this.carregarAutores();
  } 

}
