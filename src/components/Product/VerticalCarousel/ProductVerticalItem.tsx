import { Product } from "@/api/masterData/models/product.model";
import { ReactElement } from "react";
import { Image, Skeleton } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

interface Props {
  product: Product;
  isLoading: boolean;
}

export function ProductVerticalItem({
  product,
  isLoading,
}: Props): ReactElement {
  return (
    <Link href={"/products/" + product.id}>
      <div
        className={
          "w-full flex flex-col justify-between min-h-[350px] hover:shadow-xl transition-all p-4 rounded-md cursor-pointer bg-white border-1 hover:border-white"
        }
      >
        <div>
          <Skeleton className={"rounded-sm"} isLoaded={!isLoading}>
            <Image
              src={product.imageUrls}
              alt={`${product.id}`}
              className={"rounded-md bg-white"}
            />
          </Skeleton>
          <div className={"p-2"}>
            <Skeleton className={"rounded-sm"} isLoaded={!isLoading}>
              <p
                className={
                  "text-center text-sm font-bold text-ellipsis line-clamp-1"
                }
              >
                {product.brand.name}
              </p>
            </Skeleton>
            <Skeleton className={"rounded-sm"} isLoaded={!isLoading}>
              <p className={"text-ellipsis text-sm text-center line-clamp-2"}>
                {product.name}
              </p>
            </Skeleton>
          </div>
        </div>
        <div>
          <Skeleton className={"rounded-sm"} isLoaded={!isLoading}>
            <p className={"my-2 text-sm text-center"}>3 sizes</p>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} className={"rounded-sm"}>
            <p className={"text-accent font-bold text-center text-sm"}>
              {product.price.toLocaleString()} VND
            </p>
          </Skeleton>
        </div>
      </div>
    </Link>
  );
}
