import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export interface FindProjectsByCompetenciesDTO {
  competencies: string[]
  matchType?: "any" | "all"
}

export class FindProjectsByCompetenciesUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: FindProjectsByCompetenciesDTO): Promise<Project[]> {
    if (!data.competencies || data.competencies.length === 0) {
      throw new Error("Pelo menos uma competência deve ser fornecida.")
    }

    const matchType = data.matchType || "any"

    return this.projectRepository.findByCompetencies(data.competencies, matchType)
  }
}
