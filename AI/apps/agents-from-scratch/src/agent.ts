import type { AIMessage } from '../types'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'
import type { z } from 'zod'

export const runAgent = async ({
  turns = 10,
  userMessage,
  tools = [],
}: {
  turns?: number,
  userMessage: string
  tools: { name: string; parameters: z.AnyZodObject }[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('🤔');

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });
    await addMessages([response]);
    logMessage(response);

    // When LLM responds with content, it is done! This is a terminal state
    if (response.content) {
      loader.stop();
      return getMessages();
    }
    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      loader.update(`executing tool: ${toolCall.function.name}`);

      const toolResponse = await runTool(toolCall, userMessage);

      if (toolResponse) {
        await saveToolResponse(toolCall.id, toolResponse);
      }

      loader.update(`executed: ${toolCall.function.name}`);
    }
  }
}

//! Pay close attention to the order of messages in the agent's memory!
//! The sequence is crucial for maintaining context—if the messages are out of order, the agent may misinterpret the conversation history, leading to errors or confusion.
// contents of db will be in git history in the commit "Agent tool calling in a loop"
