import { Weapon } from "@/app/types/valorant";

export async function GET() {
  const res = await fetch("https://valorant-api.com/v1/weapons");

  if (!res.ok) {
    return new Response("Failed", { status: 500 });
  }

  const json = await res.json();

  const minimal = json.data.map((w: any) => {
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
  });

  const data = {} as Record<string, Weapon>;

  minimal.forEach((w: Weapon) => {
    data[w.name] = w;
  });

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
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
