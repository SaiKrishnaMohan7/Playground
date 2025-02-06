import { dadJokeToolDefinition } from "../../src/tools/dadJoke";
import { ToolCallMatch } from "../scorer";
import { createToolCallMessage } from "./eval-utils";
import { runEval } from "../evalTools";
import { runLLM } from "../../src/llm";

runEval('dadJoke', {
  task: (input) => (
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    })),
  data: [
    {
      input: 'tell me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch]
})