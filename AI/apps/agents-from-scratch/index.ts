import "dotenv/config";
import { runLLM } from "./src/llm";
import { getMessages, addMessages } from "./src/memory";
import type { ChatCompletionContentPartRefusal, ChatCompletionContentPartText } from "openai/resources/index.mjs";

const userMessage = process.argv[2]; // prompt

if (!userMessage) {
  console.error("Please provide a message");
  process.exit(1);
}

await addMessages([{role: 'user', content: userMessage}]); // add the current prompt to db or LLM will not remember
const messages = await getMessages();
const response = await runLLM({
  messages,
});

const formattedResponse: string | (ChatCompletionContentPartText | ChatCompletionContentPartRefusal)[] | null | undefined = response as any;

await addMessages([{role: 'assistant', content: formattedResponse}]) // add response from LLM to db

console.log(response);
