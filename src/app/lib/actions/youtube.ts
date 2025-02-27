"use server";

import { getTranscript } from "@/app/lib/api/youtube";
import { getChatResponseAction } from "./openai";
import { ChatProps } from "../api/openai";

export interface SummaryProps extends ChatProps {
  videoId: string;
}

export const getVideoSummaryAction = async (params: SummaryProps) => {
  const transcript = await getTranscript(params.videoId);
  return getChatResponseAction({ message: transcript, ...params });
};
