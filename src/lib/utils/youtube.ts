export const extractYouTubeID = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
};
