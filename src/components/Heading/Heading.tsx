import { ReactElement, ReactNode } from "react";
import { accentFont } from "@/constants";

export interface HeadingProps {
  children: ReactNode;
  className?: string;
}
export function Heading({ children, className }: HeadingProps): ReactElement {
  return (
    <h1 className={accentFont.className + " font-bold " + className}>
      {children}
    </h1>
  );
}
