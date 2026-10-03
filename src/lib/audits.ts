export type AuditPiece = {
  name: string;
  /** Short note on the specific problem the "before" version had */
  issue?: string;
  before: {
    image?: string;
    accent: string;
  };
  after: {
    image?: string;
    accent: string;
  };
  /** Strategist notes on what changed and why */
  whatChanged: string[];
};

export type AuditProject = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  pieces: AuditPiece[];
};

export const audits: AuditProject[] = [
  {
    slug: "bitter-truth-coffee",
    client: "Bitter Truth Coffee Co.",
    industry: "Coffee / Subscription",
    summary:
      "A retention audit on Bitter Truth Coffee's existing flows — finding where copy, design, and offer structure were leaving revenue on the table, then rebuilding each send.",
    pieces: [],
  },
];
