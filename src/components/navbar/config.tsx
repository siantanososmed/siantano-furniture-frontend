"use client";
import { GlobeIcon, LucideIcon, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

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

export const useMenuItems = () => {
  const t = useTranslations("Navbar");

  const menuItems: MenuItem[] = [
    {
      title: t("home"),
      href: "/",
    },
    {
      title: t("catalog.title"),
      href: "#",
      submenu: [
        {
          title: t("catalog.dropdown.localProducts.title"),
          href: "/catalog/local",
          icon: MapPin,
          description: t("catalog.dropdown.localProducts.description"),
        },
        {
          title: t("catalog.dropdown.exportProducts.title"),
          href: "/catalog/export",
          icon: GlobeIcon,
          description: t("catalog.dropdown.exportProducts.description"),
        },
      ],
    },
    {
      title: t("ourStory"),
      href: "/our-story",
    },
  ];

  return menuItems;
};
