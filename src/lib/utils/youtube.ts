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
