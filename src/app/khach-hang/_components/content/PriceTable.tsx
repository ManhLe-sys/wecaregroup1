"use client";

import type {
  ColumnDef,
  Row,
  SortingState,
  Table as TableDef,
} from "@tanstack/react-table";
import { Fragment, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Tables } from "~/lib/supabase/types";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/utils";

// import { vndFormatter } from "~/utils/vndFormatter";

export const PriceTable = ({
  data,
  skeleton,
}: {
  material: string;
  data: Tables<"don_hang">[];
  customerProducts: Tables<"don_hang">;
  skeleton?: boolean;
  img: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort_by") ?? "quy_cach";
  const sortOrder = searchParams.get("sort_order") ?? "asc";
  const sorting = useMemo(() => {
    return [{ id: sortBy, desc: sortOrder === "desc" }];
  }, [sortBy, sortOrder]);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const onRowClick = (
    row: Row<Tables<"don_hang">>,
    table: TableDef<Tables<"don_hang">>,
  ) => {
    if (!row.getIsExpanded()) {
      table.resetExpanded();
    }
    row.getToggleExpandedHandler()();
  };
  const columns: ColumnDef<Tables<"don_hang">>[] = [
    {
      header: "Mã đơn hàng",
      accessorKey: "ma_don_hang",
      cell: ({ getValue }) => getValue() || "Đang c.nhật",
    },
    {
      header: "Đơn hàng",
      accessorKey: "ma_don_hang",
      cell: ({ getValue }) => getValue() || "Đang c.nhật",
    },
    {
      header: "nhân viên sale",
      accessorKey: "nhan_vien_sale",
      cell: ({ getValue }) => getValue() || "Khác",
      enableSorting: false,
    },
    {
      header: "ghi chú",
      accessorKey: "ghi_chu",
      cell: ({ getValue }) => getValue() || "Đang c.nhật",
    },
    {
      header: "Tổng tiền",
      accessorKey: "tong_tien_khong_VAT",
      cell: ({ getValue }) => getValue() || "Đang c.nhật",
    },
  ];

  const table = useReactTable<Tables<"don_hang">>({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (
      old: SortingState | ((old: SortingState) => SortingState),
    ) => {
      let s = null;
      if (typeof old === "function") {
        s = old(sorting);
      } else {
        s = old;
      }
      if (s[0]!.id !== sorting[0]!.id || s[0]!.desc !== sorting[0]!.desc) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (s.length > 0) {
          newSearchParams.set("sort_by", s[0]!.id);
          newSearchParams.set("sort_order", s[0]!.desc ? "desc" : "asc");
          // router.replace(pathname + "?" + newSearchParams.toString());
          // change url searchParams without refresh
          window.history.replaceState(
            null,
            "",
            pathname + "?" + newSearchParams.toString(),
          );
        } else {
          newSearchParams.delete("sort_by");
          newSearchParams.delete("sort_order");
        }
      }
    },
    enableSortingRemoval: false,
    state: {
      pagination,
      sorting,
    },
  });

  return (
    <div className="mt-4 py-2">
      <div className=" border-b">
        {/* <div className="pl-2 text-base font-semibold">
          {!skeleton && (
            <>
              <div className="flex">
                <span className="text-gray-500">Chất liệu:&nbsp;</span>
                {material && material !== "unknown" ? (
                  <span>{material}</span>
                ) : (
                  <span>Khác</span>
                )}
              </div>
            </>
          )}
        </div> */}
        <Table>
          <colgroup>
            <col width={130} />
            <col width={270} />
            <col width={130} className="table-cell sm:hidden" />
            <col width={130} />
            <col width={160} />
          </colgroup>
          {!skeleton ? (
            <>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className={cn(
                            "p-2 pl-1 pr-0",
                            header.column.id === "chat_lieu" &&
                              "hidden sm:table-cell",
                            header.column.getCanSort() && "cursor-pointer",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={cn(
                                "flex items-center gap-1",
                                header.column.id === "gia" && "justify-end",
                              )}
                            >
                              <span>
                                {{
                                  asc: "🔼",
                                  desc: "🔽",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </span>

                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </span>
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <TableRow
                        onClick={() => {
                          onRowClick(row, table);
                        }}
                        className={cn(
                          row.getIsExpanded() ? "border-l border-r" : "",
                        )}
                      >
                        {/* first row is a normal row */}
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <TableCell
                              key={cell.id}
                              // className="p-2 text-[13px]"
                              className={cn(
                                "p-2 text-[13px]",
                                cell.column.id === "chat_lieu" &&
                                  "hidden sm:table-cell",
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow className="bg-gray-100">
                          {/* 2nd row is a custom 1 cell row */}
                          {/* <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="border-b border-l border-r px-2 text-[13px]"
                          >
                            {renderSubComponent({
                              row,
                              img,
                              customerProducts,
                            })}
                          </TableCell> */}
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </>
          ) : (
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="py-2 pl-2 pr-0">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="table-cell p-2 px-0 lg:hidden">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden  p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden  p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="hidden p-2 lg:table-cell">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="px-0 py-2 text-end">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell className="py-2 pl-1">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>

        {data.length > 10 && pagination.pageSize === 10 && (
          <div className="p-1.5 text-center">
            <button
              className="rounded-2xl border border-blue-600 px-6 py-1 text-xs text-blue-600 hover:bg-blue-50"
              onClick={() => {
                table.setPageSize(data.length);
              }}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// const renderSubComponent = ({
//   row,
//   img,
//   // customerProducts,
// }: {
//   row: Row<Tables<"don_hang">>;
//   img: string;
//   customerProducts: Tables<"don_hang">;
// }) => {
//   const record = row.original;
//   return (
//     <div className="items-center justify-between lg:flex">
//       <div>
//         <div className="flex">
//           <Image
//             loading="lazy"
//             src={img}
//             className="aspect-square shrink-0"
//             alt={img}
//             width={100}
//             height={100}
//           />
//           <div className="pl-2">
//             <div className="mb-2 text-[15px] font-semibold">
//               {record.ma_don_hang || "Đang c.nhật"}
//             </div>
//             <div className="mb-1 flex text-[13px] font-normal">
//               <p className="w-24 font-normal text-gray-400">
//                 Khách hàng:&nbsp;
//               </p>
//               {record.khach_hang || "Đang c.nhật"}
//             </div>
//             <div className=" mb-1 flex text-[13px] font-normal">
//               <p className="w-24 font-normal text-gray-400">
//                 nhân viên sale:&nbsp;
//               </p>
//               {record.nhan_vien_sane || "Đang c.nhật"}
//             </div>
//             <div className="mb-1 flex text-[13px] font-normal">
//               <p className="w-24 font-normal text-gray-400">ghi chú:&nbsp;</p>
//               {record.ghi_chu || "Khác"}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-1 pt-4 lg:pt-0">
//         <span>Số lượng:</span>
//         <TextField placeholder="0" type="number" className="!w-20" />
//         <Button className="ml-auto bg-sky-800" size="sm">
//           Thêm vào giỏ hàng
//         </Button>
//       </div>
//     </div>
//   );
// };

// const privatePrice = (
//   record: Tables<"don_hang">,
//   customerProducts: Tables<"don_hang">,
// ) => {
//   const price =
//     customerProducts?.find((x) => x.id === record.id)?.gia ?? record.gia;

//   return (
//     <div className="text-end text-sm font-medium">
//       {price ? vndFormatter.format(price) : "Đang c.nhật"}
//       {record.ma_don_hang ? "/" + record.ma_don_hang : ""}
//     </div>
//   );
// };
