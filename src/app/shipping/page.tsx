import type { Metadata } from "next";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Shipping , SilvrStns",
  description: "Shipping information for SilvrStns orders.",
};

const sections = [
  {
    heading: "Processing Time",
    body: "All orders are processed within 1–3 business days. During high-demand periods, processing may take up to 5 business days. You\u2019ll receive a confirmation email once your order has shipped.",
  },
  {
    heading: "Domestic Shipping",
    body: "We ship within the United States via USPS. Standard shipping typically takes 3–7 business days after processing. Expedited options may be available at checkout depending on your location.",
  },
  {
    heading: "International Shipping",
    body: "We currently ship to select international destinations. Delivery times vary by country and typically range from 7–21 business days. Import duties, taxes, and customs fees are the responsibility of the recipient.",
  },
  {
    heading: "Order Tracking",
    body: "Once your order ships, you\u2019ll receive a tracking number via email. Please allow up to 24 hours for tracking information to update after shipment.",
  },
  {
    heading: "Delivery Timing",
    body: "Estimated delivery dates are provided as guidelines and are not guaranteed. Delays may occur due to carrier volume, weather, customs processing, or other factors outside our control.",
  },
  {
    heading: "Lost or Delayed Packages",
    body: "If your order has not arrived within the expected delivery window, please reach out to us. We\u2019ll work with the carrier to locate your package and resolve the issue as quickly as possible.",
  },
  {
    heading: "Questions?",
    body: null,
  },
];

export default function ShippingPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      <div className="mb-16 max-w-xl sm:mb-20">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Information
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Shipping
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
                For any shipping-related questions, please{" "}
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
