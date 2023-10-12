"use client";

import { ReactElement } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface Props {
  children: ReactElement;
}

export function Providers({ children }: Props): ReactElement {
  return <NextUIProvider>{children}</NextUIProvider>;
}
