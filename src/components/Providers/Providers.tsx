"use client";

import { ReactElement } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SWRConfig } from "swr";
import { StoreProvider } from "@/store";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactElement;
}

export function Providers({ children }: Props): ReactElement {
  return (
    <StoreProvider>
      <SWRConfig
        value={{
          shouldRetryOnError: true,
        }}
      >
        <NextUIProvider>
          {children}
          <Toaster position={"bottom-right"} />
        </NextUIProvider>
      </SWRConfig>
    </StoreProvider>
  );
}
