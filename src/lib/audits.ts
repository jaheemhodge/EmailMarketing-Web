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
    pieces: [
      {
        name: "Welcome Email",
        before: {
          image: "/work/audits/bitter-truth-coffee/welcome-after.png",
          accent: "#b8441e",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/welcome-before.png",
          accent: "#d97b3f",
        },
        whatChanged: [],
      },
      {
        name: "Brand Story Email",
        before: {
          image: "/work/audits/bitter-truth-coffee/story-after.png",
          accent: "#4a3426",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/story-before.png",
          accent: "#c9a879",
        },
        whatChanged: [],
      },
      {
        name: "Cart Recovery Email",
        before: {
          image: "/work/audits/bitter-truth-coffee/cart-after.png",
          accent: "#e8a33d",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/cart-before.png",
          accent: "#3d3128",
        },
        whatChanged: [],
      },
    ],
  },
];
