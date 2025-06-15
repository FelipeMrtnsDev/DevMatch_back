import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export class FindProjectByIdUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id)
  }
}
