import { env } from '@/env';
import { z } from 'zod';

const coordinatesSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
});

export async function GET(request: Request) {
  const coordinates = coordinatesSchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));

  if (!coordinates.success) {
    return Response.json({ error: 'Invalid coordinates.' }, { status: 400 });
  }

  // The fallback keeps existing deployments working during the environment-variable migration.
  const apiKey = env.GEOAPIFY_API_KEY ?? process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Reverse geocoding is not configured.' }, { status: 503 });
  }

  const searchParams = new URLSearchParams({
    lat: String(coordinates.data.lat),
    lon: String(coordinates.data.lng),
    apiKey,
  });
  const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?${searchParams}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    return Response.json({ error: 'Reverse geocoding provider is unavailable.' }, { status: response.status });
  }

  return Response.json(await response.json(), {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
