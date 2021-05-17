import { useContext } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
          width: '300px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
        marginTop: "30px"
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
}));

function VideoPlayer() {
    const {name, callOngoing, myVideo, userVideo, stream, call } = useContext(SocketContext)
    const classes = useStyles()

    return (
        <Grid container className={classes.gridContainer}>
            {
                stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">{name}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>)
            }
            {
                callOngoing && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">{call.name}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>)
            }
        </Grid>
    )
}

export default VideoPlayer
