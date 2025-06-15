import type { IProjectRepository } from "src/domain/repositories/IProjectRepository"

export class CountProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<number> {
    return this.projectRepository.count()
  }
}
