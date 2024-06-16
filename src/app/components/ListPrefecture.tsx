"use client";

import { usePrefContext } from "../contexts/usePrefContext";



export const ListPrefecture = () => {
  const { prefectures, setPrefectures } = usePrefContext();

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

