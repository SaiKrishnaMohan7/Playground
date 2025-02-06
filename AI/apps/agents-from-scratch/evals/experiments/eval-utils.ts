export const createToolCallMessage = (toolName: string) => {
  return {
    role: 'assistant',
    tool_calls: [
      {
        type: 'function',
        function: {
          name: toolName
        }
      }
    ]
  }
}