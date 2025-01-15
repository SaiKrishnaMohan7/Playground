import { JSONFilePreset } from "lowdb/node";
import type { AIMessage } from "../types";
import { v4 as uuidv4 } from "uuid";

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};

type DataInDb = {
  messages: MessageWithMetadata[];
};

export function addMetadata(message: AIMessage): MessageWithMetadata {
  return {
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
}

export function removeMetadata(message: MessageWithMetadata): AIMessage {
  const { id, createdAt, ...messageWithoutMetadata } = message;
  return messageWithoutMetadata;
}

const defaultData: DataInDb = { messages: [] };

export async function getDb() {
  const db = await JSONFilePreset<DataInDb>("db.json", defaultData);

  return db;
}

export async function addMessages(messages: AIMessage[]) {
  const db = await getDb();

  db.data.messages.push(...messages.map(addMetadata));
  await db.write();
}

export async function getMessages() {
  const db = await getDb();

  return db.data.messages.map(removeMetadata);
}

export async function saveToolResponse(
  toolCallId: string,
  toolResponse: string
) {
  return await addMessages([
    { role: "tool", content: toolResponse, tool_call_id: toolCallId },
  ]);
}
