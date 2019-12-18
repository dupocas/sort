import { makeStyles } from "@dudaui/styles";

export default makeStyles({
    root: {
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        padding: 20,
        backgroundColor: '#d4ebf2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        position: 'absolute',
        top: 600,
        fontSize: 22,
        fontWeight: 700,
        color: '#495057'
    }
})