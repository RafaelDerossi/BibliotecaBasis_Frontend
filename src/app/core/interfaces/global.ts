import { ValidatorFn } from "@angular/forms";
import { IndividualConfig } from "ngx-toastr";

export interface NotificationModalProps {
  title?: string,
  message: string,
  icon?: string,
  options?: {
    text: string,
    value: any,
    cssClass: string
  }[]
}

export interface Menu {
  id?: any;
  text: string;
  path?: string;
  icon?: string;
  exact?: boolean;
  selected?: boolean;
  active?: boolean;
  items?: Array<Menu>;
}

export interface ModalConfirmExcluirProps {
  message: string,
  buttonText: string,
  validatorForm?: ValidatorFn | ValidatorFn[]
}

export interface ToastConfigs extends IndividualConfig {

}