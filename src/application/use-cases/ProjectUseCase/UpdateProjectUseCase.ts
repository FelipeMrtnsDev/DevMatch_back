import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export interface UpdateProjectDTO {
  id: string
  title?: string
  description?: string
  repoUrl?: string | null
  liveUrl?: string | null
  completionDate?: Date | null
  competencies?: string[]
}

export class UpdateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: UpdateProjectDTO): Promise<Project> {
    const project = await this.projectRepository.findById(data.id)

    if (!project) {
      throw new Error("Projeto não encontrado.")
    }

    if (data.title !== undefined) {
      if (!data.title.trim()) {
        throw new Error("O título não pode estar vazio.")
      }
      if (data.title.length < 3) {
        throw new Error("O título deve ter no mínimo 3 caracteres.")
      }
      project.updateTitle(data.title)
    }

    if (data.description !== undefined) {
      if (!data.description.trim()) {
        throw new Error("A descrição não pode estar vazia.")
      }
      if (data.description.length < 10) {
        throw new Error("A descrição deve ter no mínimo 10 caracteres.")
      }
      project.updateDescription(data.description)
    }

    if (data.repoUrl !== undefined) {
      project.updateRepoUrl(data.repoUrl)
    }

    if (data.liveUrl !== undefined) {
      project.updateLiveUrl(data.liveUrl)
    }

    if (data.completionDate !== undefined) {
      project.updateCompletionDate(data.completionDate)
    }

    if (data.competencies !== undefined) {
      if (data.competencies.length > 20) {
        throw new Error("Máximo de 20 competências permitidas por projeto.")
      }
      project.updateCompetencies(data.competencies)
    }

    const updatedProject = await this.projectRepository.update(project)

    return updatedProject
  }
}
