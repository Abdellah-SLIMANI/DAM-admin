import React from 'react'
import { authRoles } from '../auth/authRoles'

const accountsRoutes = [
    {
        path: '/ajouter-un-utilisateur',
        component: React.lazy(() => import('./Ajouter un compte/AddAccount')),
        auth: authRoles.sa,
    },
]

export default accountsRoutes
