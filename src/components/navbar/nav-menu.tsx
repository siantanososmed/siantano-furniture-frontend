"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import React from "react";
import { MenuItem, useMenuItems } from "@/components/navbar/config";

export const NavMenu = (props: NavigationMenuProps) => {
  const menuItems: MenuItem[] = useMenuItems();
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-0 space-x-0 text-sm">
        {menuItems.map((menuItem) => (
          <React.Fragment key={menuItem.title}>
            {renderMenu(menuItem)}
          </React.Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const renderMenu = (menu: MenuItem) => {
  if (!menu.submenu || !menu.submenu.length) {
    return (
      <NavigationMenuItem>
        <Button variant="ghost" className="text-[15px] font-normal" asChild>
          <Link data-aos="zoom-in" href={menu.href}>
            {menu.title}
          </Link>
        </Button>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        data-aos="zoom-in"
        className="text-[15px] font-normal"
      >
        {menu.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {menu.submenu.map((submenu) => (
            <ListItem
              key={submenu.title}
              title={submenu.title}
              icon={submenu.icon}
              href={submenu.href}
            >
              {submenu.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<
  React.ComponentRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <props.icon className="mb-4 h-6 w-6" />
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
