import player from 'lottie-web';
import * as moment from 'moment';
import { CurrencyMaskInputMode } from "ngx-currency";
import {
  adapterFactory
} from 'angular-calendar/date-adapters/moment';
import { IConfig } from 'ngx-mask';

const CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};



// const MultiSelectSettings: IMultiSelectSettings = {
//   enableSearch: true,
//   showCheckAll: true,
//   checkedStyle: 'checkboxes',
//   buttonClasses: 'btn btn-primary btn-block',
//   itemClasses: '',
//   containerClasses: 'border roudend',
//   dynamicTitleMaxItems: 6,
//   displayAllSelectedText: true
// }

// const MultiselectTexts: IMultiSelectTexts = {
//   checkAll: 'Marcar todos',
//   uncheckAll: 'Desmarcar todos',
//   checked: 'Item selecionado',
//   checkedPlural: 'Items selecionados',
//   searchPlaceholder: 'Procurar',
//   defaultTitle: 'Selecionar',
//   allSelected: 'Todos selecionados',
// };

const momentAdapterFactory = () => {
  return adapterFactory(moment);
};

const PlayerFactoryLottieConfig = () => {
  return player;
}

const NgxMaskIConfig: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false,
};

const ConfigInputDate = {
  format: 'DD/MM/YYYY', // could be 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
  displayFormat: 'DD/MM/YYYY', // default is format value
  direction: 'ltr', // could be rtl
  // showDropdowns: true,
  separator: ' até ', // default is ' - '
  cancelLabel: 'Cancelar', // detault is 'Cancel'
  cancelButtonClasses: 'btn-sm btn-link',
  applyLabel: 'Confirmar', // detault is 'Apply'
  applyButtonClasses: 'btn-sm btn-primary',
  clearLabel: 'Apagar', // detault is 'Clear'
  customRangeLabel: 'Período', // detault is ''
  firstDay: 1, // first day is monday
  fromLabel: 'From',
  weekLabel: 'W',
  daysOfWeek: [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb"
  ],
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
}


export {
  CurrencyMaskConfig,  
  // MultiSelectSettings,
  // MultiselectTexts,
  NgxMaskIConfig,
  PlayerFactoryLottieConfig,
  momentAdapterFactory,
  ConfigInputDate,
}
