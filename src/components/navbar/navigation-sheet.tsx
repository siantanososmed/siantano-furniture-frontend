import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { MenuItem, useMenuItems } from "@/components/navbar/config";
import { Fragment } from "react";

export const NavigationSheet = () => {
  const menuItems: MenuItem[] = useMenuItems();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        {/* Accessible title */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        {/* Optional description for better accessibility */}
        <SheetDescription className="sr-only">
          Select a category to navigate through the website.
        </SheetDescription>

        <Logo />

        <div className="mt-6 text-base space-y-4">
          {menuItems.map((menuItem) => {
            return (
              <Fragment key={menuItem.title}>{renderMenu(menuItem)}</Fragment>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMenu = (menu: MenuItem) => {
  if (!menu.submenu || !menu.submenu.length) {
    return (
      <div>
        <Link href={menu.href} className="flex">
          {menu.title}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="font-bold">{menu.title}</div>
      <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
        {menu.submenu.map((submenu) => (
          <li key={submenu.title}>
            <Link href={submenu.href} className="flex items-center gap-2">
              <submenu.icon className="h-5 w-5 mr-2 text-muted-foreground" />
              {submenu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
