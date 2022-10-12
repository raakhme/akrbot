export function withDots(value: string | undefined, maxLength: number) {
  if (!value) return '';
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}...`;
}
