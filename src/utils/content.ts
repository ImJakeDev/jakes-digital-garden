import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_DIRECTORY = path.join(process.cwd(), 'content');
const MDX_EXTENSION = '.mdx';

function parsePlantedOn(value: string) {
  return Date.parse(value.replace(/(\d+)(st|nd|rd|th)/, '$1'));
}

const ContentMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  category: z.string().min(1),
  img: z.string().default(''),
  plantedOn: z.string().refine((value) => !Number.isNaN(parsePlantedOn(value)), 'must be a valid date'),
  tendedTo: z.string().default(''),
});

const PageMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type ContentCollection = 'articles' | 'blog';

interface ContentEntry {
  slug: string;
  data: z.infer<typeof ContentMetadataSchema>;
  content: string;
}

function parseMdxFile<T extends z.ZodType>(filePath: string, schema: T) {
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    const details = parsedData.error.issues.map((issue) => `${issue.path.join('.') || 'front matter'}: ${issue.message}`).join(', ');
    throw new Error(`Invalid front matter in ${path.relative(process.cwd(), filePath)} — ${details}`);
  }

  return { data: parsedData.data, content };
}

function collectionDirectory(collection: ContentCollection) {
  return path.join(CONTENT_DIRECTORY, collection);
}

function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug);
}

export function getContentEntry(collection: ContentCollection, slug: string): ContentEntry | null {
  if (!isValidSlug(slug)) {
    return null;
  }

  const filePath = path.join(collectionDirectory(collection), `${slug}${MDX_EXTENSION}`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return { slug, ...parseMdxFile(filePath, ContentMetadataSchema) };
}

export function getAllContentEntries(collection: ContentCollection): ContentEntry[] {
  return fs
    .readdirSync(collectionDirectory(collection))
    .filter((filename) => filename.endsWith(MDX_EXTENSION))
    .map((filename) => {
      const slug = filename.slice(0, -MDX_EXTENSION.length);
      const entry = getContentEntry(collection, slug);

      if (!entry) {
        throw new Error(`Unable to load content file: ${filename}`);
      }

      return entry;
    });
}

export function getPageContent(slug: string) {
  if (!isValidSlug(slug)) {
    return null;
  }

  const filePath = path.join(CONTENT_DIRECTORY, 'pages', `${slug}${MDX_EXTENSION}`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMdxFile(filePath, PageMetadataSchema);
}

export { parsePlantedOn };
