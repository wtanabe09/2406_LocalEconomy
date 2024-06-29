// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useEffect, useRef, useState } from "react";
// import { usePrefContext } from "../contexts/usePrefContext";

// type chartOptions = {name: string, data: number[]}[];

// export const ChartPopulation = () => {
//   const { prefectures } = usePrefContext(); // 47都道府県の一覧の配列
//   const [title, setTitle] = useState<string|null>(null);
//   const [categories, setCategories] = useState<number[]|null>(null);
//   const [series, setSeries] = useState<chartOptions|null>([]);
//   const [options, setOptions] = useState<Highcharts.Options|null>(null);
//   const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

//   // 1県の人口を取得するメソッド
//   const getPopulation = async (prefCode: number) => {
//     try {
//       const res = await fetch(`/api/population?prefCode=${prefCode}`);
//       if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       const populations = data.populations.result.data; // [{"総人口"}{"年少人口"}{"生産年齢人口"}{"老年人口"}]
//       return populations;
//     } catch(e) {
//       console.error("Error fetching prefectures:", e);
//     }
//   }

//   // 人口の配列を作る
//   let checkedPopulation: chartOptions = [];
//   const setUpPopulation = async (selectOption: number) => {
//     let label = "";
//     let axisCategories: number[] = [];
//     const promises = prefectures.map(async (prefecture) => {
//       if(prefecture.checked == true) {
//         const populations = await getPopulation(prefecture.id); // 1県の人口を取得
//         if(populations) {
//           axisCategories = []
//           let populationData: number[] = []
//           label = populations[selectOption].label;
//           populations[selectOption].data.forEach((d: { year: number, value: number }) => {
//             axisCategories.push(d.year)
//             populationData.push(d.value)
//           });
//           checkedPopulation.push({ name: prefecture.name, data: populationData }); // get data:[label:"総人口", data:[{year, value},{year, value},{year, value}]]
//         }
//       }
//     });
//     await Promise.all(promises);
//     setTitle(label);
//     setCategories(axisCategories);
//     setSeries(checkedPopulation);
//   }

//   useEffect(() => {
//     setUpPopulation(0);
//   }, [prefectures]);

//   useEffect(() => {
//     setOptions({
//       xAxis: {
//         title: { text: "年度" },
//         categories: categories,
//       },
//       yAxis: {
//         title: { text: "人口数" },
//       },
//       title: { text: title },
//       series: series
//     });
//   }, [series]);


//   return (
//     <div>
//       {/* <HighchartsReact
//         highcharts={Highcharts}
//         options={options}
//         ref={chartComponentRef}
//       /> */}
//     </div>
//   );
// }