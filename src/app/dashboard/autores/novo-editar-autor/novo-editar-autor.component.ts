import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { Autor } from 'src/app/core/interfaces/autor';
import { AutorService } from 'src/app/core/services/autores/autor.service';


@Component({
  selector: 'app-novo-editar-autor',
  templateUrl: './novo-editar-autor.component.html',
  styleUrls: ['./novo-editar-autor.component.scss']
})
export class NovoEditarAutorComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  activeTabId: any = 1;  
  actionRequested: string = 'Novo Autor';
  action: string = 'Novo Autor';

  form: FormGroup;
  loading: boolean = false;  
  errorMessage: string[] = [];      
  autor: Autor;
  response: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {
      descricao: {
        required: 'Informe o nome do autor',
        minlength: 'Nome deve ter entre 2 e 40 caracteres',
        maxlength: 'Nome deve ter entre 2 e 40 caracteres'
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],      
    });

    this.action = this.actionRequested;
    if (this.action != 'Novo Autor'){
      this.form.patchValue({      
        id: this.autor.id,
        nome: this.autor.nome,
      });
    }    
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  

  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.autor = Object.assign({}, this.autor, this.form.value);    

      this.form.disable();
      this.errorMessage = [];

      if (this.action == 'Editar Autor'){
      
        this.autorService.atualizar(this.autor)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucesso()
        });

        return;
      }

      this.autorService.adicionar(this.autor)
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
  
  onNavChange(changeEvent: NgbNavChangeEvent) {    
    super.validarFormulario;
    if (this.form.valid){      
      this.activeTabId = changeEvent.nextId;      
    }
    else{
      changeEvent.preventDefault();      
    }
  }

  
  novoAutor() {    
    this.activeModal.close('new')
  }

  editarAutor() {
    this.activeModal.close('edit')
  }

  excluirAutor() {    
    this.activeModal.close('del')
  }
}
