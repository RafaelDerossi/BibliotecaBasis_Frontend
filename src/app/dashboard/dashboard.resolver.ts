import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<Array<any>> {
  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<any>> | any {
    return route.params.id;
  }

}
