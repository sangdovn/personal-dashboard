"use client";

import { FormEvent, useState } from "react";
import { getVideoSummaryAction, getYoutubeTitle } from "@/lib/actions/youtube";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function YouTubeSummarizer() {
  const [isSummarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSummary("");
    setError("");
    setSummarizing(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const videoUrl = formData.get("videoUrl") as string;

    try {
      const stream = await getVideoSummaryAction({ videoUrl });
      setSummarizing(false);
      if (!stream) throw new Error("Failed to generate summary");

      const title = await getYoutubeTitle(videoUrl);
      if (title) setSummary(`**Video Title**: ${title}\n\n`);

      for await (const chunk of stream) {
        setSummary((prev) => prev + (chunk.choices[0]?.delta?.content || ""));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      console.error(err);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="items-cener flex space-x-3">
        <input
          className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="url"
          id="videoUrl"
          name="videoUrl"
          placeholder="Enter YouTube video URL"
        />
        <button
          type="submit"
          className="items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-white transition hover:bg-blue-600"
          disabled={isSummarizing}
        >
          {isSummarizing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Summarize"
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {isSummarizing && (
        <p className="mt-4 text-center text-gray-600">Summarizing...</p>
      )}
      {summary && (
        <div className="mt-2 rounded-lg bg-gray-100 p-4 whitespace-pre-line text-gray-800">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
