let add = (function () {
    let sum = 0;

    function result(num) {
        sum += num;
        return result;
    }

    result.toString = () => sum.toString();

    return result
})();