"use client";

import { useEffect, useState } from "react";

type Prefecture = {
  id: number
  name: string
  checked: boolean
}

export const ListPrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const setupPrefecuters = async () => {
    try {
      const res = await fetch("/api/prefecture");
      if(!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
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

  useEffect(() => {
    console.log(prefectures);
  }, [prefectures]);

  const handleToggle = (id: number) => {
    setPrefectures(
      prefectures.map((prefecture) => {
        console.log(prefecture.checked);
        if (prefecture.id === id) {
          return { ...prefecture, checked: !prefecture.checked }
        } else {
          return prefecture
        }
      })
    )
  }

  return(
    <div>
      <h1>Prefectures</h1>
      { prefectures ? (
          <div className="flex flex-wrap m-5">
            {prefectures.map((prefecture) => (
              <div id={prefecture.id.toString()} key={prefecture.id} className="flex items-center mr-5">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={prefecture.checked}
                    onChange={() => handleToggle(prefecture.id)}
                />
                <p key={prefecture.id}>{prefecture.name}</p>
              </div>
            ))}
          </div>
            
        ) : (
          <p> No prefectures </p>
        )
      }
    </div>
    

  );
}

