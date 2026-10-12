import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { entityName, jurisdiction } = siteConfig.legal;
  const contact = siteConfig.contactEmail || "[contact email]";

  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what information ${siteConfig.name} collects through this website, why we collect it and the choices you have.`}
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {siteConfig.name} ({entityName}), based in {jurisdiction} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;). We are responsible for the personal information described in this
        policy. You can contact us about privacy at {contact}.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <p>
        When you use our <Link href="/contact">contact</Link> or research inquiry forms, we collect the details you
        choose to submit, such as:
      </p>
      <ul>
        <li>your name and email address;</li>
        <li>your company or institution (optional);</li>
        <li>the service you are interested in, budget range and timeline (optional);</li>
        <li>the content of your message, including any project or research details you share.</li>
      </ul>
      <p>Please don&apos;t include sensitive personal information or confidential data in the form.</p>

      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting provider may record standard technical information when you visit, such as your
        IP address, browser type, pages requested and the date and time of the request. This is used to operate,
        secure and troubleshoot the website. [Describe any analytics tools here if you add them.]
      </p>

      <h3>Cookies and local storage</h3>
      <p>
        This website does not use advertising or tracking cookies. It stores your light/dark theme preference in your
        browser&apos;s local storage so the site remembers your choice. You can clear this at any time in your browser
        settings. [Update this section if you add analytics or other cookies.]
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>to respond to your enquiry and discuss potential work together;</li>
        <li>to prepare proposals or arrange sessions you request;</li>
        <li>to protect the website against spam, abuse and security threats;</li>
        <li>to comply with legal obligations.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for unrelated marketing without your consent.</p>

      <h2>4. Legal basis</h2>
      <p>
        Where data protection laws such as the GDPR apply, we process enquiry information on the basis of our legitimate
        interest in responding to you and, where relevant, to take steps at your request before entering into a
        contract. [Confirm the legal bases applicable in your jurisdiction.]
      </p>

      <h2>5. Sharing your information</h2>
      <p>We share personal information only with service providers that help us run the website and respond to you:</p>
      <ul>
        <li>our website hosting provider [e.g. Vercel];</li>
        <li>our email delivery provider [e.g. Resend] or form automation service, if configured;</li>
        <li>our email and productivity provider used to manage correspondence.</li>
      </ul>
      <p>
        These providers process data on our behalf under their own security and privacy commitments. We may also
        disclose information if required by law.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Our service providers may process data in countries other than your own. Where required, we rely on appropriate
        safeguards for these transfers. [Describe safeguards relevant to your providers and jurisdiction.]
      </p>

      <h2>7. How long we keep information</h2>
      <p>
        We keep enquiry messages for as long as needed to respond and manage any resulting relationship, and then for
        up to [retention period] unless a longer period is required by law.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict the use of your
        personal information, to object to processing, and to request a copy of your data. To make a request, contact us
        at {contact}. You may also have the right to complain to your local data protection authority.
      </p>

      <h2>9. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal information, including encrypted
        connections (HTTPS) and limited access to submitted messages. No method of transmission or storage is
        completely secure, however.
      </p>

      <h2>10. Children</h2>
      <p>
        Our website is not directed at children under [13/16]. If you are under the age required in your country to
        consent to data processing, please ask a parent or guardian to contact us on your behalf.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of the page shows
        when it was last revised.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about this policy can be sent to {contact} or through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
