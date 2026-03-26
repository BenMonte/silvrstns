import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = {
  title: "Contact — SilvrStns",
  description: "Get in touch with SilvrStns for orders, questions, or collaborations.",
};

export default function ContactPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      {/* Header */}
      <div className="mb-20 max-w-xl sm:mb-24">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Contact
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-5 text-base leading-[1.8] text-text-muted">
          Questions about an order, a custom request, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-20 lg:grid-cols-2">
        {/* Contact form */}
        <form className="space-y-8">
          <div>
            <label htmlFor="name" className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover"
          >
            Send Message
          </button>
        </form>

        {/* Contact info sidebar */}
        <div className="flex flex-col justify-center space-y-10">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Email
            </p>
            <p className="text-sm text-text">hello@silvrstns.com</p>
          </div>
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Based in
            </p>
            <p className="text-sm text-text">United States</p>
          </div>
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Response time
            </p>
            <p className="text-sm text-text-muted">
              Usually within 24–48 hours.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
