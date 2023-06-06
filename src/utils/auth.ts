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

let msalInstance : PublicClientApplication;

export function getMsalInstance() : PublicClientApplication{
  if(!msalInstance) {
    getConfig().then((config) => {
      msalConfig.auth.clientId = config.AZURE_SSO_CLIENT_ID;
      msalConfig.auth.authority = config.AZURE_SSO_AUTHORITY;      
    })
    msalInstance = new PublicClientApplication(msalConfig);
  }
  return msalInstance;
}

export function isSignedIn() {
  return getMsalInstance().getAllAccounts().length > 0;  
}

export function getActiveAccount(){
    return getMsalInstance().getActiveAccount();
}

export function getUserLetters(){
    let account = getActiveAccount();
    return account?.username.substring(0, 2).toUpperCase();
}
