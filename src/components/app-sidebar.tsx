"use client";

import * as React from "react";
import {
  IconCamera,
  IconPhotoScan,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconSettingsCode,
  IconPackage,
  IconBrandBlogger,
  IconRegistered,
} from "@tabler/icons-react";

import Logo from "@front/assets/icons/logo.svg";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Banner",
      url: "/dashboard/banner",
      icon: IconPhotoScan,
    },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: IconListDetails,
    },
    {
      title: "Teachers",
      url: "/dashboard/teachers",
      icon: IconUsers,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: IconSettingsCode,
    },
    {
      title: "Combos",
      url: "/dashboard/combos",
      icon: IconPackage,
    },
    {
      title: "About US",
      url: "/dashboard/about-us",
      icon: IconPackage,
    },
    {
      title: "Blog",
      url: "/dashboard/blog",
      icon: IconBrandBlogger,
    },
    {
      title: "Registered",
      url: "/dashboard/registered",
      icon: IconRegistered,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navMainItems = data.navMain.map((item) => ({
    ...item,
    isActive: item.url === pathname, // Сравниваем URL элемента с текущим pathname
  }));
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="#">
                <Logo className="!size-20" />
                <span className="text-base font-semibold">IT CLUB.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavDocuments items={data.documents} />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
