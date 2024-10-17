import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Fabrica } from 'src/app/core/interfaces/fabrica';
import { FabricaService } from 'src/app/core/services/gestao-produtos/fabrica.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';

@Component({
  selector: 'app-novo-editar-fabrica',
  templateUrl: './novo-editar-fabrica.component.html',
  styleUrls: ['./novo-editar-fabrica.component.scss']
})
export class NovoEditarFabricaComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]; 
  
  actionRequested: string = 'Nova Fábrica';
  action: string = 'Nova Fábrica';

  form: FormGroup; 
  
  loading: boolean = false;  
  errorMessage: string[] = [];      
  fabrica: Fabrica;

  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;  
  somenteConsulta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private fabricaService: FabricaService,           
    private app: AppService,    
    public activeModal: NgbActiveModal,    
  ) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o nome da fábrica',
        minlength: 'Nome da fábrica deve ter entre 2 e 40 caracteres',
        maxlength: 'Nome da fábrica deve ter entre 2 e 40 caracteres'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],      
      organizacaoId: [this.organizacaoDoLocalStorage.id]      
    });

    this.action = this.actionRequested;
    if (this.action !== 'Nova Fábrica'){      

      this.form.patchValue(this.fabrica);        
    }
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }  

  

  salvar() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.fabrica = Object.assign({}, this.fabrica, this.form.value);    

      this.form.disable();
      this.errorMessage = [];           

      if (this.action === 'Editar Fábrica'){
      
        this.fabricaService.atualizar(this.fabrica)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucessoAoSalvar()
        });

        return;
      }

      this.fabricaService.adicionar(this.fabrica)
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

    this.app.toast('Fábrica salva com sucesso!', 'success', null, 'SUCESSO!');    

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
