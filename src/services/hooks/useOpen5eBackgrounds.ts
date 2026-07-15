import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ms from 'milliseconds';
import z from 'zod';

const open5eApi = axios.create({
  baseURL: 'https://api.open5e.com/v2/',
  timeout: ms.seconds(10),
  headers: {
    'Content-Type': 'application/json',
  },
});

const BackgroundBenefitSchema = z.object({
  name: z.string().nullable(),
  desc: z.string().nullable(),
  type: z.string().nullable(),
});

const BackgroundSchema = z.object({
  key: z.string(),
  name: z.string(),
  desc: z.string().nullable(),
  benefits: z.array(BackgroundBenefitSchema),
});

const BackgroundsResponseSchema = z.object({
  count: z.number(),
  results: z.array(BackgroundSchema),
});

type Background = z.infer<typeof BackgroundSchema>;

export function useOpen5eBackgrounds() {
  return useQuery({
    queryKey: ['open5e-backgrounds'],
    queryFn: async () => {
      // The full SRD+homebrew background pool is 58 entries; one page covers it.
      const { data } = await open5eApi.get('backgrounds/?limit=100');
      return BackgroundsResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

function stripEmphasis(text: string): string {
  return text.replace(/\*/g, '').trim();
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// "suggested_characteristics" benefits from richer source documents (Tome of
// Heroes, SRD) embed d6/d8 Markdown tables for Personality Trait/Ideal/Bond/Flaw.
// Other documents only reference the PHB tables in prose, so this returns null
// rather than surfacing an empty or bogus table for those.
function extractTableRows(text: string, header: string): string[] {
  const lines = text.split('\n');
  const escapedHeader = escapeRegExp(header);
  const headerIndex = lines.findIndex((line) => new RegExp(`\\|\\s*${escapedHeader}\\s*\\|`, 'i').test(line));
  if (headerIndex === -1) {
    return [];
  }

  const rows: string[] = [];
  for (let i = headerIndex + 2; i < lines.length; i++) {
    const match = /^\|\s*\d+\s*\|\s*(.+?)\s*\|$/.exec(lines[i].trim());
    if (!match) {
      break;
    }
    rows.push(stripEmphasis(match[1]));
  }
  return rows;
}

interface SuggestedCharacteristics {
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

function getSuggestedCharacteristics(background: Background): SuggestedCharacteristics | undefined {
  const benefit = background.benefits.find((item) => item.type === 'suggested_characteristics');
  if (!benefit?.desc) {
    return undefined;
  }

  const characteristics: SuggestedCharacteristics = {
    personalityTraits: extractTableRows(benefit.desc, 'Personality Trait'),
    ideals: extractTableRows(benefit.desc, 'Ideal'),
    bonds: extractTableRows(benefit.desc, 'Bond'),
    flaws: extractTableRows(benefit.desc, 'Flaw'),
  };

  const isComplete = characteristics.personalityTraits.length > 0 && characteristics.ideals.length > 0 && characteristics.bonds.length > 0 && characteristics.flaws.length > 0;

  return isComplete ? characteristics : undefined;
}

export { getSuggestedCharacteristics, stripEmphasis };
export type { Background, SuggestedCharacteristics };
