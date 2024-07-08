"use client";

import type { MenuItem } from "~/components/categories/mega-menu/type";
import type { Tables } from "~/lib/supabase/types";
import { CardContent, CardRoot } from "~/components/shadcn/card";

export const Item = ({
  info,
  data,
  leafCount,
}: {
  info: MenuItem;
  data: NonNullable<Tables<"Don_hang">["child_don_hang"]>;
}) => {
  return (
    <div>
      <p>aaaaaa</p>
    </div>
  );
};
