import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core'
import { AccessTime, Search, HelpOutline } from '@material-ui/icons'

const useStyles = makeStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0px',
      backgroundColor: 'var(--slack-color)',
      color: 'white',
    },

    header__left: {
        flex: 0.3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 20,
    },

    header__search: {
        flex: 0.4,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0px 50px',
        backgroundColor: 'var(--search-bg-color)',
        color: 'grey',
        border: '1px grey solid',
        borderRadius: 6,

        '& > input': {
            backgroundColor: 'transparent',
            border: 'none',
            textAlign: 'center',
            minWidth: '30vw',
        },
    },

    header__right: {
        flex: 0.3,
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
  });

function Header() {
    const user = {}
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <div className={classes.header__left}>
                <Avatar className="header__avartar" alt={user?.displayName} serc={user?.photoUrl} />
                <AccessTime />
            </div>

            <div className={classes.header__search}>
                <Search />
                <input placeholder="Search your name" />
            </div>

            <div className={classes.header__right}>
                <HelpOutline />
            </div>
        </div>
    )
}

export default Header
