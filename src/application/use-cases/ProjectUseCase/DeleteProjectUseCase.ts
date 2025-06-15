import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"

export class DeleteProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id)

    if (!project) {
      throw new Error("Projeto não encontrado.")
    }

    await this.projectRepository.delete(id)
  }
}
