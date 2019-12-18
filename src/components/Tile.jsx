import React from 'react'

import useStyles from './jss/tile'

import { animated } from 'react-spring'


export const Tile = React.memo(({
    height,
    gradient,
    transform,
    style: overrides
}) => {
    const classes = useStyles()

    const style = {
        height,
        transform,
        backgroundImage: gradient,
        ...overrides ? overrides : {}
    }

    return <animated.span className={classes.root} style={style} />
})
