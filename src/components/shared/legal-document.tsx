import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type LegalSection = Readonly<{
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
}>;

export function LegalDocument({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <Section spacing="md">
      <Container>
        <article className="mx-auto max-w-[72ch] divide-y divide-border">
          {sections.map((section, index) => (
            <section className="py-10 first:pt-0" key={section.title} aria-labelledby={`legal-section-${index}`}>
              <h2 id={`legal-section-${index}`} className="font-display text-3xl sm:text-4xl">{section.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </article>
      </Container>
    </Section>
  );
}
