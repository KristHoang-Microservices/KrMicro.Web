import React, { Key, ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetCityList } from "@/api/address/hooks";
import { City } from "@/api/address/models";

interface CitySelectProps {
  onSelected: (cityId: number) => void;
}

export function CitySelect({ onSelected }: CitySelectProps): ReactElement {
  const { data } = useGetCityList();

  const [value, setValue] = useState<string | number | null>(null);

  return data !== undefined ? (
    <Autocomplete<City>
      label={"Tỉnh / Thành phố"}
      defaultItems={data}
      labelPlacement={"outside"}
      placeholder={"Chọn tỉnh / thành phố"}
      size={"md"}
      selectedKey={value}
      onSelectionChange={(val: Key) => {
        setValue(val.valueOf() as number);
        onSelected(val.valueOf() as number);
      }}
    >
      {(city: City) => (
        <AutocompleteItem key={city.code}>{city.name}</AutocompleteItem>
      )}
    </Autocomplete>
  ) : (
    <></>
  );
}
