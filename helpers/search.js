module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }
    if(query){
        objectSearch.keyword = query;
        const regex = new RegExp(query, 'i');
        objectSearch.regex = regex;
    }
    return objectSearch;
}