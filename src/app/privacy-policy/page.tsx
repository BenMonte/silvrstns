import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy — SilvrStns",
  description: "Privacy policy for SilvrStns — how we collect, use, and protect your information.",
};

const sections = [
  {
    heading: "Information We Collect",
    body: "When you place an order or interact with our website, we may collect personal information including your name, email address, shipping address, billing address, and payment details. We also collect non-personal information such as browser type, device information, and pages visited through cookies and analytics tools.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to process and fulfill your orders, communicate with you about your purchases, improve our website and customer experience, send promotional communications (only with your consent), and comply with legal obligations.",
  },
  {
    heading: "Payment Processing",
    body: "All payments are processed securely through Stripe. We do not store your credit card information on our servers. Stripe's privacy policy governs the handling of your payment data.",
  },
  {
    heading: "Information Sharing",
    body: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and fulfilling orders — including Stripe (payment processing), shipping carriers (order delivery), and analytics providers (site improvement). These parties are obligated to keep your information confidential.",
  },
  {
    heading: "Cookies & Analytics",
    body: "We use cookies and similar technologies to enhance your browsing experience and gather usage data. This includes Google Analytics and Microsoft Clarity, which help us understand how visitors interact with our site. You can disable cookies through your browser settings, though some features may not function properly.",
  },
  {
    heading: "Data Security",
    body: "We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmitted between your browser and our servers. While no method of transmission over the internet is 100% secure, we take reasonable steps to safeguard your data.",
  },
  {
    heading: "Your Rights",
    body: "You have the right to access, correct, or delete the personal information we hold about you. You may also opt out of marketing communications at any time. To exercise any of these rights, please contact us.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.",
  },
  {
    heading: "Questions?",
    body: null,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      <div className="mb-16 max-w-xl sm:mb-20">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Legal
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Privacy Policy
        </h1>
      </div>

      <div className="mx-auto max-w-2xl space-y-14">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="mb-4 text-sm uppercase tracking-[0.2em] text-text">
              {s.heading}
            </h2>
            {s.body ? (
              <p className="text-base leading-[1.8] text-text-muted">
                {s.body}
              </p>
            ) : (
              <p className="text-base leading-[1.8] text-text-muted">
                For any privacy-related questions, please{" "}
                <Link
                  href="/contact"
                  className="text-accent transition-colors duration-300 hover:text-accent-hover"
                >
                  contact us
                </Link>
                .
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
