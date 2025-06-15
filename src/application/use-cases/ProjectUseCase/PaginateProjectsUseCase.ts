import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export class PaginateProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(page: number, perPage: number): Promise<Project[]> {
    const projects = await this.projectRepository.paginate(page, perPage)

    return projects
  }
}
