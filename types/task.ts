// types/task.ts
// Görev (tasks/) durum tipleri

export type TaskStatus = 'pending' | 'active' | 'partial' | 'done' | 'blocked'

export type TaskArea =
  | 'seo'
  | 'geo'
  | 'cro'
  | 'schema'
  | 'content'
  | 'commerce'
  | 'automation'
  | 'platform'

export interface TaskItem {
  id: string // örn TASK-005, SPRINT-002
  title: string
  area: TaskArea
  status: TaskStatus
  filePath?: string
  blockedBy?: string
}

export interface TasksOverviewData {
  tasks: TaskItem[]
  activeCount: number
  blockedCount: number
  doneCount: number
  source: 'mock' | 'filesystem'
  lastUpdated: string
}
