"use client";

// import { usePathname, useSearchParams } from "next/navigation";
import Container from "@component/Container";

import type { Tables } from "~/lib/supabase/types";
import { Link } from "~/components/link";
import { cn } from "~/utils";
import StyledHeader from "./styles";

// import StyledHeader from "./styles";

type HeaderProps = {
  className?: string;
  allProductGroups: Tables<"product_groups">[];
  menuNodes: Tables<"menu_nodes_matview">[];
  customer: Tables<"customers_matview"> | undefined;
};

export default function HeaderMenu({ className }: HeaderProps) {
  return (
    <StyledHeader
      className={cn(
        className,
        "!h-auto !bg-white !py-4 shadow-lg shadow-gray-300/30 lg:!bg-white",
      )}
    >
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      ></Container>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-start"
        width="100%"
        className="mt-6 !hidden lg:!flex"
      >
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          TRANG CHỦ
        </Link>
        <Link
          href={"/danh-muc-san-pham"}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          SẢN PHẨM
        </Link>
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          VỀ CHÚNG TÔI
        </Link>
        <Link
          href={""}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          TIN TỨC
        </Link>
        <Link
          href={"/don-hang"}
          className="pl-11 text-base font-medium text-sky-700 hover:text-blue-500"
        >
          ĐƠN HÀNG
        </Link>
      </Container>
    </StyledHeader>
  );
}
