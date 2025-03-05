import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GOOGLE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
