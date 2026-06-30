// lib/gsc/client.ts
// Google Search Console connector — organik performans.
// Live çağrı stub; bu sprintte mock döner.

import { isMock } from '../../config/feature-flags'
import type { GscPerformanceRow } from './types'
import { GSC_SITE_URL, GSC_TARGET_PAGE } from './types'

export interface GscClient {
  /** Son 28 günün sorgu bazlı performansı. */
  getTopQueries(limit?: number): Promise<GscPerformanceRow[]>
  /** Hedef sayfanın ortalama pozisyonu. */
  getTargetPagePosition(): Promise<number | null>
}

// --- Mock veri ---

const MOCK_QUERIES: GscPerformanceRow[] = [
  { query: 'su arıtma cihazları', clicks: 142, impressions: 8800, ctr: 0.016, position: 9.2 },
  { query: 'su arıtma cihazı fiyat', clicks: 64, impressions: 5200, ctr: 0.012, position: 14.1 },
  { query: 'buzsu su arıtma', clicks: 210, impressions: 2400, ctr: 0.087, position: 1.8 },
  { query: 'atıksız su arıtma cihazı', clicks: 38, impressions: 1900, ctr: 0.02, position: 11.4 },
  { query: 'ev su arıtma sistemi', clicks: 29, impressions: 3100, ctr: 0.009, position: 18.3 },
]

class MockGscClient implements GscClient {
  async getTopQueries(limit = 20): Promise<GscPerformanceRow[]> {
    return MOCK_QUERIES.slice(0, limit)
  }
  async getTargetPagePosition(): Promise<number | null> {
    return 9.2 // /su-aritma-cihazlari/ ortalama (mock)
  }
}

// --- Live client (STUB) ---

class LiveGscClient implements GscClient {
  // TODO(sprint-4): Google service account ile JWT → searchAnalytics.query
  //   POST .../sites/{GSC_SITE_URL}/searchAnalytics/query
  //   body: { startDate, endDate, dimensions:['query'], rowLimit }
  private notImplemented(): never {
    throw new Error(
      `[gsc] Live mode henüz uygulanmadı. Site: ${GSC_SITE_URL}, hedef: ${GSC_TARGET_PAGE}. ` +
        'USE_MOCK_DATA=true kullanın.'
    )
  }
  async getTopQueries(): Promise<GscPerformanceRow[]> {
    return this.notImplemented()
  }
  async getTargetPagePosition(): Promise<number | null> {
    return this.notImplemented()
  }
}

export function createGscClient(): GscClient {
  return isMock('gsc') ? new MockGscClient() : new LiveGscClient()
}
