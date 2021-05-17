import React from 'react'
import { Typography, AppBar, Toolbar, FormControlLabel, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AcUnit, Brightness5 } from '@material-ui/icons'

import VideoPlayer from './VideoPlayer'
import Notification from './Notification'
import Options from './Options'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        background: theme.bg,
    },
    title: {
        fontSize: "48px",
        fontWeight: "200"
    },
    appBar: {
        fontWeight: "fontWeightBold",
        background: theme.navbg,
        color: theme.textcol
    },
    tempSwitch: {
        marginLeft: "0px",
        marginRight: "-5px"
    }, 
    coolIcon: {
        marginLeft: "auto"
    }
}))

const Site = ({ temperature, setTemperature }) => {
    const classes = useStyles()

    const toggleChecked = () => {
        if (temperature === "cool") {
            setTemperature("warm")
        } else {
            setTemperature("cool")
        }
    }

    return (
        <div>
            <main className={classes.root}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Toolbar>
                        <Typography className={classes.title}>
                            Quick Chat
                        </Typography>
                        <AcUnit className={classes.coolIcon}/>
                        <FormControlLabel className={classes.tempSwitch}
                            control={<Switch checked={temperature === "cool"} onChange={toggleChecked} />}
                            label=""
                        />
                        <Brightness5 />
                    </Toolbar>
                </AppBar>
                <VideoPlayer />
                <Options>
                    <Notification />
                </Options>
            </main>
        </div>
    )
}

export default Site
