"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./iconList";
import { SunIcon } from "./iconList";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
      <Switch
        isSelected={theme === "light" ? false : true}
        onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
        defaultSelected
        size="lg"
        color={'primary'}
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      >
      </Switch>
  );
}
