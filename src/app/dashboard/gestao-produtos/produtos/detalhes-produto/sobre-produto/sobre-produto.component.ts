import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/core/interfaces/produto';
import { AppService } from 'src/app/core/services/global/app.service';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from "swiper";
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-sobre-produto',
  templateUrl: './sobre-produto.component.html',
  styleUrls: ['./sobre-produto.component.scss']
})
export class SobreProdutoComponent implements OnInit {
  @Input() produto: Produto;

  panelOpenStateAbout = true;
  panelOpenStateCondominos = true;
  loading: boolean = false;

  constructor(        
    private router: Router,
    public modal: NgbModal,
    private appService: AppService,
  ) { }


  ngOnInit(): void {
    
  }

    

  navigate(page?: string) {
    this.router.navigate([`/dashboard/${page ? page : ''}`]);
  }

}
