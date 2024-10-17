import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { DropzoneDirective } from '../../directive/dropzone.directive';
import { AppService } from 'src/app/core/services/global/app.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  providers: [DropzoneDirective]
})
export class DropzoneComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  @Input() files: any = [];
  @Input() numberOfFiles: number = 4;
  countFile: any = 0;
  @Output() file: EventEmitter<any> = new EventEmitter();
  @Input() acceptExtensions: string = '.png, .jpg, .jpeg, .doc, .docx, .pdf, .xlsx, .xls, .csv, .txt';
  fileAlreadySend: any = [];


  constructor(private app: AppService) {

  }

  ngOnInit() {
  }



  /**
   * on file drop handler
   */
  uploadFile(event) {
    this.app.numberOfFiles = this.numberOfFiles;

    for (let index = 0; index < event.length; index++) {
      let file = event[index];
      file.extension = file.name.split('.').pop();
      let extensions = this.acceptExtensions.split(', ');

      if (!extensions.includes('.' + file?.extension)) {
        this.app.toast(`O arquivo <strong>"${file?.name}"</strong> possui extensão inválida. As extensões permitadas são: ${this.acceptExtensions}`, 'warning');
        file = null;
        return;
      }
      this.files.push(file);
      this.countFile = this.countFile++;
    }

    if (this.countFile > this.numberOfFiles) {

      this.app.toast(`Limite máximo de arquivos ${this.numberOfFiles}`, 'warning');
      return;
    } else {

      this.file.emit(this.files);
    }

  }

  deleteFile(index: number) {
    // if (this.files[index].progress < 100) {
    //   return;
    // }
    this.files.splice(index, 1);
    // this.file.emit(this.files);
  }

  async uploadFilesSimulator(index: number) {

  }

  returnTypeFile(type, file?) {

    switch (type) {
      case 'xls':
        return 'assets/images/svg/icon-xls.svg';
      case 'xlsx':
        return 'assets/images/svg/icon-xlsx.svg';
      case 'csv':
        return 'assets/images/svg/icon-csv.svg';
      case 'pdf':
        return 'assets/images/svg/icon-pdf.svg';
      case 'docx':
        return 'assets/images/svg/icon-docx.svg';
      case 'doc':
        return 'assets/images/svg/icon-doc.svg';
      case 'png':
        return 'assets/images/svg/icon-png.svg';
      case 'jpg':
        return file ? this.app.previewImage(file) : 'assets/images/svg/icon-jpg.svg';

      case 'jpeg':
        return file ? this.app.previewImage(file) : 'assets/images/svg/icon-jpeg.svg';

      case 'gif':
        return file ? this.app.previewImage(file) : 'assets/images/svg/icon-gif.svg';

    }

  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
