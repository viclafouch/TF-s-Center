import moment from 'moment'

export class Search {
    constructor(
        search = {}
    ) {
        this.id = search.id || Math.floor(Math.random() * 1000000);
        this.value = search.value
        this.created = search.created ? moment(search.created) : moment()
        this.selected = false;
        this.templateId = search.templateId ? parseInt(search.templateId, 10) : null
    }

    getTemplate(context) {
        return context.state.templates.find(x => x.id == this.templateId) || {}
    }
}

export default Search