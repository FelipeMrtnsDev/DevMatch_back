import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"

export interface CompetencyCount {
  competency: string
  count: number
}

export class GetPopularCompetenciesUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(limit = 20): Promise<CompetencyCount[]> {
    const projects = await this.projectRepository.list()

    const competencyMap = new Map<string, number>()

    projects.forEach((project) => {
      project.getCompetencies().forEach((competency) => {
        const count = competencyMap.get(competency) || 0
        competencyMap.set(competency, count + 1)
      })
    })

    const competencyCounts: CompetencyCount[] = Array.from(competencyMap.entries())
      .map(([competency, count]) => ({ competency, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)

    return competencyCounts
  }
}
