export function* insertion(arr, key = 'height') {
    const copy = [...arr]
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1
        let tmp = copy[i]
        yield copy
        while (j >= 0 && copy[j][key] > tmp[key]) {
            copy[j + 1] = copy[j]
            j--
        }
        copy[j + 1] = tmp
    }
    return copy
}