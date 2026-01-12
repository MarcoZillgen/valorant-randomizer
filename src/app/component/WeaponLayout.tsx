"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Weapon } from "@/app/types/valorant";
import { WeaponFrame } from "./WeaponFrame";

export function WeaponLayout({ weapons }: { weapons: Record<string, Weapon> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = useCallback((currentDelay: number, pool: string[]) => {
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    setSelected(randomPick);

    if (currentDelay > 500) {
      setIsSpinning(false);
      return;
    }

    const nextDelay = currentDelay * 1.1;

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

  const getStatus = (name: string) => {
    if (excluded.includes(name)) return "excluded";
    if (selected === name) return "selected";
    return undefined;
  };

  const columnClass = "flex flex-col gap-2 w-72 shrink-0";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 p-8 overflow-x-auto">
      <div className="flex gap-6">
        <div className={columnClass}>
          <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
            Sidearms
          </h2>
          <div className="flex flex-col gap-2">
            {["Classic", "Shorty", "Frenzy", "Ghost", "Bandit", "Sheriff"].map(
              (name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              SMGs
            </h2>
            <div className="flex flex-col gap-2">
              {["Stinger", "Spectre"].map((name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              Shotguns
            </h2>
            <div className="flex flex-col gap-2">
              {["Bucky", "Judge"].map((name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              Rifles
            </h2>
            <div className="flex flex-col gap-2">
              {["Bulldog", "Guardian", "Phantom", "Vandal"].map((name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              Melee
            </h2>
            <div className="flex flex-col gap-2">
              <div
                onClick={() => toggleWeapon("Melee")}
                className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
              >
                <WeaponFrame
                  weapon={weapons["Melee"]}
                  status={getStatus("Melee")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              Snipers
            </h2>
            <div className="flex flex-col gap-2">
              {["Marshal", "Outlaw", "Operator"].map((name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={columnClass}>
            <h2 className="text-white text-center text-lg font-bold uppercase tracking-wider">
              Machine Guns
            </h2>
            <div className="flex flex-col gap-2">
              {["Ares", "Odin"].map((name) => (
                <div
                  key={name}
                  onClick={() => toggleWeapon(name)}
                  className={isSpinning ? "cursor-not-allowed opacity-80" : ""}
                >
                  <WeaponFrame
                    weapon={weapons[name]}
                    status={getStatus(name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
