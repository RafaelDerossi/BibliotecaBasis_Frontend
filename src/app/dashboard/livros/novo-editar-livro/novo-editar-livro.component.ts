import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { Livro } from 'src/app/core/interfaces/livro';
import { LivroService } from 'src/app/core/services/livros/livro.service';


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
  response: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;
  disable2: boolean = true;
  disable3: boolean = true;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {
      titulo: {
        required: 'Informe o Título do livro',
        minlength: 'Título deve ter entre 1 e 40 caracteres',
        maxlength: 'Título deve ter entre 1 e 40 caracteres'
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],      
    });
    
    this.action = this.actionRequested;
    if (this.action != 'Novo Livro'){
      this.disable2 = false;
      this.disable3 = false;

      this.form.patchValue({      
        id: this.livro.id,
        titulo: this.livro.titulo,
      });
    }    
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  

  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.livro = Object.assign({}, this.livro, this.form.value);    

      this.form.disable();
      this.errorMessage = [];

      if (this.action == 'Editar Livro'){
      
        this.livroService.atualizar(this.livro)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucesso()
        });

        return;
      }

      this.livroService.adicionar(this.livro)
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
}
