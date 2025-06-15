interface ProjectProps {
  id: string
  creatorId: string
  title: string
  description: string
  repoUrl?: string | null
  liveUrl?: string | null
  completionDate?: Date | null
  competencies: string[]
  createdAt: Date
}

export class Project {
  public readonly id: string
  public readonly creatorId: string
  public title: string
  public description: string
  public repoUrl?: string | null
  public liveUrl?: string | null
  public completionDate?: Date | null
  public competencies: string[]
  public readonly createdAt: Date

  constructor(props: ProjectProps) {
    this.id = props.id
    this.creatorId = props.creatorId
    this.title = props.title
    this.description = props.description
    this.repoUrl = props.repoUrl ?? null
    this.liveUrl = props.liveUrl ?? null
    this.completionDate = props.completionDate ?? null
    this.competencies = props.competencies || []
    this.createdAt = props.createdAt
  }

  public updateTitle(newTitle: string) {
    if (!newTitle.trim()) {
      throw new Error("Title cannot be empty")
    }
    this.title = newTitle
  }

  public updateDescription(newDescription: string) {
    if (!newDescription.trim()) {
      throw new Error("Description cannot be empty")
    }
    this.description = newDescription
  }

  public updateRepoUrl(newRepoUrl: string | null) {
    this.repoUrl = newRepoUrl
  }

  public updateLiveUrl(newLiveUrl: string | null) {
    this.liveUrl = newLiveUrl
  }

  public updateCompletionDate(newCompletionDate: Date | null) {
    this.completionDate = newCompletionDate
  }

  // Métodos para gerenciar competências
  public updateCompetencies(newCompetencies: string[]) {
    // Remove duplicatas e strings vazias, converte para lowercase para consistência
    this.competencies = [
      ...new Set(newCompetencies.map((comp) => comp.trim().toLowerCase()).filter((comp) => comp.length > 0)),
    ]
  }

  public addCompetency(competency: string) {
    const normalizedCompetency = competency.trim().toLowerCase()
    if (normalizedCompetency && !this.hasCompetency(normalizedCompetency)) {
      this.competencies.push(normalizedCompetency)
    }
  }

  public removeCompetency(competency: string) {
    const normalizedCompetency = competency.trim().toLowerCase()
    this.competencies = this.competencies.filter((comp) => comp !== normalizedCompetency)
  }

  public hasCompetency(competency: string): boolean {
    const normalizedCompetency = competency.trim().toLowerCase()
    return this.competencies.includes(normalizedCompetency)
  }

  public getCompetencies(): string[] {
    return [...this.competencies]
  }

  public getCompetencyCount(): number {
    return this.competencies.length
  }

  public hasAnyCompetency(competencies: string[]): boolean {
    const normalizedCompetencies = competencies.map((comp) => comp.trim().toLowerCase())
    return this.competencies.some((comp) => normalizedCompetencies.includes(comp))
  }

  public hasAllCompetencies(competencies: string[]): boolean {
    const normalizedCompetencies = competencies.map((comp) => comp.trim().toLowerCase())
    return normalizedCompetencies.every((comp) => this.competencies.includes(comp))
  }

  public getCompetenciesDisplay(): string[] {
    return this.competencies.map((comp) => comp.charAt(0).toUpperCase() + comp.slice(1))
  }

  public isCompleted(): boolean {
    return this.completionDate !== null
  }

  public markAsCompleted(completionDate?: Date) {
    this.completionDate = completionDate || new Date()
  }

  public markAsIncomplete() {
    this.completionDate = null
  }

  public hasRepository(): boolean {
    return this.repoUrl !== null && this.repoUrl !== undefined && this.repoUrl.trim() !== ""
  }

  public hasLiveDemo(): boolean {
    return this.liveUrl !== null && this.liveUrl !== undefined && this.liveUrl.trim() !== ""
  }
}
