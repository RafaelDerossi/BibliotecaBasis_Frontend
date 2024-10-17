import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService, } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../shared/components/modais/alert/alert.component';
import { ConfirmComponent } from '../../shared/components/modais/confirm/confirm.component';
import { PromptComponent } from '../../shared/components/modais/prompt/prompt.component';
import { ModalAlertExcluirComponent } from '../../shared/components/modais/modal-alert-excluir/modal-alert-excluir.component';
import { NotificationsComponent } from '../../shared/components/modais/notifications/notifications.component';
import { ModalConfirmExcluirProps, NotificationModalProps, ToastConfigs } from '../../interfaces/global';
import { ModalConfirmExcluirComponent } from '../../shared/components/modais/modal-confirm-excluir/modal-confirm-excluir.component';
import axios from 'axios';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  componentImpressao: any;
  public numberOfFiles: number; //dropzone count files
  loading$: Observable<boolean>;

  constructor(
    public router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modal: NgbModal,    
  ) { }

  alert(message: string | Array<string>, title: string = 'Alerta', options?: Array<any> | any) {
    const ref = this.modal.open(AlertComponent, options);
    ref.componentInstance.title = title;
    ref.componentInstance.setMessage(message);
    return ref.result;
  }

  abrirLinkDownload(url: string, download: string = "", target: '_blank' | '_self' | '_system' = '_blank') {
    const link = document.createElement('a');
    link.href = url;
    link.download = download;
    link.target = target;
    link.click();
  }

  previewImage(file) {
    var reader = new FileReader();
    let imgURL;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      imgURL = reader.result;
    }

    return imgURL;
  }

  confirm(title: string = 'Confirme', message: string,
    options: { text: string, value: any, cssClass: string }[] =
      [
        { text: 'Cancelar', value: false, cssClass: 'btn btn-link btn-sm' },
        { text: 'Confirmar', value: true, cssClass: 'btn-primary btn-sm' }
      ]) {
    const ref = this.modal.open(ConfirmComponent, { backdrop: 'static' });
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    ref.componentInstance.options = options;
    return ref.result;
  }

  prompt(title: string = 'Confirme', message: string) {
    const ref = this.modal.open(PromptComponent, { backdrop: 'static' });
    ref.componentInstance.setMessage(message);
    ref.componentInstance.title = title;
    return ref.result;
  }

  modalExcluir(message?: string, buttonText: string = 'Excluir') {
    const modalRef = this.modal.open(ModalAlertExcluirComponent, { backdrop: 'static', size: 'md', centered: true });
    modalRef.componentInstance.setMessage(message || 'Você tem certeza que deseja excluir ?');
    modalRef.componentInstance.buttonText = buttonText;
    return modalRef.result;
  }

  modalConfirmExcluir({ message, buttonText, validatorForm }: ModalConfirmExcluirProps) {
    const modalRef = this.modal.open(ModalConfirmExcluirComponent, { backdrop: 'static', size: 'md', centered: true });
    modalRef.componentInstance.setMessage(message || 'Você tem certeza que deseja excluir ?');
    modalRef.componentInstance.buttonText = buttonText || 'Confirmar';
    modalRef.componentInstance.validators = validatorForm;
    return modalRef.result;
  }

  notificationModal({ title, message, icon, options }: NotificationModalProps) {
    const modalRef = this.modal.open(NotificationsComponent, { backdrop: 'static' });
    modalRef.componentInstance.setMessage(message);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.iconName = icon || 'success';
    modalRef.componentInstance.options = options ? options : [
      { text: 'OK', value: 'saved', cssClass: 'btn-sm btn-primary' }
    ];
    return modalRef.result;
  }

  toast(message: string, actionMessage: 'success' | 'error' | 'warning' | 'info' = 'info', toastConfigs: Partial<ToastConfigs> = {
    enableHtml: true, progressBar: true, timeOut: 5000, extendedTimeOut: 5000
  }, title?: string) {
    switch (actionMessage) {
      case 'success':
        this.toastr.success(message, title, toastConfigs);
        break;
      case 'error':
        this.toastr.error(message, title, toastConfigs);
        break;
      case 'warning':
        this.toastr.warning(message, title, toastConfigs);
        break;
      default:
        this.toastr.info(message, title, toastConfigs);
        break;
    }
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }  

  formatDateTime(date: Date, locale = 'pt-BR'): string {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  }

  convertBase64ToBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  removerHTMLdaString(value: string) {
    return value.replace(/<.*?>/g, '');
  }

  copyToTransferArea(valueToCopy: string) {
    let selBox: HTMLTextAreaElement = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = valueToCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toast('Copiado com sucesso', 'success');
  } 

  setAvatar(image: string) {
    if (!image) {
      return `background-image: url("assets/user_avatar.png")`;
    }

    return `background-image: url("${image}")`;
  }

  retornarIcones(extensao: string) {
    let icone: string = 'none';
    switch (extensao) {
      case 'xlsx':
        icone = 'xlsx';
        break;
      case 'csv':
        icone = 'csv';
        break;
      case 'xls':
        icone = 'xls';
        break;
      case 'doc':
        icone = 'doc';
        break;
      case 'docx':
        icone = 'docx';
        break;
      case 'png':
        icone = 'png';
        break;
      case 'jpg':
        icone = 'jpg';
        break;
      case 'jpeg':
        icone = 'jpeg';
        break;
      case 'gif':
        icone = 'gif';
        break;
      case 'zip':
        icone = 'zip';
        break;
      case 'pdf':
        icone = 'pdf';
        break;
      case 'xd':
        icone = 'xd';
        break;
      default:
        icone = 'none';
        break;
    }

    return `icon-${icone}.svg`
  }

  gerarPDF(filename: string = 'file', idAreaImpresao: string = 'print-area') {
    window['html2canvas'] = html2canvas;

    const html_source = document.getElementById(idAreaImpresao); // O id do elemento que contém o Html que quer imprimir.



    html2canvas(html_source).then(function (canvas) {
      /*
      [210,297] Sao os números (largura e altura do papel a4) que eu encontrei para trabalhar com eles.
      Se você puder encontrar números oficiais do jsPDF, usa.
       */
      let imgData = canvas.toDataURL('image/png');
      let imgWidth = 210; // Largura em mm de um a4
      let pageHeight = 297; // Altura em mm de um a4

      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pdf = new jsPDF('p', 'mm');
      let fix_imgWidth = 15; // Vai subindo e descendo esses valores ate ficar como queres
      let fix_imgHeight = 15; // Vai subindo e descendo esses valores ate ficar como queres

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth + fix_imgWidth, imgHeight + fix_imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
    })
  }
}
