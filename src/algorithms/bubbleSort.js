export function* bubble(arr, key = 'height') {
    const items = [...arr]
    const iterations = items.length

    for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < (iterations - i - 1); j++) {
            if (items[j][key] > items[j + 1][key]) {
                const tmp = items[j]
                items[j] = items[j + 1]
                items[j + 1] = tmp
                yield items
            }
        }
    }

    return items
}