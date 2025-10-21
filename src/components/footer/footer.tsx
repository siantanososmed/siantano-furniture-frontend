import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/navbar/logo";
import { getTranslations } from "next-intl/server";
import {
  Instagram,
  Mail,
  Tiktok,
  Whatsapp,
} from "@/components/icons/custom-icons";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const footerLinks = [
    {
      title: t("ourStory"),
      href: "/our-story",
    },
    {
      title: t("contactUs"),
      href: "/contact-us",
    },
    {
      title: t("careers"),
      href: "/careers",
    },
  ];

  return (
    <>
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            <div>
              {/* Logo */}
              <div data-aos="zoom-in">
                <Logo />
              </div>

              <ul className="mt-6 flex items-center gap-4 flex-wrap">
                {footerLinks.map(({ title, href }) => (
                  <li key={title} data-aos="zoom-in">
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()} <span>Siantano Furniture</span>.{" "}
              {t("allRightsReserved")}
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link
                aria-label="Chat on WhatsApp"
                href="https://wa.me/6282228262788"
                target="_blank"
                rel="noopener noreferrer"
                title={"Siantano 1"}
              >
                <Whatsapp className="h-5 w-5 fill-muted-foreground" />
              </Link>
              <Link
                aria-label="Chat on WhatsApp"
                href="https://wa.me/628123252388"
                target="_blank"
                rel="noopener noreferrer"
                title={"Siantano 2"}
              >
                <Whatsapp className="h-5 w-5 fill-muted-foreground" />
              </Link>
              <Link
                href="https://www.tiktok.com/@siantano_furniture"
                target="_blank"
                rel="noopener noreferrer"
                title={"Tiktok"}
              >
                <Tiktok className="h-5 w-5 fill-muted-foreground" />
              </Link>
              <Link
                href="https://www.instagram.com/siantano_furniture"
                target="_blank"
                rel="noopener noreferrer"
                title={"Instagram"}
              >
                <Instagram className="h-5 w-5 fill-muted-foreground" />
              </Link>
              <Link
                href="mailto:hello@siantanofurniture.com"
                target="_blank"
                rel="noopener noreferrer"
                title={"Mail"}
              >
                <Mail className="h-5 w-5 fill-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
