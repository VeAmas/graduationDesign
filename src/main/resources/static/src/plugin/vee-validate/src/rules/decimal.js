export default (value, [decimals] = ['*']) => {
    if (Array.isArray(value)) {
        return false;
    }

    if (value === null || value === undefined || value === '') {
        return true;
    }

    // if is 0.
    if (Number(decimals) === 0) {
        return /^-?\d*$/.test(value);
    }

    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
    const regex = new RegExp(`^-?\\d*(\\.\\d${regexPart})?$`);

    if (! regex.test(value)) {
        return false;
    }

    return ! Number.isNaN(parseFloat(value));
};
