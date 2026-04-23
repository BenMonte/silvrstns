"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

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

  // Hide overlay when user returns to page via back button (bfcache restore)
  // or when tab becomes visible again. Prevents stuck "Redirecting" state.
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setVisible(false);
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") setVisible(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <Ctx.Provider value={{ show, hide }}>
      {children}

      {visible && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setVisible(false)}
        >
          {/* spinner */}
          <div className="mb-8 h-8 w-8 animate-spin rounded-full border border-border border-t-text" />

          <p className="text-[11px] uppercase tracking-[0.35em] text-text-muted">
            Redirecting to checkout
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
            className="mt-6 text-[10px] uppercase tracking-[0.3em] text-text-muted/60 transition-colors hover:text-text"
          >
            Cancel
          </button>
        </div>
      )}
    </Ctx.Provider>
  );
}
