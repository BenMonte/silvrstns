// Extend Window with gtag for GA4
interface Window {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
