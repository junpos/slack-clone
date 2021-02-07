import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    message: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10,
    },

    message__info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,

        '& > h4, p': {
            margin: 0,
        },
    },

    message__teimstamp: {
        color: 'gray',
        fontSize: 13,
        fontWeight: 300,
        marginLeft: 10,
    },
})

function Message({ message, user, userImage, timestamp }) {
    const classes = useStyles()
    return (
        <div className={classes.message}>
            <Avatar alt="user image" src={userImage} />
            <div className={classes.message__info}>
                <h4>
                    {user} 
                    <span className={classes.message__teimstamp}>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

Message.prototype = {
    message: PropTypes.string, 
    user: PropTypes.string, 
    userImage: PropTypes.string, 
    timestamp: PropTypes.string,
}

export default Message
