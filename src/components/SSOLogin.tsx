import {
    Button
} from "@mantine/core"
import {
    IconBrandAzure
} from "@tabler/icons-react"

import { PublicClientApplication } from '@azure/msal-browser';
import { useNavigate } from "@tanstack/react-location";

export function SSOLogin ({
  msalInstance
} : { 
  msalInstance: PublicClientApplication
}) {
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const result = await msalInstance.loginPopup();
      msalInstance.setActiveAccount(result.account);
      navigate({ to: '/', replace: true })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
          <Button
              size="md"
              leftIcon={<IconBrandAzure size={20} />}
              onClick={handleSignIn}
          >
              Sign in with Azure
          </Button>      
    </div>
  );
};
