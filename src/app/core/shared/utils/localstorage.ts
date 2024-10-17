import { environment } from "src/environments/environment";
import { catchError, map, Observable } from 'rxjs';

export class LocalStorageUtils {
    loginResponse: any;

    public salvarUsuario(user: any) {
        localStorage.setItem(environment.storageUserKey, JSON.stringify(user));
    }    
    
    public obterUsuario() {
        let loggedUser: any = localStorage.getItem(environment.storageUserKey);    
        if (loggedUser && loggedUser.remember) {
          loggedUser = localStorage.getItem(environment.storageUserKey);
        }
        if (loggedUser) {
          try {
            console.info(loggedUser);
            this.loginResponse = JSON.parse(loggedUser);
          } catch (e) {
            console.error(e.message);
          }
        }
        console.info(this.loginResponse);
        return this.loginResponse;
    }

    public obterAccessToken() {       
       this.obterUsuario(); 
        if (this.loginResponse && this.loginResponse.accessToken) {
          return this.loginResponse.accessToken;
        }
        return false;
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem(environment.storageUserKey);        
    }    

    public salvarOrganizacao(organizacao: any) {
        localStorage.setItem(environment.storageOrganizacaoKey, JSON.stringify(organizacao));
    }

    public obterOrganizacao() {
        return localStorage.getItem(environment.storageOrganizacaoKey)
        ? JSON.parse(localStorage.getItem(environment.storageOrganizacaoKey))
        : '';
    }

    public limparDadosLocaisOrganizacao() {
        localStorage.removeItem(environment.storageOrganizacaoKey);        
    }    
}