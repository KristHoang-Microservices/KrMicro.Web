import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Product } from "@/api/masterData/models/product.model";
import { BrandSelect } from "@/components/BrandSelect";
import { CategorySelect } from "@/components/CategorySelect";

interface FormProps {
  register: UseFormRegister<Product>;
  setValue: UseFormSetValue<Product>;
  control: Control<Product>;
}
export function ProductFilterForm({ register, setValue, control }: FormProps) {
  return (
    <form>
      <fieldset className={"mt-2"}>
        <BrandSelect />
      </fieldset>
      <fieldset className={"mt-2"}>
        <CategorySelect />
      </fieldset>
    </form>
  );
}
