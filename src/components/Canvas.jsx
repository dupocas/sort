import React from 'react'

import useStyles from './jss/canvas'

export const Canvas = ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}