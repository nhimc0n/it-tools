export function randomBytes(size: number): Uint8Array {
  const array = new Uint8Array(size);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < size; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return array;
}

export function getRandomValues<T extends ArrayBufferView | null>(array: T): T {
  if (array && typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(array);
  }
  return array;
}

export const webcrypto = typeof window !== 'undefined' ? window.crypto : undefined;

export default {
  randomBytes,
  getRandomValues,
  webcrypto,
};
