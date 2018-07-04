let search = function getSearch() {
    if (document.getElementById('masthead-search-term')) {
        return document.getElementById('masthead-search-term').value
    }
    return null;
}

export default search;