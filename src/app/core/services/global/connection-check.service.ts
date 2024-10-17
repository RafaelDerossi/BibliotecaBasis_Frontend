import { Injectable } from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckService {

  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status: string;

  constructor(private connectionService: ConnectionService) {

  }

  check() {
    this.connectionService.monitor().subscribe(
      ({ hasNetworkConnection, hasInternetAccess }: any) => {
        if (hasNetworkConnection && hasInternetAccess) {
          alert('ONLINE');
        } else {
          alert('OFFLINE');
        }
      });
  }
}
