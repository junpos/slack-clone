import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { StarBorderOutlined, InfoOutlined } from '@material-ui/icons'


const useStyles = makeStyles({
    chat: {
        flex: 0.75,
        flexGrow: 1,
        overflowY: 'scroll',
        paddingBottom: 150,
    },

    chat__header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        border: '1px solid lightgray'
    },


    chat__headerRight: {
        '& > p': {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,

            '& > svg.MuiSvgIcon-root': {
                paddingRight: 5,
                fontSize: 16,
            },
        },
    },

    chat__channelName: {
        display: 'flex',
        alignItems: 'center',
        textTransform: 'lowercase',

        '& > svg.MuiSvgIcon-root': {
            marginLeft: 10,
            fontSize: 18,
        },
    },
});
  

function Chat() {
    const { channelId } = useParams()
    const classes = useStyles()

    return (
        <div className={classes.chat}>
            <div className={classes.chat__header}>
                <div className={classes.chat__headerLeft}>
                    <h3 className={classes.chat__channelName}>
                        <strong>#General</strong>
                        <StarBorderOutlined />
                    </h3>
                </div>
                <div className={classes.chat__headerRight}>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Chat
