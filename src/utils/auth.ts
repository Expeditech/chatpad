import { PublicClientApplication } from '@azure/msal-browser';
import { getConfig } from '../config/ConfigService';

const msalConfig = {
  auth: {
    clientId: "",
    authority: "",
    redirectUri: "/",
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};

let msalInstance: PublicClientApplication;

export function getMsalInstance(): PublicClientApplication {
  if (!msalInstance) {
    getConfig().then((config) => {
      msalConfig.auth.clientId = config.AZURE_SSO_CLIENT_ID;
      msalConfig.auth.authority = config.AZURE_SSO_AUTHORITY;
    })
    if (msalConfig.auth.clientId) {
      msalInstance = new PublicClientApplication(msalConfig);
    }
  }
  return msalInstance;
}

export function isSignedIn() {
  if (getMsalInstance())
    return getMsalInstance().getAllAccounts().length > 0;
  return false;
}

export function getActiveAccount() {
  if (getMsalInstance())
    return getMsalInstance().getActiveAccount();
  return null;
}

export function getUserLetters() {
  let account = getActiveAccount();
  return account?.username.substring(0, 2).toUpperCase();
}
