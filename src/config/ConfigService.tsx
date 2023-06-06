export type ChatPadConfig = {
    OPENAI_KEY?: string,
    COSMOS_DATABASE_ID?: string,
    COSMOS_CONTAINER_ID?: string,
    COSMOS_ENDPOINT?: string,
    COSMOS_KEY?: string,
    AZURE_SSO_CLIENT_ID?: string,
    AZURE_SSO_AUTHORITY?: string,
    PALETTE?: string,
}

export const getConfig = async () => {
    try {
      const response = await fetch(process.env.STATIC_FILE_URL ?? "");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
