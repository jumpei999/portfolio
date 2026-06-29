type OgFont = {
  name: string
  data: ArrayBuffer
  weight: 300 | 400
  style: "normal"
}

const CACHE_KEY = "montserrat"
const fontCache = new Map<string, OgFont[]>()

const MONTSERRAT_REGULAR_URL =
  "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf"

const MONTSERRAT_LIGHT_URL =
  "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-.ttf"

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load OG font from ${url}: ${response.status}`)
  }

  return response.arrayBuffer()
}

export async function loadOgFonts(): Promise<OgFont[]> {
  const cached = fontCache.get(CACHE_KEY)
  if (cached) return cached

  const [regularData, lightData] = await Promise.all([
    fetchFont(MONTSERRAT_REGULAR_URL),
    fetchFont(MONTSERRAT_LIGHT_URL),
  ])

  const fonts: OgFont[] = [
    {
      name: "Montserrat",
      data: regularData,
      weight: 400,
      style: "normal",
    },
    {
      name: "Montserrat",
      data: lightData,
      weight: 300,
      style: "normal",
    },
  ]

  fontCache.set(CACHE_KEY, fonts)
  return fonts
}
