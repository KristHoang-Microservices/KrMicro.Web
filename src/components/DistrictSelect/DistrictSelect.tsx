import React, { Key, ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetCityDetail } from "@/api/address/hooks";
import { District } from "@/api/address/models";

interface DistrictSelectProps {
  onSelected: (districtId?: number) => void;
  defaultValue?: number;
  cityId?: number;
}

export function DistrictSelect({
  onSelected,
  cityId,
  defaultValue,
}: DistrictSelectProps): ReactElement {
  const { data } = useGetCityDetail({ code: cityId ?? -1 });
  const [value, setValue] = useState<string | number | null | undefined>(
    defaultValue,
  );

  return (
    <Autocomplete<District>
      label={"Quận / Huyện"}
      defaultItems={data?.districts ?? []}
      labelPlacement={"outside"}
      placeholder={"Chọn quận / huyện"}
      size={"md"}
      selectedKey={value}
      isDisabled={cityId == undefined}
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
