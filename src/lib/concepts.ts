export type ConceptPiece = {
  subject: string;
  flow: string;
  accent: string;
  image?: string;
};

export type ConceptProject = {
  slug: string;
  brand: string;
  industry: string;
  summary: string;
  tags: string[];
  pieces: ConceptPiece[];
};

export const concepts: ConceptProject[] = [
  {
    slug: "asarai",
    brand: "ASARAI",
    industry: "Skincare / Concept",
    summary:
      "ASARAI is not a past or current client — these are self-initiated concept emails, built end to end (strategy, copy, and design) to show how I'd approach a skincare brand's welcome, cart-recovery, and social-proof sends.",
    tags: ["Self-Initiated Concept", "Strategy + Copywriting", "Design"],
    pieces: [
      {
        subject: "Less Cover-Up. More Skin.",
        flow: "Welcome Flow",
        accent: "#d9b32e",
        image: "/work/concepts/asarai-welcome-1.png",
      },
      {
        subject: "Brighter Skin Starts Here",
        flow: "Welcome Flow",
        accent: "#a8402e",
        image: "/work/concepts/asarai-welcome-2.png",
      },
      {
        subject: "Enjoy 10% Off Your First Purchase",
        flow: "Abandoned Checkout",
        accent: "#d9b32e",
        image: "/work/concepts/asarai-cart-1.png",
      },
      {
        subject: "Your Skin's Ready For This.",
        flow: "Abandoned Checkout",
        accent: "#c9a876",
        image: "/work/concepts/asarai-cart-2.png",
      },
      {
        subject: "Less Foundation. More Skin.",
        flow: "Social Proof",
        accent: "#a8402e",
        image: "/work/concepts/asarai-social-proof-1.png",
      },
    ],
  },
  {
    slug: "bite",
    brand: "Bite",
    industry: "Oral Care / Concept",
    summary:
      "Bite is not a past or current client — these are self-initiated concept emails, built end to end (strategy, copy, and design) to show how I'd approach an oral care brand's education and cart-recovery sends.",
    tags: ["Self-Initiated Concept", "Strategy + Copywriting", "Design"],
    pieces: [
      {
        subject: "What Is Foundational Oral Care?",
        flow: "Welcome Flow",
        accent: "#6e8fae",
        image: "/work/concepts/bite-1.png",
      },
      {
        subject: "Skip The Water, Keep The Clean",
        flow: "Abandoned Checkout",
        accent: "#9a9a9a",
        image: "/work/concepts/bite-2.png",
      },
      {
        subject: "Made To Brush Better",
        flow: "Campaign",
        accent: "#b0735a",
        image: "/work/concepts/bite-3.png",
      },
    ],
  },
];
