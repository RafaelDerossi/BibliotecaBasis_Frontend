import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/core/interfaces/usuario';
import { AppService } from 'src/app/core/services/global/app.service';
import { Loja } from 'src/app/core/interfaces/loja';
import { LojaService } from 'src/app/core/services/lojas/loja.service';
import { NovoEditarLojaComponent } from './novo-editar-loja/novo-editar-loja.component';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.scss']
})
export class LojasComponent implements OnInit {
  lojas: Loja[] = [];
  lojasCopy: Loja[] = [];
  loading: boolean = false;  
  errorMessage: string[] = [];  
  backgroundStorageSelected: string;    
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;

  constructor(private lojaService: LojaService, 
              private app: AppService,
              private modal: NgbModal) { }

  ngOnInit(): void {    
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }

    this.carregarLojas();    
  }

  carregarLojas()
  {
    this.errorMessage = [];
    this.loading = true;
    this.lojaService.obterPorOrganizacao(1)
      .subscribe({
        next:  (s) => this.lojas = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarObterLojasComSucesso()
      });
  }

  processarObterLojasComSucesso(){
    this.loading = false;
    this.lojasCopy = this.lojas;
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
          this.errorMessage.push(item);
        });    
  }


  filtrarLojas(term: string) {
    const termo = this.app.normalizeText(term);
    this.lojasCopy = this.lojas.map((item: Loja) => {
      let itemBuscado = this.app.normalizeText(item.razaoSocial);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.nomeFantasia);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.cnpj);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.email);
      if (itemBuscado.includes(termo)) {
        return item;
      }
      itemBuscado = this.app.normalizeText(item.inscricaoEstadual);
      if (itemBuscado.includes(termo)) {
        return item;
      }
    }).filter(item => item != null);
  }
  
  setAvatar(img) {
    if (!img) {
      return `background-image: url("assets/logo.png")`;
    }

    return `background-image: url("${img}")`;    
  }


  novaLoja() {
    const modalRef =  this.modal.open(NovoEditarLojaComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Nova Loja';
    modalRef.componentInstance.loja = undefined;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarLojas();
      }
    })
  }

  editarLoja(loja: Loja) {
    const modalRef =  this.modal.open(NovoEditarLojaComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Editar Loja';
    modalRef.componentInstance.loja = loja;

    modalRef.result.then(result => {
      if (result == 'saved') {
        this.carregarLojas();
      }
    })

  }

  detalhesLoja(loja: Loja) {
    const modalRef =  this.modal.open(NovoEditarLojaComponent, { backdrop: 'static', size: 'xl' });        
    modalRef.componentInstance.backgroundStorageSelected = this.backgroundStorageSelected;    
    modalRef.componentInstance.actionRequested = 'Detalhes da Loja';    
    modalRef.componentInstance.loja = loja;

    modalRef.result.then(result => {
      if (result == 'new') {
        this.novaLoja();
        return;
      }
      if (result == 'edit') {
        this.editarLoja(loja);
      }
      if (result == 'del') {
        this.excluirLoja(loja);
      }
    })
  }
 
  excluirLoja(loja) {    
    this.app
      .confirm(
        'Excluir loja',
        `A loja ${loja.razaoSocial} será excluída do sistema. Deseja realmente continuar ?`
      )
      .then((result) => {
        if (result) {
          this.loading = true;        

          this.lojaService.excluir(loja.id)
            .subscribe({
              next:  (s) => {},
              error: (e) => this.processarFalha(e),
              complete: () => this.processarExcluirLojaComSucesso()
            });

        }
      });
  }

  processarExcluirLojaComSucesso(){
    this.loading = false;
    this.app.toast('Loja excluída com sucesso', 'success');
    this.carregarLojas();
  } 

}
