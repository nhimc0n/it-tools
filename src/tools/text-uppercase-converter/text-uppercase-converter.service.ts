export function toUppercase(text: string): string {
  return text.toUpperCase();
}

export function toLowercase(text: string): string {
  return text.toLowerCase();
}

export function toCapitalCase(text: string): string {
  return text
    .split(/(\s+)/)
    .map((part) => {
      if (part.trim().length === 0) return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
}

export function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)(\S)/g, (_, p1, p2) => p1 + p2.toUpperCase());
}

export function toToggleCase(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      }
      return char.toUpperCase();
    })
    .join('');
}
