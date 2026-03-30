const SHIPPO_API_URL = "https://api.goshippo.com";
const SHIPPO_TOKEN = process.env.SHIPPO_TEST_KEY ?? "";

// ── YOUR address (where you ship FROM) ─────────────────────────
// Update these to your real address before going live.
export const FROM_ADDRESS = {
  name: "SilvrStns",
  street1: "8948 Caminito Fresco",
  city: "La Jolla",
  state: "CA",
  zip: "92037",
  country: "US",
  email: "silvrstns@gmail.com",
};

// Default parcel size for jewelry packaging (small padded box)
const DEFAULT_PARCEL = {
  length: "4",
  width: "3",
  height: "3",
  distance_unit: "in",
  weight: "4",
  mass_unit: "oz",
};

async function shippoFetch(path: string, body: unknown) {
  const res = await fetch(`${SHIPPO_API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `ShippoToken ${SHIPPO_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shippo API error ${res.status}: ${text}`);
  }

  return res.json();
}

type ShippingAddress = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email?: string;
};

/**
 * Creates a shipment, picks the cheapest rate, and purchases a label.
 * Returns the tracking number and label URL.
 */
export async function createShippingLabel(toAddress: ShippingAddress) {
  // 1. Create a shipment (returns available rates)
  const shipment = await shippoFetch("/shipments/", {
    address_from: FROM_ADDRESS,
    address_to: toAddress,
    parcels: [DEFAULT_PARCEL],
    async: false,
  });

  if (!shipment.rates || shipment.rates.length === 0) {
    throw new Error("No shipping rates available for this address.");
  }

  // 2. Pick the cheapest rate
  const cheapestRate = shipment.rates.reduce(
    (best: { amount: string }, rate: { amount: string }) =>
      parseFloat(rate.amount) < parseFloat(best.amount) ? rate : best,
    shipment.rates[0],
  );

  // 3. Purchase the label
  const transaction = await shippoFetch("/transactions/", {
    rate: cheapestRate.object_id,
    label_file_type: "PDF",
    async: false,
  });

  if (transaction.status !== "SUCCESS") {
    throw new Error(
      `Label purchase failed: ${JSON.stringify(transaction.messages)}`,
    );
  }

  return {
    tracking_number: transaction.tracking_number as string,
    label_url: transaction.label_url as string,
    carrier: cheapestRate.provider as string,
    service: cheapestRate.servicelevel?.name as string,
    rate_amount: cheapestRate.amount as string,
    eta: cheapestRate.estimated_days as number | null,
  };
}
