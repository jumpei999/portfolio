import { computeOgLayout, OG_LAYOUT } from '@/lib/og/og-layout';
import { OG_SIZE, OG_SPLIT_CLIP, OG_THEME } from '@/lib/og/og-theme';

type OgSplitTextProps = {
  primaryMessage: string;
  secondaryMessage: string;
};

function OgSplitTextLayer({
  primaryMessage,
  secondaryMessage,
  color,
  clipPath,
}: Readonly<OgSplitTextProps & { color: string; clipPath: string }>) {
  const layout = computeOgLayout();
  const textTop =
    layout.logoY + OG_LAYOUT.logo.height + OG_LAYOUT.primary.marginTop;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        display: 'flex',
        clipPath,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: textTop,
          left: 0,
          width: OG_SIZE.width,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color,
        }}
      >
        <div
          style={{
            fontFamily: 'Montserrat',
            fontSize: OG_LAYOUT.primary.fontSize,
            fontWeight: OG_LAYOUT.primary.fontWeight,
            letterSpacing: `${OG_LAYOUT.primary.letterSpacing}px`,
          }}
        >
          {primaryMessage}
        </div>
        <div
          style={{
            fontFamily: 'Montserrat',
            fontSize: OG_LAYOUT.secondary.fontSize,
            fontWeight: OG_LAYOUT.secondary.fontWeight,
            letterSpacing: `${OG_LAYOUT.secondary.letterSpacing}px`,
            marginTop: OG_LAYOUT.secondary.marginTop,
          }}
        >
          {secondaryMessage}
        </div>
      </div>
    </div>
  );
}

export default function OgSplitText({
  primaryMessage,
  secondaryMessage,
}: Readonly<OgSplitTextProps>) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: OG_SIZE.width,
        height: OG_SIZE.height,
      }}
    >
      <OgSplitTextLayer
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
        color={OG_THEME.dark.foreground}
        clipPath={OG_SPLIT_CLIP.dark}
      />
      <OgSplitTextLayer
        primaryMessage={primaryMessage}
        secondaryMessage={secondaryMessage}
        color={OG_THEME.light.foreground}
        clipPath={OG_SPLIT_CLIP.light}
      />
    </div>
  );
}
