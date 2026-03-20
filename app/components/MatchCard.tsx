import { Link } from "react-router";
import { formatDate } from "~/util/formatDate";
import RichText from "./RichText";
import Image from "./Image";
import type { SanityBlock, SanitySlug } from "~/types/sanity";

export interface MatchCardProps {
  slug: SanitySlug;
  title: string;
  date: string;
  description: SanityBlock[];
  images?: { asset: { _ref: string } }[];
}

export default function MatchCard({ slug, title, date, description, images }: MatchCardProps) {
  return (
    <Link to={`/side-a/matches/${slug.current}`} className="group no-underline">
      <article
        key={slug.current}
        className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md"
      >
        <div className="aspect-video w-full overflow-hidden bg-slate-200">
          {images?.[0] && (
            <Image
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              asset={images[0]?.asset._ref}
              alt={title || "Match Image"}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <header className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {formatDate(date)}
            </p>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </header>
          <div className="line-clamp-3 text-sm text-slate-700">
            <RichText value={description ?? []} />
          </div>
        </div>
      </article>
    </Link>
  );
}
