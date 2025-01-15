import type { AIMessage } from '../types'
import { z } from 'zod'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[]
  model?: string,
  temperature?: number
  tools?: { name: string, parameters: z.AnyZodObject }[]
}) => {
  const formattedTools = tools?.map(tool => zodFunction(tool));

  const response = await openai.chat.completions.create({
    model,
    temperature,
    messages,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}