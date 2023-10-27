"use client";
import { ReactElement, useState } from "react";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { useGetDetailProduct } from "@/api/masterData/hooks/product/useGetDetailProduct";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { ProductVerticalCarousel } from "@/components/Product/VerticalCarousel";

interface PageProps {
  params: {
    id: number;
  };
}

export default function ProductDetailPage({ params }: PageProps): ReactElement {
  const router = useRouter();
  const { data, isLoading } = useGetDetailProduct({ id: params.id });

  const [sizeSelected, setSize] = useState<number>(0);

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <div className={"md:hidden block"}>
          <div className={"flex gap-2 justify-between items-center mb-6"}>
            <Button
              variant={"bordered"}
              className={"rounded-full"}
              onPress={() => router.back()}
            >
              Trở lại
            </Button>
            <Heading>Nước hoa {data?.category.name}</Heading>
          </div>
          <Heading className={""}>{data?.brand.name}</Heading>
          <Heading className={"mb-6 text-5xl w-2/3"}>{data?.name}</Heading>
        </div>
        <div
          className={
            "min-h-screen flex flex-col-reverse md:flex-row gap-2 md:gap-12"
          }
        >
          <div className={"w-full md:w-3/4"}>
            <div className={"hidden md:block"}>
              <div className={"flex gap-2 justify-between items-center mb-6"}>
                <Button
                  variant={"bordered"}
                  className={"rounded-full"}
                  onPress={() => router.back()}
                >
                  Trở lại
                </Button>
                <Heading>Nước hoa {data?.category.name}</Heading>
              </div>
              <Heading className={""}>{data?.brand.name}</Heading>
              <Heading className={"mb-6 text-5xl w-2/3"}>{data?.name}</Heading>
            </div>
            <Heading>Mô tả</Heading>
            <p className={"text-justify text-default-500 mb-6"}>
              {data?.description}
            </p>
            <Heading>Nhóm hương</Heading>
            <div className={"flex flex-wrap gap-1 mt-1"}>
              {data?.fragranceDescription
                .split(",")
                .map((des: string, index) => (
                  <Chip key={index} variant={"bordered"}>
                    {des}
                  </Chip>
                ))}
            </div>
            <Heading className={"mt-6"}>Phong cách</Heading>
            <div className={"flex flex-wrap gap-1 mt-1"}>
              {data?.style.split(",").map((des: string, index) => (
                <Chip key={index} variant={"bordered"}>
                  {des}
                </Chip>
              ))}
            </div>
            <Heading className={"mt-6"}>Kích thước</Heading>
            <div className={"flex flex-wrap gap-1 mt-1"}>
              {["10ml", "50ml", "100ml"].map((des: string, index: number) => (
                <Chip
                  key={index}
                  variant={"bordered"}
                  color={"primary"}
                  onClick={() => setSize(index)}
                  className={`cursor-pointer transition-all  + ${
                    sizeSelected === index ? "bg-primary text-white" : ""
                  }`}
                  size={"lg"}
                >
                  {des}
                </Chip>
              ))}
            </div>
            <div
              className={
                "flex gap-4 flex-col items-start md:items-end md:flex-row justify-between"
              }
            >
              <div>
                <p className={"mt-6 text-default-400 line-through"}>
                  {(data?.price ?? 500_000 - 10_000).toLocaleString()} đ
                </p>
                <Heading className={"text-7xl text-accent"}>
                  {(data?.price ?? 500_000 - 10_000).toLocaleString()} đ
                </Heading>
              </div>
              <div className={"flex gap-2 "}>
                <Button
                  variant={"bordered"}
                  color={"primary"}
                  size={"lg"}
                  className={"text-md"}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  variant={"solid"}
                  color={"primary"}
                  size={"lg"}
                  className={"text-white text-md"}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={
                "w-full aspect-square relative overflow-hidden rounded-xl"
              }
            >
              <Image
                src={data?.imageUrls}
                alt={data?.name}
                className={
                  "w-full aspect-square hover:scale-110 cursor-zoom-in"
                }
              />
              <div className={"absolute z-10 right-2 top-2"}>
                <div
                  className={
                    "bg-accent-GLASS rounded-full p-3 flex gap-2 flex-wrap"
                  }
                >
                  <Chip variant={"solid"} className={"bg-white"}>
                    <b>Năm</b> {data?.releaseYear}
                  </Chip>
                  <Chip variant={"solid"} className={"bg-white"}>
                    <b>Xuất sứ</b> {data?.importFrom}
                  </Chip>
                </div>
              </div>
              <div className={"absolute z-10 left-2 bottom-2"}>
                <div
                  className={
                    "bg-accent-GLASS rounded-full p-3 flex gap-2 flex-wrap"
                  }
                >
                  <Chip variant={"solid"} className={"bg-white"}>
                    <b>Size</b> 10ml | 50ml | 100ml
                  </Chip>
                  <Chip variant={"solid"} className={"bg-white"}>
                    <b>SL Kho</b> 100 | 50 | 123
                  </Chip>
                  <Chip variant={"solid"} className={"bg-white"}>
                    <b className={"text-green-600"}>Đã bán</b> 32056
                  </Chip>
                </div>
              </div>
            </div>

            <div
              className={
                "mt-2 p-4 border-2 border-amber-500 rounded-xl flex gap-2 flex-wrap"
              }
            >
              <b>🎉🎉🎉 Khuyến mãi</b>
              <p>50% Tất cả các sản phẩm của Chanel</p>
            </div>
          </div>
        </div>
      </Skeleton>
      <section className={"my-8"}>
        <div className={"flex gap-2 justify-between"}>
          <Heading className={"text-2xl mb-3"}>Sản phẩm liên quan</Heading>
          <Link href={"/products"}>Xem tất cả</Link>
        </div>
        <ProductVerticalCarousel />
      </section>
    </>
  );
}
