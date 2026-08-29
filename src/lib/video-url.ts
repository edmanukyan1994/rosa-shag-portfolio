export const VIDEO_QUERY_KEY = "v";

export function buildVideoShareUrl(videoId: string, origin?: string): string {
  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/?${VIDEO_QUERY_KEY}=${encodeURIComponent(videoId)}`;
}
