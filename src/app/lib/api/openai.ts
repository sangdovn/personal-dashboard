const API_URL = "https://api.openai.com/v1/chat/completions";

export interface ChatProps {
  systemContent?: string;
  context?: Array<string>;
  message?: string;
  model?: string;
  temperature?: number;
}

export async function getChatResponse({
  systemContent,
  context = [],
  message,
  model = "gpt-4o-mini",
  temperature = 0.7,
}: ChatProps) {
  if (!message) return;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const messages = [
    { role: "system", content: systemContent },
    ...context,
    { role: "user", content: message },
  ];

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenAI API request failed: ${errorText}`);
  }

  return res.json();
}
