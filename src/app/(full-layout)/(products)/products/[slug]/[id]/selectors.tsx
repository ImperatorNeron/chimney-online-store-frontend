'use client';
import { listReadProductVariationSchema } from '@/api/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SelectorsProps {
  fullItem: any;
  variation: listReadProductVariationSchema[number];
  slug: string;
}

const EXCLUDED_ATTRIBUTES = [
  'id',
  'price',
  'discount_price',
  'created_at',
  'updated_at',
  'discount_percentage'
];

const ATTRIBUTE_DISPLAY_NAMES: Record<string, string> = {
  diameter: 'Діаметр (мм)',
  length: 'Довжина (м)',
  thickness: 'Товщина (мм)',
  angle: 'Кут (°)',
  metal_type: 'Тип металу',
};

const NUMERIC_ATTRIBUTES = ['diameter', 'length', 'thickness', 'angle'];

export default function Selectors({ fullItem, variation, slug }: SelectorsProps) {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);

  if (!fullItem.variations || fullItem.variations.length <= 1) {
    return null;
  }

  const availableSelectors = getAvailableSelectors(fullItem.variations);

  if (availableSelectors.length === 0) {
    return null;
  }

  const currentAttributes: Record<string, string> = {};
  availableSelectors.forEach(({ attr }) => {
    currentAttributes[attr] = variation[attr as keyof typeof variation]?.toString() || '';
  });

  const handleClick = async (attr: keyof typeof variation, value: string) => {
    if (variation[attr] === value || isLocked) return;

    const desired = { ...currentAttributes, [attr]: value };
    const variationId = findVariationByAttributes(fullItem.variations, desired)
      ?? findClosestVariation(fullItem.variations, desired, attr);

    if (!variationId) return;
    setIsLocked(true);
    router.push(`/products/${slug}/${variationId}`, { scroll: false });
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      {availableSelectors.map(({ attr, displayName, values }) => (
        <div key={attr} className="flex flex-col md:flex-row md:items-center gap-1">
          <label className="text-sm font-medium text-gray-700 min-w-[120px]">
            {displayName}
          </label>
          <div className="flex flex-wrap gap-2 flex-1">
            {values.map((value) => {
              const isActive = variation[attr as keyof typeof variation] === value;
              const isAvailable = isComboAvailable(fullItem.variations, currentAttributes, attr, value);

              return (
                <button
                  key={value}
                  onClick={() => handleClick(attr as keyof typeof variation, value)}
                  disabled={isActive || isLocked}
                  title={!isAvailable && !isActive ? 'Ця комбінація недоступна' : undefined}
                  className={`px-3 py-1.5 text-sm border rounded transition-all duration-200 flex items-center justify-center min-w-[40px] ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : isLocked
                        ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                        : isAvailable
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                          : 'bg-white text-gray-400 border-dashed border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function isComboAvailable(
  variations: listReadProductVariationSchema,
  currentAttributes: Record<string, string>,
  changedAttr: string,
  changedValue: string,
): boolean {
  const desired = { ...currentAttributes, [changedAttr]: changedValue };
  return variations.some(v =>
    Object.entries(desired).every(([attr, val]) =>
      v[attr as keyof typeof v]?.toString() === val
    )
  );
}

function getAvailableSelectors(variations: listReadProductVariationSchema) {
  const varyingAttributes = getVaryingAttributes(variations);

  return varyingAttributes
    .map((attr) => {
      const values = getUniqueValuesForAttribute(variations, attr);
      return {
        attr,
        displayName: ATTRIBUTE_DISPLAY_NAMES[attr] || attr,
        values,
      };
    })
    .filter((selector) => selector.values.length > 1);
}

function getVaryingAttributes(variations: listReadProductVariationSchema): string[] {
  if (!variations || variations.length <= 1) return [];

  const attributes = new Set<string>();
  const firstVariation = variations[0];

  for (const key in firstVariation) {
    if (
      typeof (firstVariation as Record<string, unknown>)[key] !== 'object' &&
      !EXCLUDED_ATTRIBUTES.includes(key) &&
      variations.some((v) => (v as Record<string, unknown>)[key] !== (firstVariation as Record<string, unknown>)[key])
    ) {
      attributes.add(key);
    }
  }

  return Array.from(attributes);
}

function getUniqueValuesForAttribute(variations: listReadProductVariationSchema, attr: string): string[] {
  const values = new Set<string>();
  variations.forEach((v) => {
    const value = v[attr as keyof typeof v];
    if (value !== undefined && value !== null && value !== '') {
      values.add(value.toString());
    }
  });

  const sortedValues = Array.from(values);
  if (NUMERIC_ATTRIBUTES.includes(attr)) {
    return sortedValues.sort((a, b) => parseFloat(a) - parseFloat(b));
  }
  return sortedValues.sort();
}

function findVariationByAttributes(
  variations: listReadProductVariationSchema,
  attributes: Record<string, string>
): number | undefined {
  const variation = variations.find(v => {
    return Object.keys(attributes).every(attr => {
      return v[attr as keyof typeof v]?.toString() === attributes[attr];
    });
  });
  return variation?.id;
}

function findClosestVariation(
  variations: listReadProductVariationSchema,
  desired: Record<string, string>,
  changedAttr: string,
): number | undefined {
  const candidates = variations.filter(
    (v: any) => v[changedAttr]?.toString() === desired[changedAttr]
  );
  if (candidates.length === 0) return undefined;

  const otherAttrs = Object.keys(desired).filter(a => a !== changedAttr);
  let best = candidates[0];
  let bestScore = 0;

  for (const v of candidates) {
    let score = 0;
    for (const attr of otherAttrs) {
      if ((v as any)[attr]?.toString() === desired[attr]) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }

  return best.id;
}
