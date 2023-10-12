import { Product } from "@/api/masterData/models/product.model";
import { ReactElement } from "react";
import { Image } from "@nextui-org/react";

export function ProductVerticalCarouselItem(product: Product): ReactElement {
  return (
    <div className={"w-full flex flex-col justify-between min-h-[350px]"}>
      <div>
        <Image
          src={product.imageUrls}
          alt={`${product.id}`}
          className={"rounded-sm"}
        />
        <div className={"p-2"}>
          <p
            className={
              "text-center text-sm font-bold text-ellipsis line-clamp-1"
            }
          >
            {product.brand.name}
          </p>
          <p className={"text-ellipsis text-sm text-center line-clamp-2"}>
            {product.name}
          </p>
        </div>
      </div>
      <div>
        <p className={"my-2 text-sm text-center"}>3 sizes</p>
        <p className={"text-accent font-bold text-center text-sm"}>
          {product.price.toLocaleString()} VND
        </p>
      </div>
    </div>
  );
}
