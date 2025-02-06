import { runLLM } from "../../src/llm";
import { dadJokeToolDefinition } from "../../src/tools/dadJoke";
import { generateImageToolDefinition } from "../../src/tools/generateImage";
import { redditToolDefinition } from "../../src/tools/reddit";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorer";
import { createToolCallMessage } from "./eval-utils";

// Is the right tool being picked for the right prompt
const allTools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
];

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'tell me something interesting from reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'generate an image of a mountain landscape',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'tell me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})