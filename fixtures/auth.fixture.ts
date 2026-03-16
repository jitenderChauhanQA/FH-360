import * as path from 'path';

// ── Auth Session Paths ───────────────────────────────────────
// Used by playwright.config.ts projects and Cucumber world

export const AUTH_PATHS = {
  cspAgent: path.resolve('./auth/csp-agent.json'),
  retailBanker: path.resolve('./auth/retail-banker.json'),
  commercialBanker: path.resolve('./auth/commercial-banker.json'),
  mortgageOfficer: path.resolve('./auth/mortgage-officer.json'),
} as const;

export type AuthProfile = keyof typeof AUTH_PATHS;

export function getAuthPath(profile: AuthProfile): string {
  return AUTH_PATHS[profile];
}
