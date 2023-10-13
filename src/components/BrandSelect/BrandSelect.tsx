import { useGetAllBrand } from "@/api/masterData/hooks/brand/useGetAllBrand";
import { ReactElement, useState } from "react";
import { Image, Select, Selection, SelectItem } from "@nextui-org/react";
import { Brand } from "@/api/masterData/models";

export function BrandSelect(): ReactElement {
  const { data } = useGetAllBrand();

  const [values, setValues] = useState<Selection | "all">(new Set([]));

  return data !== undefined ? (
    <Select<Brand>
      color={"primary"}
      label={"Nhãn hiệu"}
      items={data}
      selectionMode={"multiple"}
      selectedKeys={values}
      isMultiline={true}
      labelPlacement={"inside"}
      onSelectionChange={(keys: Selection) => setValues(keys)}
    >
      {data?.map((brand: Brand) => (
        <SelectItem key={brand.id} value={brand.id} textValue={brand.name}>
          <div className="flex gap-1">
            <Image
              src={brand.imageUrl}
              alt={"Select " + brand.id}
              className={"border-sm h-[30px] w-[60px]"}
            />
            <p className={"font-semibold"}>{brand.name}</p>
          </div>
        </SelectItem>
      ))}
    </Select>
  ) : (
    <></>
  );
}
