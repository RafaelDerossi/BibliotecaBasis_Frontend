import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/core/services/global/app.service';

@Component({
  selector: 'app-exibir-arquivos',
  templateUrl: './exibir-arquivos.component.html',
  styleUrls: ['./exibir-arquivos.component.scss']
})
export class ExibirArquivosComponent implements OnInit {

  arquivo: any;
  @ViewChild("image", { read: ElementRef }) image: ElementRef;
  loading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private app: AppService
  ) { }

  ngOnInit(): void {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.image.nativeElement.onload = (e) => {
      this.loading = false;
    }
    // this.loading = false;
  }

  setUrlArquivo(urlArquivo, tipoDeArquivo) {
    if (tipoDeArquivo == 'microsoft') {
      this.loading = false;
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/view.aspx?src=${urlArquivo}`);
    }

    if (tipoDeArquivo == 'pdf') {
      this.loading = false;
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${urlArquivo}`);
    }

    if (tipoDeArquivo == 'image') {
      this.loading = false;
      return `${urlArquivo}`;
    }
    //else {
    //   this.app.abrirLinkDownload(urlArquivo, "_blank");
    // }
  }

}
