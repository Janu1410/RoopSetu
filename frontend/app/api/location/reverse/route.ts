import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_REVERSE_URL =
  "https://nominatim.openstreetmap.org/reverse?format=jsonv2";

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("lat"));
  const longitude = Number(request.nextUrl.searchParams.get("lon"));

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      { message: "Invalid coordinates." },
      { status: 400 },
    );
  }

  const upstreamUrl = `${NOMINATIM_REVERSE_URL}&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "RoopSetu/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to resolve location." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      address?: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
      };
    };

    const city =
      data.address?.city || data.address?.town || data.address?.village || "";
    const state = data.address?.state || "";
    const location = [city, state].filter(Boolean).join(", ");

    return NextResponse.json({ location });
  } catch {
    return NextResponse.json(
      { message: "Failed to resolve location." },
      { status: 502 },
    );
  }
}
