import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/core/services/gestao-produtos/produto.service';
import { Produto } from 'src/app/core/interfaces/produto';
import { AppService } from 'src/app/core/services/global/app.service';


@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {
  openTabsMenu: boolean = false;
  activeTabId = 1;

  produtoId: any;
  loading: boolean = false;  
  produto: Produto;
  modalbackgroundStorageSelected: string;
  backgroundStorageSelected: string;  

  constructor(
    private router: Router,
    public modal: NgbModal,
    protected activatedRoute: ActivatedRoute,
    private _location: Location,
    private produtoService: ProdutoService,
    private app: AppService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.modalbackgroundStorageSelected = 'modal-' + this.backgroundStorageSelected;

    this.carregarProduto();
  }

  carregarProduto()
  {
    this.loading = true;
    this.produtoService.obterPorId(this.produtoId)
      .subscribe({
        next:  (s) => this.produto = s,
        error: (e) => this.processarFalha(e),
        complete: () => this.processarProdutoCarregadoComSucesso()
      });
  }

  processarProdutoCarregadoComSucesso(){
    this.loading = false;    
  }

  processarFalha(fail: any){
    this.loading = false;    
    const { errors } = fail.error;        
    errors.map((item) => {
      this.app.toast(`${item}`, "error");
    });    
  }



  navigate(page?) {
    if (page === 'back') {
      this._location.back();
    } else {
      this.router.navigateByUrl(`/dashboard/${page ? page : ''}`);
    }
  }

  navigateTab(page: number): void {
    this.openTabsMenu = false;
    this.activeTabId = page;
  }



  setAvatar(img) {
    if (!img) {
      return `background-image: url("assets/user_avatar.png")`;
    }

    return `background-image: url("${img}")`;    
  }
}
