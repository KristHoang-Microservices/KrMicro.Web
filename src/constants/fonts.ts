import { NextFont } from "next/dist/compiled/@next/font";
import { Lora, Source_Sans_3 } from "next/font/google";

export const accentFont: NextFont = Lora({
  subsets: ["vietnamese"],
  weight: ["500", "600", "700"],
});

export const customFont: NextFont = Source_Sans_3({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});
