import { getTranslations } from 'next-intl/server';
import { CONSTITUENT_TAGS } from '@/data/constituent-tags';

export default async function ConstituentsSeo() {
  const t = await getTranslations('constituents');

  const constituentsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('seoHeading'),
    itemListElement: CONSTITUENT_TAGS.map((tag, index) => {
      const description = tag.descriptionKey
        ? t(`tagDescriptions.${tag.descriptionKey}`)
        : undefined;

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: tag.label,
          ...(description ? { description } : {}),
        },
      };
    }),
  };

  return (
    <>
      <section aria-labelledby="constituents-heading" className="sr-only">
        <h2 id="constituents-heading">{t('seoHeading')}</h2>
        <ul>
          {CONSTITUENT_TAGS.map((tag) => {
            const description = tag.descriptionKey
              ? t(`tagDescriptions.${tag.descriptionKey}`)
              : null;

            return (
              <li key={tag.label} data-categories={tag.categories.join(' ')}>
                {tag.label}
                {description ? ` — ${description}` : null}
              </li>
            );
          })}
        </ul>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(constituentsJsonLd),
        }}
      />
    </>
  );
}
