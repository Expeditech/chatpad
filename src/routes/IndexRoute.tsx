import {
  Badge,
  Center,
  Container,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { Logo, LogoLight } from "../components/Logo";
import { db } from "../db";

export function IndexRoute() {
  const theme = useMantineTheme();
  const settings = useLiveQuery(() => db.settings.get("general"));
  const { openAiApiKey } = settings ?? {};

  return (
    <>
      <Center py="xl" sx={{ height: "100%" }}>
        <Container size="sm" w={600}>
          <Badge mb="lg">Powered by OpenAI</Badge>
          <Text>            
            {theme.colorScheme === "dark" ?
            <LogoLight style={{ width: 240 }} />
             :
            <Logo style={{ width: 240 }} />
            }
          </Text>
          <Text mt={4} size="xl">
            Enterprise ChatGPT user-interface!
          </Text>
        </Container>
      </Center>
    </>
  );
}
