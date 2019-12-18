function* quick(arr) {
    if (arr.length <= 1) {
        return arr
    } else {

        const left = []
        const right = []
        const pivot = arr.pop()
        const length = arr.length
        yield arr
        for (let i = 0; i < length; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }

        }
        return [].concat(yield* quick(left), pivot, yield* quick(right))
    }
}

const generator = quick([1, 2, 5, 4, 12, 7])

const log = () => {
    let next = generator.next()
    do {
        console.log(next.value, next.done)
    } while (!next.done)
}

log()