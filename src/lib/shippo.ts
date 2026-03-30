const SHIPPO_API_URL = "https://api.goshippo.com";
const SHIPPO_TOKEN = process.env.SHIPPO_TEST_KEY ?? "";

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

async function shippoPost(path: string, body: Record<string, unknown>) {
  if (!SHIPPO_TOKEN) {
    throw new Error("SHIPPO_TEST_KEY is not set in environment variables.");
  }

  const res = await fetch(`${SHIPPO_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `ShippoToken ${SHIPPO_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data ? JSON.stringify(data) : `HTTP ${res.status}`;
    throw new Error(`Shippo ${path} failed: ${msg}`);
  }

  return data;
}

export type ShippingAddress = {
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
 */
export async function createShippingLabel(toAddress: ShippingAddress) {
  // 1. Create a shipment (returns available rates)
  const shipment = await shippoPost("/shipments/", {
    address_from: FROM_ADDRESS,
    address_to: toAddress,
    parcels: [DEFAULT_PARCEL],
    async: false,
  });

  if (shipment.status !== "SUCCESS") {
    throw new Error(
      `Shipment creation failed: ${JSON.stringify(shipment.messages ?? shipment)}`,
    );
  }

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
  const transaction = await shippoPost("/transactions/", {
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
    tracking_url: transaction.tracking_url_provider as string,
    label_url: transaction.label_url as string,
    carrier: cheapestRate.provider as string,
    service: (cheapestRate.servicelevel?.name ?? "") as string,
    rate_amount: cheapestRate.amount as string,
    eta: cheapestRate.estimated_days as number | null,
  };
}
