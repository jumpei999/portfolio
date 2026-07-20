import type {
  ResumeRichText as ResumeRichTextContent,
  ResumeSpan,
} from '@/data/resume/types';

type ResumeRichTextProps = {
  content: ResumeRichTextContent;
  className?: string;
};

function spanKey(span: ResumeSpan) {
  return span.type === 'text'
    ? `text:${span.value}`
    : `link:${span.href}:${span.label}`;
}

export default function ResumeRichText({
  content,
  className,
}: Readonly<ResumeRichTextProps>) {
  return (
    <span className={className}>
      {content.map((span) => {
        if (span.type === 'link') {
          return (
            <a
              key={spanKey(span)}
              href={span.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {span.label}
            </a>
          );
        }

        return <span key={spanKey(span)}>{span.value}</span>;
      })}
    </span>
  );
}
