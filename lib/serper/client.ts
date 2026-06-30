// lib/serper/client.ts
// Serper connector client — SERP + PAA + AI Overview verisi.
// Live çağrı stub; bu sprintte mock döner.

import { isMock } from '../../config/feature-flags'
import type { SeoOverviewData, KeywordRanking } from '../../types/seo'
import type { GeoOverviewData, PaaQuestion, AiOverviewSignal } from '../../types/geo'
import { TARGET_QUERIES, BUZSU_DOMAIN } from './types'

export interface SerperClient {
  /** SEO widget'ı için anahtar kelime sıralamaları. */
  getSeoOverview(): Promise<SeoOverviewData>
  /** GEO widget'ı için AI Overview + PAA durumu. */
  getGeoOverview(): Promise<GeoOverviewData>
}

// --- Mock veri (TASK-001 SERP tahminlerinden) ---

const MOCK_KEYWORDS: KeywordRanking[] = [
  { query: 'su arıtma cihazları', position: 9, searchVolume: 8100, trend: 'flat' },
  { query: 'su arıtma cihazı fiyat', position: 14, searchVolume: 4400, trend: 'down' },
  { query: 'ev su arıtma sistemi', position: 18, searchVolume: 2900, trend: 'flat' },
  { query: 'ters osmoz su arıtma', position: 22, searchVolume: 1600, trend: 'up' },
]

const MOCK_PAA: PaaQuestion[] = [
  { question: 'Su arıtma cihazı nasıl seçilir?', answeredByBuzsu: true, answeredBySuvesu: false },
  { question: 'Ters osmoz sistemi ne kadar dayanır?', answeredByBuzsu: false, answeredBySuvesu: false },
  { question: 'Su arıtma cihazı sağlıklı mı?', answeredByBuzsu: false, answeredBySuvesu: false },
  { question: 'Atıksız su arıtma ne demek?', answeredByBuzsu: true, answeredBySuvesu: false },
  { question: 'Su arıtma cihazı bakımı ne zaman yapılır?', answeredByBuzsu: false, answeredBySuvesu: false },
]

const MOCK_AI_SIGNALS: AiOverviewSignal[] = [
  { query: 'su arıtma cihazı nasıl seçilir', appearsInAiOverview: true, buzsuCited: false, capturedAt: '2026-06-30' },
  { query: 'kireçli su zararları', appearsInAiOverview: true, buzsuCited: false, capturedAt: '2026-06-30' },
]

function avg(nums: number[]): number | null {
  const valid = nums.filter((n) => Number.isFinite(n))
  if (!valid.length) return null
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10
}

// --- Mock client ---

class MockSerperClient implements SerperClient {
  async getSeoOverview(): Promise<SeoOverviewData> {
    const positions = MOCK_KEYWORDS.map((k) => k.position ?? NaN)
    return {
      trackedKeywords: MOCK_KEYWORDS,
      averagePosition: avg(positions),
      topRankingQuery: 'su arıtma cihazları',
      source: 'mock',
      lastUpdated: new Date().toISOString(),
    }
  }

  async getGeoOverview(): Promise<GeoOverviewData> {
    const covered = MOCK_PAA.filter((p) => p.answeredByBuzsu || p.answeredBySuvesu).length
    return {
      aiOverviewSignals: MOCK_AI_SIGNALS,
      paaCoverage: MOCK_PAA,
      eeatSignals: [
        { label: 'FAQ schema → AI alıntı', status: 'strong', note: '6 soru mevcut' },
        { label: 'E-E-A-T sinyali', status: 'medium' },
        { label: 'Serper AI snippet', status: 'missing', note: 'Connector live değil' },
      ],
      paaCoveredCount: covered,
      paaTotalCount: MOCK_PAA.length,
      source: 'mock',
      lastUpdated: new Date().toISOString(),
    }
  }
}

// --- Live client (STUB) ---

class LiveSerperClient implements SerperClient {
  // TODO(sprint-4): POST https://google.serper.dev/search
  //   headers: { 'X-API-KEY': apiKey }, body: { q, gl:'tr', hl:'tr' }
  //   TARGET_QUERIES üzerinde döngü, organic[].domain === BUZSU_DOMAIN ile pozisyon bul.
  private notImplemented(): never {
    throw new Error(
      `[serper] Live mode henüz uygulanmadı. İzlenen sorgular: ${TARGET_QUERIES.length}, ` +
        `hedef domain: ${BUZSU_DOMAIN}. USE_MOCK_DATA=true kullanın.`
    )
  }
  async getSeoOverview(): Promise<SeoOverviewData> {
    return this.notImplemented()
  }
  async getGeoOverview(): Promise<GeoOverviewData> {
    return this.notImplemented()
  }
}

export function createSerperClient(): SerperClient {
  return isMock('serper') ? new MockSerperClient() : new LiveSerperClient()
}
