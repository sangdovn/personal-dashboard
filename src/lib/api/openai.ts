import OpenAI from "openai";

export interface OpenAIParam {
  messages?: OpenAI.ChatCompletionMessageParam[];
  model?: OpenAI.ChatModel;
  temperature?: number;
}

export async function getChatResponse({
  messages,
  model = "gpt-4o-mini",
  temperature = 0.7,
}: OpenAIParam) {
  if (!messages || (messages instanceof Array && messages.length <= 0)) return;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = new OpenAI();

  return openai.chat.completions.create({
    model,
    messages,
    temperature,
    store: true,
    stream: true,
  });
}
