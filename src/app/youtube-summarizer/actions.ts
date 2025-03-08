"use server";

import { getChatCompletion } from "@/lib/services/openai";
import {
  extractYouTubeID,
  fetchTranscript,
  fetchVideoInfo,
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
  if (!videoUrl || typeof videoUrl !== "string") {
    return { error: "Please provide a valid YouTube URL" };
  }

  try {
    // Extract video ID
    const videoId = extractYouTubeID(videoUrl);
    if (!videoId) {
      return {
        error: "Could not extract a valid YouTube video ID from the URL",
      };
    }

    // Fetch transcript
    let transcript;
    try {
      transcript = await fetchTranscript(videoId, lang);
    } catch (error) {
      console.error("Transcript error:", error);
      return { error: "No transcript available for this video" };
    }

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
    try {
      const stream = await getChatCompletion({ messages });
      return { stream };
    } catch (error) {
      console.error("OpenAI API error:", error);
      return { error: "Failed to generate summary. Please try again later." };
    }
  } catch (error) {
    console.error("Error in getVideoSummaryAction:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to process the YouTube video. Please try again.",
    };
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
