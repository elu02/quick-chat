import { useContext } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { SocketContext } from '../SocketContext'

const useStyles = makeStyles(() => ({
    answerButton: {
        height: "30px",
        marginLeft: "10px"
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}))
const Notification = () => {
    const { answerCall, call, callOngoing } = useContext(SocketContext)
    const classes = useStyles()
    return (
        <div>
            {call.receiving && !callOngoing && (
                <div className={classes.container}>
                    <h2>{call.name} is calling, </h2>
                    <Button variant="contained" color="primary" className={classes.answerButton} onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Notification
