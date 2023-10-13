"use client";
import { ReactElement, useState } from "react";
import { Select, Selection, SelectItem } from "@nextui-org/react";
import { Category } from "@/api/masterData/models";
import { useGetAllCategory } from "@/api/masterData/hooks/category";

export function CategorySelect(): ReactElement {
  const { data } = useGetAllCategory();

  const [values, setValues] = useState<Selection | "all">(new Set([]));

  return data !== undefined ? (
    <Select<Category>
      color={"primary"}
      label={"Phân loại"}
      items={data}
      selectionMode={"multiple"}
      selectedKeys={values}
      isMultiline={true}
      onSelectionChange={(keys: Selection) => setValues(keys)}
    >
      {data?.map((brand: Category) => (
        <SelectItem key={brand.id} value={brand.id} textValue={brand.name}>
          <div className="flex gap-1">
            <p className={"font-semibold"}>{brand.name}</p>
          </div>
        </SelectItem>
      ))}
    </Select>
  ) : (
    <></>
  );
}
