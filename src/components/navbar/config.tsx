import { GlobeIcon, LucideIcon, MapPin } from "lucide-react";

export type MenuItem = {
  title: string;
  href: string;
  submenu?: SubmenuItem[];
};
type SubmenuItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Catalog",
    href: "#",
    submenu: [
      {
        title: "Export Products",
        href: "/catalog/export",
        icon: GlobeIcon,
        description: "High-quality products for international markets.",
      },
      {
        title: "Local Products",
        href: "/catalog/local",
        icon: MapPin,
        description: "Premium products tailored for local needs.",
      },
    ],
  },
  {
    title: "Our Story",
    href: "/our-story",
  },
];
