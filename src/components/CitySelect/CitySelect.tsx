import React, { Key, ReactElement, useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import { useGetCityDetail, useGetCityList } from "@/api/address/hooks";
import { City } from "@/api/address/models";

interface CitySelectProps extends Partial<AutocompleteProps<City>> {
  onSelected: (cityId?: number) => void;
  defaultValue?: number;
}

export function CitySelect({
  onSelected,
  defaultValue,
  ...rest
}: CitySelectProps): ReactElement {
  const { data } = useGetCityList();
  const [value, setValue] = useState<string | number | null | undefined>(
    defaultValue ?? null,
  );
  const [defaultData, setDefault] = useState<{ key: number; name: string }>();
  const { data: defaultCity, isLoading } = useGetCityDetail({
    code: (value as number) ?? -1,
  });
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (defaultCity !== undefined)
      setDefault({
        key: defaultCity?.code,
        name: defaultCity?.name,
      });
    setValue(defaultCity?.code);
  }, [defaultCity]);

  console.log(value);
  return (
    <Autocomplete<City>
      {...rest}
      label={"Tỉnh / Thành phố"}
      defaultItems={data ?? []}
      labelPlacement={"outside"}
      placeholder={"Chọn tỉnh / thành phố"}
      size={"md"}
      defaultSelectedKey={defaultData?.key}
      defaultInputValue={defaultData?.name}
      selectedKey={value}
      onSelectionChange={(val?: Key) => {
        setValue((val?.valueOf() as number) ?? undefined);
        onSelected((val?.valueOf() as number) ?? undefined);
      }}
    >
      {(city: City) => (
        <AutocompleteItem key={city.code}>{city.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
