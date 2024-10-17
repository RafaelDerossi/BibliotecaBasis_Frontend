// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { controlVersion } from './version';

const host = 'https://localhost:44373/';
//const host = 'http://mapdinformatica-002-site3.itempurl.com/';

export const environment = {
  production: false,
  api: {
    identidade: 'https://localhost:44396/api/identidade',
   // identidade: 'http://mapdinformatica-002-site4.itempurl.com/api/identidade',
    principal: host + 'api/',
  },
  host,
  singalrUrl: host + 'MensagemEmTempoRealHub',
  mapApiKey: 'AIzaSyC44M_lza2UuFuO3Tof4EGW_jh4c1aBzBc',
  viacep: 'https://viacep.com.br/ws/',
  version: controlVersion.version,
  origem: `Sistema Web - ${controlVersion.version}`,
  storageUserKey: '@mm3app:usuario',
  storageOrganizacaoKey: '@mm3app:organizacao',
  storageCookieKey: '@mm3app:accept_cookie',
  storageThemeKey: '@mm3app:theme-background',
  storageMenuFixoKey: '@mm3app:menuFixo',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.