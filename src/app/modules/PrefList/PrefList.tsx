"use client";

import styles from "./list.module.css"
import { PrefItem } from "../PrefItem/PrefItem";
import { Prefecture } from "../../contexts/PrefContext";

type Props = {
  prefectures: Prefecture[],
  handleToggle: (id: number) => Promise<void>
}
export const PrefList = ({ prefectures, handleToggle }: Props) => {
  
  return(
    <div>
      { prefectures ? (
          <div className={styles.prefList}>
            {prefectures.map( (prefecture, index) => 
              <PrefItem key={index} prefecture={prefecture} handleToggle={handleToggle} />
            )}
          </div>
        ) : ( <p> No prefectures </p> )
      }
    </div>

  );
}
