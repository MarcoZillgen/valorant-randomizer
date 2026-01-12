import { Weapon, WeaponName } from "@/app/types/valorant";

export async function getWeapons(): Promise<Record<WeaponName, Weapon>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weapons`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch weapons");
  }

  return res.json();
}
