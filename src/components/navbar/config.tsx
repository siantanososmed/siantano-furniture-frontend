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
        description: "Sweet treats to satisfy your cravings.",
      },
      {
        title: "Local Products",
        href: "/catalog/local",
        icon: MapPin,
        description: "Delicious, cheesy slices of goodness.",
      },
    ],
  },
  {
    title: "Our Story",
    href: "/our-story",
  },
];
