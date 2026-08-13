import { getTranslations } from 'next-intl/server';
import AboutSectionContent from '@/components/about/about-section-content';
import Section from '@/components/section';
import {
  SECTION_CONTENT_LAYOUT,
  SECTION_PX,
  SECTION_PY_MD,
} from '@/lib/section-shell';
import { cn } from '@/lib/utils';

export default async function AboutSection() {
  const t = await getTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <Section
      id="about"
      className={cn(
        SECTION_CONTENT_LAYOUT,
        SECTION_PX,
        SECTION_PY_MD,
        'md:-scroll-mt-8',
      )}
    >
      <AboutSectionContent heading={t('heading')} paragraphs={paragraphs} />
    </Section>
  );
}
