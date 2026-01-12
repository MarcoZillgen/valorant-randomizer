"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Weapon } from "@/app/types/valorant";
import { WeaponFrame } from "./WeaponFrame";

const layoutConfig = [
  [
    {
      title: "Sidearms",
      items: ["Classic", "Shorty", "Frenzy", "Ghost", "Bandit", "Sheriff"],
    },
  ],
  [
    {
      title: "SMGs",
      items: ["Stinger", "Spectre"],
    },
    {
      title: "Shotguns",
      items: ["Bucky", "Judge"],
    },
  ],
  [
    {
      title: "Rifles",
      items: ["Bulldog", "Guardian", "Phantom", "Vandal"],
    },
    {
      title: "Melee",
      items: ["Melee"],
    },
  ],
  [
    {
      title: "Snipers",
      items: ["Marshal", "Outlaw", "Operator"],
    },
    {
      title: "Machine Guns",
      items: ["Ares", "Odin"],
    },
  ],
];

export function WeaponLayout({ weapons }: { weapons: Record<string, Weapon> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = useCallback((currentDelay: number, pool: string[]) => {
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    setSelected(randomPick);

    if (currentDelay > 250) {
      setIsSpinning(false);
      return;
    }

    const nextDelay = currentDelay * 1.2;

    timeoutRef.current = setTimeout(() => {
      spin(nextDelay, pool);
    }, currentDelay);
  }, []);

  const startRandomization = useCallback(() => {
    if (isSpinning) return;

    const pool = Object.keys(weapons).filter(
      (name) => !excluded.includes(name),
    );

    if (pool.length === 0) return;
    if (pool.length === 1) {
      setSelected(pool[0]);
      return;
    }

    setIsSpinning(true);
    spin(50, pool);
  }, [weapons, excluded, isSpinning, spin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        startRandomization();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startRandomization]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleWeapon = (name: string) => {
    if (isSpinning) return;
    setExcluded((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const toggleGroup = (items: string[]) => {
    if (isSpinning) return;

    const allExcluded = items.every((item) => excluded.includes(item));

    if (allExcluded) {
      setExcluded((prev) => prev.filter((item) => !items.includes(item)));
    } else {
      const newExclusions = items.filter((item) => !excluded.includes(item));
      setExcluded((prev) => [...prev, ...newExclusions]);
    }
  };

  const getStatus = (name: string) => {
    if (excluded.includes(name)) return "excluded";
    if (selected === name) return "selected";
    return undefined;
  };

  const columnClass = "flex flex-col gap-2 w-72 shrink-0";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 p-8 overflow-x-auto">
      <div className="flex gap-6">
        {layoutConfig.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-8">
            {column.map((group) => (
              <div key={group.title} className={columnClass}>
                <h2
                  onClick={() => toggleGroup(group.items)}
                  className={`text-white text-center text-lg font-bold uppercase tracking-wider cursor-pointer select-none transition-opacity hover:opacity-80 ${
                    isSpinning ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {group.title}
                </h2>

                <div className="flex flex-col gap-2">
                  {group.items.map((name) => {
                    const weaponData = weapons[name];
                    if (!weaponData) return null;

                    return (
                      <div
                        key={name}
                        onClick={() => toggleWeapon(name)}
                        className={
                          isSpinning ? "cursor-not-allowed opacity-80" : ""
                        }
                      >
                        <WeaponFrame
                          weapon={weaponData}
                          status={getStatus(name)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}