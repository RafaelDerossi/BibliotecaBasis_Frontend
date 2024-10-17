import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestao-produtos',
  templateUrl: './gestao-produtos.component.html',
  styleUrls: ['./gestao-produtos.component.scss']
})
export class GestaoProdutosComponent implements OnInit {    
  openMenu: boolean = false;  
  menu = [];

  backgroundStorageSelected: string;      

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }    
    this.configMenu();
  }

  configMenu() {
    this.menu = [
      { text: 'Produtos', path: 'produtos', visible: true, icone: 'icon-tag' },
      { text: 'Grupos', path: 'grupos', visible: true, icone: 'icon-open-book' },
      { text: 'Subgrupos', path: 'subgrupos', visible: true, icone: 'icon-open-book' },
      { text: 'Fábricas', path: 'fabricas', visible: true, icone: 'icon-companies' },
      { text: 'Alíquotas', path: 'aliquotas', visible: true, icone: 'icon-balance' },
      { text: 'Unidades', path: 'unidades', visible: true, icone: 'icon-box' },
      { text: 'Montadoras', path: 'montadoras', visible: true, icone: 'icon-car'},      
      { text: 'Grades', path: 'grades', visible: true, icone: 'icon-menu' }
    ]

    let isActiveMenu = [];
    this.menu.map(item => {
      if (item.visible) {
        isActiveMenu.push(item)
      }
    });

    if (isActiveMenu.length == 0) {
      this.router.navigate(['dashboard', 'organizacao']);
    }
  }

}
