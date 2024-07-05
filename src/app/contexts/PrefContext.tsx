
"use client";

import React, { ReactNode, useEffect, useState } from "react"
import { createContext } from "react"

type Prefecture = {
  id: number
  name: string
  checked: boolean
}

type Prefectures = {
  prefectures: Prefecture[];
  setPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
}

export const PrefContext = createContext<Prefectures | undefined>(undefined);

type Props = {
  children: React.ReactNode
}

export const PrefProvider = ({children}: Props) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const setupPrefecuters = async () => {
    try {
      const res = await fetch("/api/prefecture");
      if(!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); }
      const data = await res.json();
      const results = data.prefectures.result; // []

      setPrefectures(
        results.map((result: { prefCode: number, prefName: string }) => (
          { id: result.prefCode, name: result.prefName, checked: false }
        ))
      );
    } catch(e) {
      console.error("Error fetching prefectures:", e);
    }
  }

  useEffect(() => {
    setupPrefecuters();
  }, []);

  return (
    <PrefContext.Provider value={{prefectures, setPrefectures}}>
     {children}
    </PrefContext.Provider>
  );
}