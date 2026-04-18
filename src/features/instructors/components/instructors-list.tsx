import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface StarRatingProps {
  value: number;
  size?: number;
  onChange?: (n: number) => void;
}

/**
 * StarRating Component
 * Used for both displaying ratings and capturing user input.
 */
export function StarRating({ value, size = 16, onChange }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="inline-flex items-center gap-1" dir="ltr">
      {stars.map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          className={cn(
            "flex items-center justify-center transition-all",
            onChange ? "hover:scale-110 active:scale-95 cursor-pointer" : "cursor-default"
          )}
          aria-label={`${n} Stars`}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              n <= Math.round(value)
                ? "fill-orange-400 text-orange-400"
                : "fill-gray-200 text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}