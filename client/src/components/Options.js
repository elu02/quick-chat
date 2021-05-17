import { useState, useContext } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Phone, PhoneDisabled } from '@material-ui/icons'

import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
         marginTop: 20,
    },
    padding: {
         padding: 20,
    },
    paper: {
        width: '600px',
        padding: '10px 20px',
        border: '2px solid black',
    },
    yourID: {
        paddingTop: "20px"
    }
}));

const Options = ({ children }) => {
    const { client, callOngoing, name, setName, leaveCall, callUser } = useContext(SocketContext)
    const [ call, setCall ] = useState('')
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography variant="h6">Your Info</Typography>
                            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
                            <Typography variant="h6" className={classes.yourID}>Your ID: {client}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography variant="h6">Make a Call</Typography>
                            <TextField label="ID to Call" value={call} onChange={e => setCall(e.target.value)} />
                            {callOngoing ? (
                                <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<PhoneDisabled frontSize="large"/>}
                                fullWidth
                                onClick={leaveCall}
                                className={classes.margin}>
                                    Hang Up
                                </Button>
                            ) : (
                                <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Phone />}
                                fullWidth
                                onClick={() => callUser(call)}
                                className={classes.margin}>
                                    Call
                                </Button>
                            )}
                        </Grid>
                     </Grid>
                </form>
                {children}
            </Paper>
        </Container>
        
    )
}

export default Options
