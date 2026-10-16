export type ChatBlock =
  | { id: string; type: "text"; from: "jaheem" | "visitor"; text: string; anchor?: string }
  | { id: string; type: "portfolio"; from: "jaheem"; text: string; label: "client" | "concept"; anchor?: string }
  | { id: string; type: "service-cards"; anchor?: string }
  | { id: string; type: "process"; anchor?: string }
  | { id: string; type: "cta"; anchor?: string };

export const chatScript: ChatBlock[] = [
  {
    id: "intro-1",
    type: "text",
    from: "jaheem",
    text: "Hey, I'm Jaheem 👋 I help ecommerce brands keep the conversation going after someone signs up or makes a purchase.",
  },
  {
    id: "intro-2",
    type: "text",
    from: "jaheem",
    text: "Want to see what that looks like?",
  },
  {
    id: "intro-3",
    type: "text",
    from: "visitor",
    text: "Show me the emails.",
  },
  {
    id: "work-intro",
    type: "text",
    from: "jaheem",
    text: "Let's start with Bitter Truth Coffee, a brand I work with.",
    anchor: "work",
  },
  {
    id: "work-portfolio",
    type: "portfolio",
    from: "jaheem",
    text: "A few of the stronger sends from that work:",
    label: "client",
  },
  {
    id: "range-intro",
    type: "text",
    from: "jaheem",
    text: "Here are a few more examples of my approach to different brands.",
  },
  {
    id: "range-portfolio",
    type: "portfolio",
    from: "jaheem",
    text: "Self-initiated work, built to show range across categories:",
    label: "concept",
  },
  {
    id: "service-q",
    type: "text",
    from: "visitor",
    text: "So, is it just email design?",
  },
  {
    id: "service-a",
    type: "text",
    from: "jaheem",
    text: "Design is one part. I also work on what to send, who should receive it, and how each message fits into the customer journey.",
    anchor: "services",
  },
  {
    id: "service-cards",
    type: "service-cards",
  },
  {
    id: "working-q",
    type: "text",
    from: "visitor",
    text: "What would working together look like?",
  },
  {
    id: "working-a",
    type: "text",
    from: "jaheem",
    text: "First, we look at what you already have and where you need support. Then we agree on the priorities — whether that's building your flows, improving your campaigns, or managing email each month.",
  },
  {
    id: "process",
    type: "process",
  },
  {
    id: "close-q",
    type: "text",
    from: "visitor",
    text: "I'd like to talk about my brand.",
  },
  {
    id: "close-a",
    type: "text",
    from: "jaheem",
    text: "Let's take a look at what you're working with and see if we're a fit.",
    anchor: "cta",
  },
  {
    id: "cta",
    type: "cta",
  },
];

export const shortcuts = [
  { label: "See the work", anchor: "work" },
  { label: "What we do", anchor: "services" },
  { label: "Work with me", anchor: "cta" },
] as const;

export const serviceFlows = [
  {
    title: "Welcome flows",
    description: "Introduce the brand and guide new subscribers toward a first purchase.",
  },
  {
    title: "Abandoned checkout",
    description: "Follow up with shoppers who left before completing their order.",
  },
  {
    title: "Post-purchase",
    description: "Help customers get more from their purchase and introduce relevant next steps.",
  },
  {
    title: "Win-back",
    description: "Reconnect with customers who haven't purchased in a while.",
  },
  {
    title: "Campaigns",
    description: "Keep the brand relevant through useful content, launches, and offers.",
  },
];

export const processSteps = ["Review", "Plan", "Create and build", "Test and improve"];
