export const safePrice = (price: number): number => {
  return isNaN(price) ? 0 : price;
} 