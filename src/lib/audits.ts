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
        issue: "Leads with a soft intro and a founder photo instead of the reward itself.",
        before: {
          image: "/work/audits/bitter-truth-coffee/welcome-before.png",
          accent: "#d97b3f",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/welcome-after.png",
          accent: "#b8441e",
        },
        whatChanged: [
          "Leads with \"You're In\" and the code itself instead of a soft welcome line — the reward comes before the ask.",
          "One CTA (\"Use Your Code\") replaces a founder photo plus a separate \"Shop\" button, cutting a decision point instead of adding one.",
          "Shows two roasts side by side instead of one bag, hinting at variety before the subscriber has even picked a flavor.",
        ],
      },
      {
        name: "Brand Story Email",
        issue: "Story leans on generic \"approach\" icons a competitor could just as easily claim.",
        before: {
          image: "/work/audits/bitter-truth-coffee/story-before.png",
          accent: "#c9a879",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/story-after.png",
          accent: "#4a3426",
        },
        whatChanged: [
          "Widens the story from one founder to two — the roaster partner adds a second, more concrete voice readers can picture.",
          "Swaps generic approach icons for named specifics (the importer, the roaster size, the 72-hour ship window) that are harder to fake and easier to trust.",
          "Closes on a point of view (\"the shortcut is always the longest way\") instead of a mission statement, giving the brand an actual opinion.",
        ],
      },
      {
        name: "Cart Recovery Email",
        issue: "Opens with urgency cues (a roast picker, a guy visibly walking off) instead of addressing the hesitation directly.",
        before: {
          image: "/work/audits/bitter-truth-coffee/cart-before.png",
          accent: "#3d3128",
        },
        after: {
          image: "/work/audits/bitter-truth-coffee/cart-after.png",
          accent: "#e8a33d",
        },
        whatChanged: [
          "Opens by naming the real objection (\"if the bag isn't right for you yet\") instead of a generic \"cart's still open\" nudge.",
          "Replaces the roast-picker upsell with a single, lower-pressure path back to the story — fewer choices for someone who's already hesitating.",
          "The P.S. reframes price as a trade-off (\"that's the trade\") instead of a discount reminder — reads as more confident, less salesy.",
        ],
      },
    ],
  },
];
