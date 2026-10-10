// The notes are Markdown files in public/articles, listed in public/articles/index.json
// (rebuilt by .github/scripts/build_index.py whenever a note changes).

export type Note = { slug: string; title: string; date: string; category: string; summary: string; tags: string[] };

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch("/articles/index.json");
  if (!res.ok) throw new Error("index not found");
  const items = (await res.json()) as (Note & { external?: boolean })[];
  return items.filter((n) => !n.external).sort((a, b) => b.date.localeCompare(a.date));
}

export function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return { meta, body: m[2] };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-28" -> "28 Sep 2026" */
export function niceDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : iso;
}
