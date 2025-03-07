"use server";

import { getChatCompletion, OpenAIServiceError } from "@/lib/services/openai";
import {
  extractYouTubeID,
  fetchTranscript,
  fetchVideoInfo,
  YouTubeServiceError,
} from "@/lib/services/youtube";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";
import { YOUTUBE_SUMMARIZER_SYSTEM_PROMPT } from "./constants";
import { VideoInfo } from "@/lib/types";

/**
 * Props for the video summary action
 */
type VideoSummaryProps = {
  /** The URL of the YouTube video */
  videoUrl: string;
  /** The language of the transcript (defaults to 'en') */
  lang?: string;
  /** Maximum length of transcript to process (to avoid token limits) */
  maxLength?: number;
};

/**
 * Server action to get a summary of a YouTube video
 * @param options - The options for the video summary
 * @returns A stream of the AI-generated summary
 */
export const getVideoSummaryAction = async ({
  videoUrl,
  lang = "en",
  maxLength = 15000,
}: VideoSummaryProps) => {
  try {
    // Extract video ID
    const videoId = extractYouTubeID(videoUrl);
    if (!videoId) {
      throw new YouTubeServiceError(
        "Could not extract a valid YouTube video ID from the URL",
      );
    }

    // Fetch transcript
    const transcript = await fetchTranscript(videoId, lang);

    // Truncate if too long (OpenAI has token limits)
    const truncatedTranscript =
      transcript.length > maxLength
        ? transcript.substring(0, maxLength) +
          "... (transcript truncated due to length)"
        : transcript;

    // Prepare messages for OpenAI
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: YOUTUBE_SUMMARIZER_SYSTEM_PROMPT,
      },
      { role: "user", content: truncatedTranscript },
    ];

    // Get streaming response
    const stream = await getChatCompletion({ messages });
    return stream;
  } catch (error) {
    console.error("Error in getVideoSummaryAction:", error);

    if (
      error instanceof YouTubeServiceError ||
      error instanceof OpenAIServiceError
    ) {
      throw error;
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to process the YouTube video. Please try again.");
    }
  }
};

/**
 * Fetches information about a YouTube video
 * @param videoUrl - The URL of the YouTube video
 * @returns The video information
 */
export async function getYoutubeInfo(videoUrl: string): Promise<VideoInfo> {
  return fetchVideoInfo(videoUrl);
}
