import { CosmosClient } from '@azure/cosmos';
import { Chat, Message, db } from '../db';
import { getConfig } from '../config/ConfigService';

const auditConfig = {
  options: {
    endpoint: "",
    key: "",
    userAgentSuffix: 'ExpdChatPad'
  },
  databaseId: "",
  containerId: "",
};

let cosmosInstance : CosmosClient;

export function getCosmosInstance() : CosmosClient{
  if(!cosmosInstance) {
    getConfig().then((config) => {
      auditConfig.options.endpoint = config.COSMOS_ENDPOINT;
      auditConfig.options.key = config.COSMOS_KEY;
      auditConfig.databaseId = config.COSMOS_DATABASE_ID;
      auditConfig.containerId = config.COSMOS_CONTAINER_ID;
    })
    cosmosInstance = new CosmosClient(auditConfig.options);
  }
  return cosmosInstance;
}

export async function auditChat(chatId: string) {
  const chat = await loadChatItem(chatId);  
  
  await getCosmosInstance()
  .database(auditConfig.databaseId)
  .container(auditConfig.containerId)
  .items
  .upsert(chat) 
}

async function loadChatItem(chatId: string) {  
  let chat = await db.chats.where({ id: chatId }).first() as CosmosChat;  
  chat.messages = await db.messages.where({ chatId: chatId }).sortBy("createdAt");

  return chat;
}

interface CosmosChat extends Chat {
  messages: Array<Message>
}