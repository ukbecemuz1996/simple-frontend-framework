// mapJoin map over array and then join result string to be appened to the html
Array.prototype.mapJoin = function (callback) {
    return this.map(callback).join("");
};