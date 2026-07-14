"use client";

import { Minus, Plus } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  disabled?: boolean;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Miqdar",
  disabled = false,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center border border-border" role="group" aria-label={label}>
      <IconButton
        className="-m-px border-border"
        size="sm"
        onClick={decrease}
        disabled={disabled || value <= min}
      >
        <Minus aria-hidden="true" size={15} />
        <VisuallyHidden>Azalt</VisuallyHidden>
      </IconButton>
      <output className="min-w-11 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </output>
      <IconButton
        className="-m-px border-border"
        size="sm"
        onClick={increase}
        disabled={disabled || value >= max}
      >
        <Plus aria-hidden="true" size={15} />
        <VisuallyHidden>Artır</VisuallyHidden>
      </IconButton>
    </div>
  );
}
