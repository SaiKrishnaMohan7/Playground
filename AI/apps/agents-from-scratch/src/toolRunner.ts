import type OpenAI from "openai";

export async function getWeather() {
  return 'It is cold and snowy';
}

export async function runTool(toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  };

  switch (toolCall.function.name) {
    case 'getWeather':
      return getWeather(input);

    default:
      new Error(`Unknown tool: ${toolCall.function.name}`);
  }
}