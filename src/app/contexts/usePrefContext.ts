import { useContext } from "react";
import { PrefContext } from "./PrefContext";

export const usePrefContext = () => {
  const context = useContext(PrefContext);
  if(!context) {
    throw new Error("usePrefContext must be used within a PrefProvider");
  }
  return context;
}