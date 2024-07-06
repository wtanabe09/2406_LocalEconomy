"use client"
import { createContext } from "react"
import { usePrefectures } from "./usePrefectures"

export type Prefecture = {
  id: number
  name: string
  checked: boolean
}

export type Population = { label: string; data: [] }

type Prefectures = {
  prefectures: Prefecture[];
  setPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
}
export const PrefContext = createContext<Prefectures | undefined>(undefined);



type Props = {
  children: React.ReactNode
}

export const PrefProvider = ({children}: Props) => {
  const { prefectures, setPrefectures } = usePrefectures();

  return (
    <PrefContext.Provider value={{ prefectures, setPrefectures }}>
     {children}
    </PrefContext.Provider>
  );
}