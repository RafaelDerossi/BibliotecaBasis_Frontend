import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/core/interfaces/global';
import { Temas } from 'src/app/core/models/temas';
import { AppService } from 'src/app/core/services/global/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 
  isMenuOpen: boolean = false;
  temas = Temas;
  appVersion = environment.version;
  loading: boolean = false;
  liberarBotao: boolean = true;
  backgroundStorageSelected: string = 'background-branco';  
  menuFixo: boolean = false;
  isMenuFixo: boolean = false;
  menu: Menu[] = [];
  menuCopy: Menu[] = []; 

  constructor(    
    private app: AppService,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {        
    this.menuFixo = JSON.parse(localStorage.getItem(environment.storageMenuFixoKey));
    if (this.menuFixo) {
      this.isMenuOpen = true;
    }
    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }
    this.configurarMenu()        
  }

  configurarMenu() {        
    this.menu = [
      {
        text: 'Home',
        path: 'home',
        icon: 'icon-home',
        exact: true,
        active: true,
        items: []
      },
      {
        text: 'Livros',
        path: 'gestao-produtos/produtos',
        icon: 'icon-tag',
        exact: true,
        active: true,
      },      
      {
        text: 'Assuntos',
        path: 'assunto',
        icon: 'icon-companies',
        exact: true,        
      }
      ,      
      {
        text: 'Autores',
        path: 'autor',
        icon: 'icon-companies',
        exact: true,        
      }
    ];

    this.menuCopy = this.menu;
  }  

  async fixarMenu() {
    this.menuFixo = true;
    await localStorage.setItem(environment.storageMenuFixoKey, JSON.stringify(true));
    return;
  }

  async desfixarMenu() {
    this.menuFixo = false;
    await localStorage.removeItem(environment.storageMenuFixoKey);
    return;
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false
      this.fecharMenu()
    } else {
      this.isMenuOpen = true
      this.abrirMenu()
    }
  }

  async verificarMenuFixo() {
    if (await localStorage.getItem(environment.storageMenuFixoKey)) {
      this.isMenuOpen = true
    } else {
      this.isMenuOpen = false
    }
  }

  fecharMenu() {
    this.menuFixo = false;
  }

  abrirMenu() {
    this.isMenuOpen = true;
  }

  mudarTemaDeFundo(event, temaId) {
    let classeAtual = document.body.classList.value;
    document.body.classList.remove(classeAtual);
    this.temas.map(tema => {
      tema.checked = false;
      if (tema.id == temaId) {
        tema.checked = true;
        this.backgroundStorageSelected = tema.key;
        localStorage.setItem(environment.storageThemeKey, JSON.stringify(tema.key))
      }
    });
    document.body.classList.add(event);
  }    

  navigate(page?) {
    this.router.navigateByUrl(`/dashboard/${page ? page : ''}`);
  }

  buscarNoMenu(term) {
    const termo = this.app.normalizeText(term);
    this.menuCopy = this.menu.map(item => {
      const itemBuscado = this.app.normalizeText(item.text)
      if (itemBuscado.includes(termo)) {
        return item
      }
    }).filter(item => item != null);
  }
 

  setAvatar(img) {
    if (!img) {
      return `background-image: url("assets/user_avatar.png")`;
    }

    return `background-image: url("${img}")`;    
  } 
  
}
