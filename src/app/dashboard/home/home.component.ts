import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Temas } from 'src/app/core/models/temas';
import { AppService } from 'src/app/core/services/global/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loading: boolean = false;  
  form: FormGroup;  
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;  
  

  temas: {
    id: number;
    key: string;
    name: string;
    classColor: string;
    checked: boolean;
  }[] = Temas;
  
  backgroundStorageSelected: string;

  constructor(    
    private app: AppService,
    private modal: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if (document.body.classList.value) {
      this.backgroundStorageSelected = document.body.classList.value
    }    

    this.form = new FormGroup({
      termo: new FormControl('', Validators.required),
    });   
    
    this.temas.map(tema => {
      if (tema.classColor === this.backgroundStorageSelected) {
        tema.checked = true;
      }
    })

  }

  
  loggoff() {
    this.router.navigateByUrl(`/home`);
  }


  buscar() {    
    let termoBuscado = this.app.normalizeText(this.form.value.termo);
    if (termoBuscado === '') {
      this.app.toast(`Digite no campo o que deseja buscar.`, 'warning');
      return;
    }
  }    


  setAvatar(img) {
    if (!img) {
      return `background-image: url("assets/user_avatar.png")`;
    }

    return `background-image: url("${img}")`;    
  } 

}
