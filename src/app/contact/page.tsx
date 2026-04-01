"use client";

import { useState, type FormEvent } from "react";
import SectionWrapper from "@/components/SectionWrapper";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <SectionWrapper className="py-24 sm:py-32">
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
        {sent ? (
          <div className="flex flex-col justify-center py-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted mb-4">
              Message sent
            </p>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
              Thanks for reaching out.
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-text-muted">
              We&apos;ll get back to you within 24–48 hours.
            </p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
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

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </form>
        )}

        <div className="flex flex-col justify-center space-y-10">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Email
            </p>
            <p className="text-sm text-text">silvrstns@gmail.com</p>
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
