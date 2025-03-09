/**
 * Error class for YouTube service errors
 */
export class YouTubeServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "YouTubeServiceError";
  }
}
