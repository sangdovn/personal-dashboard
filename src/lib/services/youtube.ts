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
  try {
    const transcriptResponse = await YoutubeTranscript.fetchTranscript(
      videoId,
      {
        lang,
      },
    );

    if (!transcriptResponse || transcriptResponse.length === 0) {
      throw new YouTubeServiceError(
        "No transcript available for this video. It may not have captions.",
      );
    }

    // Process transcript
    return transcriptResponse.map((t) => t.text).join(" ");
  } catch (error) {
    if (error instanceof YouTubeServiceError) {
      throw error;
    }

    throw new YouTubeServiceError(
      error instanceof Error
        ? error.message
        : "Failed to fetch video transcript",
    );
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
