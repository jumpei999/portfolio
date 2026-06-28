"use client"

import * as React from "react"

import { THEME_STORAGE_KEY } from "@/lib/theme-storage"

const STORAGE_KEY = THEME_STORAGE_KEY

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
)

const themeListeners = new Set<() => void>()

function emitThemeChange() {
  themeListeners.forEach((listener) => listener())
}

function subscribeTheme(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener()
  }

  themeListeners.add(listener)
  globalThis.addEventListener("storage", onStorage)

  return () => {
    themeListeners.delete(listener)
    globalThis.removeEventListener("storage", onStorage)
  }
}

function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === "light" || value === "dark" || value === "system") {
      return value
    }
  } catch {
    // localStorage unavailable
  }
  return "system"
}

function getThemeSnapshot(): Theme {
  return readStoredTheme()
}

function getServerThemeSnapshot(): Theme {
  return "system"
}

function subscribeSystemTheme(listener: () => void) {
  const media = globalThis.matchMedia("(prefers-color-scheme: dark)")
  media.addEventListener("change", listener)
  return () => media.removeEventListener("change", listener)
}

function getSystemThemeSnapshot(): "light" | "dark" {
  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getServerSystemThemeSnapshot(): "light" | "dark" {
  return "light"
}

function applyTheme(resolved: "light" | "dark", theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", resolved === "dark")
  root.classList.toggle("light", theme === "light")
  root.style.colorScheme = resolved
}

function setThemePreference(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
  emitThemeChange()
}

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  )
  const systemTheme = React.useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getServerSystemThemeSnapshot,
  )
  const resolvedTheme = theme === "system" ? systemTheme : theme

  React.useEffect(() => {
    applyTheme(resolvedTheme, theme)
  }, [resolvedTheme, theme])

  const setTheme = React.useCallback((next: Theme) => {
    setThemePreference(next)
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
