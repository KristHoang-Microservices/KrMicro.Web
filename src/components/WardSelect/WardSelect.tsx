import React, { Key, ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetDistrictDetail } from "@/api/address/hooks";
import { Ward } from "@/api/address/models";

interface WardSelectProps {
  onSelected: (wardId: number) => void;
  districtId?: number;
}

export function WardSelect({
  onSelected,
  districtId,
}: WardSelectProps): ReactElement {
  const { data } = useGetDistrictDetail({ code: districtId ?? -1 });
  const [value, setValue] = useState<string | number | null>(null);

  return (
    <Autocomplete<Ward>
      label={"Xã / Thị trấn"}
      defaultItems={data?.wards ?? []}
      labelPlacement={"outside"}
      placeholder={"Chọn xã / thị trấn"}
      size={"md"}
      selectedKey={value}
      isDisabled={districtId == undefined}
      onSelectionChange={(val: Key) => {
        setValue(val.valueOf() as number);
        onSelected(val.valueOf() as number);
      }}
    >
      {(district: Ward) => (
        <AutocompleteItem key={district.code}>{district.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
