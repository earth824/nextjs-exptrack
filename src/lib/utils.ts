import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Decimal } from 'decimal.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDecimalWithComma(value: Decimal) {
  const [int, decimal] = value.toFixed(2).split('.');
  const intWithComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${intWithComma}.${decimal}`;
}

export async function simulateLoading(delay: number) {
  await new Promise(resolve => setTimeout(() => resolve(null), delay * 1000));
}
