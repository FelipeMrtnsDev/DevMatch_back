import type { Request, Response } from "express"
import type { CreateProjectUseCase } from "../../application/use-cases/ProjectUseCase/CreateProjectUseCase"
import type { ListProjectsUseCase } from "../../application/use-cases/ProjectUseCase/ListProjectUseCase"
import type { DeleteProjectUseCase } from "../../application/use-cases/ProjectUseCase/DeleteProjectUseCase"
import type { ListOneProjectUseCase } from "../../application/use-cases/ProjectUseCase/ListOneProjectUseCase"
import type { UpdateProjectUseCase } from "../../application/use-cases/ProjectUseCase/UpdateProjectUseCase"
import type { CountProjectsUseCase } from "../../application/use-cases/ProjectUseCase/CountProjectsUseCase"
import type { PaginateProjectsUseCase } from "../../application/use-cases/ProjectUseCase/PaginateProjectsUseCase"
import type { FindProjectByIdUseCase } from "../../application/use-cases/ProjectUseCase/FindProjectByIdUseCase"
import type { FindProjectsByCreatorIdUseCase } from "../../application/use-cases/ProjectUseCase/FindProjectsByCreatorIdUseCase"
import type { MarkProjectAsCompletedUseCase } from "../../application/use-cases/ProjectUseCase/MarkProjectAsCompletedUseCase"
import type { MarkProjectAsIncompleteUseCase } from "../../application/use-cases/ProjectUseCase/MarkProjectAsIncompleteUseCase"
import jwt from "jsonwebtoken"

export class ProjectController {
  constructor(
    private createProjectUseCase: CreateProjectUseCase,
    private listProjectsUseCase: ListProjectsUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private listOneProjectUseCase: ListOneProjectUseCase,
    private updateProjectUseCase: UpdateProjectUseCase,
    private countProjectsUseCase: CountProjectsUseCase,
    private paginateProjectsUseCase: PaginateProjectsUseCase,
    private findProjectByIdUseCase: FindProjectByIdUseCase,
    private findProjectsByCreatorIdUseCase: FindProjectsByCreatorIdUseCase,
    private markProjectAsCompletedUseCase: MarkProjectAsCompletedUseCase,
    private markProjectAsIncompleteUseCase: MarkProjectAsIncompleteUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { title, description, repoUrl, liveUrl, completionDate } = req.body
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      const project = await this.createProjectUseCase.execute({
        creatorId: decoded.id,
        title,
        description,
        repoUrl,
        liveUrl,
        completionDate: completionDate ? new Date(completionDate) : undefined,
      })

      return res.status(201).json(project)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const projects = await this.listProjectsUseCase.execute()
      return res.status(200).json(projects)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async listOne(req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    try {
      const project = await this.listOneProjectUseCase.execute(id)
      return res.status(200).json(project)
    } catch (error) {
      const err = error as Error
      return res.status(404).json({ message: err.message })
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    try {
      const project = await this.findProjectByIdUseCase.execute(id)

      if (!project) {
        return res.status(404).json({ message: "Projeto não encontrado" })
      }

      return res.status(200).json(project)
    } catch (error) {
      const err = error as Error
      return res.status(500).json({ message: err.message })
    }
  }

  async findByCreatorId(req: Request, res: Response): Promise<Response> {
    const creatorId = req.params.creatorId

    try {
      const projects = await this.findProjectsByCreatorIdUseCase.execute(creatorId)
      return res.status(200).json(projects)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async findMyProjects(req: Request, res: Response): Promise<Response> {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
      const projects = await this.findProjectsByCreatorIdUseCase.execute(decoded.id)
      return res.status(200).json(projects)
    } catch (error) {
      const err = error as Error
      return res.status(401).json({ message: "Token inválido: " + err.message })
    }
  }

  async count(req: Request, res: Response): Promise<Response> {
    try {
      const totalProjects = await this.countProjectsUseCase.execute()
      return res.status(200).json({ totalProjects })
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async paginate(req: Request, res: Response): Promise<Response> {
    const page = Math.max(1, Number(req.query.page) || 1)
    const perPage = Math.max(1, Number(req.query.perPage) || 10)

    try {
      const projects = await this.paginateProjectsUseCase.execute(page, perPage)
      return res.status(200).json(projects)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id, title, description, repoUrl, liveUrl, completionDate } = req.body
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      // Verificar se o projeto existe e se o usuário é o criador
      const existingProject = await this.findProjectByIdUseCase.execute(id)

      if (!existingProject) {
        return res.status(404).json({ message: "Projeto não encontrado" })
      }

      if (existingProject.creatorId !== decoded.id) {
        return res.status(403).json({ message: "Você não tem permissão para editar este projeto" })
      }

      const updatedProject = await this.updateProjectUseCase.execute({
        id,
        title,
        description,
        repoUrl,
        liveUrl,
        completionDate: completionDate ? new Date(completionDate) : undefined,
      })

      return res.status(200).json(updatedProject)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      // Verificar se o projeto existe e se o usuário é o criador
      const existingProject = await this.findProjectByIdUseCase.execute(id)

      if (!existingProject) {
        return res.status(404).json({ message: "Projeto não encontrado" })
      }

      if (existingProject.creatorId !== decoded.id) {
        return res.status(403).json({ message: "Você não tem permissão para deletar este projeto" })
      }

      await this.deleteProjectUseCase.execute(id)
      return res.status(204).send()
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async markAsCompleted(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const { completionDate } = req.body
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      // Verificar se o projeto existe e se o usuário é o criador
      const existingProject = await this.findProjectByIdUseCase.execute(id)

      if (!existingProject) {
        return res.status(404).json({ message: "Projeto não encontrado" })
      }

      if (existingProject.creatorId !== decoded.id) {
        return res.status(403).json({ message: "Você não tem permissão para modificar este projeto" })
      }

      const updatedProject = await this.markProjectAsCompletedUseCase.execute(
        id,
        completionDate ? new Date(completionDate) : undefined,
      )

      return res.status(200).json(updatedProject)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }

  async markAsIncomplete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      // Verificar se o projeto existe e se o usuário é o criador
      const existingProject = await this.findProjectByIdUseCase.execute(id)

      if (!existingProject) {
        return res.status(404).json({ message: "Projeto não encontrado" })
      }

      if (existingProject.creatorId !== decoded.id) {
        return res.status(403).json({ message: "Você não tem permissão para modificar este projeto" })
      }

      const updatedProject = await this.markProjectAsIncompleteUseCase.execute(id)

      return res.status(200).json(updatedProject)
    } catch (error) {
      const err = error as Error
      return res.status(400).json({ message: err.message })
    }
  }
}
