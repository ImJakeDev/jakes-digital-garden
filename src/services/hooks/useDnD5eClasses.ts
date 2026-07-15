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

const CLASSES = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'] as const;

const ClassesSchema = z.enum(CLASSES);

type Classes = z.infer<typeof ClassesSchema>;

export { CLASSES, ClassesSchema };

export type { Classes };

const DnD5eObjectSchema = z.object({
  index: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
});

const DefaultResponseSchema = z.object({
  count: z.number(),
  results: z.array(DnD5eObjectSchema).optional(),
});

const ProficiencyChoiceSchema = z.object({
  desc: z.string().optional(),
  choose: z.number().optional(),
  type: z.string().optional(),
  from: z
    .object({
      options: z
        .array(
          z.object({
            item: DnD5eObjectSchema.optional(),
          })
        )
        .optional(),
    })
    .optional(),
});

const StartingEquipmentSchema = z.object({
  equipment: DnD5eObjectSchema.optional(),
  quantity: z.number().optional(),
});

const StartingEquipmentOptionSchema = z.object({
  desc: z.string().optional(),
  choose: z.number().optional(),
});

const DnD5eClassResponseSchema = z.object({
  index: z.string().optional(),
  name: z.string().optional(),
  hit_die: z.number().optional(),
  proficiencies: z.array(DnD5eObjectSchema).optional(),
  proficiency_choices: z.array(ProficiencyChoiceSchema).optional(),
  saving_throws: z.array(DnD5eObjectSchema).optional(),
  starting_equipment: z.array(StartingEquipmentSchema).optional(),
  starting_equipment_options: z.array(StartingEquipmentOptionSchema).optional(),
  spellcasting: z
    .object({
      spellcasting_ability: DnD5eObjectSchema.optional(),
    })
    .optional(),
});

export function useDnD5eClasses() {
  return useQuery({
    queryKey: ['dnd-5e-classes'],
    queryFn: async () => {
      const { data } = await dnd5eapi.get('classes/');
      return DefaultResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}

export function useDnD5eClass(index: Classes) {
  return useQuery({
    queryKey: ['dnd-5e-class', index],
    queryFn: async () => {
      const { data } = await dnd5eapi.get(`classes/${index}`);
      return DnD5eClassResponseSchema.parse(data);
    },
    staleTime: Infinity,
  });
}
