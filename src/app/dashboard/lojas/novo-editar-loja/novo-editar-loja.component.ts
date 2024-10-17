import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Loja } from 'src/app/core/interfaces/loja';
import { ViaCep } from 'src/app/core/interfaces/viacep';
import { AppService } from 'src/app/core/services/global/app.service';
import { LojaService } from 'src/app/core/services/lojas/loja.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { StringUtils } from 'src/app/core/shared/utils/string-utils';

@Component({
  selector: 'app-novo-editar-loja',
  templateUrl: './novo-editar-loja.component.html',
  styleUrls: ['./novo-editar-loja.component.scss']
})
export class NovoEditarLojaComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  activeTabId: any = 1;  
  actionRequested: string = 'Nova Loja';
  action: string = 'Nova Loja';

  form: FormGroup;
  loading: boolean = false;  
  errorMessage: string[] = [];      
  loja: Loja;
  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;
  disable2: boolean = true;
  disable3: boolean = true;
  somenteConsulta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private lojaService: LojaService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {
      razaoSocial: {
        required: 'Informe a Razão Social da empresa',
        minlength: 'Razão Social deve ter entre 2 e 200 caracteres',
        maxlength: 'Razão Social deve ter entre 2 e 200 caracteres'
      },
      nomeFantasia: {
        required: 'Informe o nome fantasia da loja',
        minlength: 'Nome Fantasia deve ter entre 2 e 30 caracteres',
        maxlength: 'Nome Fantasia deve ter entre 2 e 30 caracteres'
      },
      cnpj: {
        required: 'Informe o CNPJ da empresa',
        minlength: 'CNPJ deve ter 14 caracteres'        
      },
      regimeTributario: {
        required: 'Informe o Regime Tributário da empresa'
      },
      codigo: {
        required: 'Informe o Código da loja'
      },
      email: {        
        email: 'Email inválido'
      },
      telefone: {        
        minlength: 'Telefone deve ter 10 caracteres'  
      },
      celular: {        
        minlength: 'Celular deve ter 11 caracteres'  
      },
      cep: {        
        minlength: 'CEP deve ter 8 caracteres'  
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      inscricaoEstadual:[''],
      regimeTributario:['', [Validators.required]],
      codigo:['', [Validators.required]],
      email: ['', [Validators.email]],
      telefone: ['',[Validators.minLength(10), Validators.maxLength(10)]],
      celular: ['',[Validators.minLength(11), Validators.maxLength(11)]],
      organizacaoId: [this.organizacaoDoLocalStorage.id],
      logradouro:[''],
      complemento:[''],
      numero:[''],
      cep:['',[Validators.minLength(8), Validators.maxLength(8)]],
      bairro:[''],
      cidade:[''],
      estado:[''],
    });

    this.action = this.actionRequested;
    if (this.action != 'Nova Loja'){
      this.disable2 = false;
      this.disable3 = false;

      this.form.patchValue({      
        id: this.loja.id,
        razaoSocial: this.loja.razaoSocial,      
        nomeFantasia: this.loja.nomeFantasia,
        cnpj: this.loja.cnpj,
        inscricaoEstadual: this.loja.inscricaoEstadual,
        regimeTributario: this.loja.regimeTributario,
        codigo: this.loja.codigo,
        email: this.loja.email,
        telefone: this.loja.telefone,
        celular: this.loja.celular,
        cep: this.loja.cep,
        estado: this.loja.estado,
        cidade: this.loja.cidade,
        bairro: this.loja.bairro,
        logradouro: this.loja.logradouro,
        numero: this.loja.numero,
        complemento: this.loja.complemento,        
      });
    }    
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  

  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.loja = Object.assign({}, this.loja, this.form.value);    

      this.form.disable();
      this.errorMessage = [];      

      this.loja.regimeTributario = Number.parseInt(this.form.value.regimeTributario);

      if (this.action == 'Editar Loja'){
      
        this.lojaService.atualizar(this.loja)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucesso()
        });

        return;
      }

      this.lojaService.adicionar(this.loja)
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


  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.app.viaCep(cep)
      .then(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errorMessage.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: ViaCep) {

    this.form.patchValue({      
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,      
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });   
    
    this.renderer.selectRootElement('#cidade').focus();
    this.renderer.selectRootElement('#bairro').focus();
    this.renderer.selectRootElement('#logradouro').focus();
    this.renderer.selectRootElement('#numero').focus();
  }


  novaLoja() {    
    this.activeModal.close('new')
  }

  editarLoja() {
    this.activeModal.close('edit')
  }

  excluirLoja() {    
    this.activeModal.close('del')
  }
}
