import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"
import type { Project } from "src/domain/entities/Project"

export class MarkProjectAsIncompleteUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new Error("Projeto não encontrado.")
    }

    project.markAsIncomplete()

    const updatedProject = await this.projectRepository.update(project)

    return updatedProject
  }
}
