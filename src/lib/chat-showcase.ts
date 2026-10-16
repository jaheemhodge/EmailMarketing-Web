export type ShowcaseItem = {
  brand: string;
  /** The real email subject line, used as the lightbox title. */
  subject: string;
  workType: string;
  /** What the email was designed to do — not a performance claim. */
  purpose: string;
  image: string;
  accent: string;
  label: "client" | "concept";
};

export const bitterTruthShowcase: ShowcaseItem[] = [
  {
    brand: "Bitter Truth Coffee Co.",
    subject: "Here's 20% Off Your First Subscription Order + A Free Mug",
    workType: "Welcome Flow",
    purpose: "Introduces the subscription offer to someone who just signed up.",
    image: "/work/bitter-truth-coffee/welcome-1.png",
    accent: "#d97b3f",
    label: "client",
  },
  {
    brand: "Bitter Truth Coffee Co.",
    subject: "Still Deciding? Here's 20% Off. The Bag Will Keep Either Way.",
    workType: "Abandoned Checkout",
    purpose: "Follows up with a shopper who left before finishing checkout.",
    image: "/work/bitter-truth-coffee/cart-1.png",
    accent: "#8a5a2e",
    label: "client",
  },
  {
    brand: "Bitter Truth Coffee Co.",
    subject: "Save Up To 15%. The Season Starts Here.",
    workType: "Campaign",
    purpose: "A seasonal campaign designed to keep the brand relevant between purchases.",
    image: "/work/bitter-truth-coffee/campaign-1.png",
    accent: "#c07a3f",
    label: "client",
  },
];

export const conceptShowcaseDefault: ShowcaseItem[] = [
  {
    brand: "ASARAI",
    subject: "Less Cover-Up. More Skin.",
    workType: "Welcome Flow",
    purpose: "A welcome send built to introduce the brand's positioning right away.",
    image: "/work/concepts/asarai-welcome-1.png",
    accent: "#d9b32e",
    label: "concept",
  },
  {
    brand: "Bite",
    subject: "What Is Foundational Oral Care?",
    workType: "Welcome Flow",
    purpose: "An educational welcome email that leads with the brand's category.",
    image: "/work/concepts/bite-1.png",
    accent: "#6e8fae",
    label: "concept",
  },
  {
    brand: "Everyday Dose",
    subject: "Don't Quit Coffee. Just Make It A Better One.",
    workType: "Campaign",
    purpose: "A campaign send aimed at coffee drinkers looking for an alternative.",
    image: "/work/general/everyday-dose-1.png",
    accent: "#c9b8e8",
    label: "concept",
  },
  {
    brand: "Fussy",
    subject: "40,000 People Can't Be Wrong",
    workType: "Campaign",
    purpose: "A social-proof-driven campaign send.",
    image: "/work/general/fussy-1.png",
    accent: "#c9702f",
    label: "concept",
  },
];

export const conceptShowcaseMore: ShowcaseItem[] = [
  {
    brand: "ASARAI",
    subject: "Brighter Skin Starts Here",
    workType: "Welcome Flow",
    purpose: "A second welcome touchpoint, building on the brand's first impression.",
    image: "/work/concepts/asarai-welcome-2.png",
    accent: "#a8402e",
    label: "concept",
  },
  {
    brand: "ASARAI",
    subject: "Enjoy 10% Off Your First Purchase",
    workType: "Abandoned Checkout",
    purpose: "Follows up with a shopper who left before finishing checkout.",
    image: "/work/concepts/asarai-cart-1.png",
    accent: "#d9b32e",
    label: "concept",
  },
  {
    brand: "ASARAI",
    subject: "Your Skin's Ready For This.",
    workType: "Abandoned Checkout",
    purpose: "A second cart-recovery touchpoint for shoppers who still haven't returned.",
    image: "/work/concepts/asarai-cart-2.png",
    accent: "#c9a876",
    label: "concept",
  },
  {
    brand: "ASARAI",
    subject: "Less Foundation. More Skin.",
    workType: "Social Proof",
    purpose: "Uses social proof to reinforce the brand's core message.",
    image: "/work/concepts/asarai-social-proof-1.png",
    accent: "#a8402e",
    label: "concept",
  },
  {
    brand: "Bite",
    subject: "Skip The Water, Keep The Clean",
    workType: "Abandoned Checkout",
    purpose: "Follows up with a shopper who left before finishing checkout.",
    image: "/work/concepts/bite-2.png",
    accent: "#9a9a9a",
    label: "concept",
  },
  {
    brand: "Bite",
    subject: "Made To Brush Better",
    workType: "Campaign",
    purpose: "A campaign send built around the product's core benefit.",
    image: "/work/concepts/bite-3.png",
    accent: "#b0735a",
    label: "concept",
  },
  {
    brand: "Starface",
    subject: "They Said It Better Than We Could",
    workType: "Campaign",
    purpose: "A social-proof-driven campaign send.",
    image: "/work/general/starface-1.png",
    accent: "#6ea3d9",
    label: "concept",
  },
  {
    brand: "Hears",
    subject: "Hear The Moment. Not The Damage.",
    workType: "Campaign",
    purpose: "A campaign send built around the product's core benefit.",
    image: "/work/general/hears-1.png",
    accent: "#3d5a80",
    label: "concept",
  },
  {
    brand: "Goodles",
    subject: "One Click Away From Love At First Bite",
    workType: "Campaign",
    purpose: "A campaign send built to move a browser toward a first purchase.",
    image: "/work/general/goodles-1.png",
    accent: "#e8312f",
    label: "concept",
  },
];
