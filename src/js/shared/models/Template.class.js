import moment from 'moment'

export class Template {
    constructor(
        template = {}
    ) {
        this.id = template.id || Math.floor(Math.random() * 1000000);
        this.title = template.title
        this.description = template.description
        this.type = template.type
        this.created = template.created ? moment(template.created) : moment()
    }
}

export default Template