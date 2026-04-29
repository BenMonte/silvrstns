import { ImageResponse } from "next/og";

export const alt = "SilvrStns , Handcrafted Silver Jewelry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f0",
          fontSize: 64,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        <div>Silvrstns</div>
      </div>
    ),
    { ...size }
  );
}
