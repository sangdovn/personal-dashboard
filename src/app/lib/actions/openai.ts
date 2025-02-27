"use server";

import { ChatProps, getChatResponse } from "@/app/lib/api/openai";

export async function getChatResponseAction(params: ChatProps) {
  return getChatResponse(params);
}
