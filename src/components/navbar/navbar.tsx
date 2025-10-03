"use client";

import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const Navbar = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (value: string) => {
    router.push(pathname, { locale: value, scroll: false });
  };

  return (
    <nav className="h-16 bg-background sticky top-0 shadow border z-10">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <Select
            defaultValue={locale}
            value={locale}
            onValueChange={handleLocaleChange}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-fit min-w-0" align={"end"}>
              <SelectGroup>
                <SelectLabel className="sr-only">Language</SelectLabel>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    {/*<span className="fi fi-gb h-4 w-4 border"></span>*/}
                    <span>EN</span>
                  </div>
                </SelectItem>
                <SelectItem value="id">
                  <div className="flex items-center gap-2">
                    {/*<span className="fi fi-id h-4 w-4 border"></span>*/}
                    <span>ID</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
