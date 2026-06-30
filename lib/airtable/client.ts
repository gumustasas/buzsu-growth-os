// lib/airtable/client.ts
// Airtable connector client — production-ready interface, live çağrı stub.
//
// Bu sprintte gerçek API çağrısı YAPILMAZ. USE_MOCK_DATA=true iken mock
// veri döner; live mod stub olarak NotImplemented fırlatır.

import { isMock } from '../../config/feature-flags'
import type { Product, ProductOverviewData } from '../../types/product'
import { PRODUCTS_TABLE_ID, PRODUCTS_FIELD_IDS } from './types'

export interface AirtableClient {
  /** Tüm aktif ürünleri döner. */
  listProducts(): Promise<Product[]>
  /** Dashboard widget'ı için ürün özeti. */
  getProductOverview(): Promise<ProductOverviewData>
}

// --- Mock veri (TASK-003 Airtable snapshot'ından) ---

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'rec6N4cIPgDjWFPHb',
    name: '5 Aşamalı RO Su Arıtma Sistemi',
    category: 'Su Aritma',
    priceTry: 13749,
    buzsuUrl: 'https://www.buzsu.com.tr/code-su-aritma-cihazi/',
    active: true,
    notes: 'Bestseller. 5 filtre aşama. Kurulum dahil. En sık sorulan ürün.',
  },
  {
    id: 'recQHKKmYpmizO1c2',
    name: 'Atıksız Su Arıtma Cihazı',
    category: 'Su Aritma',
    priceTry: 9749,
    buzsuUrl: 'https://www.buzsu.com.tr/atiksiz-su-aritma-cihazi/',
    active: true,
    notes: 'Atık su üretmez. Kurulum gerektirmez. Kiracılar için.',
  },
  {
    id: 'recRjPhML9cOi5sN8',
    name: '7 Aşamalı RO Su Arıtma Sistemi',
    category: 'Su Aritma',
    priceTry: 12999,
    buzsuUrl: 'https://www.buzsu.com.tr/uv-filtreli-tezgah-alti-su-aritma-cihazi-pompali-model/',
    active: true,
    notes: 'Premium model. UV sterilizasyon dahil.',
  },
  {
    id: 'recjwetUxnjUyYUZc',
    name: 'Dijital TDS Metre',
    category: 'TDS Metre',
    priceTry: 450,
    buzsuUrl: 'https://www.buzsu.com.tr/tds-metre/',
    active: true,
    notes: 'Düşük bilet, yüksek hacim. İyi giriş ürünü.',
  },
  {
    id: 'reckhPWCISkmuueBS',
    name: "Yıllık Filtre Seti (5'li)",
    category: 'Filtre',
    priceTry: 3390,
    buzsuUrl: 'https://www.buzsu.com.tr/code-su-aritma-cihazi-5-li-filtre-seti-made-in-korea/',
    active: true,
    notes: 'Mevcut müşteri tekrarlayan geliri. 6-12 ayda bir hatırlat.',
  },
]

function buildOverview(products: Product[], source: 'mock' | 'airtable'): ProductOverviewData {
  const schemaReadyCount = products.filter(
    (p) => p.sku && p.imageUrl && p.schemaDescription
  ).length
  return {
    products,
    activeCount: products.filter((p) => p.active).length,
    totalCount: products.length,
    schemaReadyCount,
    source,
    lastUpdated: new Date().toISOString(),
  }
}

// --- Mock client ---

class MockAirtableClient implements AirtableClient {
  async listProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS
  }
  async getProductOverview(): Promise<ProductOverviewData> {
    return buildOverview(MOCK_PRODUCTS, 'mock')
  }
}

// --- Live client (STUB — future implementation) ---

class LiveAirtableClient implements AirtableClient {
  // TODO(sprint-4): apiKey + baseId env'den okunup gerçek REST çağrısı yapılacak.
  //   const url = `https://api.airtable.com/v0/${baseId}/${PRODUCTS_TABLE_ID}`
  //   fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
  //   Alan eşleştirmesi: PRODUCTS_FIELD_IDS kullanılır.
  private notImplemented(): never {
    throw new Error(
      '[airtable] Live mode henüz uygulanmadı. USE_MOCK_DATA=true kullanın. ' +
        `Tablo: ${PRODUCTS_TABLE_ID}, alanlar: ${Object.keys(PRODUCTS_FIELD_IDS).join(', ')}`
    )
  }
  async listProducts(): Promise<Product[]> {
    return this.notImplemented()
  }
  async getProductOverview(): Promise<ProductOverviewData> {
    return this.notImplemented()
  }
}

/** Feature-flag'e göre uygun client'ı döndüren fabrika. */
export function createAirtableClient(): AirtableClient {
  return isMock('airtable') ? new MockAirtableClient() : new LiveAirtableClient()
}
