import { runLLM } from "../../src/llm"
import { redditToolDefinition } from "../../src/tools/reddit"
import { runEval } from "../evalTools"
import { ToolCallMatch } from "../scorer"
import { createToolCallMessage } from "./eval-utils"

runEval('reddit', {
  task: (input) => runLLM({
    messages: [{ role: 'user', content: input }],
    tools: [redditToolDefinition]
  }),
  data: [ // task will be run the number of elements in this array and the result would be an avg of those runs
    {
      input: 'find me something interesting from reddit',
      expected: createToolCallMessage(redditToolDefinition.name)
    },
    {
      input: 'hi',
      expected: createToolCallMessage(redditToolDefinition.name),
    }
  ],
  scorers: [ToolCallMatch]
})