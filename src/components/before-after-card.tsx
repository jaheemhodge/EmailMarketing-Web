import { EmailFrame } from "@/components/email-frame";
import type { AuditPiece } from "@/lib/audits";

export function BeforeAfterCard({ piece, client }: { piece: AuditPiece; client: string }) {
  return (
    <div className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold">{piece.name}</h3>
        {piece.issue ? (
          <p className="text-sm text-muted">{piece.issue}</p>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 sm:max-w-xl">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">
            Before
          </p>
          <EmailFrame
            piece={{
              subject: `${piece.name} — Before`,
              flow: "Before",
              image: piece.before.image,
              accent: piece.before.accent,
            }}
            client={client}
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
            After
          </p>
          <EmailFrame
            piece={{
              subject: `${piece.name} — After`,
              flow: "After",
              image: piece.after.image,
              accent: piece.after.accent,
            }}
            client={client}
          />
        </div>
      </div>

      {piece.whatChanged.length > 0 ? (
        <div className="mt-6 max-w-xl border-t border-border pt-5">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            What changed
          </p>
          <ul className="mt-3 space-y-2.5">
            {piece.whatChanged.map((note) => (
              <li key={note} className="flex items-start gap-2.5 text-sm text-foreground/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
