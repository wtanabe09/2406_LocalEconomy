"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { usePrefContext } from "../contexts/usePrefContext";

export const ListPrefecture = () => {
  const { prefectures, setPrefectures } = usePrefContext();
  const [graphType, setGraphType] = useState<number|null>(0);
  const [categories, setCategories] = useState<string[]|undefined>(undefined);
  const [title, setTitle] = useState<string|undefined>(undefined);
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]|undefined>([]);
  const [options, setOptions] = useState<Highcharts.Options|undefined>(undefined);
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
      let axisCategories: string[] = [];
      let populationData: number[] = [];
      setTitle(populations[selectedOption].label);

      populations[selectedOption].data.forEach((d: { year: string, value: number }) => {
        axisCategories.push(d.year);
        populationData.push(d.value);
      });

      setCategories(axisCategories);
      setSeries((series) => [...series!, { name: prefName, data: populationData } as Highcharts.SeriesOptionsType]);
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

    // checkされたprefecturesを下にseriesを作成
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

  const handleButton = (type: number) => {
    setGraphType(type);
  }

  useEffect(() => {
    setSeries([]);
    prefectures.forEach(async (prefecture) => {
      if (prefecture.checked) {
        const populations = await getPopulation(prefecture.id);
        setGraphData(populations, graphType!, prefecture.name);
      } else {
        setSeries((prevSeries) =>
          prevSeries!.filter((serie) => serie.name !== prefecture?.name)
        );
      }
    });
  }, [graphType]);

  useEffect(() => {
    setOptions({
      xAxis: {
        title: { text: "年度" },
        categories: categories,
      } as Highcharts.XAxisOptions,
      yAxis: {
        title: { text: "人口数" },
      },
      title: { text: title },
      series: series
    });
  }, [series, title]);

  return(
    <div>
      <h1>Prefectures</h1>
      { prefectures ? (
          <div className="flex flex-wrap m-5">
            {prefectures.map(prefecture => (
              <label id={prefecture.id.toString()} key={prefecture.id} className="flex items-center mr-5">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={prefecture.checked}
                  onChange={() => handleToggle(prefecture.id)}
                  data-testid={`checkbox-${prefecture.name}`}
                />
                <p key={prefecture.id}>{prefecture.name}</p>
              </label>
            ))}
          </div>
            
        ) : (
          <p> No prefectures </p>
        )
      }
      <h1>Graph</h1>
      <button key={0} onClick={() => handleButton(0)}>総人口</button>
      <button key={1} onClick={() => handleButton(1)}>年少人口</button>
      <button key={2} onClick={() => handleButton(2)}>生産年齢人口</button>
      <button key={3} onClick={() => handleButton(3)}>老年人口</button>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
    

  );
}