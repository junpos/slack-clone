import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord, Create } from '@material-ui/icons'

import SidebarOption from './SidebarOption'
import db from '../firebase';

const useStyles = makeStyles({
    sidebar: {
      flex: 0.25,
      color: 'white',
      backgroundColor: "var(--slack-color)",
      borderTop: '1px solid var(--border-color)',
      maxWidth: 260,

      '& hr': {
        marginTop: 10,
        marginBottom: 10,
        border: '1px solid var(--border-color)',
      }
    },

    sidebar__header: {
      display: 'flex',
      borderBottom: '1px solid var(--border-color)',
      padding: 13,
      paddingBottom: 10,
    },

    sidebar__info: {
      flex: 1,

      '& > h2': {
        margin: 0,
        fontSize: 16,
        fontWeight: 900,
        marginBottom: 5,
      },

      '& > h3': {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 400,

        '& > svg': {
          fontSize: 16,
          color: 'green',
          marginRight: 4,
        }
      }
    },

    sidbar__edit: {
      padding: 8,
      color: "var(--border-color)",
      backgroundColor: "white",
      fontSize: 18,
      borderRadius: '50%',
    },

  });

function Sidebar() {
    const classes = useStyles()
    const [channels, setChannels] = useState([])

    useEffect(() => {

      db.collection('channels').onSnapshot(snapshot => {
        setChannels(snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        })))
      })
    }, [])
    
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__header}>
              <div className={classes.sidebar__info}>
                <h2>Slack Clone</h2>
                <h3>
                  <FiberManualRecord />
                  Jun Kim
                </h3>
              </div>
              <Create className={classes.sidbar__edit} />
            </div>
            {channels.map(channel => (
              <SidebarOption title={channel.name} key={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar
