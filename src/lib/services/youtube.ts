import { YoutubeTranscript } from "youtube-transcript";
import { VideoInfo } from "@/lib/types";

/**
 * Error class for YouTube service errors
 */
export class YouTubeServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "YouTubeServiceError";
  }
}

/**
 * Extract YouTube video ID from URL
 * @param url - YouTube URL
 * @returns YouTube video ID or null if invalid
 */
export function extractYouTubeID(url: string): string | null {
  if (!url) return null;

  // Match patterns like:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/embed/VIDEO_ID
  const regex =
    /(?:(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&?\/]+)/;
  const match = url.match(regex);

  // Validate video ID format (11 characters, alphanumeric + _ and -)
  if (match && /^[\w-]{11}$/.test(match[1])) {
    return match[1];
  }

  return null;
}

/**
 * Validate if a string is a valid YouTube URL
 * @param url - URL to validate
 * @returns boolean indicating if URL is valid
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url) return false;

  // Basic URL validation
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    return false;
  }

  // Check if we can extract a video ID
  const videoId = extractYouTubeID(url);
  if (!videoId) {
    return false;
  }

  return true;
}

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

      // Check if we got a valid transcript
      if (!transcriptResponse || transcriptResponse.length === 0) {
        throw new Error("No transcript available for this video");
      }

      // Process transcript
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
