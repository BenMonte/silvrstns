"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type CheckoutOverlayCtx = {
  show: () => void;
  hide: () => void;
};

const Ctx = createContext<CheckoutOverlayCtx>({ show: () => {}, hide: () => {} });

export function useCheckoutOverlay() {
  return useContext(Ctx);
}

export function CheckoutOverlayProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <Ctx.Provider value={{ show, hide }}>
      {children}

      {visible && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          {/* spinner */}
          <div className="mb-8 h-8 w-8 animate-spin rounded-full border border-border border-t-text" />

          <p className="text-[11px] uppercase tracking-[0.35em] text-text-muted">
            Redirecting to checkout
          </p>
        </div>
      )}
    </Ctx.Provider>
  );
}
