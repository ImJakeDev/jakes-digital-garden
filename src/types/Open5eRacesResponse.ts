// Open5eRacesResponse
import z from 'zod';

const Open5eRacesTraitsSchema = z.object({
  name: z.string(),
  desc: z.string().nullable(),
});

const Open5eRacesResultsSchema = z.object({
  url: z.string(),
  key: z.string(),
  is_subrace: z.boolean(),
  document: z.string().nullable(),
  name: z.string(),
  desc: z.string().nullable(),
  subrace_of: z.string().nullable(),
  traits: z.array(Open5eRacesTraitsSchema).nullable(),
});

const Open5eRacesResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(Open5eRacesResultsSchema),
});

type Open5eRacesResponse = z.infer<typeof Open5eRacesResponseSchema>;

export { Open5eRacesResponseSchema };

export default Open5eRacesResponse;
