// lib/merchant/client.ts
// Google Merchant Center connector — ürün feed durumu + fiyat doğrulama.
// Live çağrı stub; bu sprintte mock döner.

import { isMock } from '../../config/feature-flags'
import type { MerchantOverviewData, MerchantProductStatus } from './types'

export interface MerchantClient {
  /** Ürün feed durum özeti. */
  getOverview(): Promise<MerchantOverviewData>
}

// --- Mock veri (SKU'lar TASK-004 önerisinden) ---

const MOCK_ITEMS: MerchantProductStatus[] = [
  { productId: 'online:tr:TRY:BZS-RO5-001', sku: 'BZS-RO5-001', title: '5 Aşamalı RO Su Arıtma Sistemi', status: 'pending', priceTry: 13749 },
  { productId: 'online:tr:TRY:BZS-ATK-002', sku: 'BZS-ATK-002', title: 'Atıksız Su Arıtma Cihazı', status: 'pending', priceTry: 9749 },
  { productId: 'online:tr:TRY:BZS-RO7-003', sku: 'BZS-RO7-003', title: '7 Aşamalı RO UV', status: 'pending', priceTry: 12999 },
  { productId: 'online:tr:TRY:BZS-TDS-004', sku: 'BZS-TDS-004', title: 'Dijital TDS Metre', status: 'pending', priceTry: 450 },
  { productId: 'online:tr:TRY:BZS-FLT-005', sku: 'BZS-FLT-005', title: "Yıllık Filtre Seti (5'li)", status: 'pending', priceTry: 3390 },
]

class MockMerchantClient implements MerchantClient {
  async getOverview(): Promise<MerchantOverviewData> {
    return {
      items: MOCK_ITEMS,
      approvedCount: MOCK_ITEMS.filter((i) => i.status === 'approved').length,
      disapprovedCount: MOCK_ITEMS.filter((i) => i.status === 'disapproved').length,
      priceMismatchCount: 0,
      source: 'mock',
      lastUpdated: new Date().toISOString(),
    }
  }
}

// --- Live client (STUB) ---

class LiveMerchantClient implements MerchantClient {
  // TODO(sprint-4): Content API for Shopping
  //   GET .../content/v2.1/{merchantId}/productstatuses
  //   Fiyat doğrulama: Airtable Price TRY ↔ MC price
  private notImplemented(): never {
    throw new Error(
      '[merchant] Live mode henüz uygulanmadı. USE_MOCK_DATA=true kullanın.'
    )
  }
  async getOverview(): Promise<MerchantOverviewData> {
    return this.notImplemented()
  }
}

export function createMerchantClient(): MerchantClient {
  return isMock('merchant') ? new MockMerchantClient() : new LiveMerchantClient()
}
