import { Weapon, WeaponName } from "@/app/types/valorant";

export async function getWeapons(): Promise<Record<WeaponName, Weapon>> {
  const res = await fetch("https://valorant-api.com/v1/weapons", {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw Error("val api error");
  }

  const json = await res.json();

  const minimal = json.data
    .map((w: any) => {
      if (!isWeaponLike(w)) {
        console.warn("Skipping invalid weapon", w);
        return;
      }
      return {
        uuid: w.uuid,
        name: w.displayName,
        category: w.category,
        cost: w.shopData?.cost ?? null,
        img: w.displayIcon,
      } as Weapon;
    })
    .filter((w: Weapon | undefined): w is Weapon => w !== undefined);

  const data = {} as Record<string, Weapon>;

  minimal.forEach((w: Weapon) => {
    data[w.name] = w;
  });

  return data;
}

function isWeaponLike(w: unknown): w is {
  uuid: unknown;
  displayName: unknown;
  category: unknown;
  displayIcon: unknown;
  shopData?: { cost?: unknown };
} {
  return (
    typeof w === "object" &&
    w !== null &&
    "uuid" in w &&
    "displayName" in w &&
    "category" in w &&
    "displayIcon" in w
  );
}
