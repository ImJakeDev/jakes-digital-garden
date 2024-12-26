import { z } from 'zod';

const AllCaughtPokémonSchema = z.object({
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

type AllCaughtPokémon = z.infer<typeof AllCaughtPokémonSchema>;

export { AllCaughtPokémonSchema };

export default AllCaughtPokémon;
