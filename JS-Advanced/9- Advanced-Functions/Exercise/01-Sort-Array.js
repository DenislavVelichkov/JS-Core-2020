let sort = (arr, sortMethod) => arr.sort((a, b) => sortMethod === 'desc'
    ? b - a
    : a - b);