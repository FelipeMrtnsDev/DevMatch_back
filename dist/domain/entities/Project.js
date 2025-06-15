export class Project {
    id;
    creatorId;
    title;
    description;
    repoUrl;
    liveUrl;
    completionDate;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.creatorId = props.creatorId;
        this.title = props.title;
        this.description = props.description;
        this.repoUrl = props.repoUrl ?? null;
        this.liveUrl = props.liveUrl ?? null;
        this.completionDate = props.completionDate ?? null;
        this.createdAt = props.createdAt;
    }
    updateTitle(newTitle) {
        if (!newTitle.trim()) {
            throw new Error("Title cannot be empty");
        }
        this.title = newTitle;
    }
    updateDescription(newDescription) {
        if (!newDescription.trim()) {
            throw new Error("Description cannot be empty");
        }
        this.description = newDescription;
    }
    updateRepoUrl(newRepoUrl) {
        this.repoUrl = newRepoUrl;
    }
    updateLiveUrl(newLiveUrl) {
        this.liveUrl = newLiveUrl;
    }
    updateCompletionDate(newCompletionDate) {
        this.completionDate = newCompletionDate;
    }
    isCompleted() {
        return this.completionDate !== null;
    }
    markAsCompleted(completionDate) {
        this.completionDate = completionDate || new Date();
    }
    markAsIncomplete() {
        this.completionDate = null;
    }
    hasRepository() {
        return this.repoUrl !== null && this.repoUrl !== undefined && this.repoUrl.trim() !== "";
    }
    hasLiveDemo() {
        return this.liveUrl !== null && this.liveUrl !== undefined && this.liveUrl.trim() !== "";
    }
    getPublicProfile() {
        return {
            id: this.id,
            creatorId: this.creatorId,
            title: this.title,
            description: this.description,
            repoUrl: this.repoUrl,
            liveUrl: this.liveUrl,
            completionDate: this.completionDate,
            createdAt: this.createdAt,
            isCompleted: this.isCompleted(),
            hasRepository: this.hasRepository(),
            hasLiveDemo: this.hasLiveDemo(),
        };
    }
    getSummary() {
        return {
            id: this.id,
            title: this.title,
            description: this.description.length > 100 ? this.description.substring(0, 100) + "..." : this.description,
            isCompleted: this.isCompleted(),
            hasRepository: this.hasRepository(),
            hasLiveDemo: this.hasLiveDemo(),
            createdAt: this.createdAt,
        };
    }
}
