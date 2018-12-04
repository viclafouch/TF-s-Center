let search = function getSearch() {
    let search
    if (document.getElementById('masthead-search-term')) {
        search = document.getElementById('masthead-search-term').value
    }
    return { search }
}

export default search;