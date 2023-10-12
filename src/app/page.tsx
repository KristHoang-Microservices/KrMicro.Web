"use client";
import { SlideShow } from "@/components/SlideShow";
import { slideShowItems } from "@/constants/testData";
import { Image, Spacer } from "@nextui-org/react";
import { Brand } from "@/api/masterData/models";
import { Heading } from "@/components/Heading";
import { ProductVerticalCarousel } from "@/components/Product/VerticalCarousel";
import { useGetAllBrand } from "@/api/masterData/hooks/brand/useGetAllBrand";

export default function Home() {
  const { data: brandList } = useGetAllBrand();

  return (
    <>
      <SlideShow items={slideShowItems} />
      <Spacer y={4} />
      <section className={"mt-4"}>
        <Heading className={"text-2xl mb-2"}>Thương hiệu</Heading>
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
              "grid grid-rows-3 grid-cols-3 md:max-w-[50%] max-w-none relative rounded-md"
            }
          >
            {brandList?.slice(0, 9).map((item: Brand) => (
              <div key={"Brand" + item.id} className={"relative w-full h-full"}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className={"border-1 aspect-2/1"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={"mt-4"}>
        <Heading className={"text-2xl mb-2"}>Hot Sale</Heading>
        <ProductVerticalCarousel />
      </section>

      <section className={"mt-4"}>
        <Heading className={"text-2xl mb-2"}>Hàng mới</Heading>
        <ProductVerticalCarousel />
      </section>

      <section className={"mt-4"}>
        <Heading className={"text-2xl mb-2 text-orange-400"}>Ưu đãi</Heading>
        <ProductVerticalCarousel />
      </section>
    </>
  );
}
