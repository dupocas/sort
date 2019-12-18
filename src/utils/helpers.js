import gradients from './gradients'

export const spawnTiles = n => {
    const tiles = []
    for (let i = 0; i < n; i++) {
        tiles.push({
            id: i + 1,
            gradient: gradients[randomInt(0, gradients.length - 1)],
            height: randomInt(200, 550)
        })
    }

    return tiles
}

export const randomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
