import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
    auth: {
      clientId: "5e194ae4-b650-4e91-9d30-52fee9c3d242",
      authority: "https://login.microsoftonline.com/5c5478bb-3813-489e-9c75-b3915e88b59a",
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
