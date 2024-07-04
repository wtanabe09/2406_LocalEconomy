import { PrefProvider } from "./contexts/PrefContext";
import { ListPrefecture } from "./prefectures/ListPrefecture";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PrefProvider>
        <ListPrefecture />
      </PrefProvider>
    </main>
  );
}
