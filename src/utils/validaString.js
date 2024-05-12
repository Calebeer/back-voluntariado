function isNumber(string) {
    return /^[0-9]+$/.test(string);
}

module.exports = isNumber