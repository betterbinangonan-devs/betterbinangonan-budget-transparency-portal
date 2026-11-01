/**
 * Binangonan Transparency Portal
 */
import { defineConfig } from './src/config';

export default defineConfig({
  id: 'binangonan-rizal',
  kind: 'municipality',
  name: 'Municipality of Binangonan, Rizal',
  shortName: 'Binangonan',
  operator: { name: 'BetterBinangonan.org', url: 'https://betterbinangonan.org' },
  siteUrl: 'https://budget.betterbinangonan.org',
  scope: {
    places: [{ label: 'Binangonan', region: 'IV-A' }],
    districts: ['leg:rizal:1st'],
    exclude: [
      {
        key: 'gaa:18-001|completion of multi purpose building binangonan payao zamboanga sibugay',
        reason: 'Barangay Binangonan in Payao, Zamboanga Sibugay: a namesake, not Binangonan, Rizal.',
      },
      {
        key: 'gaa:18-001|concreting of local roadsjunction imeldaalicia road binangonannanan road payao zamboanga sibugay',
        reason: 'Barangay Binangonan in Payao, Zamboanga Sibugay: a namesake, not Binangonan, Rizal.',
      },
      {
        key: 'gaa:18-001|road widening including drainage  binangonan  angono  taytay diversion road angono section angono rizal',
        reason: 'The Angono Section of the Binangonan–Angono–Taytay Diversion Road, located in Angono.',
      },
    ],
  },
  navLinks: [
    { label: 'BetterBinangonan.org', href: 'https://betterbinangonan.org' },
    { label: 'Binangonan DPWH Infra Projects', href: 'https://dpwh-projects.betterbinangonan.org' },
  ],
  reporting: { enabled: false },
});