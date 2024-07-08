import { getChildNodes } from "@utils/client";
import { donHangBySlug, getCustomer, getMenuNodes } from "@utils/server";
import { ScanText } from "lucide-react";

import type { Tables } from "~/lib/supabase/types";
import { Pagination } from "~/components/ui/pagination";
import { PriceTable } from "./PriceTable";

export type DefaultProductListContentProps = {
  params: { slug?: string[] };
  searchParams: {
    groups?: string;
    page?: string;
    customer?: string;
    sort_by?: keyof Tables<"don_hang">;
    sort_order?: "asc" | "desc";
  };
};

export const Content = async ({
  params,
  searchParams,
}: DefaultProductListContentProps) => {
  const customerId = searchParams.customer;
  const selectedGroups = searchParams.groups?.split(",");

  const { from, to } = getPagination(parseInt(searchParams.page ?? "1"), 10);

  const [menuNodes, customer] = await Promise.all([
    getMenuNodes(),
    customerId ? getCustomer(customerId) : undefined,
  ]);

  const childNodesFiltered = getChildNodes(menuNodes, params.slug, customer);

  const groups = searchParams.groups
    ? childNodesFiltered.filter((x) => selectedGroups?.includes(x.slug))
    : childNodesFiltered;
  const paginatedGroups = groups.slice(from, to);

  const [...priceTablesQuery] = await Promise.all([
    ...paginatedGroups.map((node) => {
      return donHangBySlug(node.slug);
    }),
  ]);

  const filtered = priceTablesQuery;

  return (
    <>
      {filtered.map((query, index) => {
        const _donHang = query.data ?? [];
        const groupedByChatLieu: Record<
          string,
          Tables<"don_hang">["ma_don_hang"]
        > = {};

        const data = paginatedGroups[index]!;
        return (
          <div key={data.id} className="mb-4 rounded-lg bg-white lg:p-4">
            <div className="mb-1 h-[1px] w-full border border-b border-dashed"></div>
            {Object.entries(groupedByChatLieu).length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center gap-2 pt-2 text-gray-300">
                <ScanText size={40} strokeWidth={2} />
                <span>Khách Hàng</span>
              </div>
            ) : (
              Object.entries(groupedByChatLieu).map(([key, value]) => {
                return (
                  <PriceTable
                    key={key}
                    material={key}
                    data={value}
                    img={data.image_url}
                  />
                );
              })
            )}
          </div>
        );
      })}
      <Pagination total={groups.length} />
    </>
  );
};

const getPagination = (p: number, size: number) => {
  const page = p - 1;
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
