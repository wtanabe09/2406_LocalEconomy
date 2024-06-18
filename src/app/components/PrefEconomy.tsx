"use client";

import { PrefProvider } from "../contexts/PrefecturesContext";
import { usePrefContext } from "../contexts/usePrefContext";
import { Children } from "./Children";
import { ListPrefecture } from "./ListPrefecture"

export const PrefEconomy = () => {
  return(
    <div>
      <PrefProvider>
        <ListPrefecture />
        <Children />
      </PrefProvider>
    </div>
  )
}