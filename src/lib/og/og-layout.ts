import { OG_SIZE } from '@/lib/og/og-theme';

const LOGO_SIZE = 448;
const PRIMARY_FONT_SIZE = 24;
const SECONDARY_FONT_SIZE = 16;
const LOGO_TO_PRIMARY_GAP = 24;
const PRIMARY_TO_SECONDARY_GAP = 8;

export const OG_LAYOUT = {
  logo: { width: LOGO_SIZE, height: LOGO_SIZE },
  primary: {
    fontSize: PRIMARY_FONT_SIZE,
    fontWeight: 400 as const,
    letterSpacing: 6,
    marginTop: LOGO_TO_PRIMARY_GAP,
  },
  secondary: {
    fontSize: SECONDARY_FONT_SIZE,
    fontWeight: 300 as const,
    letterSpacing: 1.6,
    marginTop: PRIMARY_TO_SECONDARY_GAP,
  },
} as const;

export function computeOgLayout() {
  const blockHeight =
    LOGO_SIZE +
    LOGO_TO_PRIMARY_GAP +
    PRIMARY_FONT_SIZE +
    PRIMARY_TO_SECONDARY_GAP +
    SECONDARY_FONT_SIZE;

  const logoY = (OG_SIZE.height - blockHeight) / 2;
  const logoX = (OG_SIZE.width - LOGO_SIZE) / 2;
  const primaryY = logoY + LOGO_SIZE + LOGO_TO_PRIMARY_GAP + PRIMARY_FONT_SIZE;
  const secondaryY = primaryY + PRIMARY_TO_SECONDARY_GAP + SECONDARY_FONT_SIZE;

  return {
    logoX,
    logoY,
    primaryY,
    secondaryY,
    centerX: OG_SIZE.width / 2,
    logoScale: LOGO_SIZE / 512,
  } as const;
}
