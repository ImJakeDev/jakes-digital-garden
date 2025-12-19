// Open5eRacesResponse
import z from 'zod';

const Open5eSpeedSchema = z.object({
  walk: z.number().nullable(),
});

const Open5eAbilityScoreIncreaseSchema = z.object({
  attributes: z.array(z.string()),
  value: z.number(),
});

const Open5eSubraceSchema = z.object({
  name: z.string().nullable(),
  slug: z.string().nullable(),
  desc: z.string().nullable(),
  asi_desc: z.string().nullable(),
  asi: z.array(Open5eAbilityScoreIncreaseSchema).nullable(),
  traits: z.string().nullable(),
  document__slug: z.string().nullable(),
  document__title: z.string().nullable(),
  document__license_url: z.string().nullish(),
  document__url: z.string().nullable(),
});

const Open5eRacesResultsSchema = z.object({
  name: z.string().nullable(),
  slug: z.string().nullable(),
  desc: z.string().nullable(),
  asi_desc: z.string().nullable(),
  asi: z.array(Open5eAbilityScoreIncreaseSchema).nullable(),
  age: z.string().nullable(),
  alignment: z.string().nullable(),
  size: z.string().nullable(),
  size_raw: z.string().nullable(),
  speed: Open5eSpeedSchema,
  speed_desc: z.string().nullable(),
  languages: z.string().nullable(),
  vision: z.string().nullable(),
  traits: z.string().nullable(),
  subraces: z.array(Open5eSubraceSchema).nullable(),
  document__slug: z.string().nullable(),
  document__title: z.string().nullable(),
  document__license_url: z.string().nullable(),
  document__url: z.string().nullable(),
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
