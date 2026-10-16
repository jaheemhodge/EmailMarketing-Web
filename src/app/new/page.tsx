import type { Metadata } from "next";
import { ChatHome } from "@/components/chat/chat-home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function NewHomePreview() {
  return <ChatHome />;
}
