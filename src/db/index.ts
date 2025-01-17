import Dexie, { Table } from "dexie";
import "dexie-export-import";
import { getConfig } from "../config/ConfigService";

export interface Chat {
  id: string;
  description: string;
  totalTokens: number;
  createdAt: Date;
  tenantId?: string;
  username?: string;
  localAccountId?: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: "system" | "assistant" | "user";
  content: string;
  createdAt: Date;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Settings {
  id: "general";
  openAiApiKey?: string;
  openAiModel?: string;
}

export class Database extends Dexie {
  chats!: Table<Chat>;
  messages!: Table<Message>;
  prompts!: Table<Prompt>;
  settings!: Table<Settings>;

  constructor() {
    super("chatpad");
    this.version(2).stores({
      chats: "id, createdAt",
      messages: "id, chatId, createdAt",
      prompts: "id, createdAt",
      settings: "id",
    });

    let openAiApiKey : string;

    getConfig().then((config) => {
      openAiApiKey = config.OPENAI_KEY;
    })

    this.on("populate", async () => {
      db.settings.add({
        id: "general",
        openAiApiKey: openAiApiKey,
      });
    });

    this.on("ready", async () => {      
      await db.settings.where("id").equals("general").modify({
        openAiApiKey: openAiApiKey
      });
    });
  }
}

export const db = new Database();
