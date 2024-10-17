import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Aliquota } from 'src/app/core/interfaces/aliquota';
import { AliquotaService } from 'src/app/core/services/gestao-produtos/aliquota.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';


@Component({
  selector: 'app-novo-editar-aliquota',
  templateUrl: './novo-editar-aliquota.component.html',
  styleUrls: ['./novo-editar-aliquota.component.scss']
})
export class NovoEditarAliquotaComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]; 
  
  actionRequested: string = 'Nova Alíquota';
  action: string = 'Nova Alíquota';

  form: FormGroup; 
  
  loading: boolean = false;  
  errorMessage: string[] = [];      
  aliquota: Aliquota;
  
  valoresDeAliquotas = [
    { id: 'FF', name: 'FF - Substituíção Tributária' },
    { id: 'NN', name: 'NN - Não Tributado' },
    { id: 'II', name: 'II - Isento' },
    { id: '08', name: '08 -  Tributado em 8%' },
    { id: '09', name: '09 -  Tributado em 9%' },
    { id: '10', name: '10 -  Tributado em 10%' },
    { id: '11', name: '11 -  Tributado em 11%' },
    { id: '12', name: '12 -  Tributado em 12%' },
    { id: '13', name: '13 -  Tributado em 13%' },
    { id: '14', name: '14 -  Tributado em 14%' },
    { id: '15', name: '15 -  Tributado em 15%' },
    { id: '16', name: '16 -  Tributado em 16%' },
    { id: '17', name: '17 -  Tributado em 17%' },
    { id: '18', name: '18 -  Tributado em 18%' },
    { id: '19', name: '19 -  Tributado em 19%' },
    { id: '20', name: '20 -  Tributado em 20%' },
    { id: '21', name: '21 -  Tributado em 21%' },
    { id: '22', name: '22 -  Tributado em 22%' },
    { id: '23', name: '23 -  Tributado em 23%' },
    { id: '24', name: '24 -  Tributado em 24%' },
    { id: '25', name: '25 -  Tributado em 25%' },
    { id: '26', name: '26 -  Tributado em 26%' },
    { id: '27', name: '27 -  Tributado em 27%' },
    { id: '28', name: '28 -  Tributado em 28%' },
    { id: '29', name: '29 -  Tributado em 29%' },
    { id: '30', name: '30 -  Tributado em 30%' },
    { id: '31', name: '31 -  Tributado em 31%' },
    { id: '32', name: '32 -  Tributado em 32%' },
    { id: '33', name: '33 -  Tributado em 33%' },
    { id: '34', name: '34 -  Tributado em 34%' },
    { id: '35', name: '35 -  Tributado em 35%' },
    { id: '36', name: '36 -  Tributado em 36%' },
    { id: '37', name: '37 -  Tributado em 37%' },
    { id: '38', name: '38 -  Tributado em 38%' },
    { id: '39', name: '39 -  Tributado em 39%' },
    { id: '40', name: '40 -  Tributado em 40%' },
    { id: '41', name: '41 -  Tributado em 41%' },
    { id: '42', name: '42 -  Tributado em 42%' },
    { id: '43', name: '43 -  Tributado em 43%' },
    { id: '44', name: '44 -  Tributado em 44%' },
    { id: '45', name: '45 -  Tributado em 45%' },
    { id: '46', name: '46 -  Tributado em 46%' },
    { id: '47', name: '47 -  Tributado em 47%' },
    { id: '48', name: '48 -  Tributado em 48%' },
    { id: '49', name: '49 -  Tributado em 49%' },    
];

  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;  
  somenteConsulta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private aliquotaService: AliquotaService,           
    private app: AppService,    
    public activeModal: NgbActiveModal, 
    private configSelect: NgSelectConfig   
  ) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o nome da alíquota',
        minlength: 'Nome da alíquota deve ter entre 1 e 100 caracteres',
        maxlength: 'Nome da alíquota deve ter entre 1 e 100 caracteres'
      },
      aliquotaValor: {
        required: 'Informe o valor da alíquota',
        minlength: 'Valor da alíquota deve ter 2 caracteres',
        maxlength: 'Valor da alíquota deve ter 2 caracteres'
      },
      cstTributacaoNormal: {
        required: 'Informe o CST de tributação normal da alíquota'        
      },
      cstSimplesNacional: {
        required: 'Informe o CST do Simples Nacional da alíquota'        
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
    
    this.configuraOSelect();
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      aliquotaValor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      organizacaoId: [this.organizacaoDoLocalStorage.id],
      cstTributacaoNormal: ['', [Validators.required]],
      cstSimplesNacional: ['', [Validators.required]]
    });

    this.action = this.actionRequested;
    if (this.action !== 'Nova Alíquota'){      

      this.form.patchValue(this.aliquota);        
    }
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }  

  configuraOSelect(){
    this.configSelect.notFoundText = 'nenhuma opção encontrada';    
  }
  
  validarForm(){
    super.validarFormulario(this.form);
  }

  salvar() {    

    if (this.form.dirty && this.form.valid) {      
      
      this.loading = true;  

      this.aliquota = Object.assign({}, this.aliquota, this.form.value);    

      this.aliquota.cstTributacaoNormal = parseInt(this.form.get('cstTributacaoNormal').value);
      this.aliquota.cstSimplesNacional = parseInt(this.form.get('cstSimplesNacional').value);

      this.form.disable();
      this.errorMessage = [];           

      if (this.action === 'Editar Alíquota'){
      
        this.aliquotaService.atualizar(this.aliquota)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucessoAoSalvar()
        });

        return;
      }

      this.aliquotaService.adicionar(this.aliquota)
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

    this.app.toast('Alíquota salva com sucesso!', 'success', null, 'SUCESSO!');    

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
