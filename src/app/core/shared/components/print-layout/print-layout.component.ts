import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';
import { AppService } from 'src/app/core/services/global/app.service';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {

  diaHoje = new Date();
  loading: boolean = false;

  isPrint: boolean = false;
  relatorioGeradoEm: moment.Moment | string;

  public content: any | HTMLElement;
  logoCondo = 'https://condominioappstorage.blob.core.windows.net/condominioapp/Uploads/logo.gif';

  constructor(public app: AppService, public activeModal: NgbActiveModal, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    console.log(this.returnHTMLSanitize(this.content).toString());
  }

  imprimir() {
    window.print();
  }

  returnHTMLSanitize(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  gerarPDF() {

    this.loading = true;
    this.isPrint = true;
    this.relatorioGeradoEm = moment().format();
    let pdf = new jsPDF('landscape', 'pt', 'a4');
    let page = document.getElementById('print-area');
    let element = document.getElementById('print-area');
    element.style.marginBottom = '35px';
    let icone = document.getElementById('icone');
    if (icone) {
      icone.style.display = 'none';
    }

    const pagePdfWidth = pdf?.internal?.pageSize?.width;
    const srcWidth = page?.scrollWidth;
    const margin = 18;
    const scale = (pagePdfWidth - margin * 2) / srcWidth;

    // pdf.autoPrint();

    pdf.html(page, {
      html2canvas: {
        scale: scale
      },
      callback: (doc) => {
        doc.save(`relatorio-detalhes-enquete-${this.relatorioGeradoEm}.pdf`);
        this.loading = false;
        this.isPrint = false;
        if (icone) {
          icone.style.display = 'flex';
        }
      },
      x: margin,
      y: margin

    });
  }
}
