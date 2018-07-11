import moment from 'moment'

export class Search {
    constructor(
        search = {}
    ) {
        this.id = search.id || Math.floor(Math.random() * 1000000);
        this.value = search.value
        this.created = search.created ? moment(search.created) : moment()
        this.selected = false;
    }
}

export default Search