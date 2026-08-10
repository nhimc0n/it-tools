export function extname(path: string): string {
  if (!path) return '';
  const match = /\.([^./\\]+)$/.exec(path);
  return match ? `.${match[1]}` : '';
}

export function basename(path: string, ext?: string): string {
  if (!path) return '';
  const parts = path.split(/[/\\]/);
  let name = parts.pop() || '';
  if (ext && name.endsWith(ext)) {
    name = name.slice(0, -ext.length);
  }
  return name;
}

export function dirname(path: string): string {
  if (!path) return '.';
  const parts = path.split(/[/\\]/);
  parts.pop();
  return parts.join('/') || '.';
}

export function join(...paths: string[]): string {
  return paths.filter(Boolean).join('/').replace(/\/+/g, '/');
}

export function resolve(...paths: string[]): string {
  return join(...paths);
}

export const sep = '/';
export const delimiter = ':';

export default {
  extname,
  basename,
  dirname,
  join,
  resolve,
  sep,
  delimiter,
};
