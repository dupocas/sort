import React, { useState, useEffect, useReducer } from 'react'

import { Canvas } from './components/Canvas'
import { spawnTiles } from './utils/helpers'
import { Tile } from './components/Tile'

import { useTransition, config } from 'react-spring'
import { bubble } from './algorithms/bubbleSort'
import { insertion } from './algorithms/insertionSort'

import useStyles from './styles'

const DURATION = 500
const OFFSET = 1.5
const SLEEP = 2000
const NUM_TILES = 15

const hash = {
    bubble,
    insertion,
}

const data = spawnTiles(NUM_TILES)

const initialState = {
    tiles: data,
    updater: hash.insertion(data),
    done: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'REGENERATE': return {
            ...state,
            updater: hash[action.payload](state.tiles),
            algorithm: action.payload
        }
        case 'UPDATE': {
            const { done, value } = state.updater.next()
            if (done)
                clearInterval(interval)
            return {
                ...state,
                tiles: value,
                done
            }
        }
        case 'SHUFFLE': {
            const tiles = spawnTiles(NUM_TILES)
            return {
                ...state,
                tiles,
                updater: hash[state.algorithm](tiles),
                done: false
            }
        }
        default: return state
    }
}

let interval

export const App = () => {
    const classes = useStyles()

    const [state, dispatch] = useReducer(reducer, null, () => initialState)
    const [algorithm, setAlgorithm] = useState('insertion')

    const [reset, setReset] = useState(false)

    const { tiles } = state

    useEffect(() => {
        dispatch({
            type: 'REGENERATE',
            payload: algorithm
        })
    }, [algorithm])

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

    if (state.done && !reset) {
        setReset(true)
    }

    const transitions = useTransition(
        tiles.map((tile, i) => ({ ...tile, y: (60 * i) * OFFSET })),
        t => t.id,
        {
            from: { height: 0, opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y, height }) => ({ y, height, opacity: 1 }),
            update: ({ y, height }) => ({ y, height }),
            config: config.stiff
        }
    )
    return (
        <div className={classes.root}>
            <span className={classes.title}>
                {algorithm === 'bubble' ? 'Bubble Sort' : 'Insertion Sort'}
            </span>
            <Canvas>
                {
                    transitions.map(({ item, props: { y, ...rest }, key }, index) => (
                        <Tile
                            key={key}
                            style={{
                                zIndex: data.length - index,
                                transform: y.interpolate(y => `translate3d(${y}px,0,0)`),
                                backgroundImage: item.gradient,
                                ...rest
                            }}
                        />
                    ))
                }
            </Canvas>
        </div>
    )
}