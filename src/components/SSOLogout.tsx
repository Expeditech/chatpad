import {
    Text,
    Tooltip,
    ActionIcon,
    Group
} from "@mantine/core"
import {
    IconLogout
} from "@tabler/icons-react"

import { PublicClientApplication } from '@azure/msal-browser';
import { useNavigate } from "@tanstack/react-location";

export function SSOLogout ({ 
  msalInstance
} : { 
  msalInstance: PublicClientApplication
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await msalInstance.logoutPopup();
      navigate({ to: '/', replace: true })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Group position="center">
      <Text fz="md">Welcome, { msalInstance.getActiveAccount()?.name }</Text>
      <Tooltip label="Log out">
        <ActionIcon>
          <IconLogout 
            size={20}
            onClick={handleLogout}>
          </IconLogout>
        </ActionIcon>
      </Tooltip>     
    </Group>
  );
};
