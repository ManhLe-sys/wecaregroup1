import "server-only";

import { cache } from "react";

import { createClient } from "~/lib/supabase/server";

// Đảm bảo cache được import đúng cách

export const getAllProductGroups = cache(async () => {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    (
      await supabase
        .from("product_groups")
        .select()
        .order("pos", { ascending: true })
    ).data ?? []
  );
});

// export const preloadLeafNode = (id: string | null) => {
//   void getLeafNode(id);
// };

// export const getLeafNode = cache(async (slug: string) => {
//   const supabase = createClient();
//   const childNodes =
//     (
//       await supabase
//         .from("menu_nodes_matview")
//         .select("*")
//         .eq("slug", slug)
//         .order("pos", { ascending: true })
//     ).data?.[0]?.child_nodes ?? [];
//   return childNodes;
// });

export const getMenuNodes = cache(async () => {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    (
      await supabase
        .from("menu_nodes_matview")
        .select()
        .order("pos", { ascending: true })
    ).data ?? []
  );
});

// export const getCustomerProducts = cache(async (customerId: string) => {
//   const supabase = createClient();
//   const res =
//     (await supabase.from("customers_matview").select().eq("id", customerId))
//       .data ?? [];
//   if (res.length > 0) {
//     return res[0]?.products || [];
//   }
//   return [];
// });
export const getCustomer = cache(async (customerId: string) => {
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    await supabase.from("customers_matview").select().eq("id", customerId)
  ).data?.[0];
});

export const productsBySlug = (slug: string) => {
  const supabase = createClient();
  return supabase
    .from("products")
    .select("*")
    .eq("product_group_slug", slug)
    .order("id", { ascending: true });
};

export const donHangBySlug = (slug: string) => {
  const supabase = createClient();
  return supabase
    .from("don_hang")
    .select("*")
    .eq("ma_don_hang", slug)
    .order("id", { ascending: true });
};
