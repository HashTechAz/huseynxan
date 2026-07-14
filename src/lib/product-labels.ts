import {
  fragranceFamilyOptions,
  genderOptions,
  occasionOptions,
  seasonOptions,
} from "@/data/catalog";
import type { FragranceFamily, Gender, Occasion, Season } from "@/types/product";

function labelFor<T extends string>(value: T, options: readonly { value: T; label: string }[]) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export const fragranceFamilyLabel = (value: FragranceFamily) => labelFor(value, fragranceFamilyOptions);
export const seasonLabel = (value: Season) => labelFor(value, seasonOptions);
export const occasionLabel = (value: Occasion) => labelFor(value, occasionOptions);
export const genderLabel = (value: Gender) => labelFor(value, genderOptions);
