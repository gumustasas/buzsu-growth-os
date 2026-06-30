// lib/serper/types.ts
// Serper API ham response tipleri (serper.dev /search)

export interface SerperConfig {
  apiKey: string
  gl: string // ülke, örn 'tr'
  hl: string // dil, örn 'tr'
  location?: string // örn 'Turkey'
}

export interface SerperOrganicResult {
  position: number
  title: string
  link: string
  snippet?: string
  domain?: string
}

export interface SerperPaaItem {
  question: string
  snippet?: string
  link?: string
}

export interface SerperAnswerBox {
  snippet?: string
  title?: string
  link?: string
}

export interface SerperSearchResponse {
  searchParameters: { q: string; gl: string; hl: string }
  organic: SerperOrganicResult[]
  peopleAlsoAsk?: SerperPaaItem[]
  answerBox?: SerperAnswerBox
  knowledgeGraph?: Record<string, unknown>
}

/** Buzsu için izlenen hedef sorgular. */
export const TARGET_QUERIES: string[] = [
  'su arıtma cihazları',
  'su arıtma cihazı fiyat',
  'ev su arıtma sistemi',
  'ters osmoz su arıtma',
  'atıksız su arıtma',
  'su arıtma cihazı nasıl seçilir',
  'su arıtma cihazı bakımı',
]

export const BUZSU_DOMAIN = 'buzsu.com.tr'
export const SUVESU_DOMAIN = 'suvesu.com'
