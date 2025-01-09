# Build an AI Agent from Scratch Workshop

- Watch the workshop on [Frontend Masters](https://frontendmasters.com/workshops/build-ai-agent/). 
- View the [course notes](https://clumsy-humor-894.notion.site/Agent-from-scratch-13554fed51a380749554c44aa8989406?pvs=4)

## Setup Instructions

This repo requires **Node.js version 20+** or **bun v1.0.20**.

The `main` branch contains the final application. To code along with the workshop, checkout the `step/1` branch. You will also need an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys).

```bash
git clone https://github.com/Hendrixer/agent-from-scratch.git
cd agent-from-scratch
git checkout step/1
npm install # or bun install
```

To run the project:

```bash
npm start
# or
bun run index.ts
```

## OpenAI API Key

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
