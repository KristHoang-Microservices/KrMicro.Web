"use client";
import { ReactElement } from "react";
import { ProductFilter } from "@/components/Product/ProductFilter";
import { Spacer } from "@nextui-org/react";
import { ProductGrid } from "@/components/Product/ProductGrid";

export default function ProductsPage(): ReactElement {
  return (
    <>
      <ProductFilter />
      <Spacer y={10} />
      <ProductGrid />
    </>
  );
}
