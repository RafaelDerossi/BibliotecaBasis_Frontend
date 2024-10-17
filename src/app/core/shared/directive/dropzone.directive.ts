import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { AppService } from '../../services/global/app.service';
export interface FileHandle {
  file: File,
  url: SafeUrl
}
@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  fileAlreadySend: any = [];

  constructor(private sanitizer: DomSanitizer, private app: AppService) { }

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped: EventEmitter<any> = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    let files: any = event.dataTransfer.files;

    if (files.length > this.app.numberOfFiles) {
      this.app.toast('Limite máximo de arquivos 4', 'warning');
      return;
    }

    let listFile = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      if (file?.size > 2097152) {
        this.app.toast(`O arquivo <strong>"${file?.name}"</strong> possui tamanho maior que o permitido.`, 'warning');
        listFile.push(null);
        return;
      }
      listFile.push(file);
    }

    listFile.filter(file => file !== null);

    if (listFile.length > 0) {
      this.fileDropped.emit(listFile);
    }
  }
}
