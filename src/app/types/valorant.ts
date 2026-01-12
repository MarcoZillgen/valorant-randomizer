export type Weapon = {
  uuid: string;
  name: WeaponName;
  category: WeaponCategory;
  cost: number | null;
  img: string;
};

export type WeaponName = (typeof WeaponNameArray)[number];

const WeaponNameArray = [
  "Odin",
  "Ares",
  "Vandal",
  "Bulldog",
  "Phantom",
  "Judge",
  "Bucky",
  "Frenzy",
  "Classic",
  "Bandit",
  "Ghost",
  "Sheriff",
  "Shorty",
  "Operator",
  "Guardian",
  "Outlaw",
  "Marshal",
  "Spectre",
  "Stinger",
  "Melee",
] as const;

export type WeaponCategory = (typeof WeaponCategoryArray)[number];

const WeaponCategoryArray = [
  "EEquippableCategory::Heavy",
  "EEquippableCategory::Rifle",
  "EEquippableCategory::Shotgun",
  "EEquippableCategory::Sidearm",
  "EEquippableCategory::Sniper",
  "EEquippableCategory::SMG",
  "EEquippableCategory::Melee",
] as const;
