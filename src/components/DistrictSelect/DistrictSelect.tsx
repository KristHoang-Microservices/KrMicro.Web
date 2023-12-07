import React, { Key, ReactElement, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import { useGetCityDetail } from "@/api/address/hooks";
import { District } from "@/api/address/models";

interface DistrictSelectProps extends Partial<AutocompleteProps<District>> {
  onSelected: (districtId?: number) => void;
  defaultValue?: number;
  cityId?: number;
}

export function DistrictSelect({
  onSelected,
  cityId,
  defaultValue,
  ...rest
}: DistrictSelectProps): ReactElement {
  const { data } = useGetCityDetail({ code: cityId ?? -1 });
  const [value, setValue] = useState<string | number | null | undefined>(
    defaultValue ?? null,
  );

  return (
    <Autocomplete<District>
      {...rest}
      label={"Quận / Huyện"}
      defaultItems={data?.districts ?? []}
      labelPlacement={"outside"}
      placeholder={"Chọn quận / huyện"}
      size={"md"}
      selectedKey={value}
      isDisabled={rest.isDisabled || cityId == undefined}
      onSelectionChange={(val?: Key) => {
        setValue((val?.valueOf() as number) ?? undefined);
        onSelected((val?.valueOf() as number) ?? undefined);
      }}
    >
      {(district: District) => (
        <AutocompleteItem key={district.code}>{district.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
