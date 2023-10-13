"use client";
import { Product } from "@/api/masterData/models/product.model";
import { Carousel } from "@/components/Carousel";
import React from "react";
import { ProductVerticalItem } from "@/components/Product/VerticalCarousel/ProductVerticalItem";
import { useGetAllProduct } from "@/api/masterData/hooks/product/useGetAllProduct";

export interface ProductVerticalCarouselProps {
  renderMode?: "relative" | "hot" | "sale";
}

export function ProductVerticalCarousel({
  renderMode,
}: ProductVerticalCarouselProps) {
  const { data, isLoading } = useGetAllProduct();

  return (
    <Carousel<Product>
      items={data ?? []}
      isLoading={isLoading}
      renderItems={(item: Product, index: number, isLoading: boolean) => (
        <ProductVerticalItem
          product={item}
          isLoading={isLoading}
          key={"ProductCarousel" + item.id + +" " + index}
        />
      )}
    />
  );
}
