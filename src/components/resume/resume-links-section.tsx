import Image from "next/image"
import type { ResumeData } from "@/data/resume/types"
import ResumeRichText from "@/components/resume/resume-rich-text"

type ResumeLinksSectionProps = {
  links: ResumeData["links"]
}

export default function ResumeLinksSection({
  links,
}: Readonly<ResumeLinksSectionProps>) {
  const qrLinks = [links.github, links.portfolio]

  return (
    <section className="resume-links space-y-4">
      <h2 className="text-xl font-bold print:hidden">リンク</h2>
      <h2 className="hidden text-xl font-bold print:block">QRコード</h2>
      <p className="text-sm leading-relaxed sm:text-base print:text-black">
        <ResumeRichText content={links.intro} />
      </p>

      <ul className="list-none space-y-2 text-sm sm:text-base print:hidden">
        {qrLinks.map((link) => (
          <li key={link.url} className="min-w-0">
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
            <span className="text-muted-foreground"> — </span>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="break-all text-primary underline-offset-4 hover:underline"
            >
              {link.url}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden gap-6 print:grid print:grid-cols-2">
        {qrLinks.map((link) => (
          <figure
            key={link.url}
            className="resume-qr-figure flex flex-col items-center gap-2 text-center"
          >
            <Image
              src={link.qrSrc}
              alt={`${link.label} QR`}
              width={120}
              height={120}
              className="rounded-md"
            />
            <figcaption className="text-sm font-normal">
              {link.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
