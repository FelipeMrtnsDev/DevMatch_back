import type { Project } from "src/domain/entities/Project"
import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"

export class ListProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.list()

    return projects
  }
}
