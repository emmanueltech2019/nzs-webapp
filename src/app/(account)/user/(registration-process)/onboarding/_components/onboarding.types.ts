import React, { ReactNode } from "react";
export type CardItemtype = {
  icon: string
  // headText:
  //   | string
  //   | React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  //   | ReactNode;
  headText: any
  paragraph: string
};
