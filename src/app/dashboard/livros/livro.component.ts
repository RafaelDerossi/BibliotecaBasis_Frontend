import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { Livro } from 'src/app/core/interfaces/livro';
import { LivroService } from 'src/app/core/services/livros/livro.service';
import { NovoEditarLivroComponent } from './novo-editar-livro/novo-editar-livro.component';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss']
})
export class LivroComponent implements OnInit {
  livros: Livro[] = [];
  livrosCopy: Livro[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;

  constructor(private livroService: LivroService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarLivros();    
  }

  carregarLivros()
  {
    this.errorMessage = [];
    this.loading = true;
    this.livroService.obterTodos()
      .subscribe({
        next:  (s) => this.livros = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarObterLivrosComSucesso()
      });
  }

  processarObterLivrosComSucesso(){
    this.loading = false;
    this.livrosCopy = this.livros;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrarLivros(term: string) {
    const termo = this.app.normalizeText(term);
    this.livrosCopy = this.livros.map((item: Livro) => {
      let itemBuscado = this.app.normalizeText(item.titulo);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }

  novoLivro() {
    const modalRef =  this.modal.open(NovoEditarLivroComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Novo Livro';
    modalRef.componentInstance.livro = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarLivros();
      }
    })
  }

  editarLivro(livro: Livro) {
    const modalRef =  this.modal.open(NovoEditarLivroComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Editar Livro';
    modalRef.componentInstance.livro = livro;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarLivros();
      }
    })

  }

  detalhesLivro(livro: Livro) {
    const modalRef =  this.modal.open(NovoEditarLivroComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Detalhes do Livro';    
    modalRef.componentInstance.livro = livro;

    modalRef.result.then(result => {
      if (result == 'new') {
        this.novoLivro();
        return;
      }
      if (result == 'edit') {
        this.editarLivro(livro);
      }
      if (result == 'del') {
        this.excluirLivro(livro);
      }
    })
  }
 
  excluirLivro(livro) {    
    this.app
      .confirm(
        'Excluir Livro',
        `O Livro ${livro.titulo} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.livroService.excluir(livro.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarExcluirLivroComSucesso()
            });

        }
      });
  }

  processarExcluirLivroComSucesso(){
    this.loading = false;
    this.app.toast('Livro excluído com sucesso', 'success');
    this.carregarLivros();
  } 

}
