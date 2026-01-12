import { ItemFrame } from "@/app/component/ItemFrame";
import { Weapon } from "@/app/types/valorant";

import Image from "next/image";

export function WeaponFrame({
  weapon,
  status,
}: {
  weapon: Weapon;
  status?: "selected" | "excluded";
}) {
  return (
    <ItemFrame
      status={status}
      className={
        weapon.category === "EEquippableCategory::Sidearm" ? "h-28" : "h-32"
      }
    >
      <Image
        className={`${weapon.category === "EEquippableCategory::Sidearm" ? "h-12" : "h-16"} w-fit`}
        alt={weapon.name}
        src={weapon.img}
        width={256}
        height={128}
        loading="eager"
        draggable={false}
      />
    </ItemFrame>
  );
}
