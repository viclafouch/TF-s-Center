export class Search {
    constructor(
        search = {}
    ) {
        this.id = search.id || Math.floor(Math.random() * 1000000);
        this.value = search.value
        this.created = search.created ? new Date(search.created) : new Date()
        this.selected = false;
        this.flagged = search.flagged || 0;
        this.autoSelect = search.autoSelect || false;
        this.templateId = search.templateId ? parseInt(search.templateId) : null
    }

    getTemplate(context) {
        return context.state.templates.find(x => x.id == this.templateId) || {}
    }
}

export default Search