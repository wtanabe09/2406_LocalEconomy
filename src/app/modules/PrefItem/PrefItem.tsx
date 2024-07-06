import { Prefecture } from "../../contexts/PrefContext";
import styles from "./item.module.css";

type Props = {
  prefecture: Prefecture,
  handleToggle: (id: number) => Promise<void>,
}

export const PrefItem = ({ prefecture, handleToggle }: Props) => {

  return (
    <label id={prefecture.id.toString()} key={prefecture.id} className={styles.prefItem}>
      <input
        type="checkbox"
        checked={prefecture.checked}
        onChange={() => handleToggle(prefecture.id)}
      />
      <p key={prefecture.id}>{prefecture.name}</p>
    </label>
  );
}