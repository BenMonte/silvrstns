import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms of Service , SilvrStns",
  description: "Terms of service for SilvrStns , the rules governing use of our website and purchases.",
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing or using the SilvrStns website (silvrstns.com) and making purchases, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
  },
  {
    heading: "Products & Pricing",
    body: "All products are handcrafted sterling silver jewelry. Prices are listed in US dollars and are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Slight variations in handmade items are normal and not considered defects.",
  },
  {
    heading: "Orders & Payment",
    body: "By placing an order, you represent that you are authorized to use the payment method provided. All payments are processed securely through Stripe. We reserve the right to refuse or cancel any order for any reason, including suspected fraud or unauthorized transactions.",
  },
  {
    heading: "Shipping & Delivery",
    body: "Shipping timelines are estimates and not guarantees. SilvrStns is not responsible for delays caused by carriers, customs, weather, or other circumstances beyond our control. Risk of loss transfers to you upon delivery to the carrier. For full shipping details, please see our Shipping page.",
  },
  {
    heading: "Returns & Exchanges",
    body: "Due to the handcrafted nature of our products, all sales are final. We do not accept returns or exchanges unless an item arrives damaged or defective. If you receive a damaged item, please contact us within 7 days of delivery with photos of the damage, and we will work with you to resolve the issue.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this website , including text, images, logos, and product designs , is the property of SilvrStns and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.",
  },
  {
    heading: "Limitation of Liability",
    body: "SilvrStns is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability for any claim shall not exceed the amount you paid for the applicable product.",
  },
  {
    heading: "Governing Law",
    body: "These terms are governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved in the appropriate courts.",
  },
  {
    heading: "Changes to These Terms",
    body: "We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of the website after changes constitutes acceptance of the revised terms.",
  },
  {
    heading: "Questions?",
    body: null,
  },
];

export default function TermsOfServicePage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      <div className="mb-16 max-w-xl sm:mb-20">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Legal
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Terms of Service
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
                For any questions about these terms, please{" "}
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
