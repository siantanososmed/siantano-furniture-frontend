import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { Fragment } from "react";
import { UrlObject } from "node:url";

export default function CategoryBreadcrumb({
  items,
}: {
  items: { label: string; href: string | UrlObject }[];
}) {
  return (
    <div
      data-aos="zoom-in"
      className="inline-flex justify-between w-full items-center"
    >
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, i) => {
            if (i === items.length - 1) {
              return (
                <BreadcrumbItem key={item.label + "-" + i}>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }

            return (
              <Fragment key={item.label + "-" + i}>
                <BreadcrumbItem key={item.label}>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i < items.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
