import { ReactElement } from "react";
import { useGetAllProduct } from "@/api/masterData/hooks/product";
import { Product } from "@/api/masterData/models";
import { ProductVerticalItem } from "@/components/Product/VerticalCarousel/ProductVerticalItem";
import { Spinner } from "@nextui-org/react";

export function ProductGrid(): ReactElement {
  //Todo: Create a filter and searching route
  const { data, isLoading } = useGetAllProduct();
  return (
    <>
      <div
        className={`${
          isLoading ? "" : "hidden"
        } flex justify-center items-center w-full h-screen`}
      >
        <Spinner size={"lg"}></Spinner>
      </div>
      <div
        className={
          "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 w-full md:gap-6 gap-2"
        }
      >
        {data?.map((item: Product) => (
          <ProductVerticalItem
            key={item.id}
            product={item}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
}
