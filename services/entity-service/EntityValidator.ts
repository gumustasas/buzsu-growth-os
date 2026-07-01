// services/entity-service/EntityValidator.ts
// Bütünlük denetimi — zorunlu alan kontrolü, related_entities çözünürlüğü,
// 'published' durumu için ek şart kontrolü. Sonuç insan onayı akışında
// (CLAUDE.md draft → onay → PR) kullanılmak üzere tasarlanmıştır; hiçbir
// alanı otomatik düzeltmez, yalnızca raporlar.

import type { Entity, ValidationIssue, ValidationResult } from './types'
import type { EntityRepository } from './EntityRepository'
import type { EntityResolver } from './EntityResolver'

const REQUIRED_FIELDS: Array<keyof Entity['frontmatter']> = [
  'entity_type', 'schema_type', 'name_tr', 'status',
]

export interface EntityValidator {
  validate(id: string): ValidationResult
  validateAll(): ValidationResult[]
}

export class DefaultEntityValidator implements EntityValidator {
  constructor(
    private readonly repository: EntityRepository,
    private readonly resolver: EntityResolver
  ) {}

  validate(id: string): ValidationResult {
    const entity = this.repository.getById(id)
    if (!entity) {
      return {
        valid: false,
        entityId: id,
        issues: [{ entityId: id, severity: 'error', field: 'id', message: 'Entity bulunamadı' }],
      }
    }
    const issues: ValidationIssue[] = [
      ...this.checkRequiredFields(entity),
      ...this.checkRelations(entity),
      ...this.checkPublishReadiness(entity),
    ]
    return { valid: issues.every((i) => i.severity !== 'error'), entityId: id, issues }
  }

  validateAll(): ValidationResult[] {
    return this.repository.getAll().map((e) => this.validate(e.id))
  }

  private checkRequiredFields(entity: Entity): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    for (const field of REQUIRED_FIELDS) {
      if (!entity.frontmatter[field]) {
        issues.push({
          entityId: entity.id,
          severity: 'error',
          field: String(field),
          message: `Zorunlu alan eksik: ${String(field)}`,
        })
      }
    }
    return issues
  }

  private checkRelations(entity: Entity): ValidationIssue[] {
    const { broken } = this.resolver.resolveReferences(entity.frontmatter.related_entities ?? [])
    return broken.map((target) => ({
      entityId: entity.id,
      severity: 'warning' as const,
      field: 'related_entities',
      message: `Çözülemeyen ilişki: ${target}`,
    }))
  }

  private checkPublishReadiness(entity: Entity): ValidationIssue[] {
    if (entity.frontmatter.status !== 'published') return []
    const issues: ValidationIssue[] = []
    if (!entity.frontmatter.buzsu_url && !entity.frontmatter.suvesu_url) {
      issues.push({
        entityId: entity.id,
        severity: 'error',
        field: 'buzsu_url',
        message: "'published' durumu için en az bir URL (buzsu_url/suvesu_url) gerekli",
      })
    }
    if (!entity.body || entity.body.trim().length === 0) {
      issues.push({
        entityId: entity.id,
        severity: 'warning',
        field: 'body',
        message: "'published' entity için gövde içeriği boş",
      })
    }
    return issues
  }
}
