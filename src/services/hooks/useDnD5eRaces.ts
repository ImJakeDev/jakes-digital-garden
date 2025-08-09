import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ms from 'milliseconds';
import z from 'zod';

const dnd5eapi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/2014/',
  timeout: ms.seconds(10),
  headers: {
    'Content-Type': 'application/json',
  },
});

const RACES = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfling', 'human', 'tiefling'] as const;

const RacesSchema = z.enum(RACES);

type Races = z.infer<typeof RacesSchema>;

export { RACES, RacesSchema };

export type { Races };

const DnD5eObjectSchema = z.object({
  index: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  updated_at: z.string().optional(),
});

const DefaultResponseSchema = z.object({
  count: z.number(),
  results: z.array(DnD5eObjectSchema).optional(),
});

const DnD5eRaceResponseSchema = z.object({
  index: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  updated_at: z.string().optional(),
  speed: z.number().optional(),
  ability_bonuses: z.array(
    z
      .object({
        bonus: z.number().optional(),
        ability_score: DnD5eObjectSchema.optional(),
      })
      .optional()
  ),
  alignment: z.string().optional(),
  age: z.string().optional(),
  size: z.string().optional(),
  size_description: z.string().optional(),
  starting_proficiencies: z.array(DnD5eObjectSchema).optional(),
  starting_proficiency_options: z
    .object({
      desc: z.string().optional(),
      choose: z.number().optional(),
      type: z.string().optional(),
      from: z.array(DnD5eObjectSchema).optional(), // Look into this
    })
    .optional(),
  languages: z.array(DnD5eObjectSchema).optional(),
  language_desc: z.string().optional(),
  traits: z.array(DnD5eObjectSchema).optional(),
  subraces: z.array(DnD5eObjectSchema).optional(),
});

export function useDnD5eAllRaces() {
  return useQuery({
    queryKey: ['dnd-5e-races'],
    queryFn: async () => {
      const { data } = await dnd5eapi.get('races/');
      return DefaultResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

export function useDnD5eRace(index: Races) {
  return useQuery({
    queryKey: ['dnd-5e-race', index],
    queryFn: async () => {
      const { data } = await dnd5eapi.get(`races/${index}`);
      return DnD5eRaceResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

export function useDnD5eSubrace(index: Races) {
  return useQuery({
    queryKey: ['dnd-5e-subraces', index],
    queryFn: async () => {
      const { data } = await dnd5eapi.get(`races/${index}/subraces`);
      return DefaultResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

export function useDnD5eRacesProficiencies(index: Races) {
  return useQuery({
    queryKey: ['dnd-5e-races-proficiencies', index],
    queryFn: async () => {
      const { data } = await dnd5eapi.get(`races/${index}/proficiencies`);
      return DefaultResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

export function useDnD5eRacesTraits(index: Races) {
  return useQuery({
    queryKey: ['dnd-5e-races-traits', index],
    queryFn: async () => {
      const { data } = await dnd5eapi.get(`races/${index}/traits`);
      return DefaultResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}
