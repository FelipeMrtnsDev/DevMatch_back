import { Project } from "src/domain/entities/Project";
import crypto from "crypto";
export class CreateProjectUseCase {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(data) {
        if (!data.title.trim()) {
            throw new Error("O título do projeto é obrigatório.");
        }
        if (!data.description.trim()) {
            throw new Error("A descrição do projeto é obrigatória.");
        }
        if (data.title.length < 3) {
            throw new Error("O título deve ter no mínimo 3 caracteres.");
        }
        if (data.description.length < 10) {
            throw new Error("A descrição deve ter no mínimo 10 caracteres.");
        }
        const project = new Project({
            id: crypto.randomUUID(),
            creatorId: data.creatorId,
            title: data.title,
            description: data.description,
            repoUrl: data.repoUrl || null,
            liveUrl: data.liveUrl || null,
            completionDate: data.completionDate || null,
            createdAt: new Date(),
        });
        await this.projectRepository.create(project);
        return project.getPublicProfile();
    }
}
