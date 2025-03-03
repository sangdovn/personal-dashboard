"use server";

import { getChatResponse } from "../api/openai";
import { YoutubeTranscript } from "youtube-transcript";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";
import { extractYouTubeID } from "../utils/youtube";

export const getVideoSummaryAction = async ({
  videoUrl,
  lang,
}: {
  videoUrl: string;
  lang?: string;
}) => {
  const videoId = extractYouTubeID(videoUrl);
  if (!videoId) throw new Error("Please enter a valid YouTube URL");

  const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId, {
    lang: lang || "vi",
  });
  if (!transcriptResponse) throw new Error("Failed to get transcript");
  const transcript = transcriptResponse.map((t) => t.text).join(" ");

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are a YouTube video summarizer for 2nd grade student. Given a transcript, first provide a simple one-line summary of the transcript. Then, summarize the video in a maximum of 8 bullet points. Each bullet should be no more than 20 words.`,
    },
    { role: "user", content: transcript },
  ];

  return getChatResponse({ messages });
};

export async function getYoutubeTitle(videoUrl: string) {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=${videoUrl}&format=json`,
  );
  const data = await response.json();
  return data.title;
}
