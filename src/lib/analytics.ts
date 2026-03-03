import { createSign } from 'node:crypto';
import { getSortedPosts, toPostData } from './posts';

const GA_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GA_REPORT_URL = (propertyId: string) =>
  `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

const base64UrlEncode = (value: string) =>
  Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

const signJwt = (payload: Record<string, unknown>, privateKey: string) => {
  const header = { alg: 'RS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();

  const signature = signer
    .sign(privateKey, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

  return `${unsignedToken}.${signature}`;
};

const getGoogleAccessToken = async ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string;
  privateKey: string;
}) => {
  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt(
    {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: GA_TOKEN_URL,
      exp: now + 3600,
      iat: now,
    },
    privateKey,
  );

  const response = await fetch(GA_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) return null;

  try {
    const data = await response.json();
    return typeof data.access_token === 'string' ? data.access_token : null;
  } catch {
    return null;
  }
};

let cachedSlugs: { data: string[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

const extractPostSlug = (path: string) => {
  const matched = path.match(/^\/posts\/([^/?#]+)\/?$/);
  return matched?.[1] ?? null;
};

const getPopularPostSlugsFromGA = async (): Promise<string[]> => {
  if (cachedSlugs && Date.now() < cachedSlugs.expiresAt)
    return cachedSlugs.data;

  const propertyId = import.meta.env.GA_PROPERTY_ID;
  const clientEmail = import.meta.env.GA_CLIENT_EMAIL;
  const privateKeyRaw = import.meta.env.GA_PRIVATE_KEY;

  if (!propertyId || !clientEmail || !privateKeyRaw) return [];

  const privateKey = String(privateKeyRaw).replace(/\\n/g, '\n');
  const accessToken = await getGoogleAccessToken({ clientEmail, privateKey });
  if (!accessToken) return [];

  const response = await fetch(GA_REPORT_URL(propertyId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 100,
    }),
  });

  if (!response.ok) return [];

  try {
    const data = await response.json();
    const rows: unknown[] = Array.isArray(data.rows) ? data.rows : [];
    const slugs = rows
      .map((row) => {
        const dims = (row as Record<string, unknown[]>)?.dimensionValues;
        return (dims?.[0] as Record<string, unknown>)?.value;
      })
      .filter((v): v is string => typeof v === 'string')
      .map(extractPostSlug)
      .filter((v): v is string => v !== null);

    const result = Array.from(new Set(slugs));
    cachedSlugs = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };
    return result;
  } catch {
    return [];
  }
};

export async function getPopularPosts(limit = 3) {
  const sortedPosts = await getSortedPosts();
  const fallbackPosts = sortedPosts.slice(0, limit).map(toPostData);

  try {
    const popularSlugs = await getPopularPostSlugsFromGA();
    if (popularSlugs.length === 0) return fallbackPosts;

    const postMap = new Map(
      sortedPosts.map((post) => [post.data.slug || post.id, toPostData(post)]),
    );
    const gaPosts = popularSlugs
      .map((slug) => postMap.get(slug))
      .filter((post): post is ReturnType<typeof toPostData> => Boolean(post));

    const seen = new Set<string>();
    const merged = [...gaPosts, ...fallbackPosts].filter((post) => {
      if (seen.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    });

    return merged.slice(0, limit);
  } catch {
    return fallbackPosts;
  }
}
