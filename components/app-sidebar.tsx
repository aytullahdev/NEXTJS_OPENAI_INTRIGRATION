"use client";

import { History, Settings2, SquareTerminal, Star } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Vercel-AI",
          url: "vercel-ai",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Synchronous Test",
          url: "synchronous",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Streaming",
          url: "streaming",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}
