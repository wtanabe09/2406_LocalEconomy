"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./style.module.css"
import { usePrefecture } from "./usePrefecture";
import { GenreButtons } from "../modules/GenreButtons/GenreButtons";
import { PrefList } from "../modules/PrefList/PrefList";

export const PrefEconomy = () => {
  const { prefectures, options, genres, handleToggle, handleButton } = usePrefecture();
  
  return(
    <div className={styles.container}>
      <h1>Prefectures</h1>
      <PrefList prefectures={prefectures} handleToggle={handleToggle} />
      <h1>Graph</h1>
      <GenreButtons genres={genres!} handleButton={handleButton} />
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>

  );
}
