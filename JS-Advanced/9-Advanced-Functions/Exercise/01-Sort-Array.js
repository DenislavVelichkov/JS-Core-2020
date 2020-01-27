let sort = (arr, sortMethod) => arr.sort((a, b) => sortMethod === 'desc' // ver 1
    ? b - a
    : a - b);

function sort2(arr, sortMethod) { // Judge friendly  
    return arr.sort((a, b) => {
        return sortMethod === 'desc' ? b - a : a - b;
    });
}

console.log(sort2([3, 1, 2, 10], 'asc'))