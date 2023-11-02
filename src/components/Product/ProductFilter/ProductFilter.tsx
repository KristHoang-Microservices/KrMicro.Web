"use client";
import { useForm } from "react-hook-form";
import { Product } from "@/api/masterData/models";
import { Button, useDisclosure } from "@nextui-org/react";
import { FilterBar } from "@/components/FilterBar";
import { ProductFilterForm } from "@/components/Product/ProductFilter/ProductFilterForm";

export function ProductFilter() {
  const { control, register, setValue } = useForm<Product>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <FilterBar
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      form={
        <ProductFilterForm
          register={register}
          setValue={setValue}
          control={control}
        />
      }
      submitButton={
        <Button onPress={onClose} color={"primary"}>
          Áp dụng
        </Button>
      }
      name={"Tất cả sản phẩm"}
    />
  );
}
