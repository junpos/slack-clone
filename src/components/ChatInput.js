import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import firebase from 'firebase'
import { useStateVlaue } from '../StateProvider';
import db from '../firebase';

const useStyles = makeStyles({
    chatInput: {
        borderRadius: 20,

        '& > form': {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',


            '& > input': {
                position: 'fixed',
                bottom: 30,
                width: '60%',
                border: '1px solid gray',
                borderRadius: 5,
                padding: 20,
            },

            '& > button': {
                display: 'none !important',
            }
        }
    }
})

function ChatInput({ channelName, channelId }) {
    const classes = useStyles()
    const [input, setInput] = useState("")
    const [{ user }] = useStateVlaue()

    const messageChange = (e) => {
        setInput(e.target.value)
    }
    const sendMessage = e => {
        e.preventDefault()
        setInput("")

        if (channelId && input) {
            db.collection('channels').doc(channelId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            })
        }
    }

    return (
        <div className={classes.chatInput}>
            <form>
                <input value={input} placeholder={`Message in #${channelName?.toLowerCase()}`} onChange={messageChange} />
                <Button type="submit" onClick={sendMessage}>SEND</Button>
            </form>
        </div>
    )
}

ChatInput.prototype = {
    channelName: PropTypes.node,
    channelId: PropTypes.string,
}

export default ChatInput
