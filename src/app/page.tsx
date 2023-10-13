"use client";
import { SlideShow } from "@/components/SlideShow";
import { slideShowItems } from "@/constants/testData";
import { Image, Skeleton, Spacer } from "@nextui-org/react";
import { Brand } from "@/api/masterData/models";
import { Heading } from "@/components/Heading";
import { ProductVerticalCarousel } from "@/components/Product/VerticalCarousel";
import { useGetAllBrand } from "@/api/masterData/hooks/brand/useGetAllBrand";
import { Link } from "@nextui-org/link";

export default function Home() {
  const { data: brandList, isLoading } = useGetAllBrand();

  return (
    <>
      <SlideShow items={slideShowItems} />
      <Spacer y={4} />
      <section className={"my-8"}>
        <div className={"flex gap-2 justify-between"}>
          <Heading className={"text-2xl mb-3"}>Thương hiệu</Heading>
          <Link href={"/category"}>Xem tất cả</Link>
        </div>
        <div className={"flex flex-col md:flex-row gap-4 w-full"}>
          <div className={"md:w-1/2 w-full relative"}>
            <Image
              src={
                "https://theme.hstatic.net/1000340570/1000964732/14/banner_brand_image_section_01.jpg?v=2783"
              }
              alt={"Brand"}
              height={" h-[300px]"}
              width={"full"}
              className={"rounded-md"}
            />
          </div>

          <div
            className={
              "grid grid-rows-3 grid-cols-3 md:max-w-[50%] max-w-none relative rounded-md gap-2"
            }
          >
            {brandList?.slice(0, 9).map((item: Brand) => (
              <Skeleton
                key={"Brand" + item.id}
                className={"rounded-md"}
                isLoaded={!isLoading}
              >
                <div className={"relative w-full h-full"}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className={"border-1 aspect-2/1"}
                  />
                </div>
              </Skeleton>
            ))}
          </div>
        </div>
      </section>

      <section className={"mb-8"}>
        <div className={"flex gap-2 justify-between"}>
          <Heading className={"text-2xl mb-3"}>Hot Sale</Heading>
          <Link href={"/products"}>Xem tất cả</Link>
        </div>
        <ProductVerticalCarousel />
      </section>

      <section className={"mb-8"}>
        <div className={"flex gap-2 justify-between"}>
          <Heading className={"text-2xl mb-3"}>Hàng mới</Heading>
          <Link href={"/products"}>Xem tất cả</Link>
        </div>
        <ProductVerticalCarousel />
      </section>

      <section className={"mb-8"}>
        <div className={"flex gap-2 justify-between"}>
          <Heading className={"text-2xl mb-3 text-orange-400"}>Ưu đãi</Heading>
          <Link href={"/products"}>Xem tất cả</Link>
        </div>
        <ProductVerticalCarousel />
      </section>
    </>
  );
}
