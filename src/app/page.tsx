import { PrefProvider } from "./contexts/PrefContext";
import { PrefEconomy } from "./layouts/PrefEconomy";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <PrefProvider>
        <PrefEconomy />
      </PrefProvider>
    </main>
  );
}
