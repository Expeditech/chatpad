import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
    auth: {
      clientId: process.env.AZURE_SSO_CLIENT_ID ?? "",
      authority: process.env.AZURE_SSO_AUTHORITY ?? "",
      redirectUri: "/",
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  };

export const msalInstance = new PublicClientApplication(msalConfig);

export function isSignedIn() {
  return msalInstance.getAllAccounts().length > 0;
}

export function getActiveAccount(){
    return msalInstance.getActiveAccount();
}

export function getUserLetters(){
    let account = getActiveAccount();
    return account?.username.substring(0, 2).toUpperCase();
}
