import type { Project } from "../entities/Project"

export interface IProjectRepository {
  create(project: Project): Promise<void>
  findById(id: string): Promise<Project | null>
  findByCreatorId(creatorId: string): Promise<Project[]>
  findByTitle(title: string): Promise<Project | null>
  findCompleted(): Promise<Project[]>
  findIncomplete(): Promise<Project[]>
  findByCompetencies(competencies: string[], matchType: "any" | "all"): Promise<Project[]>
  findByCompetency(competency: string): Promise<Project[]>
  count(): Promise<number>
  countByCreatorId(creatorId: string): Promise<number>
  list(): Promise<Project[]>
  listOne(id: string): Promise<Project>
  delete(id: string): Promise<void>
  update(project: Project): Promise<Project>
  paginate(page: number, perPage: number): Promise<Project[]>
  paginateByCreatorId(creatorId: string, page: number, perPage: number): Promise<Project[]>
}
