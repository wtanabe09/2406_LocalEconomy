"use client";

import { ListPrefecture } from "./ListPrefecture"
import { useContext, createContext} from "react";

type ValueContextProps = {
  value: string;
}
const ValueContext = createContext<ValueContextProps>({ value: "" });

export const PrefEconomy = () => {
  const sharedValue = "Hello";
  
  return(
    <div>
      <ValueContext.Provider value={{ value: sharedValue }}>
        <ListPrefecture />
        <Children />
      </ValueContext.Provider>
    </div>
  )
}

export const Children = () => {
  const { value } = useContext(ValueContext);
  return <div>children: {value}</div>
}
