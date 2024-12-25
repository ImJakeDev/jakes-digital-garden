import { z } from 'zod';

const CaughtPokémonsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(), // Todo: Will this ever be null?
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

type CaughtPokémons = z.infer<typeof CaughtPokémonsSchema>;

export { CaughtPokémonsSchema };

export default CaughtPokémons;
