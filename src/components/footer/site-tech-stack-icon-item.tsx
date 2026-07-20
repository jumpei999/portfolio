'use client';

import {
  SiFramer,
  SiNextdotjs,
  SiPnpm,
  SiRadixui,
  SiReact,
  SiResend,
  SiSentry,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import CursorIcon from '@/components/footer/cursor-icon';
import {
  FOOTER_ICON_BUTTON_CLASS,
  FOOTER_ICON_CLASS,
} from '@/components/footer/footer-icon-styles';
import {
  FOOTER_TOOLTIP_OFFSET,
  FOOTER_TOOLTIP_SIDE,
} from '@/components/footer/footer-tooltip';
import NextIntlIcon from '@/components/footer/next-intl-icon';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SiteTechStackItem } from '@/data/site-tech-stack';
import { cn } from '@/lib/utils';

type TechStackIconProps = Readonly<{
  slug: string;
  className?: string;
}>;

export function TechStackIcon({ slug, className }: TechStackIconProps) {
  const iconClassName = cn(FOOTER_ICON_CLASS, className);

  switch (slug) {
    case 'nextjs':
      return <SiNextdotjs className={iconClassName} aria-hidden />;
    case 'react':
      return <SiReact className={iconClassName} aria-hidden />;
    case 'typescript':
      return <SiTypescript className={iconClassName} aria-hidden />;
    case 'tailwindcss':
      return <SiTailwindcss className={iconClassName} aria-hidden />;
    case 'shadcnui':
      return <SiShadcnui className={iconClassName} aria-hidden />;
    case 'radixui':
      return <SiRadixui className={iconClassName} aria-hidden />;
    case 'motion':
      return <SiFramer className={iconClassName} aria-hidden />;
    case 'nextintl':
      return <NextIntlIcon className={iconClassName} aria-hidden />;
    case 'pnpm':
      return <SiPnpm className={iconClassName} aria-hidden />;
    case 'sentry':
      return <SiSentry className={iconClassName} aria-hidden />;
    case 'resend':
      return <SiResend className={iconClassName} aria-hidden />;
    case 'vercel':
      return <SiVercel className={iconClassName} aria-hidden />;
    case 'cursor':
      return <CursorIcon className={iconClassName} aria-hidden />;
    default:
      return null;
  }
}

type SiteTechStackIconItemProps = Readonly<{
  item: SiteTechStackItem;
  interactive?: boolean;
}>;

export default function SiteTechStackIconItem({
  item,
  interactive = true,
}: SiteTechStackIconItemProps) {
  if (!interactive) {
    return (
      <li aria-hidden>
        <span className="inline-flex size-8 items-center justify-center">
          <TechStackIcon slug={item.slug} />
        </span>
      </li>
    );
  }

  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={FOOTER_ICON_BUTTON_CLASS}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.name}
            >
              <TechStackIcon slug={item.slug} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side={FOOTER_TOOLTIP_SIDE}
          sideOffset={FOOTER_TOOLTIP_OFFSET}
        >
          {item.name}
        </TooltipContent>
      </Tooltip>
    </li>
  );
}
