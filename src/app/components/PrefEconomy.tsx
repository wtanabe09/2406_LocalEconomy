"use client";

import { PrefProvider } from "../contexts/PrefecturesContext";
import { usePrefContext } from "../contexts/usePrefContext";
import { ListPrefecture } from "./ListPrefecture"

export const PrefEconomy = () => {
  return(
    <div>
      <PrefProvider>
        <ListPrefecture />
      </PrefProvider>
    </div>
  )
}