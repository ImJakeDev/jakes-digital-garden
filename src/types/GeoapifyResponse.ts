import { z } from 'zod';

const DatasourceSchema = z.object({
  sourcename: z.string(),
  attribution: z.string(),
  license: z.string(),
  url: z.url(),
});

const TimezoneSchema = z.object({
  name: z.string(),
  offset_STD: z.string(),
  offset_STD_seconds: z.number(),
  offset_DST: z.string(),
  offset_DST_seconds: z.number(),
  abbreviation_STD: z.string(),
  abbreviation_DST: z.string(),
});

const RankSchema = z.object({
  importance: z.number(),
  popularity: z.number(),
});

const PropertiesSchema = z.object({
  datasource: DatasourceSchema,
  name: z.string(),
  country: z.string(),
  country_code: z.string(),
  state: z.string(),
  city: z.string(),
  postcode: z.string(),
  district: z.string(),
  suburb: z.string(),
  street: z.string(),
  housenumber: z.string(),
  lon: z.number(),
  lat: z.number(),
  state_code: z.string(),
  distance: z.number(),
  result_type: z.string(),
  formatted: z.string(),
  address_line1: z.string(),
  address_line2: z.string(),
  category: z.string(),
  timezone: TimezoneSchema,
  plus_code: z.string(),
  rank: RankSchema,
  place_id: z.string(),
});

const GeometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]),
});

const FeatureSchema = z.object({
  type: z.literal('Feature'),
  properties: PropertiesSchema,
  geometry: GeometrySchema,
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
});

const QuerySchema = z.object({
  lat: z.number(),
  lon: z.number(),
  plus_code: z.string(),
});

const FeatureCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(FeatureSchema),
  query: QuerySchema.optional(),
});

type FeatureCollection = z.infer<typeof FeatureCollectionSchema>;

export { FeatureCollectionSchema };

export default FeatureCollection;
