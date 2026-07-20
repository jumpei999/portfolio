import HeroContent from '@/components/hero/hero-content';
import Section from '@/components/section';
import { MOBILE_BOTTOM_CLEARANCE_MAX_MD } from '@/lib/section-shell';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <Section
      id="home"
      className={cn(
        'flex-col gap-6',
        'box-border min-h-svh',
        'pt-(--site-header-height)',
        MOBILE_BOTTOM_CLEARANCE_MAX_MD,
        'md:pb-10',
      )}
    >
      <HeroContent />
    </Section>
  );
}
