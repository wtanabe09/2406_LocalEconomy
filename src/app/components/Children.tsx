import { useEffect } from "react";
import { usePrefContext } from "../contexts/usePrefContext";

export const Children = () => {
  const { prefectures } = usePrefContext();
  let clickedPref: object[] = [];

  const getPopulation = async (prefCode: number) => {
    try {
      const res = await fetch(`/api/population?prefCode=${prefCode}`);
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const results = data.populations.result.data; // [{"総人口"}{"年少人口"}{"生産年齢人口"}{"老年人口"}]
      return results
    } catch(e) {
      console.error("Error fetching prefectures:", e);
    }
  }

  const setUpPopulation = () => {
    prefectures.forEach(async (prefecture) => {
      if(prefecture.checked == true) {
        const populations = await getPopulation(prefecture.id);
        clickedPref.push(populations[0].data);
        console.log("populations", clickedPref);
      }
    })
  }
  
  useEffect(() => {
    setUpPopulation();
  });

  return (
    <div>
      {/* {clickedPref.map((pref, index) => (
        <p key={index}>{pref.toString()}</p>
      ))} */}
    </div>
  );
}