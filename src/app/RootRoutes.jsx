import React from 'react'
import { Redirect } from 'react-router-dom'

import administrationRoutes from './views/dashboard/AdministrationRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'
import accountsRoutes from './pages/AccountsRoutes'
import authorRoutes from './pages/AuthorsRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/Tableaux-de-bord" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...authorRoutes,
    ...administrationRoutes,
    ...accountsRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
