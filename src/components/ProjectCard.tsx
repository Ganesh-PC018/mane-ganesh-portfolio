import { ExternalLink, Github } from "lucide-react";
import type { ElementType, FC } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: ElementType;
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const ProjectCard: FC<CardProps> = ({
  title,
  description,
  icon: Icon,
  tech,
  highlights,
  liveUrl = "#",
  githubUrl = "#",
  color
}) => (
  <article
    className={`group relative flex flex-col rounded-xl border p-6 shadow-sm transition
                hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/40 ${color}`}
    tabIndex={0}
  >
    {/* Icon & Title */}
    <header className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
    </header>

    {/* Description */}
    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

    {/* Tech Stack */}
    <ul className="mb-4 flex flex-wrap gap-1">
      {tech.map(t => (
        <li key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>

    {/* Highlights */}
    <ul className="mb-6 space-y-2 text-xs">
      {highlights.map(h => (
        <li key={h} className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="text-foreground">{h}</span>
        </li>
      ))}
    </ul>

    {/* Actions */}
    <footer className="mt-auto flex gap-2">
      {liveUrl !== "#" && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium
                     text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ExternalLink className="h-3 w-3" />
          Live Demo
        </a>
      )}
      {githubUrl !== "#" && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium
                     text-foreground transition-colors hover:bg-muted"
        >
          <Github className="h-3 w-3" />
          Code
        </a>
      )}
    </footer>
  </article>
);
