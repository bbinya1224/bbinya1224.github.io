export const DEFAULT_SITE_ORIGIN = 'https://bbinya1224.github.io';

export const resolveSiteOrigin = (site?: URL | null) =>
  site?.origin ?? DEFAULT_SITE_ORIGIN;

