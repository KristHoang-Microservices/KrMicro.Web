"use client";
import { Product } from "@/api/masterData/models/product.model";
import { Carousel } from "@/components/Carousel";
import React from "react";
import { ProductVerticalCarouselItem } from "@/components/Product/VerticalCarousel/ProductVerticalCarouselItem";
import { useGetAllProduct } from "@/api/masterData/hooks/product/useGetAllProduct";

export interface ProductVerticalCarouselProps {
  renderMode?: "relative" | "hot" | "sale";
}

export function ProductVerticalCarousel({
  renderMode,
}: ProductVerticalCarouselProps) {
  const { data } = useGetAllProduct();

  return (
    <Carousel<Product>
      items={data ?? []}
      renderItems={(item: Product, index: number) => (
        <ProductVerticalCarouselItem
          {...item}
          key={"ProductCarousel" + item.id + +" " + index}
        />
      )}
    />
  );
}
