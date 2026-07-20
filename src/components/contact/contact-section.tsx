import ContactSectionContent from '@/components/contact/contact-section-content';
import Section from '@/components/section';
import {
  SECTION_CONTENT_LAYOUT,
  SECTION_GAP,
  SECTION_PB,
  SECTION_PX,
} from '@/lib/section-shell';
import { cn } from '@/lib/utils';

export default function ContactSection() {
  return (
    <>
      <div className={SECTION_GAP} aria-hidden />
      <Section
        id="contact"
        className={cn(SECTION_CONTENT_LAYOUT, SECTION_PX, SECTION_PB)}
      >
        <ContactSectionContent />
      </Section>
    </>
  );
}
