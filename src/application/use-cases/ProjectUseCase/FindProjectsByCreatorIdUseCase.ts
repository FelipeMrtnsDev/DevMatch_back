import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export class FindProjectsByCreatorIdUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(creatorId: string): Promise<Project[]> {
    return this.projectRepository.findByCreatorId(creatorId)
  }
}
