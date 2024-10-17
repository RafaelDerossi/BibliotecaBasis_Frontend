import { controlVersion } from './version';

const host = 'http://mapdinformatica-002-site3.itempurl.com/';

export const environment = {
  production: true,
  api: {
    identidade: 'http://mapdinformatica-002-site4.itempurl.com/api/identidade',
    principal: host + 'api/',
  },
  host,
  singalrUrl: host + 'MensagemEmTempoRealHub',
  mapApiKey: 'AIzaSyC44M_lza2UuFuO3Tof4EGW_jh4c1aBzBc',
  viacep: '',
  version: controlVersion.version,
  origem: `Sistema Web - ${controlVersion.version}`,
  storageUserKey: '@mm3app:usuario',
  storageOrganizacaoKey: '@mm3app:organizacao',
  storageCookieKey: '@mm3app:accept_cookie',
  storageThemeKey: '@mm3app:theme-background',
  storageMenuFixoKey: '@mm3app:menuFixo',
};
