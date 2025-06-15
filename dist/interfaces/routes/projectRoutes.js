import { Router } from "express";
import { ProjectController } from "src/interfaces/controllers/ProjectController";
import { ensureAuthenticated } from "src/middlewares/ensureAuthenticated.js";
import { CreateProjectUseCase } from "src/application/use-cases/ProjectUseCase/CreateProjectUseCase.js";
import { ListProjectsUseCase } from "src/application/use-cases/ProjectUseCase/ListProjectUseCase";
import { DeleteProjectUseCase } from "src/application/use-cases/ProjectUseCase/DeleteProjectUseCase.js";
import { ListOneProjectUseCase } from "src/application/use-cases/ProjectUseCase/ListOneProjectUseCase.js";
import { UpdateProjectUseCase } from "src/application/use-cases/ProjectUseCase/UpdateProjectUseCase.js";
import { CountProjectsUseCase } from "src/application/use-cases/ProjectUseCase/CountProjectsUseCase.js";
import { PaginateProjectsUseCase } from "src/application/use-cases/ProjectUseCase/PaginateProjectsUseCase.js";
import { FindProjectByIdUseCase } from "src/application/use-cases/ProjectUseCase/FindProjectByIdUseCase.js";
import { FindProjectsByCreatorIdUseCase } from "src/application/use-cases/ProjectUseCase/FindProjectsByCreatorIdUseCase.js";
import { MarkProjectAsCompletedUseCase } from "src/application/use-cases/ProjectUseCase/MarkProjectAsCompletedUseCase.js";
import { MarkProjectAsIncompleteUseCase } from "src/application/use-cases/ProjectUseCase/MarkProjectAsIncompleteUseCase.js";
import { InMemoryProjectRepository } from "src/infraestructure/repositories/InMemoryProjectRepository.js";
const router = Router();
const projectRepository = new InMemoryProjectRepository();
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const listProjectsUseCase = new ListProjectsUseCase(projectRepository);
const deleteProjectUseCase = new DeleteProjectUseCase(projectRepository);
const listOneProjectUseCase = new ListOneProjectUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const countProjectsUseCase = new CountProjectsUseCase(projectRepository);
const paginateProjectsUseCase = new PaginateProjectsUseCase(projectRepository);
const findProjectByIdUseCase = new FindProjectByIdUseCase(projectRepository);
const findProjectsByCreatorIdUseCase = new FindProjectsByCreatorIdUseCase(projectRepository);
const markProjectAsCompletedUseCase = new MarkProjectAsCompletedUseCase(projectRepository);
const markProjectAsIncompleteUseCase = new MarkProjectAsIncompleteUseCase(projectRepository);
const projectController = new ProjectController(createProjectUseCase, listProjectsUseCase, deleteProjectUseCase, listOneProjectUseCase, updateProjectUseCase, countProjectsUseCase, paginateProjectsUseCase, findProjectByIdUseCase, findProjectsByCreatorIdUseCase, markProjectAsCompletedUseCase, markProjectAsIncompleteUseCase);
// Criar projeto (requer autenticação)
router.post("/project", ensureAuthenticated, async (req, res) => {
    await projectController.create(req, res);
});
// Listar todos os projetos
router.get("/projects", async (req, res) => {
    await projectController.list(req, res);
});
// Buscar projeto específico por ID
router.get("/project/:id", async (req, res) => {
    await projectController.listOne(req, res);
});
// Buscar projetos por criador
router.get("/projects/creator/:creatorId", async (req, res) => {
    await projectController.findByCreatorId(req, res);
});
// Buscar meus projetos (requer autenticação)
router.get("/projects/my", ensureAuthenticated, async (req, res) => {
    await projectController.findMyProjects(req, res);
});
// Contar total de projetos
router.get("/projects/count", async (req, res) => {
    await projectController.count(req, res);
});
// Paginar projetos
router.get("/projects/paginate", async (req, res) => {
    await projectController.paginate(req, res);
});
// Buscar projeto por ID (método alternativo)
router.get("/project/find/id/:id", async (req, res) => {
    await projectController.findById(req, res);
});
// Atualizar projeto (requer autenticação)
router.put("/project", ensureAuthenticated, async (req, res) => {
    await projectController.update(req, res);
});
// Deletar projeto (requer autenticação)
router.delete("/project/:id", ensureAuthenticated, async (req, res) => {
    await projectController.delete(req, res);
});
// Marcar projeto como concluído (requer autenticação)
router.patch("/project/:id/complete", ensureAuthenticated, async (req, res) => {
    await projectController.markAsCompleted(req, res);
});
// Marcar projeto como não concluído (requer autenticação)
router.patch("/project/:id/incomplete", ensureAuthenticated, async (req, res) => {
    await projectController.markAsIncomplete(req, res);
});
export { router };
