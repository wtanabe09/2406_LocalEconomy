import { useEffect, useState } from "react";
import { Prefecture } from "./PrefContext";

export const usePrefectures = () => {
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

  return { prefectures, setPrefectures };
}