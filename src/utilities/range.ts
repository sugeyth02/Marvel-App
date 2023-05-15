export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    return start + index;
  });
}
