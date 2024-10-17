import { controlVersion } from './version';

const host = 'https://localhost:44395/';

export const environment = {
  production: true,
  api: {
    principal: host,
  },
  host,
  version: controlVersion.version,
  origem: `Sistema Web - ${controlVersion.version}`,
  storageUserKey: '@bbapp:usuario',
  storageOrganizacaoKey: '@bbapp:organizacao',
  storageCookieKey: '@bbapp:accept_cookie',
  storageThemeKey: '@bbapp:theme-background',
  storageMenuFixoKey: '@bbapp:menuFixo',
};
