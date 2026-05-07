function binarySearchByID(books, id) {
    let start = 0;
    let end = books.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (books[mid].id === id) return mid;
        if (books[mid].id > id) end = mid - 1;
        else start = mid + 1;
    }
    return -1;
}

function validator(bookObject) {
    const { title, author, year } = bookObject;
    if (!title || !author || !year) {
        return false;
    }
    return true;
}

module.exports = {
    binarySearchByID,validator
}