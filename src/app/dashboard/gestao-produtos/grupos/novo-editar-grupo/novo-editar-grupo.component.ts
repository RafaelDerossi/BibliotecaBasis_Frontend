import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from 'src/app/core/interfaces/grupo';
import { Subgrupo } from 'src/app/core/interfaces/subgrupo';
import { GrupoService } from 'src/app/core/services/gestao-produtos/grupo.service';
import { SubgrupoService } from 'src/app/core/services/gestao-produtos/subgrupo.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';

@Component({
  selector: 'app-novo-editar-grupo',
  templateUrl: './novo-editar-grupo.component.html',
  styleUrls: ['./novo-editar-grupo.component.scss']
})
export class NovoEditarGrupoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]; 
  
  actionRequested: string = 'Novo Grupo';
  action: string = 'Novo Grupo';

  form: FormGroup;
  subgrupos: FormArray = new FormArray([]);
  
  loading: boolean = false;  
  errorMessage: string[] = [];      
  grupo: Grupo;
  subgrupo: Subgrupo;    

  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;  
  somenteConsulta: boolean = true;

  constructor(
    private fb: FormBuilder,
    private grupoService: GrupoService,    
    private subgrupoService: SubgrupoService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,    
  ) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o nome do grupo',
        minlength: 'Nome do grupo deve ter entre 2 e 30 caracteres',
        maxlength: 'Nome do grupo deve ter entre 2 e 30 caracteres'
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;    

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],      
      organizacaoId: [this.organizacaoDoLocalStorage.id],
      subgrupos: new FormArray([])    
    });

    this.action = this.actionRequested;
    if (this.action !== 'Novo Grupo'){      

      this.form.patchValue(this.grupo);      

      this.subgrupos = this.form.get('subgrupos') as FormArray;    
      this.grupo.subgrupos.map(subgrupo => {
      this.subgrupos.push(
        new FormGroup({
            id: new FormControl(subgrupo.id),
            nome: new FormControl(subgrupo.nome, Validators.required),
            markup: new FormControl(subgrupo.markup),
            grupoId: new FormControl(subgrupo.grupoId),
          })
        )
      }); 
    }        
    
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);   
  }
  

  


  adicionarSubgrupoNaLista() {
    this.subgrupos = this.form.get('subgrupos') as FormArray;    
    this.subgrupos.push(
      new FormGroup({        
        id: new FormControl("0"),
        nome: new FormControl("", Validators.required),
        markup: new FormControl("40"),
        grupoId: new FormControl(this.grupo?.id),
      })
    )
  }

  removerSubgrupoDaLista(index: number) {
    this.subgrupos = this.form.get("subgrupos") as FormArray;
    this.subgrupos.removeAt(index);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('subgrupos')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.form.get('subgrupos').value, event.previousIndex, event.currentIndex);

    this.form.get('subgrupos')['controls'][event.currentIndex].get('ordem').setValue(event.currentIndex);
    this.form.get('subgrupos')['controls'][event.previousIndex].get('ordem').setValue(event.previousIndex);
  }



  salvarGrupoNovo() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.grupo = Object.assign({}, this.grupo, this.form.value);    

      this.form.disable();
      this.errorMessage = [];                 

      this.grupoService.adicionar(this.grupo)
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

    this.app.toast('Grupo incluído com sucesso!', 'success', null, 'SUCESSO!');    

    this.activeModal.close('saved')

    return;   
  }   


  salvarEdicaoGrupo() {    

    if (this.action === 'Editar Grupo' && 
        this.form.get('nome').dirty && 
        this.form.get('nome').valid) {

      this.loading = true;  

      this.grupo = Object.assign({}, this.grupo, this.form.value);    

      this.form.disable();
      this.errorMessage = [];           

      this.grupoService.atualizar(this.grupo)
         .subscribe({
           next:  (s) => this.response = s,
           error: (e) => this.processarFalha(e),
           complete: () => this.processarSucessoAoEditar()
        });        

      return;
    }
  }

  processarSucessoAoEditar() {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Grupo editado com sucesso!', 'success', null, 'SUCESSO!');

    return;   
  }



  salvarNovoSubgrupo(index: number) {    
    if (this.action !== 'Editar Grupo')
      return;    

    this.subgrupos = this.form.get("subgrupos") as FormArray;

    if (!this.subgrupos.at(index).dirty || !this.subgrupos.at(index).valid)
      return;    

    if (this.subgrupos.at(index).get('id').value !== '0')
      return;    

    this.loading = true;     
      
    this.subgrupo = Object.assign({}, this.subgrupo, this.subgrupos.at(index).value);      

    this.form.disable();
    this.errorMessage = [];           

    this.subgrupoService.adicionar(this.subgrupo)
      .subscribe({
        next:  (s) => this.response = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarSucessoAoIncluirSubgrupo()
      });        

    return;
  }

  processarSucessoAoIncluirSubgrupo() {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Subgrupo incluído com sucesso!', 'success', null, 'SUCESSO!');

    return;   
  }

  salvarEdicaoSubgrupo(index: number) {    
    if (this.action !== 'Editar Grupo')
      return;    

    this.subgrupos = this.form.get("subgrupos") as FormArray;

    if (!this.subgrupos.at(index).dirty || !this.subgrupos.at(index).valid)
      return;    

    if (this.subgrupos.at(index).get('id').value === '0')
      return;    

    this.loading = true;     
      
    this.subgrupo = Object.assign({}, this.subgrupo, this.subgrupos.at(index).value);      

    this.form.disable();
    this.errorMessage = [];           

    this.subgrupoService.atualizar(this.subgrupo)
      .subscribe({
        next:  (s) => this.response = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarSucessoAoEditarSubgrupo()
      });        

    return;
  }

  processarSucessoAoEditarSubgrupo() {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Subgrupo editado com sucesso!', 'success', null, 'SUCESSO!');

    return;   
  }


  excluirSubgrupo(index: number) {
    
    this.subgrupos = this.form.get("subgrupos") as FormArray;
    this.subgrupo = Object.assign({}, this.subgrupo, this.subgrupos.at(index).value);      
    this.app
      .confirm(
        'Excluir Subgrupo',
        `O subgrupo ${this.subgrupo.nome} será excluído do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.subgrupoService.excluir(this.subgrupo.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarSucessoAoExcluirSubgrupo(index)
            });

        }
      });
  }

  processarSucessoAoExcluirSubgrupo(index: number) {
    
    this.form.enable();

    this.loading = false;   

    this.app.toast('Subgrupo excluído com sucesso!', 'success', null, 'SUCESSO!');

    this.removerSubgrupoDaLista(index);
    
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
