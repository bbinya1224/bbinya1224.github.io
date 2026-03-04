export const DEFAULT_OG_IMAGE_PATH = '/img/main/img_cover.png';

export const normalizeCanonicalUrl = (rawUrl: string, siteOrigin: string): string => {
  let normalized: URL;

  try {
    normalized = new URL(rawUrl, siteOrigin);
  } catch {
    return rawUrl;
  }

  normalized.search = '';
  normalized.hash = '';

  if (normalized.pathname !== '/' && !normalized.pathname.endsWith('/')) {
    normalized.pathname = `${normalized.pathname}/`;
  }

  return normalized.href;
};
