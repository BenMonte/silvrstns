import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({ children, className = "" }: Props) {
  return (
    <section className={`mx-auto max-w-7xl px-6 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}
