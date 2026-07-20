'use client';

import { useTranslations } from 'next-intl';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const t = useTranslations('nav');
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const modeLabel = isDark ? t('themeDark') : t('themeLight');
  const nextModeLabel = isDark ? t('themeLight') : t('themeDark');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={t('themeToggleAria', { mode: modeLabel })}
          aria-pressed={isDark}
          onClick={handleToggle}
        >
          {isDark ? (
            <LuMoon className="size-3.5" aria-hidden />
          ) : (
            <LuSun className="size-3.5" aria-hidden />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {t('themeToggleLabel', { mode: nextModeLabel })}
      </TooltipContent>
    </Tooltip>
  );
}
