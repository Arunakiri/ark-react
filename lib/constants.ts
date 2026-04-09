export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function getImagePath(path: string): string {
  // If it already starts with http, return as-is (external URLs)
  if (path.startsWith('http')) {
    return path;
  }
  
  // Add basePath prefix to public assets
  if (path.startsWith('/')) {
    return `${BASE_PATH}${path}`;
  }
  
  return path;
}
