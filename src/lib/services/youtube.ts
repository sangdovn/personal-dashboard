import { YoutubeTranscript } from "youtube-transcript";
import { VideoInfo } from "@/lib/types";
import { extractYouTubeID } from "@/lib/utils/youtube";
import { YouTubeServiceError } from "@/lib/server/errors";

/**
 * Fetch transcript for a YouTube video
 * @param videoId - YouTube video ID
 * @param lang - Language code (default: 'en')
 * @returns Transcript text
 */
export async function fetchTranscript(
  videoId: string,
  lang = "en",
): Promise<string> {
  if (!videoId) {
    throw new Error("Invalid YouTube video ID");
  }

  try {
    // First try with the specified language
    try {
      const transcriptResponse = await YoutubeTranscript.fetchTranscript(
        videoId,
        { lang },
      );

      console.log("transcriptResponse", transcriptResponse);
      // Check if we got a valid transcript
      if (!transcriptResponse || transcriptResponse.length === 0) {
        throw new Error("No transcript available for this video");
      }

      // Process transcript
      console.log(transcriptResponse.map((t) => t.text).join(" "));
      return transcriptResponse.map((t) => t.text).join(" ");
    } catch (error) {
      // If specified language fails and it's not English, try with English
      console.error("Error fetching transcript:", error);
      if (lang !== "en") {
        console.warn(
          `Failed to get transcript in ${lang}, trying English instead`,
        );

        const transcriptResponse = await YoutubeTranscript.fetchTranscript(
          videoId,
          { lang: "en" },
        );

        // Check if we got a valid transcript
        if (!transcriptResponse || transcriptResponse.length === 0) {
          throw new Error("No transcript available for this video");
        }

        // Process transcript
        return transcriptResponse.map((t) => t.text).join(" ");
      }

      // If we're already using English or the second attempt fails, throw the error
      throw new Error("No transcript available for this video");
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching transcript:", error);

    // Always return a user-friendly error message
    throw new Error("No transcript available for this video");
  }
}

/**
 * Fetch information about a YouTube video
 * @param videoUrl - YouTube video URL
 * @returns Video information
 */
export async function fetchVideoInfo(videoUrl: string): Promise<VideoInfo> {
  if (!videoUrl) {
    throw new YouTubeServiceError("Please provide a valid YouTube URL");
  }

  const videoId = extractYouTubeID(videoUrl);
  if (!videoId) {
    throw new YouTubeServiceError(
      "Could not extract a valid YouTube video ID from the URL",
    );
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    );

    if (!response.ok) {
      throw new YouTubeServiceError("Failed to fetch video information");
    }

    const data = await response.json();

    return {
      id: videoId,
      title: data.title,
      url: videoUrl,
      thumbnail: data.thumbnail_url,
    };
  } catch (error) {
    console.error("Error fetching YouTube info:", error);

    if (error instanceof YouTubeServiceError) {
      throw error;
    }

    // Return minimal info if we can't get full details
    return {
      id: videoId,
      title: "YouTube Video",
      url: videoUrl,
    };
  }
}
