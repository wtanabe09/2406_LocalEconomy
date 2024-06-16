import { usePrefContext } from "../contexts/usePrefContext";

export const Children = () => {
  const { prefectures } = usePrefContext();
  console.log(prefectures);
  return <div>北海道 checked?: {prefectures[0]?.checked.toString()}</div>
}