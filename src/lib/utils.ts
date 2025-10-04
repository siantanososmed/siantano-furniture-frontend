import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import assert from "node:assert";
import logger from "@/lib/logger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGridPages<T>(data: Array<T>, col: number, row: number) {
  const dataLength = data.length;
  const itemsPerPage = col * row;

  assert(col > 0, "Number of columns must be greater than 0");
  assert(row > 0, "Number of rows must be greater than 0");

  const totalPages = Math.ceil(dataLength / itemsPerPage);
  return Array.from({ length: totalPages }).map((_, pageIndex) => {
    return data.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);
  });
}

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function queryUrlToObject(queryUrl: URLSearchParams) {
  const record: Record<string, string | string[]> = {};
  queryUrl.forEach((value, key) => {
    if (record[key]) {
      if (Array.isArray(record[key])) {
        (record[key] as string[]).push(value);
      } else {
        record[key] = [record[key] as string, value];
      }
    } else {
      record[key] = value;
    }
  });
  return record;
}
export function getFulfilledValue<T>(
  promiseResult: PromiseSettledResult<T>,
  name: string
): T | null {
  if (promiseResult.status === "fulfilled") {
    return promiseResult.value;
  }
  logger.error(`Failed to get data from ${name}`, promiseResult.reason);
  return null;
}
