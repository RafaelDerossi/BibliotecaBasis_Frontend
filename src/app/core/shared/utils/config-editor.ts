import { AngularEditorConfig } from '@kolkov/angular-editor';

export const configEditor: AngularEditorConfig = {

  editable: true,
  spellcheck: true,
  height: '100px',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Escreva aqui...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  // uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    // ['bold', 'italic'],
    // ['fontSize'],
    ['undo', 'redo', 'toggleEditorMode'],
    ['insertImage', 'insertVideo', 'backgroundColor']
  ],
};



// Legenda
// toolbarHiddenButtons: [
//   [
//     'undo',
//     'redo',
//     'bold',
//     'italic',
//     'underline',
//     'strikeThrough',
//     'subscript',
//     'superscript',
//     'justifyLeft',
//     'justifyCenter',
//     'justifyRight',
//     'justifyFull',
//     'indent',
//     'outdent',
//     'insertUnorderedList',
//     'insertOrderedList',
//     'heading',
//     'fontName'
//   ],
//   [
//     'fontSize',
//     'textColor',
//     'backgroundColor',
//     'customClasses',
//     'link',
//     'unlink',
//     'insertImage',
//     'insertVideo',
//     'insertHorizontalRule',
//     'removeFormat',
//     'toggleEditorMode' as HTML code
//   ]
// ]
