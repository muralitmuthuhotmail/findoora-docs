import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(to top, #bdc3c7, #2c3e50)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            padding: "48px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
              margin: 0,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              textShadow: "0 2px 8px rgba(255,126,95,0.15)",
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
