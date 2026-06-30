// lib/ga4/client.ts
// Google Analytics 4 connector — davranış + WhatsApp dönüşüm.
// Live çağrı stub; bu sprintte mock döner.

import { isMock } from '../../config/feature-flags'
import type { Ga4OverviewData, Ga4MetricRow } from './types'
import { GA4_WHATSAPP_EVENT, GA4_TARGET_PAGE } from './types'

export interface Ga4Client {
  /** Genel davranış + WhatsApp dönüşüm özeti. */
  getOverview(): Promise<Ga4OverviewData>
}

// --- Mock veri ---

const MOCK_TOP_PAGES: Ga4MetricRow[] = [
  { dimension: '/su-aritma-cihazlari/', sessions: 1240, users: 1090, bounceRate: 0.42 },
  { dimension: '/code-su-aritma-cihazi/', sessions: 680, users: 610, bounceRate: 0.38 },
  { dimension: '/atiksiz-su-aritma-cihazi/', sessions: 410, users: 370, bounceRate: 0.45 },
  { dimension: '/tds-metre/', sessions: 220, users: 200, bounceRate: 0.51 },
]

class MockGa4Client implements Ga4Client {
  async getOverview(): Promise<Ga4OverviewData> {
    const totalSessions = MOCK_TOP_PAGES.reduce((s, p) => s + p.sessions, 0)
    const whatsappClicks = 96
    return {
      totalSessions,
      totalUsers: MOCK_TOP_PAGES.reduce((s, p) => s + p.users, 0),
      whatsappClicks,
      whatsappClickRate: Math.round((whatsappClicks / totalSessions) * 1000) / 1000,
      topPages: MOCK_TOP_PAGES,
      source: 'mock',
      lastUpdated: new Date().toISOString(),
    }
  }
}

// --- Live client (STUB) ---

class LiveGa4Client implements Ga4Client {
  // TODO(sprint-4): GA4 Data API runReport
  //   property: properties/{propertyId}
  //   metrics: sessions, totalUsers; dimensions: pagePath
  //   WhatsApp event: eventName === GA4_WHATSAPP_EVENT
  private notImplemented(): never {
    throw new Error(
      `[ga4] Live mode henüz uygulanmadı. WhatsApp event: ${GA4_WHATSAPP_EVENT}, ` +
        `hedef sayfa: ${GA4_TARGET_PAGE}. USE_MOCK_DATA=true kullanın.`
    )
  }
  async getOverview(): Promise<Ga4OverviewData> {
    return this.notImplemented()
  }
}

export function createGa4Client(): Ga4Client {
  return isMock('ga4') ? new MockGa4Client() : new LiveGa4Client()
}
