import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms that apply to your use of the ${siteConfig.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  const { entityName, jurisdiction } = siteConfig.legal;
  const contact = siteConfig.contactEmail || "[contact email]";

  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      intro={`These terms govern your use of the ${siteConfig.name} website. By using the site, you agree to them.`}
    >
      <h2>1. About these terms</h2>
      <p>
        This website is operated by {siteConfig.name} ({entityName}). These terms cover use of the website only.
        Development, research, mentoring and training services are provided under a separate written agreement or
        proposal, which will take precedence over these terms for that work.
      </p>

      <h2>2. Using the website</h2>
      <ul>
        <li>You may browse the website and share links to it for personal or business purposes.</li>
        <li>
          You must not misuse the website, including attempting to gain unauthorised access, interfering with its
          operation, or submitting spam or malicious content through its forms.
        </li>
        <li>Information you submit through our forms must be accurate and must not infringe anyone else&apos;s rights.</li>
      </ul>

      <h2>3. Website content</h2>
      <p>
        Content on this website is provided for general information about our services. It is not professional advice
        for your specific situation, and we may update or remove content at any time.
      </p>
      <p>
        <strong>Sample projects:</strong> projects labelled &ldquo;Sample project&rdquo; are illustrative examples of
        the type of work we can do. They do not describe completed client engagements and do not represent results
        achieved for any client.
      </p>

      <h2>4. Research and academic services</h2>
      <p>
        Our research and academic services consist of technical implementation, experimentation support, mentoring and
        learning assistance. We do not provide work intended to be submitted dishonestly as someone else&apos;s own,
        and we will decline requests that would breach academic integrity policies. Clients remain responsible for
        complying with their institution&apos;s rules, including any disclosure requirements.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The website design, text, graphics, logo and code are owned by or licensed to {siteConfig.name}, unless stated
        otherwise. You may not copy or reuse them for commercial purposes without our written permission. Ownership of
        work produced for clients is set out in the relevant client agreement.
      </p>

      <h2>6. Third-party links</h2>
      <p>
        The website may link to third-party websites, demos or repositories. We are not responsible for their content
        or practices.
      </p>

      <h2>7. No warranty</h2>
      <p>
        The website is provided &ldquo;as is&rdquo;. While we aim to keep it accurate and available, we do not
        guarantee that it will always be error-free, secure or uninterrupted.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the extent permitted by law, {siteConfig.name} is not liable for any indirect or consequential loss arising
        from your use of the website. Nothing in these terms limits liability that cannot be limited by law. [Review
        this clause with a legal professional for your jurisdiction.]
      </p>

      <h2>9. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information submitted through
        the website.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of {jurisdiction}, and disputes are subject to the courts of{" "}
        {jurisdiction}, unless mandatory local law provides otherwise.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the website after changes are published means
        you accept the updated terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms can be sent to {contact} or through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
