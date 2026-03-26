type GtagEvent = {
  action: string;
  params?: Record<string, unknown>;
};

function sendEvent({ action, params }: GtagEvent) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

export function trackViewItem(product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) {
  sendEvent({
    action: "view_item",
    params: {
      currency: "USD",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
        },
      ],
    },
  });
}

export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity?: number;
}) {
  sendEvent({
    action: "add_to_cart",
    params: {
      currency: "USD",
      value: product.price * (product.quantity ?? 1),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: product.quantity ?? 1,
        },
      ],
    },
  });
}

export function trackBeginCheckout(
  items: { id: string; name: string; price: number; quantity: number }[],
  total: number
) {
  sendEvent({
    action: "begin_checkout",
    params: {
      currency: "USD",
      value: total,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    },
  });
}
