// lib/airtable/types.ts
// Airtable connector'a özel ham/istek tipleri

export interface AirtableConfig {
  apiKey: string
  baseId: string
}

export interface AirtableFieldIds {
  productName: string
  category: string
  priceTry: string
  buzsuUrl: string
  suvesuArticle: string
  active: string
  notes: string
  // TASK-004 ile eklenecek alanlar (henüz Airtable'da yok)
  sku?: string
  imageUrl?: string
  schemaDescription?: string
}

/** Products tablosu field ID haritası (connectors/airtable/README.md ile senkron). */
export const PRODUCTS_TABLE_ID = 'tbldogYQwAQr24UWE'
export const PRODUCTS_FIELD_IDS: AirtableFieldIds = {
  productName: 'fldXLw08VVVF8Aquz',
  category: 'fldLXUPLXEO2HHFK9',
  priceTry: 'fldEds5Vy1frHlw3e',
  buzsuUrl: 'fldOZXnwqNzgddMxj',
  suvesuArticle: 'fldtwQlkCIWyljJdW',
  active: 'fldOjYbJvwIvEMPNs',
  notes: 'fldmnDYpfEoJX5P0Y',
  // sku / imageUrl / schemaDescription: Airtable'da oluşturulunca eklenecek
}

export interface AirtableRecord<T = Record<string, unknown>> {
  id: string
  createdTime: string
  fields: T
}

export interface AirtableListResponse<T = Record<string, unknown>> {
  records: AirtableRecord<T>[]
  offset?: string
}
