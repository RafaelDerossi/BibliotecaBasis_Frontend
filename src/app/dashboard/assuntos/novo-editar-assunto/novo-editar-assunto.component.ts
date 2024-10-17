import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { Assunto } from 'src/app/core/interfaces/assunto';
import { AssuntoService } from 'src/app/core/services/assuntos/assunto.service';


@Component({
  selector: 'app-novo-editar-assunto',
  templateUrl: './novo-editar-assunto.component.html',
  styleUrls: ['./novo-editar-assunto.component.scss']
})
export class NovoEditarAssuntoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  activeTabId: any = 1;  
  actionRequested: string = 'Novo Assunto';
  action: string = 'Novo Assunto';

  form: FormGroup;
  loading: boolean = false;  
  errorMessage: string[] = [];      
  assunto: Assunto;
  response: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;
  disable2: boolean = true;
  disable3: boolean = true;

  constructor(
    private fb: FormBuilder,
    private assuntoService: AssuntoService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {
      descricao: {
        required: 'Informe a Descrição do assunto',
        minlength: 'Descrição deve ter entre 2 e 20 caracteres',
        maxlength: 'Descrição deve ter entre 2 e 20 caracteres'
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],      
    });

    this.action = this.actionRequested;
    if (this.action != 'Novo Assunto'){
      this.disable2 = false;
      this.disable3 = false;

      this.form.patchValue({      
        id: this.assunto.id,
        descricao: this.assunto.descricao,
      });
    }    
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  

  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.assunto = Object.assign({}, this.assunto, this.form.value);    

      this.form.disable();
      this.errorMessage = [];

      if (this.action == 'Editar Assunto'){
      
        this.assuntoService.atualizar(this.assunto)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucesso()
        });

        return;
      }

      this.assuntoService.adicionar(this.assunto)
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

  
  novoAssunto() {    
    this.activeModal.close('new')
  }

  editarAssunto() {
    this.activeModal.close('edit')
  }

  excluirAssunto() {    
    this.activeModal.close('del')
  }
}
