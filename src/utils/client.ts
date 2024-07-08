import type { Tables } from "~/lib/supabase/types";

type MenuNode = Tables<"menu_nodes_matview">;
type Customer = Tables<"customers_matview">;
type ChildNodes = MenuNode["child_nodes"];
type CustomerProducts = Customer["products"];
type Donhang = Tables<"Don_hang">;

export const filterLeafNodes = (
  allLeaf: ChildNodes,
  customerProducts: CustomerProducts | undefined,
): ChildNodes => {
  return customerProducts
    ? allLeaf.filter((n) =>
        customerProducts.map((x) => x.parent_id).includes(n.id),
      )
    : allLeaf;
};

export const filterDonHang = (
  allLeaf: ChildNodes,
  donhang: Donhang | undefined,
): ChildNodes => {
  return donhang!
    ? allLeaf.filter((n) => donhang!.map((x) => x.id).includes(n.id))
    : allLeaf;
};

export const getDonhang = (
  menuNodes: MenuNode[],
  slugPrams: string[] | undefined,
  donhang: Donhang | undefined,
): ChildNodes => {
  let childNodes: ChildNodes = [];

  // if customer appear => show all price tables
  if (!slugPrams) {
    childNodes = menuNodes
      .filter((n) => n.pos && n.pos % 10000 === 0)
      .reduce((p, c) => [...p, ...c.child_nodes], [] as ChildNodes);
  } else {
    const slug = slugPrams.at(-1);
    childNodes = menuNodes.find((x) => x.slug === slug)?.child_nodes ?? [];
  }
  const childNodesFiltered = filterDonHang(childNodes, donhang);

  return childNodesFiltered;
};

export const getChildNodes = (
  menuNodes: MenuNode[],
  slugPrams: string[] | undefined,
  customer?: Customer,
): ChildNodes => {
  let childNodes: ChildNodes = [];

  // if customer appear => show all price tables
  if (!slugPrams) {
    childNodes = menuNodes
      .filter((n) => n.pos && n.pos % 10000 === 0)
      .reduce((p, c) => [...p, ...c.child_nodes], [] as ChildNodes);
  } else {
    const slug = slugPrams.at(-1);
    childNodes = menuNodes.find((x) => x.slug === slug)?.child_nodes ?? [];
  }
  const childNodesFiltered = filterLeafNodes(childNodes, customer?.products);

  return childNodesFiltered;
};
