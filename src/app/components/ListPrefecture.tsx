"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { usePrefContext } from "../contexts/usePrefContext";

type chartOptions = {name: string, data: number[]}[];
export const ListPrefecture = () => {
  const { prefectures, setPrefectures } = usePrefContext();
  const [graphType, setGraphType] = useState<number|null>(0);
  const [title, setTitle] = useState<string|null>(null);
  const [series, setSeries] = useState<chartOptions|null>([]);
  const [options, setOptions] = useState<Highcharts.Options|null>(null);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const getPopulation = async (prefCode: number) => {
    try {
      const res = await fetch(`/api/population?prefCode=${prefCode}`);
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const populations = data.populations.result.data; // [{"総人口"}{"年少人口"}{"生産年齢人口"}{"老年人口"}]
      return populations;
    } catch(e) {
      console.error("Error fetching prefectures:", e);
    }
  }

  const setGraphData = (populations: [{ label: string, data: [] }], selectedOption: number, prefName: string) => {
    if(populations) {
      let axisCategories = [];
      let populationData: number[] = [];
      console.log(populations[selectedOption].label);
      setTitle(populations[selectedOption].label);

      populations[selectedOption].data.forEach((d: { year: number, value: number }) => {
        axisCategories.push(d.year)
        populationData.push(d.value)
      });

      setSeries([...series!, { name: prefName, data: populationData }]);
    }
  }
  
  const handleToggle = async (id: number) => {
    const updatedPrefectures = prefectures.map((prefecture) => {
      if (prefecture.id === id) {
        return { ...prefecture, checked: !prefecture.checked }
      } else {
        return prefecture
      }
    });
    setPrefectures(updatedPrefectures);

    const prefecture = updatedPrefectures.find((pref) => pref.id === id);
    if (prefecture?.checked) {
      const populations = await getPopulation(id);
      setGraphData(populations, graphType!, prefecture.name);
    } else {
      setSeries((prevSeries) =>
        prevSeries!.filter((serie) => serie.name !== prefecture?.name)
      );
    }
  }

  // const handleButton = () => {
  //   setGraphType(graphType => graphType! + 2);
  //   console.log("button ");
  // }

  useEffect(() => {
    setOptions({
      xAxis: {
        title: { text: "年度" },
        categories: [],
      },
      yAxis: {
        title: { text: "人口数" },
      },
      title: { text: title },
      series: series
    });
  }, [series, title, graphType]);

  return(
    <div>
      <h1>Prefectures</h1>
      { prefectures ? (
          <div className="flex flex-wrap m-5">
            {prefectures.map(prefecture => (
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
      <h1>Graph</h1>
      <button key={1} onClick={handleButton}>Button1</button>
      <button key={2} onClick={handleButton}>Button1</button>
      <button key={3} onClick={handleButton}>Button1</button>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
    

  );
}

