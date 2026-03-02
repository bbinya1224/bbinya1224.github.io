export const toRouteSegment = (value: string): string =>
  encodeURIComponent(value).replaceAll('%', '~');

