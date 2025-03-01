"use client";

import { FormEvent, useState } from "react";
import { getVideoSummaryAction, getYoutubeTitle } from "@/lib/actions/youtube";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function YoutubeSummary() {
  const [isSummarizing, setSummarizing] = useState(false);
  // const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // setTitle("");
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
          : "Something went wrong. Please try again."
      );
      console.error(err);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4 trext-gray-800">
        YouTube Summarizer
      </h1>
      <form onSubmit={handleSubmit} className="flex items-cener space-x-3">
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="url"
          id="videoUrl"
          name="videoUrl"
          placeholder="Enter YouTube video URL"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 items-center gap-2 transition"
          disabled={isSummarizing}
        >
          {isSummarizing ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Summarize"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {isSummarizing && (
        <p className="mt-4 text-gray-600 text-center">Summarizing...</p>
      )}
      {summary && (
        <div className="mt-2 whitespace-pre-line bg-gray-100 p-4 rounded-lg text-gray-800">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
