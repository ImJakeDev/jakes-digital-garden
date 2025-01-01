// OpenLibraryAlreadyReadResponse
import z from 'zod';

const OpenLibraryWorkSchema = z.object({
  logged_date: z.string(),
  logged_edition: z.string(),
  work: z.object({
    author_keys: z.array(z.string()),
    author_names: z.array(z.string()),
    cover_edition_key: z.string(),
    cover_id: z.number(),
    edition_key: z.array(z.string()),
    first_publish_year: z.number(),
    key: z.string(),
    lending_edition_s: z.nullable(z.string()),
    title: z.string(),
  }),
});

const OpenLibraryAlreadyReadResponseSchema = z.object({
  numFound: z.number(),
  page: z.number(),
  reading_log_entries: z.array(OpenLibraryWorkSchema),
});

type OpenLibraryAlreadyReadResponse = z.infer<typeof OpenLibraryAlreadyReadResponseSchema>;

export { OpenLibraryAlreadyReadResponseSchema };

export default OpenLibraryAlreadyReadResponse;
