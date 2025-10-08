import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | undefined | null | false | Record<string, boolean>>) {
  // Merge tailwind classes safely
  return twMerge(clsx(inputs));
}
