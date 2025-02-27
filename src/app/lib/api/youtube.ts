import { YoutubeTranscript } from "youtube-transcript";

export async function getTranscript(videoId: string) {
  const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId);
  if (!transcriptResponse) throw new Error("Failed to get transcript");
  return transcriptResponse.map((t) => t.text).join(" ");
}
