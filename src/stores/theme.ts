import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEME_TYPES = {
  DARK: "dark",
  LIGHT: "light",
};

export const applyThemePreference = (theme) => {
  const { DARK, LIGHT } = THEME_TYPES;
  const root = window.document.documentElement;
  const isDark = theme === DARK;
  
  root.classList.remove(isDark ? LIGHT : DARK);
  root.classList.add(theme);
};

const useThemeStore = create(
  persist(
    (set) => ({
      theme: THEME_TYPES.DARK,
      setTheme: (theme) => {
        set(() => {
          applyThemePreference(theme);

          return {
            theme,
          }
        })
      },
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;