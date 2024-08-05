"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { Link } from "~/components/link";
import { Button } from "~/components/shadcn/button";

export const CloseLeafButton = ({ leafSlug }: { leafSlug: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groupSlugs =
    searchParams
      .get("groups")
      ?.split(",")
      .filter((x) => x !== leafSlug) ?? [];
  const newSearchParams = new URLSearchParams(searchParams.toString());
  if (groupSlugs.length === 0) {
    newSearchParams.delete("groups");
  } else {
    newSearchParams.set("groups", groupSlugs.join(","));
  }

  return (
    <Button variant="ghost" shape={"icon"} asChild>
      <Link
        href={
          pathname +
          (newSearchParams.toString() ? "?" + newSearchParams.toString() : "")
        }
      >
        <X />
      </Link>
    </Button>
  );
};
