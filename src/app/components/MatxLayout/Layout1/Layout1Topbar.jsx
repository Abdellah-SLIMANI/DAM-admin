import React, { useEffect,useState } from 'react'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
} from '@material-ui/core'
import { MatxMenu, MatxSearchBox } from 'app/components'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import images from 'dictionnaireImages/images'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { AddBoxOutlined, CreateOutlined, PeopleAltOutlined } from '@material-ui/icons'
import axios from 'axios'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            backgroundColor: palette.primary.main,
            height: 100,
            paddingLeft: 18,
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .fixed': {
            boxShadow: theme.shadows[8],
            height: 80,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        // minWidth: 185,
    },
    topBarMenuItem: {
        overflow: 'unset',
        color: 'gray',
        fontWeight: 'light'
    },
    myLogo: {
        // width: 'auto',
        transform: 'translate(0, 10%)',
        marginRight: '10%',
        height: 80,
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const { logout, user } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed
    const [menuItems, setMenuItems] = useState([])

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    useEffect(() => {
        axios.get('http://13.36.215.163:8000/api/administration/get_user_menu/', {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
            .then(res => setMenuItems(res.data))
    }, [])

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        {/* <IconButton
                            onClick={handleSidebarToggle}
                            className="hide-on-pc"
                        >
                            <Icon>menu</Icon>
                        </IconButton> */}
                        <img src={images.logoDicMaxi} alt="" className={classes.myLogo}/>

                        {
                            console.log("MENU ITEMS", menuItems ),
                            menuItems && menuItems.map((item) => 
                                
                                <MenuItem className={classes.topBarMenuItem}>      
                                <Link className={classes.menuItem} to={item.path}>
                                    <Icon style={{marginRight: '5%'}}> {item.icone}</Icon> 
                                            <span> {item.title} </span>
                                </Link>
                            </MenuItem>
                            )
                        }
                        {/* <MenuItem className={classes.topBarMenuItem}>      
                            <Link className={classes.menuItem} to="/Tableaux-de-bord">
                                <DashboardOutlinedIcon style={{marginRight: '5%'}}/> 
                                        <span> Tableau de bord </span>
                            </Link>
                        </MenuItem>
                        
                        <MenuItem className={classes.topBarMenuItem}>
                        <Link className={classes.menuItem} to="/modifier-une-defintion">
                        <CreateOutlined style={{marginRight: '5%'}}/> 
                                        <span> Modifier une definition </span>
                            </Link>
                            </MenuItem>
                            <MenuItem className={classes.topBarMenuItem}>
                        <Link className={classes.menuItem} to="/ajouter-une-definition">
                        <AddBoxOutlined style={{marginRight: '5%'}}/> 
                                        <span> Ajouter une defintion </span>
                            </Link>
                            </MenuItem> */}
                    </div>
                    <div className="flex items-center">
                        {/* <MatxSearchBox /> */}
                        <MatxMenu
                            menuButton={
                                <div className={classes.userMenu}>
                                    <Hidden xsDown>
                                        <span>
                                            Bonjour <strong>{user && user.last_name && user.first_name}</strong>
                                        </span>
                                    </Hidden>
                                    <Avatar
                                        className="cursor-pointer"
                                        src={user && user.avatar}
                                    />
                                </div>
                            }
                        >
                            <MenuItem>
                                <Link className={classes.menuItem} to="/">
                                    <Icon> home </Icon>
                                    <span className="pl-4"> Acceuill </span>
                                </Link>
                            </MenuItem>
                            <MenuItem
                                onClick={logout}
                                className={classes.menuItem}
                            >
                                <Icon> power_settings_new </Icon>
                                <span className="pl-4"> Se Deconnecter </span>
                            </MenuItem>
                        </MatxMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
