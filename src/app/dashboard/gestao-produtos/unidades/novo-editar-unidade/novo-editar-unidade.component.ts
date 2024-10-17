import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Unidade } from 'src/app/core/interfaces/unidade';
import { UnidadeService } from 'src/app/core/services/gestao-produtos/unidade.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';

@Component({
  selector: 'app-novo-editar-unidade',
  templateUrl: './novo-editar-unidade.component.html',
  styleUrls: ['./novo-editar-unidade.component.scss']
})
export class NovoEditarUnidadeComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]; 
  
  actionRequested: string = 'Nova Unidade';
  action: string = 'Nova Unidade';

  form: FormGroup; 
  
  loading: boolean = false;  
  errorMessage: string[] = [];      
  unidade: Unidade;

  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;  
  somenteConsulta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private unidadeService: UnidadeService,           
    private app: AppService,    
    public activeModal: NgbActiveModal,    
  ) {

    super();

    this.validationMessages = {
      descricao: {
        required: 'Informe a descrição da unidade',
        minlength: 'Descrição da unidade deve ter entre 2 e 50 caracteres',
        maxlength: 'Descrição da unidade deve ter entre 2 e 50 caracteres'
      },
      abreviacao: {
        required: 'Informe a abreviação da unidade',
        minlength: 'Abreviação da unidade deve ter entre 2 e 3 caracteres',
        maxlength: 'Abreviação da unidade deve ter entre 2 e 3 caracteres'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],      
      organizacaoId: [this.organizacaoDoLocalStorage.id],
      abreviacao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],      
    });

    this.action = this.actionRequested;
    if (this.action !== 'Nova Unidade'){      

      this.form.patchValue(this.unidade);        
    }
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }  

  

  salvar() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.unidade = Object.assign({}, this.unidade, this.form.value);    

      this.form.disable();
      this.errorMessage = [];           

      if (this.action === 'Editar Unidade'){
      
        this.unidadeService.atualizar(this.unidade)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucessoAoSalvar()
        });

        return;
      }

      this.unidadeService.adicionar(this.unidade)
      .subscribe({
        next:  (s) => this.response = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarSucessoAoSalvar()
      });

      return;
    }
  }
  
  processarSucessoAoSalvar() {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Unidade salva com sucesso!', 'success', null, 'SUCESSO!');    

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

  
}
