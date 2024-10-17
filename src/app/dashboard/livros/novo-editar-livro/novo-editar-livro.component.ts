import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { Livro, NovoLivro } from 'src/app/core/interfaces/livro';
import { LivroService } from 'src/app/core/services/livros/livro.service';
import { AssuntoService } from 'src/app/core/services/assuntos/assunto.service';
import { Assunto } from 'src/app/core/interfaces/assunto';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AutorService } from 'src/app/core/services/autores/autor.service';
import { Autor } from 'src/app/core/interfaces/autor';

@Component({
  selector: 'app-novo-editar-livro',
  templateUrl: './novo-editar-livro.component.html',
  styleUrls: ['./novo-editar-livro.component.scss']
})
export class NovoEditarLivroComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  activeTabId: any = 1;  
  actionRequested: string = 'Novo Livro';
  action: string = 'Novo Livro';

  form: FormGroup;
  loading: boolean = false;  
  errorMessage: string[] = [];      
  livro: Livro;
  livroNovo: NovoLivro;
  assuntos: Assunto[]= [];
  autores: Autor[]= [];
  response: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string = "background-black";
  disable2: boolean = true;
  disable3: boolean = true;

  assuntosFormArray: FormArray = new FormArray([]); 
  autoresFormArray: FormArray = new FormArray([]); 

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,    
    private assuntoService: AssuntoService,    
    private autorService: AutorService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {
      titulo: {
        required: 'Informe o título do livro',
        minlength: 'Título deve ter entre 1 e 40 caracteres',
        maxlength: 'Título deve ter entre 1 e 40 caracteres'
      },
      editora: {
        required: 'Informe editora do livro',
        minlength: 'Editora deve ter entre 1 e 40 caracteres',
        maxlength: 'Editora deve ter entre 1 e 40 caracteres'
      },
      edicao: {
        required: 'Informe a edição do livro',
        maxlength: 'Edição deve ter até 9 caracteres',
        pattern: 'Informe apenas números!'                  
      },
      anoPublicacao: {
        required: 'Informe o ano de publicação do livro',
        minlength: 'Ano de publicação deve ter 4 caracteres',
        maxlength: 'Ano de publicação deve ter 4 caracteres',
        pattern: 'Informe apenas números!'          
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      editora: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      edicao: ['0', [Validators.required, Validators.maxLength(9)]],
      anoPublicacao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      assuntos: new FormArray([]),       
      autores: new FormArray([]),       
    });
    
    this.carregarAssuntos();

    this.action = this.actionRequested;
    if (this.action != 'Novo Livro'){
      this.disable2 = false;
      this.disable3 = false;

      this.form.patchValue({      
        id: this.livro.id,
        titulo: this.livro.titulo,
        editora: this.livro.editora,
        edicao: this.livro.edicao,
        anoPublicacao: this.livro.anoPublicacao,
      });
    }    
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  
  carregarAssuntos()
  {    
    this.errorMessage = [];
    this.loading = true;

    this.assuntoService.obterTodos()
      .subscribe({
        next:  (s) => this.assuntos = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarAssuntosCarregadosComSucesso()
      });
  }
  processarAssuntosCarregadosComSucesso(){    
    this.carregarAutores();    
  }

  carregarAutores()
  {
    this.autorService.obterTodos()
      .subscribe({
        next:  (s) => this.autores = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarAutoresCarregadosComSucesso()
      });
  }
  processarAutoresCarregadosComSucesso(){  
    this.loading = false;
  }

  processarFalhaEmCarregarLista(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }



  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.livroNovo = Object.assign({}, this.livroNovo, this.form.value);    

      this.livroNovo.assuntos = this.assuntosFormArray.value.map(function(a) {
        return a.assuntoId;
      });
      
      this.livroNovo.autores = this.autoresFormArray.value.map(function(a) {
        return a.autorId;
      });

      this.form.disable();
      this.errorMessage = [];

      if (this.action == 'Editar Livro'){
      
        this.livroService.atualizar(this.livroNovo)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucesso()
        });

        return;
      }

      this.livroService.adicionar(this.livroNovo)
      .subscribe({
        next:  (s) => this.response = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarSucesso()
      });

      return;
    }
  }
  
  processarSucesso() {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Registro Salvo!', 'success', null, 'SUCESSO!');    

    this.activeModal.close('saved')

    return;   
  }

  processarFalha(fail: any){
    this.loading = false;
    this.form.enable();
    const { errors } = fail.error;
    
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  voltarStep() {
    this.activeTabId = this.activeTabId - 1;    
  }

  proximoStep() {        
    super.validarFormulario;
    if (this.form.valid){
      if (this.activeTabId === 1) {
        this.disable2 = false;
        this.activeTabId = this.activeTabId + 1;        
        return;
      }
      if (this.activeTabId === 2) {
        this.disable3 = false;
        this.activeTabId = this.activeTabId + 1;        
        return;
      }          
    }    
  }  

  onNavChange(changeEvent: NgbNavChangeEvent) {    
    super.validarFormulario;
    if (this.form.valid){      
      this.activeTabId = changeEvent.nextId;      
    }
    else{
      changeEvent.preventDefault();      
    }
  }

  
  novoLivro() {    
    this.activeModal.close('new')
  }

  editarLivro() {
    this.activeModal.close('edit')
  }

  excluirLivro() {    
    this.activeModal.close('del')
  }



  validarForm(){
    super.validarFormulario(this.form);
  }

  validarAbaInfoBasica():boolean{
    if (!this.form.get("titulo").valid || 
        !this.form.get("editora").valid || 
        !this.form.get("edicao").valid || 
        !this.form.get("anoPublicacao").valid){      
      return false;
    }     
    return true;
  }

  validarAbaAssunto():boolean{    
    return true;
  }

  validarAbaAutor():boolean{        
    return true;
  }



  adicionarAssuntoNaLista() {
    this.assuntosFormArray = this.form.get('assuntos') as FormArray;    
    this.assuntosFormArray.push(
      new FormGroup({
        assuntoId: new FormControl("", Validators.required),
      })
    )
  }

  removerAssuntoDaLista(index: number) {
    this.assuntosFormArray = this.form.get("assuntos") as FormArray;
    this.assuntosFormArray.removeAt(index);
  }

  dropAssunto(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('assuntos')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.form.get('assuntos').value, event.previousIndex, event.currentIndex);

    this.form.get('assuntos')['controls'][event.currentIndex].get('ordem').setValue(event.currentIndex);
    this.form.get('assuntos')['controls'][event.previousIndex].get('ordem').setValue(event.previousIndex);
  }


  adicionarAutorNaLista() {
    this.autoresFormArray = this.form.get('autores') as FormArray;    
    this.autoresFormArray.push(
      new FormGroup({
        autorId: new FormControl("", Validators.required),
      })
    )
  }

  removerAutorDaLista(index: number) {
    this.autoresFormArray = this.form.get("autores") as FormArray;
    this.autoresFormArray.removeAt(index);
  }

  dropAutor(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('autores')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.form.get('autores').value, event.previousIndex, event.currentIndex);

    this.form.get('autores')['controls'][event.currentIndex].get('ordem').setValue(event.currentIndex);
    this.form.get('autores')['controls'][event.previousIndex].get('ordem').setValue(event.previousIndex);
  }

}
