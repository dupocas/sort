## A concept to demonstrate the use of generators along with hooks and spring animations
Visualization of sorting algorithms using springs and generators

This is a conceptual example of how to integrate [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator), [hooks](https://reactjs.org/docs/hooks-intro.html), [spring animations](https://developer.android.com/guide/topics/graphics/spring-animation), [dynamic styles interpolation and static styles sharing](https://dupocas/dudaui).

## Basics
Generators go really well with React's runtime! Combined with hooks flexibility we can create complex animations and interpolations without worrying about time.
The basic gist is to await for the entropy evaluate to `0` which mean that the `spring` is now at rest. After spring's reaches equilibrium we ask for the next ordering move **yielded** until equilibrium. This iteration can be described as 

```
useEffect(() => {
    const updater = () => dispatch({ type: 'UPDATE' })
    let timeout
    if (reset) {
        clearInterval(interval)
        setReset(false)
        timeout = setTimeout(() => {
            dispatch({ type: 'SHUFFLE' })
            setAlgorithm(a => a === 'bubble' ? 'insertion' : 'bubble')
        }, SLEEP)
    }

    if (!reset)
        interval = setInterval(updater, DURATION)


    return () => {
        clearInterval(interval)
        clearTimeout(timeout)
    }
}, [reset])
```

>Note that the `timeout` here is not being used to yield the execution nor acting as blocking, it is merely here to change among algorithms after the execution of the current one. The system is still timeless

---

## The generator
Here is an example of [bubble sort](https://en.wikipedia.org/wiki/Bubble_sort) being used with generators

```
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
```

The next move is computed first 

```
if (items[j][key] > items[j + 1][key]) {
    const tmp = items[j]
    items[j] = items[j + 1]
    items[j + 1] = tmp
    ...
}
```
And then the partial array is **yielded** until the next iteration

`yield items`

## Cool, but why?
Generators are really underestimated in React's ecosystem. React's async nature goes really well with generators, when developing non blocking UIs we need to keep awereness of the most useful tools and generators are for sure one of them. Combined with static styles sharing, dynamic interpolation on a non blocking runtime such as React's we have in our hands an extremely powerfull set of technologies wich allow us to express UI as a timeless iterations, turning trivial things such as animation chains, trails, theming and internationalization. This is a simple example to elucidate the use of a much complex usecase...
