import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export class ListOneProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.listOne(id)

    if (!project) {
      throw new Error("Projeto não encontrado.")
    }

    return project
  }
}
