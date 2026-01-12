import { WeaponLayout } from "./component/WeaponLayout";
import { getWeapons } from "./fetch/getWeapons";

export default async function Page() {
  const weapons = await getWeapons();

  return (
    <main className="overflow-hidden h-screen bg-zinc-900 flex items-center justify-center">
      <WeaponLayout weapons={weapons} />;
    </main>
  );
}
