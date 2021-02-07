import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import db from '../firebase';

const useStyle = makeStyles({
    sidebarOption: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 5,
        fontSize: 12,
        cursor: 'pointer',

        '&:hover': {
            opacity: 0.9,
            backgroundColor: 'var(--sidebar-hover-color)',
        },

        '& h3': {
            margin: 0,
            padding: '5px 0',
            fontWeight: 400,
        }
    },

    sidebarOption__icon: {
        padding: 5,
        fontSize: '15 !important',
    },

    sidebarOption__channel: {
        padding: '5px 0',
    },

    sidebarOption__hash: {
        padding: 5,
    },
})



function SidebarOption({ Icon, title, id, action }) {
    const classes = useStyle()
    const history = useHistory()

    const selectChannel = () => {
        if (id) {
            history.push(`/channel/${id}`)
        } else{
            history.push(title)
        }
    }

    const createChannel = () => {
        const channelName = prompt('Please enter the channel name')
        if (channelName) {
            db.collection('channels').add({
                name: channelName
            })
        }
    }

    const handleClick = () => {
        if (action === 'create') {
            createChannel()
            return
        }

        selectChannel()
    }

    return (
        <div className={classes.sidebarOption} onClick={handleClick}>
            {Icon && <Icon className={classes.sidebarOption__icon} />}
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <h3 className={classes.sidebarOption__channel}>
                    <span className={classes.sidebarOption__hash}>#</span> {title}
                </h3>
            )}
        </div>
    )
}

SidebarOption.prototype = {
    Icon: PropTypes.node,
    title: PropTypes.string,
    id: PropTypes.string,
    action: PropTypes.string,
}

export default SidebarOption
