import { Project } from "src/domain/entities/Project"
import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import crypto from "crypto"

export interface CreateProjectDTO {
  creatorId: string
  title: string
  description: string
  repoUrl?: string
  liveUrl?: string
  completionDate?: Date
  competencies?: string[] // Array de strings com as tecnologias
}

export class CreateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: CreateProjectDTO): Promise<Project> {
    if (!data.title.trim()) {
      throw new Error("O título do projeto é obrigatório.")
    }

    if (!data.description.trim()) {
      throw new Error("A descrição do projeto é obrigatória.")
    }

    if (data.title.length < 3) {
      throw new Error("O título deve ter no mínimo 3 caracteres.")
    }

    if (data.description.length < 10) {
      throw new Error("A descrição deve ter no mínimo 10 caracteres.")
    }

    // Validar competências se fornecidas
    if (data.competencies && data.competencies.length > 20) {
      throw new Error("Máximo de 20 competências permitidas por projeto.")
    }

    const project = new Project({
      id: crypto.randomUUID(),
      creatorId: data.creatorId,
      title: data.title,
      description: data.description,
      repoUrl: data.repoUrl || null,
      liveUrl: data.liveUrl || null,
      completionDate: data.completionDate || null,
      competencies: data.competencies || [],
      createdAt: new Date(),
    })

    await this.projectRepository.create(project)

    return project
  }
}
