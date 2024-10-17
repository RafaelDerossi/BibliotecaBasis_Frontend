import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Aliquota } from 'src/app/core/interfaces/aliquota';
import { Fabrica } from 'src/app/core/interfaces/fabrica';
import { Grupo } from 'src/app/core/interfaces/grupo';
import { Assunto } from 'src/app/core/interfaces/assunto';
import { Montadora } from 'src/app/core/interfaces/montadora';
import { NovoProduto } from 'src/app/core/interfaces/produto';
import { Subgrupo } from 'src/app/core/interfaces/subgrupo';
import { Unidade } from 'src/app/core/interfaces/unidade';
import { AliquotaService } from 'src/app/core/services/gestao-produtos/aliquota.service';
import { FabricaService } from 'src/app/core/services/gestao-produtos/fabrica.service';
import { GrupoService } from 'src/app/core/services/gestao-produtos/grupo.service';
import { MontadoraService } from 'src/app/core/services/gestao-produtos/montadora.service';
import { ProdutoService } from 'src/app/core/services/gestao-produtos/produto.service';
import { UnidadeService } from 'src/app/core/services/gestao-produtos/unidade.service';
import { AppService } from 'src/app/core/services/global/app.service';
import { AssuntoService } from 'src/app/core/services/assuntos/assunto.service';
import { FormBaseComponent } from 'src/app/core/shared/components/form-base.component';
import { DigitOnlyDirective } from 'src/app/core/shared/directive/digit-only.directive';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GradeService } from 'src/app/core/services/gestao-produtos/grade.service';
import { Grade } from 'src/app/core/interfaces/grade';
import { NovaFotoDeProdutoBase64 } from 'src/app/core/interfaces/fotoDeProduto';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss'],
  providers: [DigitOnlyDirective]
})
export class NovoProdutoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  loading: boolean = false;  
  errorMessage: string[] = [];      
  activeTabId: any = 1;

  form: FormGroup;
  estoques: FormArray = new FormArray([]);  
  
  produto: NovoProduto;
  grupos: Grupo[]= [];
  subgrupos: Subgrupo[]= [];
  fabricas: Fabrica[]= [];
  unidades: Unidade[]= [];
  lojas: Assunto[]= [];
  aliquotas: Aliquota[]= [];
  montadoras: Montadora[]= [];
  grades: Grade[]= [];

  response: any;  
  organizacaoDoLocalStorage: any;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;
  disable2: boolean = true;
  disable3: boolean = true;
  disable4: boolean = true;
  disable5: boolean = true;
  disable6: boolean = true;
  disable7: boolean = true;
  disable8: boolean = true;
  disable9: boolean = true;
  disable10: boolean = true;
  disable11: boolean = true;
  disable12: boolean = true;
  disable13: boolean = true;
  disable14: boolean = true;

  imagensFiles: File[] = [];      
  imagensForm: FormGroup;  
  imagensBase64: NovaFotoDeProdutoBase64[] = [];  

  aplicacoesFormArray: FormArray = new FormArray([]); 
  itensGradeFormArray: FormArray = new FormArray([]); 


  valoresDeCSTdoPisECofins = [
    { id: '1', descricao: '01 - Operação Tributável com Alíquota Básica' },
    { id: '2', descricao: '02 - Operação Tributável com Alíquota Diferenciada' },
    { id: '3', descricao: '03 - Operação Tributável com Alíquota por Unidade de Medida de Produto' },
    { id: '4', descricao: '04 -  Operação Tributável Monofásica – Revenda a Alíquota Zero' },
    { id: '5', descricao: '05 -  Operação Tributável por Substituição Tributária' },
    { id: '6', descricao: '06 -  Operação Tributável a Alíquota Zero' },
    { id: '7', descricao: '07 -  Operação Isenta da Contribuição' },
    { id: '8', descricao: '08 -  Operação sem Incidência da Contribuição' },
    { id: '9', descricao: '09 -  Operação com Suspensão da Contribuição' },
    { id: '49', descricao: '49 -  Outras Operações de Saída' },
    { id: '50', descricao: '50 -  Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
    { id: '51', descricao: '51 -  Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
    { id: '52', descricao: '52 -  Operação com Direito a Crédito – Vinculada Exclusivamente a Receita de Exportação' },
    { id: '53', descricao: '53 -  Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
    { id: '54', descricao: '54 -  Operação com Direito a Crédito – Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
    { id: '55', descricao: '55 -  Operação com Direito a Crédito – Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação' },
    { id: '56', descricao: '56 -  Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
    { id: '60', descricao: '60 -  Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
    { id: '61', descricao: '61 -  Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
    { id: '62', descricao: '62 -  Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação' },
    { id: '63', descricao: '63 -  Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
    { id: '64', descricao: '64 -  Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
    { id: '65', descricao: '65 -  Crédito Presumido – Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação' },
    { id: '66', descricao: '66 -  Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
    { id: '67', descricao: '67 -  Crédito Presumido – Outras Operações' },
    { id: '70', descricao: '70 -  Operação de Aquisição sem Direito a Crédito' },
    { id: '71', descricao: '71 -  Operação de Aquisição com Isenção' },
    { id: '72', descricao: '72 -  Operação de Aquisição com Suspensão' },
    { id: '73', descricao: '73 -  Operação de Aquisição a Alíquota Zero' },
    { id: '74', descricao: '74 -  Operação de Aquisição sem Incidência da Contribuição' },
    { id: '75', descricao: '75 -  Operação de Aquisição por Substituição Tributária' },
    { id: '98', descricao: '98 -  Outras Operações de Entrada' },
    { id: '99', descricao: '99 -  Outras Operações' },    
];

valoresDeTipoDeCalculodoPisECofins = [
  { id: '1', descricao: '1 - Percentual' },
  { id: '2', descricao: '2 - Em Valor' }  
];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,  
    private gradeService: GradeService,
    private grupoService: GrupoService,
    private fabricaService: FabricaService,
    private unidadeService: UnidadeService,
    private lojaService: AssuntoService,
    private aliquotaService: AliquotaService,
    private montadoraService: MontadoraService,    
    private app: AppService,    
    public activeModal: NgbActiveModal,
    private renderer: Renderer2,
  ) {

    super();

    this.validationMessages = {      
      gtin: {        
        minlength: 'GTIN deve ter entre 8 e 14 caracteres',        
        maxlength: 'GTIN deve ter entre 8 e 14 caracteres',
        pattern: 'Informe apenas números!'
      },
      grupoId: {
        required: 'Informe o grupo do produto',
      },
      subgrupoId: {
        required: 'Informe o subgrupo do produto',
      },
      fabricaId: {
        required: 'Informe a fábrica do produto',
      },
      descricaoCompleta: {
        required: 'Informe a descrição completa do produto',
        minlength: 'Descrição completa deve ter entre 2 e 400 caracteres',
        maxlength: 'Descrição completa deve ter entre 2 e 400 caracteres'
      },
      descricaoDePDV: {
        required: 'Informe a descrição de PDV do produto',
        minlength: 'Descrição de PDV deve ter entre 2 e 30 caracteres',
        maxlength: 'Descrição de PDV deve ter entre 2 e 30 caracteres'
      },
      cif: {        
        maxlength: 'CIF deve ter até 20 caracteres'
      },
      genuino: {        
        maxlength: 'Genuíno deve ter até 15 caracteres'
      },
      unidadeId: {
        required: 'Informe a unidade do produto',
      },
      fatorMultiplicador: {
        required: 'Informe o Fator Multiplicador',
      },
      preco: {
        required: 'Informe o preço de venda',
      },
      precoComDesconto: {
        required: 'Informe o preço com desconto',
      },
      porcentagemDeDesconto: {
        required: 'Informe o preço com desconto',
      },
      precoComDescontoDois: {
        required: 'Informe o preço com desconto',
      },
      porcentagemDeDescontoDois: {
        required: 'Informe o preço com desconto',
      },
      ncm: {        
        pattern: 'Informe apenas números!',
        minlength: 'NCM deve ter entre 4 e 8 caracteres',
        maxlength: 'NCM deve ter entre 4 e 8 caracteres',
      },
      cest: {        
        pattern: 'Informe apenas números!',
        minlength: 'CEST deve ter 7 caracteres',
        maxlength: 'CEST deve ter 7 caracteres',
      },      
      cfopSaida: {        
        pattern: 'Informe apenas números!',
        minlength: 'CFOP deve ter 4 caracteres',
        maxlength: 'CEST deve ter 4 caracteres',
      },
      aliquotaDoPis: {        
        pattern: 'Informe apenas números!'        
      },
      aliquotaDoCofins: {        
        pattern: 'Informe apenas números!'        
      },
      pglp: {        
        pattern: 'Informe apenas números!'        
      },
      pgnn: {        
        pattern: 'Informe apenas números!'        
      },
      pgni: {        
        pattern: 'Informe apenas números!'        
      },
      valorPartida: {        
        pattern: 'Informe apenas números!'        
      },
      qtdMesesGarantia: {        
        required: 'Informe um valor!'        
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);    
   }

  ngOnInit(): void {    
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;       

    this.form = this.fb.group({      
      organizacaoId:[this.organizacaoDoLocalStorage.id],
      gtin:['', [Validators.minLength(8), Validators.maxLength(14)]],
      grupoId:['', [Validators.required]],
      subgrupoId:['', [Validators.required]],
      fabricaId:['', [Validators.required]],
      descricaoCompleta:['', [Validators.required, Validators.minLength(2), Validators.maxLength(400)]],
      descricaoDePDV:['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      cif:['', [Validators.maxLength(20)]],
      genuino:['', [Validators.maxLength(15)]],
      unidadeId:['', Validators.required],
      fatorMultiplicador:['1', Validators.required],
      precoDeCusto:['0'],
      markup:['40'],
      preco:['0', Validators.required],
      precoComDesconto:['0', Validators.required],
      porcentagemDeDesconto:[0, Validators.required],
      precoComDescontoDois:['0', Validators.required],
      porcentagemDeDescontoDois:[0, Validators.required],
      estoques: new FormArray([]),
      ncm:['', [Validators.minLength(4), Validators.maxLength(8)]],
      cest:['', [Validators.minLength(7), Validators.maxLength(7)]],
      aliquotaId:['', Validators.required],
      cfopSaida:['', [Validators.minLength(4), Validators.maxLength(4)]],      
      origem:['0'],
      cstPis:['99'],
      tipoDeCalculoDoPis:['2'],
      aliquotaDoPis:['0'],      
      cstCofins:['99'],
      tipoDeCalculoDoCofins:['2'],
      aliquotaDoCofins:['0'],
      codigoANP:[''],
      descricaoANP:[''],
      pglp:['0'],
      pgnn:['0'],
      pgni:['0'],
      valorPartida:['0'],
      imprimirEtiqueta:[false],
      qtdMesesGarantia:['0', Validators.required],
      aplicacoes: new FormArray([]),     
      itensGrade: new FormArray([]),     
      gradeId:[null],
    }); 

    this.carregarGrupos();   
    
  }

  ngAfterViewInit(): void {    
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);    
  }
  

  carregarGrupos()
  {
    this.errorMessage = [];
    this.loading = true;
    this.grupoService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.grupos = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarGruposCarregadosComSucesso()
      });
  }
  processarGruposCarregadosComSucesso(){    
    this.carregarFabricas();
  }

  carregarFabricas()
  {
    this.errorMessage = [];
    this.loading = true;
    this.fabricaService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.fabricas = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarFabricasCarregadasComSucesso()
      });
  }
  processarFabricasCarregadasComSucesso(){    
    this.carregarUnidades();
  }

  carregarUnidades()
  {    
    this.unidadeService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.unidades = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarUnidadesCarregadasComSucesso()
      });
  }
  processarUnidadesCarregadasComSucesso(){    
    this.carregarLojas();           
  }

  carregarLojas()
  {    
    this.lojaService.obterTodos()
      .subscribe({
        next:  (s) => this.lojas = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarLojasCarregadasComSucesso()
      });
  }
  processarLojasCarregadasComSucesso(){     
    this.carregarAliquotas();
  }

  carregarAliquotas()
  {    
    this.aliquotaService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.aliquotas = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarAliquotasCarregadasComSucesso()
      });
  }
  processarAliquotasCarregadasComSucesso(){
    this.carregarMontadoras();          
  }

  carregarMontadoras()
  {    
    this.montadoraService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.montadoras = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarMontadorasCarregadasComSucesso()
      });
  }
  processarMontadorasCarregadasComSucesso(){    
    this.carregarGrades();           
  }

  carregarGrades()
  {    
    this.gradeService.obterPorOrganizacao(this.organizacaoDoLocalStorage.id)
      .subscribe({
        next:  (s) => this.grades = s,
        error: (e) => this.processarFalhaEmCarregarLista(e),
        complete: () => this.processarGradesCarregadasComSucesso()
      });
  }
  processarGradesCarregadasComSucesso(){
    this.loading = false;
    this.adicionarEstoqueParaCadaLoja();           
  }

  processarFalhaEmCarregarLista(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  listarSubgrupos(){
    this.form.get("subgrupoId").setValue("");
    let grupoId: string = this.form.get("grupoId").value;
    this.subgrupos = [];
    this.grupos.map(grupo => {
      if (grupo.id == grupoId){
        grupo.subgrupos.map(subgrupo => {
          this.subgrupos.push(subgrupo);
        })
      }
    })
  }

  calcularPorcentagemDeDesconto(){
    let preco: number = this.form.get("preco").value;
    let precoComDesconto : number = this.form.get("precoComDesconto").value;
    let precoComDescontoDois : number = this.form.get("precoComDescontoDois").value;    
    let porcentagemDeDesconto : number = 0;
    let porcentagemDeDescontoDois : number = 0;

    if (preco == null || preco == 0)
    {
      this.form.get("precoComDesconto").patchValue(0.00);
      this.form.get("porcentagemDeDesconto").patchValue(0.00);
      this.form.get("precoComDescontoDois").setValue(0.00);
      this.form.get("porcentagemDeDescontoDois").patchValue(0.00);
      return;
    }

    
    if (precoComDesconto != null && precoComDesconto > 0 &&  preco > precoComDesconto){      
        porcentagemDeDesconto = 100 - ((precoComDesconto * 100)/preco);
    }
    else{
      this.form.get("precoComDesconto").patchValue(preco);
    }    
    this.form.get("porcentagemDeDesconto").patchValue(porcentagemDeDesconto.toFixed(3).replace('.',','));
    


    if (precoComDescontoDois != null && precoComDescontoDois > 0 &&  preco > precoComDescontoDois){      
        porcentagemDeDescontoDois = 100 - ((precoComDescontoDois * 100)/preco);
    }
    else{
      this.form.get("precoComDescontoDois").patchValue(preco);
    }    
    this.form.get("porcentagemDeDescontoDois").patchValue(porcentagemDeDescontoDois.toFixed(3).replace('.',','));

    
  }

  adicionarEstoqueParaCadaLoja() {        
    this.estoques = this.form.get('estoques') as FormArray;
    this.lojas.map(loja => {      
      this.estoques.push(
        new FormGroup({                  
          lojaId: new FormControl(loja.id, Validators.required),          
          lojaNomeFantasia: new FormControl(loja.descricao),
          emEstoque: new FormControl('0', Validators.required),
          estoqueMinimo: new FormControl('1', Validators.required),
          estoqueMaximo: new FormControl('2', Validators.required),
          definirEstoqueMinEMaxAuto: new FormControl(true),
          tempoDeReposicaoEmDias: new FormControl('3', Validators.required),
          localizacao: new FormControl(''),          
        })
      )

    })  
  
  }

  aplicarCFOP(){
    let aliquotaId: string = this.form.get("aliquotaId").value;
    
    this.aliquotas.map(aliq => {      
      if (aliq.id == aliquotaId){
        if(aliq.aliquotaValor == "FF"){
          this.form.get("cfopSaida").patchValue("5405");
        }
        else{
          this.form.get("cfopSaida").patchValue("5102");   
        }
      }
    })    
    
  }
 

  passouPorTodasAsAbas():boolean{
    if (this.disable2 == false &&
        this.disable3 == false &&
        this.disable4 == false &&
        this.disable5 == false &&
        this.disable6 == false &&
        this.disable7 == false &&
        this.disable8 == false &&
        this.disable9 == false &&
        this.disable10 == false &&
        this.disable11 == false &&
        this.disable12 == false &&
        this.disable13 == false &&
        this.disable14 == false){      
      
          return true;  
    }
    return false;
  }  

  save() {    

    if (this.form.dirty && this.form.valid) {

      this.loading = true;  

      this.produto = Object.assign({}, this.produto, this.form.value);    

      this.produto.fotosBase64 = this.imagensBase64;

      this.form.disable();
      this.errorMessage = [];      

      this.produto.origem = Number.parseInt(this.form.value.origem);
      this.produto.cstPis = Number.parseInt(this.form.value.cstPis);
      this.produto.tipoDeCalculoDoPis = Number.parseInt(this.form.value.tipoDeCalculoDoPis);
      this.produto.cstCofins = Number.parseInt(this.form.value.cstCofins);
      this.produto.tipoDeCalculoDoCofins = Number.parseInt(this.form.value.tipoDeCalculoDoCofins);
      this.produto.porcentagemDeDesconto = Number.parseFloat(this.form.value.porcentagemDeDesconto);
      this.produto.porcentagemDeDescontoDois = Number.parseFloat(this.form.value.porcentagemDeDescontoDois);

      this.produtoService.adicionar(this.produto)
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

    this.app.toast('Produto Incluído com Sucesso!', 'success', null, 'SUCESSO!');    

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
    if (this.activeTabId === 1 && this.validarAbaIdentificacao()) {
      this.disable2 = false;
      this.activeTabId = this.activeTabId + 1;      
      return;
    }
    if (this.activeTabId === 2 && this.validarAbaFabrica()) {
      this.disable3 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }          
    if (this.activeTabId === 3 && this.validarAbaClassificacao()) {
      this.disable4 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 4 && this.validarAbaDescricao()) {
      this.disable5 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 5 && this.validarAbaPreco()) {
      this.disable6 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 6 && this.validarAbaEstoque()) {
      this.disable7 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 7 && this.validarAbaNCM()) {
      this.disable8 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 8 && this.validarAbaICMS()) {
      this.disable9 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 9 && this.validarAbaPis()) {
      this.disable10 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 10 && this.validarAbaCofins()) {
      this.disable11 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 11 && this.validarAbaANP()) {
      this.disable12 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 12) {
      this.disable13 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }
    if (this.activeTabId === 13) {
      this.disable14 = false;
      this.activeTabId = this.activeTabId + 1;        
      return;
    }    
  }  

  onNavChange(changeEvent: NgbNavChangeEvent) {        
    //super.validarFormulario;
    //if (this.form.valid){      
      this.activeTabId = changeEvent.nextId;      
    //}
    //else{
      //changeEvent.preventDefault();      
    //}
   
    /* if (this.activeTabId == 3){
      this.adicionarEstoqueParaCadaLoja();
    } */
  } 


  
  validarForm(){
    super.validarFormulario(this.form);
  }

  validarAbaIdentificacao():boolean{
    if (!this.form.get("gtin").valid || 
        !this.form.get("genuino").valid){      
      return false;
    }     
    return true;
  }

  validarAbaFabrica():boolean{
    if (!this.form.get("fabricaId").valid ||
        !this.form.get("cif").valid){      
      
      this.form.get("fabricaId").markAsTouched();
      this.form.get("cif").markAsTouched();
      return false;
    }    
    return true;
  }

  validarAbaClassificacao():boolean{    
    if (!this.form.get("subgrupoId").valid){
      this.form.get("grupoId").markAsTouched();
      this.form.get("subgrupoId").markAsTouched();
      return false;
    }
    return true;
  }

  validarAbaDescricao():boolean{
    if (!this.form.get("descricaoDePDV").valid || 
        !this.form.get("descricaoCompleta").valid){
      this.form.get("descricaoDePDV").markAsTouched();
      this.form.get("descricaoCompleta").markAsTouched();      
      return false;
    }   
    return true;
  }

  validarAbaPreco():boolean{
    if (!this.form.get("unidadeId").valid ||
        !this.form.get("fatorMultiplicador").valid || 
        !this.form.get("precoDeCusto").valid || 
        !this.form.get("markup").valid || 
        !this.form.get("preco").valid ||
        !this.form.get("porcentagemDeDesconto").valid ||
        !this.form.get("porcentagemDeDescontoDois").valid){
      
      this.form.get("unidadeId").markAsTouched();
      this.form.get("fatorMultiplicador").markAsTouched();
      this.form.get("precoDeCusto").markAsTouched();
      this.form.get("markup").markAsTouched();
      this.form.get("preco").markAsTouched();
      this.form.get("precoComDesconto").markAsTouched();
      this.form.get("precoComDescontoDois").markAsTouched();
      return false;
    }    
    return true;
  }

  validarAbaEstoque():boolean{
    if (!this.form.get("estoques").valid){   
      this.estoques = this.form.get('estoques') as FormArray;
      this.estoques.controls.forEach(est =>{
        est.get("emEstoque").markAsTouched();
        est.get("estoqueMinimo").markAsTouched();
        est.get("estoqueMaximo").markAsTouched();
        est.get("tempoDeReposicaoEmDias").markAsTouched();
        est.get("localizacao").markAsTouched();
      })      
      return false;
    }    
    return true;
  }

  validarAbaNCM():boolean{
    if (!this.form.get("ncm").valid ||
        !this.form.get("cest").valid){      
      
      this.form.get("ncm").markAsTouched();
      this.form.get("cest").markAsTouched();
      return false;
    }
    return true;
  }

  validarAbaICMS():boolean{
    if (!this.form.get("aliquotaId").valid || 
        !this.form.get("cfopSaida").valid || 
        !this.form.get("origem").valid){   
      
      this.form.get("aliquotaId").markAsTouched();   
      this.form.get("cfopSaida").markAsTouched();   
      this.form.get("origem").markAsTouched();   
      return false;
    }    
    return true;
  }

  validarAbaPis():boolean{
    if (!this.form.get("cstPis").valid ||
        !this.form.get("tipoDeCalculoDoPis").valid || 
        !this.form.get("aliquotaDoPis").valid){      
      
      this.form.get("cstPis").markAsTouched();   
      this.form.get("tipoDeCalculoDoPis").markAsTouched();   
      this.form.get("aliquotaDoPis").markAsTouched();   
      return false;
    }
    return true;
  }

  validarAbaCofins():boolean{
    if (!this.form.get("cstCofins").valid ||
        !this.form.get("tipoDeCalculoDoCofins").valid || 
        !this.form.get("aliquotaDoCofins").valid){      
      
      this.form.get("cstCofins").markAsTouched();   
      this.form.get("tipoDeCalculoDoCofins").markAsTouched();   
      this.form.get("aliquotaDoCofins").markAsTouched();   
      return false;
    }
    return true;
  }

  validarAbaANP():boolean{
    if (!this.form.get("codigoANP").valid ||
        !this.form.get("descricaoANP").valid || 
        !this.form.get("pglp").valid || 
        !this.form.get("pgnn").valid || 
        !this.form.get("pgni").valid || 
        !this.form.get("cif").valid){      
      
      this.form.get("aliquotaId").markAsTouched();   
      this.form.get("descricaoANP").markAsTouched();
      this.form.get("pglp").markAsTouched();
      this.form.get("pgnn").markAsTouched();
      this.form.get("pgni").markAsTouched();
      this.form.get("valorPartida").markAsTouched();   
      return false;
    }
    return true;
  }  


  pegarImagens(event: { addedFiles: any; }) {
    this.imagensFiles = [];
    this.imagensFiles.push(...event.addedFiles);    

         
    this.imagensFiles.map((imagem) => {      
      var imgBase64: NovaFotoDeProdutoBase64 = {arquivoBase64: '', nomeOriginalArquivo:''}; 
      var reader = new FileReader();
      reader.onload = (event: any) => {                           
        var base64 = event.target.result;
        var nome = imagem.name;        

        imgBase64.arquivoBase64 = base64;
        imgBase64.nomeOriginalArquivo = nome;                
        this.imagensBase64.push(imgBase64);        
      }
      reader.readAsDataURL(imagem);
    });    
  }

  onRemoveFile(event) {
    this.imagensFiles.splice(this.imagensFiles.indexOf(event), 1);
  }

  removerImagem(index: any) {
    this.imagensBase64.splice(this.imagensBase64.indexOf(index), 1);
  }



  adicionarAplicacaoNaLista() {
    this.aplicacoesFormArray = this.form.get('aplicacoes') as FormArray;    
    this.aplicacoesFormArray.push(
      new FormGroup({        
        descricao: new FormControl("", Validators.required),        
        montadoraId: new FormControl("", Validators.required),
      })
    )
  }

  removerAplicacaoDaLista(index: number) {
    this.aplicacoesFormArray = this.form.get("aplicacoes") as FormArray;
    this.aplicacoesFormArray.removeAt(index);
  }

  dropAplicacao(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('aplicacoes')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.form.get('aplicacoes').value, event.previousIndex, event.currentIndex);

    this.form.get('aplicacoes')['controls'][event.currentIndex].get('ordem').setValue(event.currentIndex);
    this.form.get('aplicacoes')['controls'][event.previousIndex].get('ordem').setValue(event.previousIndex);
  }


  adicionarItemGradeNaLista() {
    this.itensGradeFormArray = this.form.get('itensGrade') as FormArray;    
    this.itensGradeFormArray.push(
      new FormGroup({        
        corOuTipo: new FormControl(""),        
        tamanhoOuLado: new FormControl(""),
      })
    )
  }

  removerItemGradeDaLista(index: number) {
    this.itensGradeFormArray = this.form.get("itensGrade") as FormArray;
    this.itensGradeFormArray.removeAt(index);
  }

  dropItemGrade(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.get('itensGrade')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.form.get('itensGrade').value, event.previousIndex, event.currentIndex);

    this.form.get('itensGrade')['controls'][event.currentIndex].get('ordem').setValue(event.currentIndex);
    this.form.get('itensGrade')['controls'][event.previousIndex].get('ordem').setValue(event.previousIndex);
  }
}

