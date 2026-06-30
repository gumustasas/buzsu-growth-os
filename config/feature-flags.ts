// config/feature-flags.ts
// Mock ↔ Real veri geçişi ve connector aktivasyon bayrakları.
// Gerçek API çağrısı YOK — bu sprintte yalnızca anahtar okuması yapılır.

/**
 * Ortam değişkenini boolean'a çevirir. Tanımsız ise varsayılana düşer.
 */
function envBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback
  return value.toLowerCase() === 'true' || value === '1'
}

/**
 * Global mock anahtarı.
 * USE_MOCK_DATA=true  → tüm connector'lar mock veri döner (varsayılan).
 * USE_MOCK_DATA=false → connector'lar live moduna geçer (stub implementasyon).
 */
export const USE_MOCK_DATA: boolean = envBool(
  process.env.USE_MOCK_DATA,
  true // güvenli varsayılan: mock
)

/**
 * Connector bazlı aktivasyon. Bir connector'ın live çalışabilmesi için:
 *   USE_MOCK_DATA=false  VE  ilgili ENABLE_* bayrağı true olmalı.
 */
export const FEATURE_FLAGS = {
  airtable: envBool(process.env.ENABLE_AIRTABLE, false),
  serper: envBool(process.env.ENABLE_SERPER, false),
  gsc: envBool(process.env.ENABLE_GSC, false),
  ga4: envBool(process.env.ENABLE_GA4, false),
  merchant: envBool(process.env.ENABLE_MERCHANT, false),
} as const

export type ConnectorName = keyof typeof FEATURE_FLAGS

/**
 * Bir connector mock modunda mı çalışmalı?
 * Global mock açıksa ya da connector'a özel bayrak kapalıysa → mock.
 */
export function isMock(connector: ConnectorName): boolean {
  if (USE_MOCK_DATA) return true
  return !FEATURE_FLAGS[connector]
}

/**
 * Connector'ın live çalışıp çalışmadığını döndürür (isMock'un tersi).
 */
export function isLive(connector: ConnectorName): boolean {
  return !isMock(connector)
}

/**
 * Hata ayıklama / dashboard durum widget'ı için tüm bayrakların özeti.
 */
export function flagSummary() {
  return {
    useMockData: USE_MOCK_DATA,
    connectors: { ...FEATURE_FLAGS },
    resolved: {
      airtable: isMock('airtable') ? 'mock' : 'live',
      serper: isMock('serper') ? 'mock' : 'live',
      gsc: isMock('gsc') ? 'mock' : 'live',
      ga4: isMock('ga4') ? 'mock' : 'live',
      merchant: isMock('merchant') ? 'mock' : 'live',
    },
  }
}
