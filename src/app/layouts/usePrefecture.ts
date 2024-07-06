import Highcharts from "highcharts";
import { useEffect, useState } from "react";
import { Population, Prefecture } from "../contexts/PrefContext";
import { usePrefContext } from "../contexts/usePrefContext";

export const usePrefecture = () => {
  const { prefectures, setPrefectures } = usePrefContext();
  const [graphType, setGraphType] = useState<number|null>(0);
  const [title, setTitle] = useState<string|undefined>(undefined);
  const [categories, setCategories] = useState<string[]|undefined>(undefined);
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]|undefined>([]);
  const [options, setOptions] = useState<Highcharts.Options|undefined>(undefined);
  const [genres, setGenres] = useState<string[]|undefined>(undefined);

  const getPopulation = async (prefCode: number) => {
    const apiUrl = `/api/population?prefCode=${prefCode}`;
    try {
      const res = await fetch(apiUrl);
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const populations = data.populations.result.data; // [{"総人口"}{"年少人口"}{"生産年齢人口"}{"老年人口"}]
      return populations;
    } catch(e) {
      console.error("Error fetching prefectures:", e);
    }
  }

  const setGenreArray = async () => {
    const genres: string[] = [];
    const apiUrl = '/api/population?prefCode=1';
    try {
      const res = await fetch(apiUrl);
      if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const populations = data.populations.result.data; // [{"総人口"}{"年少人口"}{"生産年齢人口"}{"老年人口"}]
      populations.forEach((popu: Population) => {
        genres.push(popu.label);
      });
      setGenres(genres);
    } catch(e) {
      console.error("Error fetching prefectures:", e);
    }
  }

  const setGraphSeries = (populations: [ Population ], selectedOption: number, prefName: string) => {
    if(populations) {
      let populationData: number[] = [];
      populations[selectedOption].data.forEach((d: { year: string, value: number }) => {
        populationData.push(d.value);
      });
      setSeries((series) => [...series!, { name: prefName, data: populationData } as Highcharts.SeriesOptionsType]);
    }
  }

  const setGraphCategories = (populations: [ Population ], selectedOption: number) => {
    let axisCategories: string[] = [];
    populations[selectedOption].data.forEach((d: { year: string, value: number }) => {
      axisCategories.push(d.year);
    });
    setCategories(axisCategories);
  }

  const setGraphData = async (prefectures: Prefecture[], id: number) => {
    const prefecture = prefectures.find((pref) => pref.id === id);
    if (prefecture?.checked) {
      const populations = await getPopulation(id);
      setTitle(populations[graphType!].label);
      setGraphCategories(populations, graphType!);
      setGraphSeries(populations, graphType!, prefecture.name);
    } else {
      setSeries((prevSeries) =>
        prevSeries!.filter((serie) => serie.name !== prefecture?.name)
      );
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
    setGraphData(updatedPrefectures, id);
  }

  const handleButton = (genreNum: number) => {
    setGraphType(genreNum);
  }

  useEffect(() => {
    setSeries([]);
    prefectures.forEach(async (prefecture) => {
      setGraphData(prefectures, prefecture.id);
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
      title: { 
        text: title,
        style: { fontSize: '16px' }
      },
      series: series
    });
  }, [title, categories, series]);

  useEffect(() => {
    setGenreArray();
  }, [])

  
  return { prefectures, options, genres, handleToggle, handleButton };

}