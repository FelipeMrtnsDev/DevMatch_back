import type { IProjectRepository } from "../../domain/repositories/IProjectRepository.js"
import type { Project } from "../../domain/entities/Project.js"

export class InMemoryProjectRepository implements IProjectRepository {
  private projects: Project[] = []

  async create(project: Project): Promise<void> {
    this.projects.push(project)
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) || null
  }

  async findByCreatorId(creatorId: string): Promise<Project[]> {
    return this.projects.filter((project) => project.creatorId === creatorId)
  }

  async findByTitle(title: string): Promise<Project | null> {
    return this.projects.find((project) => project.title.toLowerCase() === title.toLowerCase()) || null
  }

  async findCompleted(): Promise<Project[]> {
    return this.projects.filter((project) => project.isCompleted())
  }

  async findIncomplete(): Promise<Project[]> {
    return this.projects.filter((project) => !project.isCompleted())
  }

  async findByCompetencies(competencies: string[], matchType: "any" | "all"): Promise<Project[]> {
    const normalizedCompetencies = competencies.map((comp) => comp.trim().toLowerCase())

    return this.projects.filter((project) => {
      if (matchType === "all") {
        return project.hasAllCompetencies(normalizedCompetencies)
      } else {
        return project.hasAnyCompetency(normalizedCompetencies)
      }
    })
  }

  async findByCompetency(competency: string): Promise<Project[]> {
    return this.projects.filter((project) => project.hasCompetency(competency))
  }

  async count(): Promise<number> {
    return this.projects.length
  }

  async countByCreatorId(creatorId: string): Promise<number> {
    return this.projects.filter((project) => project.creatorId === creatorId).length
  }

  async list(): Promise<Project[]> {
    return this.projects
  }

  async listOne(id: string): Promise<Project> {
    const project = this.projects.find((obj: Project) => obj.id === id)
    if (!project) throw new Error("Projeto não encontrado")
    return project
  }

  async delete(id: string): Promise<void> {
    const index = this.projects.findIndex((p) => p.id === id)
    if (index === -1) throw new Error("Projeto não encontrado")

    this.projects.splice(index, 1)
  }

  async update(project: Project): Promise<Project> {
    const index = this.projects.findIndex((p) => p.id === project.id)
    if (index === -1) throw new Error("Projeto não encontrado")

    this.projects[index] = project
    return project
  }

  async paginate(page: number, perPage: number): Promise<Project[]> {
    const start = (page - 1) * perPage
    return this.projects.slice(start, start + perPage)
  }

  async paginateByCreatorId(creatorId: string, page: number, perPage: number): Promise<Project[]> {
    const creatorProjects = this.projects.filter((project) => project.creatorId === creatorId)
    const start = (page - 1) * perPage
    return creatorProjects.slice(start, start + perPage)
  }

  // Métodos auxiliares
  async clear(): Promise<void> {
    this.projects = []
  }

  async seed(projects: Project[]): Promise<void> {
    this.projects = [...projects]
  }

  async findByTitleContaining(searchTerm: string): Promise<Project[]> {
    return this.projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  async findByDescriptionContaining(searchTerm: string): Promise<Project[]> {
    return this.projects.filter((project) => project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  async findWithRepository(): Promise<Project[]> {
    return this.projects.filter((project) => project.hasRepository())
  }

  async findWithLiveDemo(): Promise<Project[]> {
    return this.projects.filter((project) => project.hasLiveDemo())
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Project[]> {
    return this.projects.filter((project) => project.createdAt >= startDate && project.createdAt <= endDate)
  }

  async findCompletedByCreatorId(creatorId: string): Promise<Project[]> {
    return this.projects.filter((project) => project.creatorId === creatorId && project.isCompleted())
  }

  async findIncompleteByCreatorId(creatorId: string): Promise<Project[]> {
    return this.projects.filter((project) => project.creatorId === creatorId && !project.isCompleted())
  }
}
