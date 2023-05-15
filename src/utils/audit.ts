import { CosmosClient } from '@azure/cosmos';
import { Chat, Message, db } from '../db';

const options = {
  endpoint: process.env.COSMOS_ENDPOINT ?? "undefined",
  key: process.env.COSMOS_KEY,
  userAgentSuffix: 'ExpdChatPad'
};

const databaseId = process.env.COSMOS_DATABASE_ID ?? "undefined"
const containerId = process.env.COSMOS_CONTAINER_ID ?? "undefined"

const client = new CosmosClient(options);

export async function auditChat(chatId: string) {
  const chat = await loadChatItem(chatId);  
  
  await client
  .database(databaseId)
  .container(containerId)
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