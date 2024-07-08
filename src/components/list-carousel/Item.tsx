"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronRight } from "lucide-react";

import type { MenuItem } from "~/components/categories/mega-menu/type";
import type { Tables } from "~/lib/supabase/types";
import { Image } from "~/components/image";
import { Link } from "~/components/link";
import { CardContent, CardRoot } from "~/components/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const Item = ({
  info,
  data,
  leafCount,
}: {
  info: MenuItem;
  data: NonNullable<Tables<"menu_nodes_matview">["child_nodes"]>;
  leafCount: number;
}) => {
  const searchParams = useSearchParams();
  const currentPath = usePathname();

  return (
    <CardRoot className="mb-4 border-none">
      <CardContent>
        <div className="flex items-end justify-between">
          <Link href={info.href} className="flex items-center">
            <Image alt="" src={info.icon} width={24} height={24} />
            <p className="text-base font-semibold lg:text-lg ">
              &nbsp; {info.title}
            </p>
            <p className="ml-1 text-sm font-normal lg:text-base">
              ({leafCount})
            </p>
          </Link>
          <Link
            href={info.href}
            className="-mr-1 flex items-center text-xs text-blue-600 hover:text-blue-700"
          >
            Xem tất cả
            <ChevronRight />
          </Link>
        </div>

        <div className="mt-1 flex w-full px-4 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              loop: false,
              slidesToScroll: 3,
              breakpoints: {
                "(min-width: 1024px)": {
                  slidesToScroll: 5,
                },
              },
            }}
            className="w-full"
            plugins={[WheelGesturesPlugin()]}
          >
            <CarouselContent>
              {data.map((item) => {
                return (
                  <CarouselItem
                    key={item.slug}
                    className="basis-1/3 lg:basis-1/5"
                  >
                    <Link
                      href={
                        currentPath +
                        "/" +
                        item.parent_slug +
                        "?groups=" +
                        item.slug +
                        (searchParams.get("customer")
                          ? "&customer=" + searchParams.get("customer")
                          : "")
                      }
                      className={cn(
                        "group relative cursor-pointer rounded-md border border-transparent",
                        "flex h-full flex-col items-center px-2",
                      )}
                    >
                      <div className="relative h-24 w-24">
                        <Image
                          loading="lazy"
                          src={item.image_url}
                          className="mt-2 aspect-[1.11] self-center object-cover lg:group-hover:scale-110"
                          alt={"Ảnh đại diện - " + item.name}
                          fill
                          sizes="96px"
                        />
                      </div>
                      <div
                        className={cn(
                          "mb-2 mt-[2px] line-clamp-2 text-center font-semibold lg:mt-2",
                        )}
                      >
                        {item.name}
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {data.length > 0 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      </CardContent>
    </CardRoot>
  );
};
