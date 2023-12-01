import React, { Key, ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetDistrictDetail } from "@/api/address/hooks";
import { Ward } from "@/api/address/models";

interface WardSelectProps {
  onSelected: (wardId?: number) => void;
  defaultValue?: number;
  districtId?: number;
}

export function WardSelect({
  onSelected,
  defaultValue,
  districtId,
}: WardSelectProps): ReactElement {
  const { data } = useGetDistrictDetail({ code: districtId ?? -1 });
  const [value, setValue] = useState<string | number | null | undefined>(
    defaultValue,
  );
  return (
    <Autocomplete<Ward>
      label={"Phường / Xã"}
      defaultItems={data?.wards ?? []}
      labelPlacement={"outside"}
      placeholder={"Chọn phường / xã"}
      size={"md"}
      selectedKey={value}
      isDisabled={districtId == undefined}
      onSelectionChange={(val?: Key) => {
        setValue((val?.valueOf() as number) ?? undefined);
        onSelected((val?.valueOf() as number) ?? undefined);
      }}
    >
      {(district: Ward) => (
        <AutocompleteItem key={district.code}>{district.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
